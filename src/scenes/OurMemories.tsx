import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { giftConfig } from '../config/gift.config';
import { PhotoViewer } from '../components/PhotoViewer';

interface OurMemoriesProps {
  onNext: () => void;
  playChime: () => void;
}

export const OurMemories: React.FC<OurMemoriesProps> = ({ onNext, playChime }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleOpenPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
    playChime();
  };

  const handleClosePhoto = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <div className="scene-layout">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '36px' }}
      >
        <span className="badge-luxury" style={{ marginBottom: '12px' }}>
          Những Kỷ Niệm Ngọt Ngào
        </span>
        <h2 className="heading-title text-gold-gradient" style={{ marginTop: '8px' }}>
          Từng Giây Phút Cùng Bé Liễu
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: '#f4c7d5',
            fontSize: '1.05rem',
            maxWidth: '560px',
            margin: '8px auto 0'
          }}
        >
          Mỗi ngày trao nhau những dòng tin nhắn quan tâm, cùng nhau tận hưởng và vẽ lên câu chuyện về những chuyến đi chơi, những lần hẹn gặp nhau... tất cả đều là những điều khiến Anh vô cùng hoài niệm.
        </p>
      </motion.div>

      {/* Memory Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '1080px',
          marginBottom: '36px'
        }}
      >
        {giftConfig.memories.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            onClick={() => handleOpenPhoto(index)}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              borderRadius: '20px'
            }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Image Thumbnail with Overlay */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                overflow: 'hidden'
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease'
                }}
              />

              {/* Gradient Vignette over photo */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(30, 7, 18, 0.85) 0%, transparent 60%)'
                }}
              />

              {/* Expand Hint Icon */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(53, 13, 32, 0.75)',
                  border: '1px solid rgba(231, 200, 137, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e7c889'
                }}
              >
                <Maximize2 size={16} />
              </div>
            </div>

            {/* Info Card Body */}
            <div style={{ padding: '18px 20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px'
                }}
              >
                {item.date && (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.78rem',
                      color: '#e7c889'
                    }}
                  >
                    <Calendar size={12} />
                    {item.date}
                  </span>
                )}
                {item.location && (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.78rem',
                      color: '#f4c7d5'
                    }}
                  >
                    <MapPin size={12} />
                    {item.location}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: '#fff',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  color: '#f7e4bd',
                  fontWeight: 300,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button to proceed to Love Letter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <button type="button" onClick={onNext} className="btn-gold">
          <span>Mở Lá Thư Tình Của Anh</span>
          <ArrowRight size={18} />
        </button>
      </motion.div>

      {/* Lightbox Photo Viewer Modal */}
      <PhotoViewer
        isOpen={selectedPhotoIndex !== null}
        memories={giftConfig.memories}
        currentIndex={selectedPhotoIndex ?? 0}
        onClose={handleClosePhoto}
        onSelectIndex={(newIdx) => setSelectedPhotoIndex(newIdx)}
      />
    </div>
  );
};
