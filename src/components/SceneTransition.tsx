import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SceneTransitionProps {
  sceneKey: string;
  children: React.ReactNode;
  reducedMotion?: boolean;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  sceneKey,
  children,
  reducedMotion = false
}) => {
  if (reducedMotion) {
    return (
      <div
        key={sceneKey}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
