import { useState, useCallback, useEffect } from 'react';
import { SceneId, SCENES, getSceneById } from '../app/sceneRegistry';

export interface SceneController {
  currentScene: SceneId;
  currentIndex: number;
  visitedScenes: SceneId[];
  nextScene: () => void;
  prevScene: () => void;
  goToScene: (id: SceneId) => void;
  resetExperience: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isFirstScene: boolean;
  isLastScene: boolean;
}

export const useSceneController = (
  initialScene: SceneId = 'secret-gate',
  onSceneChange?: (newScene: SceneId) => void
): SceneController => {
  const [currentScene, setCurrentScene] = useState<SceneId>(initialScene);
  const [visitedScenes, setVisitedScenes] = useState<SceneId[]>([initialScene]);

  const currentIndex = SCENES.findIndex((s) => s.id === currentScene);
  const isFirstScene = currentIndex === 0;
  const isLastScene = currentIndex === SCENES.length - 1;
  const canGoNext = currentIndex < SCENES.length - 1;
  const canGoPrev = currentIndex > 0;

  const markVisited = useCallback((sceneId: SceneId) => {
    setVisitedScenes((prev) => (prev.includes(sceneId) ? prev : [...prev, sceneId]));
  }, []);

  const goToScene = useCallback(
    (targetId: SceneId) => {
      setCurrentScene(targetId);
      markVisited(targetId);
      if (onSceneChange) onSceneChange(targetId);
    },
    [markVisited, onSceneChange]
  );

  const nextScene = useCallback(() => {
    if (canGoNext) {
      const nextMeta = SCENES[currentIndex + 1];
      goToScene(nextMeta.id);
    }
  }, [canGoNext, currentIndex, goToScene]);

  const prevScene = useCallback(() => {
    if (canGoPrev) {
      const prevMeta = SCENES[currentIndex - 1];
      goToScene(prevMeta.id);
    }
  }, [canGoPrev, currentIndex, goToScene]);

  const resetExperience = useCallback(() => {
    setCurrentScene(SCENES[0].id);
    if (onSceneChange) onSceneChange(SCENES[0].id);
  }, [onSceneChange]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        nextScene();
      } else if (e.key === 'ArrowLeft') {
        prevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScene, prevScene]);

  return {
    currentScene,
    currentIndex,
    visitedScenes,
    nextScene,
    prevScene,
    goToScene,
    resetExperience,
    canGoNext,
    canGoPrev,
    isFirstScene,
    isLastScene
  };
};
