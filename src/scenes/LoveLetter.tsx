import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { giftConfig } from '../config/gift.config';

interface LoveLetterProps {
  onNext: () => void;
  playSparkle: () => void;
  playChime: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext, playSparkle, playChime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllParagraphs, setShowAllParagraphs] = useState(false);
  const [signatureGlow, setSignatureGlow] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);
    playSparkle();
    playChime();
  };

  const handleRevealNext = () => {
    setSignatureGlow(true);
    playSparkle();
    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <div className="scene-layout">
      {/* Scene Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '28px' }}
      >
        <span className="badge-luxury" style={{ marginBottom: '12px' }}>
          Bức Thư Tình Gửi Em
        </span>
        <h2 className="heading-title text-gold-gradient" style={{ marginTop: '8px' }}>
          Tâm Thư Gửi Riêng Em
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: '#f4c7d5',
            fontSize: '1rem',
            maxWidth: '520px',
            margin: '8px auto 0'
          }}
        >
          {isOpen
            ? 'Từng dòng chữ viết bằng tất cả sự chân thành từ trái tim Anh...'
            : 'Một phong thư niêm sáp vàng chờ Bé Liễu mở ra...'}
        </p>
      </motion.div>

      {/* Main Interactive Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '740px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope View */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpenLetter}
              className="glass-panel-luxury"
              style={{
                width: '100%',
                maxWidth: '520px',
                height: 'clamp(260px, 65vw, 320px)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 40px rgba(231,200,137,0.2)'
              }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Envelope flap lines */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '140px',
                  background: 'linear-gradient(to bottom, rgba(140, 37, 75, 0.4), transparent)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  borderBottom: '1px solid rgba(231, 200, 137, 0.3)'
                }}
              />

              {/* Envelope Text */}
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: '#fff8f3',
                  marginBottom: '20px',
                  zIndex: 2,
                  letterSpacing: '0.04em'
                }}
              >
                Gửi: <span style={{ color: '#e7c889', fontWeight: 600 }}>{giftConfig.recipient}</span>
              </p>

              {/* Golden Wax Seal Stamp */}
              <div
                style={{
                  position: 'relative',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #f7e4bd 0%, #e7c889 40%, #c99f57 75%, #8c254b 100%)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.5), 0 0 25px rgba(231, 200, 137, 0.6)',
                  border: '2px solid #fff8f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3,
                  animation: 'pulseGlow 2.5s infinite'
                }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    border: '1px dashed rgba(53, 13, 32, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: '2.4rem',
                      color: '#2b0716',
                      fontWeight: 700
                    }}
                  >
                    A
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '22px',
                  color: '#e7c889',
                  fontSize: '0.9rem',
                  zIndex: 2
                }}
              >
                <Sparkles size={14} />
                <span>Chạm vào niêm sáp để mở thư</span>
              </div>
            </motion.div>
          ) : (
            /* Open Letter Parchment View */
            <motion.div
              key="open-letter"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                width: '100%',
                background: 'linear-gradient(175deg, #faf6ee 0%, #f7f0df 60%, #ebdcc0 100%)',
                color: '#2a0918',
                borderRadius: '24px',
                padding: 'clamp(28px, 5vw, 48px)',
                position: 'relative',
                boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 50px rgba(231,200,137,0.3)',
                border: '1px solid rgba(201, 159, 87, 0.4)'
              }}
            >
              {/* Subtle vintage texture and gold edge line */}
              <div
                style={{
                  position: 'absolute',
                  inset: '12px',
                  border: '1px solid rgba(140, 37, 75, 0.2)',
                  borderRadius: '16px',
                  pointerEvents: 'none'
                }}
              />

              {/* Letter Header */}
              <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                    color: '#651b36',
                    fontStyle: 'italic',
                    fontWeight: 700
                  }}
                >
                  {giftConfig.letter.greeting}
                </h3>
              </div>

              {/* Letter Paragraphs */}
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  lineHeight: '1.9',
                  color: '#2b0716',
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px'
                }}
              >
                {giftConfig.letter.paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: showAllParagraphs ? 0 : i * 0.4
                    }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Signature Section */}
              <div
                style={{
                  marginTop: '36px',
                  paddingTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.95rem',
                    fontStyle: 'italic',
                    color: '#8c254b'
                  }}
                >
                  {giftConfig.letter.postScript || 'Thương mến,'}
                </span>

                <div style={{ position: 'relative', marginTop: '4px' }}>
                  <motion.span
                    className="calligraphic-signature"
                    style={{
                      color: signatureGlow ? '#e7c889' : '#651b36',
                      display: 'inline-block',
                      fontSize: 'clamp(2.4rem, 7vw, 3.2rem)',
                      textShadow: signatureGlow
                        ? '0 0 25px rgba(231,200,137,0.9)'
                        : '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                    animate={signatureGlow ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {giftConfig.letter.signature}
                  </motion.span>

                  {/* Golden light sweep effect across signature */}
                  {signatureGlow && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(231,200,137,0.8), transparent)',
                        filter: 'blur(4px)'
                      }}
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </div>
              </div>

              {/* Fast Forward & Proceed Controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '30px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(140, 37, 75, 0.2)',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {!showAllParagraphs && (
                  <button
                    type="button"
                    onClick={() => setShowAllParagraphs(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#8c254b',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Eye size={14} />
                    <span>Hiện toàn bộ thư</span>
                  </button>
                )}

                <div style={{ marginLeft: 'auto' }}>
                  <button
                    type="button"
                    onClick={handleRevealNext}
                    className="btn-gold btn-gold-solid"
                    style={{
                      boxShadow: '0 4px 20px rgba(101, 27, 54, 0.4)'
                    }}
                  >
                    <span>Sang Màn Chúc 20.10</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
