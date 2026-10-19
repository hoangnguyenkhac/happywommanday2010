import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 'calc(14px + env(safe-area-inset-top, 0px))',
        right: 'clamp(12px, 3vw, 20px)',
        zIndex: 50
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? 'Tắt âm thanh' : 'Bật nhạc nền'}
        title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc piano lãng mạn'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          background: 'rgba(53, 13, 32, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(231, 200, 137, 0.45)',
          borderRadius: '30px',
          color: '#f7e4bd',
          cursor: 'pointer',
          boxShadow: isPlaying
            ? '0 0 15px rgba(231, 200, 137, 0.35), 0 4px 15px rgba(0,0,0,0.5)'
            : '0 4px 12px rgba(0,0,0,0.4)',
          transition: 'all 0.3s ease'
        }}
      >
        {isPlaying ? (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '2px',
                height: '14px',
                width: '16px'
              }}
            >
              <span
                style={{
                  width: '3px',
                  backgroundColor: '#e7c889',
                  borderRadius: '2px',
                  animation: 'eqWave 1s ease-in-out infinite alternate',
                  height: '60%'
                }}
              />
              <span
                style={{
                  width: '3px',
                  backgroundColor: '#f7e4bd',
                  borderRadius: '2px',
                  animation: 'eqWave 1.2s ease-in-out 0.2s infinite alternate',
                  height: '100%'
                }}
              />
              <span
                style={{
                  width: '3px',
                  backgroundColor: '#e7c889',
                  borderRadius: '2px',
                  animation: 'eqWave 0.8s ease-in-out 0.4s infinite alternate',
                  height: '40%'
                }}
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.04em',
                fontWeight: 500
              }}
            >
              Âm nhạc
            </span>
          </>
        ) : (
          <>
            <VolumeX size={16} color="#e7c889" />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                opacity: 0.8,
                letterSpacing: '0.04em'
              }}
            >
              Bật nhạc
            </span>
          </>
        )}
      </button>

      <style>{`
        @keyframes eqWave {
          0% { height: 25%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
};
