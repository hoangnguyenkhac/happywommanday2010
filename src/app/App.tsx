import React from 'react';
import { useSceneController } from '../hooks/useSceneController';
import { useAudio } from '../hooks/useAudio';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ParticleField } from '../components/ParticleField';
import { AudioController } from '../components/AudioController';
import { ProgressDots } from '../components/ProgressDots';
import { SceneTransition } from '../components/SceneTransition';

// Scenes
import { SecretGate } from '../scenes/SecretGate';
import { BloomingGarden } from '../scenes/BloomingGarden';
import { OurMemories } from '../scenes/OurMemories';
import { LoveLetter } from '../scenes/LoveLetter';
import { GrandReveal } from '../scenes/GrandReveal';
import { WishesSky } from '../scenes/WishesSky';
import { FinalMessage } from '../scenes/FinalMessage';

export const App: React.FC = () => {
  const {
    currentScene,
    visitedScenes,
    nextScene,
    goToScene,
    resetExperience
  } = useSceneController('secret-gate');

  const {
    isPlaying,
    toggleMusic,
    playSparkleSound,
    playChimeSound,
    playFireworkSound,
    startExperienceAudio
  } = useAudio();

  const reducedMotion = useReducedMotion();

  // Scroll to top immediately whenever current scene transitions
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentScene]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        overflowX: 'hidden',
        backgroundColor: '#16040d',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Dynamic luxury background layers */}
      <div className="luxury-bg" />
      <div className="luxury-vignette" />

      {/* Floating stardust & fireworks particles Canvas */}
      <ParticleField currentScene={currentScene} reducedMotion={reducedMotion} />

      {/* Top audio player toggle */}
      <AudioController isPlaying={isPlaying} onToggle={toggleMusic} />

      {/* Scene Content with smooth transition */}
      <SceneTransition sceneKey={currentScene} reducedMotion={reducedMotion}>
        {currentScene === 'secret-gate' && (
          <SecretGate
            onUnlock={nextScene}
            playChime={playChimeSound}
            startAudio={startExperienceAudio}
          />
        )}

        {currentScene === 'blooming-garden' && (
          <BloomingGarden
            onNext={nextScene}
            playChime={playChimeSound}
          />
        )}

        {currentScene === 'our-memories' && (
          <OurMemories
            onNext={nextScene}
            playChime={playChimeSound}
          />
        )}

        {currentScene === 'love-letter' && (
          <LoveLetter
            onNext={nextScene}
            playSparkle={playSparkleSound}
            playChime={playChimeSound}
          />
        )}

        {currentScene === 'grand-reveal' && (
          <GrandReveal
            onNext={nextScene}
            playSparkle={playSparkleSound}
            playFirework={playFireworkSound}
          />
        )}

        {currentScene === 'wishes-sky' && (
          <WishesSky
            onNext={nextScene}
            playFirework={playFireworkSound}
            playSparkle={playSparkleSound}
          />
        )}

        {currentScene === 'final-message' && (
          <FinalMessage
            onReplay={resetExperience}
            playSparkle={playSparkleSound}
          />
        )}
      </SceneTransition>

      {/* 7 Glowing Progress Dots at bottom */}
      <ProgressDots
        currentScene={currentScene}
        visitedScenes={visitedScenes}
        onSelectScene={goToScene}
      />
    </div>
  );
};

export default App;
