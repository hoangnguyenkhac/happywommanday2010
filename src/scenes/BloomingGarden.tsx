import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Check, HeartHandshake } from 'lucide-react';
import { giftConfig, PetalItem } from '../config/gift.config';

interface BloomingGardenProps {
  onNext: () => void;
  playChime: () => void;
}

export const BloomingGarden: React.FC<BloomingGardenProps> = ({ onNext, playChime }) => {
  const [selectedPetal, setSelectedPetal] = useState<PetalItem | null>(giftConfig.petals[0]);
  const [openedPetals, setOpenedPetals] = useState<string[]>([giftConfig.petals[0].id]);

  const handleSelectPetal = (petal: PetalItem) => {
    setSelectedPetal(petal);
    if (!openedPetals.includes(petal.id)) {
      setOpenedPetals((prev) => [...prev, petal.id]);
    }
    playChime();
  };

  const allExplored = openedPetals.length >= giftConfig.petals.length;

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
          Đóa Hồng Dành Riêng Cho Em
        </span>
        <h2
          className="heading-title text-gold-gradient"
          style={{ marginTop: '8px', marginBottom: '8px' }}
        >
          Đóa Hoa Dành Cho Bé Liễu
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: '#f4c7d5',
            fontSize: '1.05rem',
            maxWidth: '540px',
            margin: '0 auto'
          }}
        >
          Mỗi cánh hoa mang theo một tâm tư sâu kín mà Anh muốn gửi gắm tới em. Hãy chạm vào từng cánh hoa để khám phá nhé.
        </p>
      </motion.div>

      {/* Main Rose & Petal Interactive Center */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '1000px',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Blooming Rose Visual */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Glowing Rose Art Center */}
          <div
            style={{
              position: 'relative',
              width: '260px',
              height: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Ambient Backlight */}
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(231, 200, 137, 0.3) 0%, rgba(140, 37, 75, 0.4) 50%, transparent 75%)',
                filter: 'blur(30px)',
                animation: 'pulseGlow 4s infinite'
              }}
            />

            {/* SVG Luxury Layered Golden Crimson Rose */}
            <motion.svg
              viewBox="0 0 200 200"
              style={{
                width: '100%',
                height: '100%',
                filter: 'drop-shadow(0 0 25px rgba(231, 200, 137, 0.5))'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            >
              <defs>
                <radialGradient id="roseGradCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff8f3" />
                  <stop offset="40%" stopColor="#f7e4bd" />
                  <stop offset="70%" stopColor="#c99f57" />
                  <stop offset="100%" stopColor="#651b36" />
                </radialGradient>
                <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8c254b" />
                  <stop offset="50%" stopColor="#651b36" />
                  <stop offset="100%" stopColor="#350d20" />
                </linearGradient>
                <linearGradient id="petalGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7e4bd" />
                  <stop offset="40%" stopColor="#e7c889" />
                  <stop offset="100%" stopColor="#8c254b" />
                </linearGradient>
              </defs>

              {/* Outer Petals */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(231, 200, 137, 0.25)" strokeDasharray="4 6" />
              <path
                d="M100 20 C140 20, 175 55, 175 95 C175 140, 135 175, 95 175 C55 175, 25 140, 25 95 C25 55, 60 20, 100 20 Z"
                fill="url(#petalGrad1)"
                stroke="#e7c889"
                strokeWidth="1.2"
                opacity="0.85"
              />

              {/* Mid Layer Petals */}
              <path
                d="M100 40 C130 35, 160 65, 160 100 C160 135, 130 160, 100 160 C70 160, 40 135, 40 100 C40 65, 70 35, 100 40 Z"
                fill="url(#petalGrad1)"
                stroke="#f7e4bd"
                strokeWidth="1.5"
                transform="rotate(35 100 100)"
                opacity="0.9"
              />

              {/* Third Layer Petals */}
              <path
                d="M100 55 C125 50, 145 70, 145 100 C145 125, 125 145, 100 145 C75 145, 55 125, 55 100 C55 70, 75 50, 100 55 Z"
                fill="url(#petalGrad2)"
                stroke="#e7c889"
                strokeWidth="1"
                transform="rotate(-25 100 100)"
                opacity="0.75"
              />

              {/* Inner Heart Rose Swirl */}
              <circle cx="100" cy="100" r="32" fill="url(#roseGradCore)" />
              <path
                d="M90 90 Q100 80 110 90 T105 110 T90 100 Z"
                fill="#651b36"
                opacity="0.8"
              />
            </motion.svg>
          </div>

          {/* Petal Selector Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginTop: '20px',
              maxWidth: '340px'
            }}
          >
            {giftConfig.petals.map((petal, index) => {
              const isSelected = selectedPetal?.id === petal.id;
              const isOpened = openedPetals.includes(petal.id);

              return (
                <button
                  key={petal.id}
                  type="button"
                  onClick={() => handleSelectPetal(petal)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(231, 200, 137, 0.4), rgba(140, 37, 75, 0.5))'
                      : 'rgba(53, 13, 32, 0.6)',
                    border: isSelected
                      ? '1px solid #e7c889'
                      : isOpened
                      ? '1px solid rgba(231, 200, 137, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    color: isSelected ? '#fff' : isOpened ? '#f7e4bd' : '#f4c7d5',
                    boxShadow: isSelected ? '0 0 15px rgba(231, 200, 137, 0.4)' : 'none'
                  }}
                >
                  {isOpened && <Check size={12} color="#e7c889" />}
                  <span>Cánh {index + 1}</span>
                </button>
              );
            })}
          </div>

          <p
            style={{
              fontSize: '0.78rem',
              color: '#e7c889',
              marginTop: '10px',
              letterSpacing: '0.04em'
            }}
          >
            Đã mở {openedPetals.length}/{giftConfig.petals.length} cánh hoa
          </p>
        </div>

        {/* Selected Petal Message Display Glass Card */}
        <div>
          <AnimatePresence mode="wait">
            {selectedPetal && (
              <motion.div
                key={selectedPetal.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel-luxury"
                style={{
                  padding: '32px 28px',
                  position: 'relative',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '12px'
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(231, 200, 137, 0.2)',
                        border: '1px solid rgba(231, 200, 137, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Sparkles size={18} color="#e7c889" />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.4rem',
                          color: '#fff',
                          fontWeight: 600
                        }}
                      >
                        {selectedPetal.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontStyle: 'italic',
                          color: '#e7c889',
                          fontSize: '0.88rem'
                        }}
                      >
                        {selectedPetal.subtitle}
                      </p>
                    </div>
                  </div>

                  <p
                    className="body-romantic"
                    style={{
                      fontSize: '1.15rem',
                      lineHeight: '1.85',
                      color: '#faf6ee',
                      marginTop: '16px'
                    }}
                  >
                    “{selectedPetal.message}”
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '24px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(231, 200, 137, 0.2)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: '1.4rem',
                      color: '#e7c889'
                    }}
                  >
                    Lời từ Anh
                  </span>

                  <HeartHandshake size={20} color="#f4c7d5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Continue Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '40px', textAlign: 'center' }}
      >
        <button
          type="button"
          onClick={onNext}
          className={allExplored ? 'btn-gold btn-gold-solid' : 'btn-gold'}
        >
          <span>Khám Phá Kỷ Niệm Của Chúng Mình</span>
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
};
