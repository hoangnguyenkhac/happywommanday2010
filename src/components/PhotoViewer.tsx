import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { MemoryItem } from '../config/gift.config';

interface PhotoViewerProps {
  isOpen: boolean;
  memories: MemoryItem[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({
  isOpen,
  memories,
  currentIndex,
  onClose,
  onSelectIndex
}) => {
  const currentPhoto = memories[currentIndex];

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onSelectIndex((currentIndex + 1) % memories.length);
    },
    [currentIndex, memories.length, onSelectIndex]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onSelectIndex((currentIndex - 1 + memories.length) % memories.length);
    },
    [currentIndex, memories.length, onSelectIndex]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          backgroundColor: 'rgba(10, 2, 7, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng xem ảnh"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            zIndex: 110,
            background: 'rgba(53, 13, 32, 0.8)',
            border: '1px solid rgba(231, 200, 137, 0.5)',
            color: '#f7e4bd',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={22} />
        </button>

        {/* Previous Button */}
        {memories.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Ảnh trước"
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 110,
              background: 'rgba(53, 13, 32, 0.8)',
              border: '1px solid rgba(231, 200, 137, 0.4)',
              color: '#f7e4bd',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeft size={26} />
          </button>
        )}

        {/* Next Button */}
        {memories.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Ảnh kế tiếp"
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 110,
              background: 'rgba(53, 13, 32, 0.8)',
              border: '1px solid rgba(231, 200, 137, 0.4)',
              color: '#f7e4bd',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronRight size={26} />
          </button>
        )}

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(160deg, rgba(65, 17, 39, 0.95), rgba(30, 7, 18, 0.98))',
            border: '1px solid rgba(231, 200, 137, 0.45)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(231, 200, 137, 0.2)'
          }}
        >
          {/* Main Photo Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxHeight: '58vh',
              overflow: 'hidden',
              backgroundColor: '#0c0207',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '58vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* Details & Caption */}
          <div
            style={{
              padding: '24px 30px',
              overflowY: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '10px'
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  color: '#fff',
                  fontWeight: 600
                }}
              >
                {currentPhoto.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {currentPhoto.date && (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#e7c889',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Calendar size={14} />
                    {currentPhoto.date}
                  </span>
                )}
                {currentPhoto.location && (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#f4c7d5',
                      fontSize: '0.85rem'
                    }}
                  >
                    <MapPin size={14} />
                    {currentPhoto.location}
                  </span>
                )}
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#f7e4bd',
                fontWeight: 300,
                marginTop: '6px'
              }}
            >
              {currentPhoto.caption}
            </p>

            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              {memories.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectIndex(i)}
                  style={{
                    width: i === currentIndex ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: i === currentIndex ? '#e7c889' : 'rgba(255,255,255,0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
