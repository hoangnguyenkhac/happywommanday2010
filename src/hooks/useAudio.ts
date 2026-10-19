import { useState, useEffect, useRef, useCallback } from 'react';

export interface AudioControls {
  isPlaying: boolean;
  toggleMusic: () => void;
  playSparkleSound: () => void;
  playChimeSound: () => void;
  playFireworkSound: () => void;
  startExperienceAudio: () => void;
}

export const useAudio = (): AudioControls => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const isUsingSynthRef = useRef<boolean>(true);

  // Initialize Audio Context on demand
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Romantic chord progression generator using Web Audio API
  // Chords: Fmaj7 -> Dm9 -> Bbmaj7 -> C7sus4 (Romantic, emotional, peaceful)
  const playRomanticChordNote = useCallback((freq: number, duration: number, delay = 0, gainLevel = 0.08) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    setTimeout(() => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Warm acoustic piano / rhodes tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low-pass filter for velvety warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + duration);

        // Gentle envelope: soft attack, long singing decay
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(gainLevel, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration + 0.1);
      } catch (e) {
        console.warn('Audio note error:', e);
      }
    }, delay * 1000);
  }, [getAudioContext]);

  // Procedural romantic background arpeggios
  const startSynthMusic = useCallback(() => {
    if (synthIntervalRef.current) return;

    // F Major Pentatonic / Romantic Arpeggios (Hz frequencies)
    // F3, A3, C4, E4, G4, A4, C5, E5
    const progressions = [
      // Fmaj7
      [174.61, 220.00, 261.63, 329.63, 392.00, 523.25],
      // Dm9
      [146.83, 220.00, 261.63, 293.66, 349.23, 440.00],
      // Bbmaj7
      [116.54, 174.61, 233.08, 293.66, 349.23, 466.16],
      // C7sus4 / Csus2
      [130.81, 196.00, 261.63, 293.66, 392.00, 523.25]
    ];

    let chordIdx = 0;
    const playBar = () => {
      const chord = progressions[chordIdx % progressions.length];
      chordIdx++;

      // Play gentle arpeggiated notes
      chord.forEach((note, i) => {
        const noteDelay = i * 0.45;
        playRomanticChordNote(note, 3.2, noteDelay, 0.06);
      });
    };

    playBar();
    synthIntervalRef.current = window.setInterval(playBar, 3200);
  }, [playRomanticChordNote]);

  const stopSynthMusic = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  // Try loading real MP3 if available, or fall back to synth
  useEffect(() => {
    const audio = new Audio('/audio/piano.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    audio.addEventListener('canplaythrough', () => {
      isUsingSynthRef.current = false;
    });

    audio.addEventListener('error', () => {
      isUsingSynthRef.current = true;
    });

    audioElRef.current = audio;

    return () => {
      audio.pause();
      stopSynthMusic();
    };
  }, [stopSynthMusic]);

  const startMusic = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!isUsingSynthRef.current && audioElRef.current) {
      audioElRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        isUsingSynthRef.current = true;
        startSynthMusic();
        setIsPlaying(true);
      });
    } else {
      startSynthMusic();
      setIsPlaying(true);
    }
  }, [getAudioContext, startSynthMusic]);

  const pauseMusic = useCallback(() => {
    if (audioElRef.current && !isUsingSynthRef.current) {
      audioElRef.current.pause();
    }
    stopSynthMusic();
    setIsPlaying(false);
  }, [stopSynthMusic]);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }, [isPlaying, pauseMusic, startMusic]);

  const startExperienceAudio = useCallback(() => {
    if (!isPlaying) {
      startMusic();
    }
  }, [isPlaying, startMusic]);

  // Sound effects
  const playSparkleSound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [880, 1174.66, 1318.51, 1760].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.001, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.65);
      });
    } catch (e) {
      console.warn('Sparkle sound error', e);
    }
  }, [getAudioContext]);

  const playChimeSound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.001, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.3);
      });
    } catch (e) {
      console.warn('Chime error', e);
    }
  }, [getAudioContext]);

  const playFireworkSound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Soft romantic swoosh + gentle sparkle burst
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.5);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);

      // Burst of high chimes
      setTimeout(() => {
        playSparkleSound();
      }, 500);
    } catch (e) {
      console.warn('Firework sound error', e);
    }
  }, [getAudioContext, playSparkleSound]);

  return {
    isPlaying,
    toggleMusic,
    playSparkleSound,
    playChimeSound,
    playFireworkSound,
    startExperienceAudio
  };
};
