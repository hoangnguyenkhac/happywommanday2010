import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { giftConfig } from '../config/gift.config';

interface SecretGateProps {
  onUnlock: () => void;
  playChime: () => void;
  startAudio: () => void;
}

export const SecretGate: React.FC<SecretGateProps> = ({ onUnlock, playChime, startAudio }) => {
  const [isExpanding, setIsExpanding] = useState(false);

  const handleHeartClick = () => {
    if (isExpanding) return;
    setIsExpanding(true);
    startAudio();
    playChime();

    // Trigger shockwave expansion before transitioning
    setTimeout(() => {
      onUnlock();
    }, 900);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '24px 20px',
        textAlign: 'center',
        userSelect: 'none'
      }}
    >
      {/* Expanding shockwave ring on unlock */}
      {isExpanding && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(247, 228, 189, 0.8) 0%, rgba(231, 200, 137, 0.4) 40%, rgba(212, 60, 106, 0) 70%)',
            boxShadow: '0 0 80px rgba(231, 200, 137, 0.9)',
            animation: 'shockwaveExpand 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            pointerEvents: 'none',
            zIndex: 30
          }}
        />
      )}

      {/* Top Badge & Introduction */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ marginBottom: '32px', zIndex: 10 }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            background: 'rgba(231, 200, 137, 0.1)',
            border: '1px solid rgba(231, 200, 137, 0.35)',
            borderRadius: '30px',
            marginBottom: '16px'
          }}
        >
          <Sparkles size={14} color="#e7c889" />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#e7c889',
              fontWeight: 600
            }}
          >
            {giftConfig.occasion.label} · DÀNH RIÊNG CHO BÉ LIỄU
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
            color: '#fff',
            fontWeight: 600,
            maxWidth: '680px',
            lineHeight: 1.4,
            textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            margin: '0 auto'
          }}
        >
          {giftConfig.openingMessage}
        </h1>
      </motion.div>

      {/* Central Glowing Heart Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isExpanding ? 1.6 : 1,
          opacity: isExpanding ? 0 : 1
        }}
        transition={{
          duration: isExpanding ? 0.8 : 1.2,
          ease: 'easeInOut'
        }}
        style={{
          position: 'relative',
          margin: '24px 0',
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={handleHeartClick}
      >
        {/* Soft Golden & Rose Aura */}
        <div
          style={{
            position: 'absolute',
            inset: '-30px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(231, 200, 137, 0.25) 0%, rgba(101, 27, 54, 0.4) 50%, transparent 75%)',
            filter: 'blur(20px)',
            animation: 'pulseGlow 3s infinite'
          }}
        />

        {/* Heart Icon with Sparkles */}
        <div
          className="animate-pulse-glow"
          style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 35% 35%, #8c254b 0%, #4a1228 60%, #200612 100%)',
            border: '2px solid rgba(231, 200, 137, 0.65)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 35px rgba(231, 200, 137, 0.4), 0 0 20px rgba(231, 200, 137, 0.3) inset',
            transition: 'transform 0.3s ease'
          }}
        >
          <Heart
            size={76}
            color="#e7c889"
            fill="url(#goldGradientHeart)"
            style={{
              filter: 'drop-shadow(0 4px 15px rgba(231, 200, 137, 0.7))'
            }}
          />

          <svg width="0" height="0">
            <defs>
              <linearGradient id="goldGradientHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff8f3" />
                <stop offset="40%" stopColor="#f7e4bd" />
                <stop offset="80%" stopColor="#e7c889" />
                <stop offset="100%" stopColor="#c99f57" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Call to Action below Heart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ zIndex: 10, marginTop: '20px' }}
      >
        <p
          className="shimmer-text"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            marginBottom: '14px'
          }}
        >
          Chạm vào trái tim để bước vào thế giới dành riêng cho em
        </p>

        <button
          type="button"
          onClick={handleHeartClick}
          className="btn-gold"
          style={{ marginTop: '8px' }}
        >
          <Sparkles size={18} />
          Mở Cổng Không Gian
        </button>
      </motion.div>
    </div>
  );
};
