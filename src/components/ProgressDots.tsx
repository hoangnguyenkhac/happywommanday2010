import React, { useState } from 'react';
import { SCENES, SceneId } from '../app/sceneRegistry';

interface ProgressDotsProps {
  currentScene: SceneId;
  visitedScenes: SceneId[];
  onSelectScene: (sceneId: SceneId) => void;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({
  currentScene,
  visitedScenes,
  onSelectScene
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="progress-dots-container"
      style={{
        position: 'fixed',
        bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(30, 7, 18, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(231, 200, 137, 0.28)',
        borderRadius: '30px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
      }}
    >
      {SCENES.map((scene, idx) => {
        const isActive = scene.id === currentScene;
        const isVisited = visitedScenes.includes(scene.id);
        const isHovered = hoveredIndex === idx;

        return (
          <div key={scene.id} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => onSelectScene(scene.id)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={`Chuyển đến cảnh ${scene.numberStr}: ${scene.dotLabel}`}
              style={{
                width: isActive ? '28px' : '9px',
                height: '9px',
                borderRadius: '5px',
                backgroundColor: isActive
                  ? '#e7c889'
                  : isVisited
                  ? 'rgba(231, 200, 137, 0.55)'
                  : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none',
                boxShadow: isActive
                  ? '0 0 12px #e7c889, 0 0 20px rgba(231, 200, 137, 0.5)'
                  : 'none'
              }}
            />

            {/* Hover Tooltip */}
            {isHovered && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  padding: '4px 10px',
                  background: 'rgba(53, 13, 32, 0.95)',
                  border: '1px solid rgba(231, 200, 137, 0.4)',
                  borderRadius: '12px',
                  color: '#f7e4bd',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-sans)',
                  pointerEvents: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  animation: 'fadeInUp 0.2s ease-out'
                }}
              >
                {scene.dotLabel}
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 4px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
};
