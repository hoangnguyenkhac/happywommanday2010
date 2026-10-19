import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { giftConfig } from '../config/gift.config';

interface GrandRevealProps {
  onNext: () => void;
  playSparkle: () => void;
  playFirework: () => void;
}

export const GrandReveal: React.FC<GrandRevealProps> = ({ onNext, playSparkle, playFirework }) => {
  useEffect(() => {
    // Stage 1: sound effect
    playFirework();

    // Stage 2: luxury golden & rose confetti burst
    const end = Date.now() + 2500;
    const colors = ['#e7c889', '#f7e4bd', '#f4c7d5', '#8c254b', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [playFirework]);

  return (
    <div className="scene-layout" style={{ textAlign: 'center' }}>
      {/* Background radial highlight */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(800px, 90vw)',
          height: 'min(800px, 90vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(231, 200, 137, 0.22) 0%, rgba(140, 37, 75, 0.28) 45%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Top Banner Tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ marginBottom: '16px' }}
      >
        <span
          className="badge-luxury"
          style={{
            fontSize: '0.9rem',
            padding: '8px 22px',
            boxShadow: '0 0 25px rgba(231, 200, 137, 0.4)'
          }}
        >
          {giftConfig.grandReveal.occasionTitle}
        </span>
      </motion.div>

      {/* Monumental 20.10 Number */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, filter: 'blur(12px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{ position: 'relative', margin: '10px 0 20px', width: '100%' }}
      >
        <h1
          className="shimmer-text"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.8rem, 16vw, 11rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textShadow: '0 0 50px rgba(231, 200, 137, 0.6), 0 10px 40px rgba(0,0,0,0.8)'
          }}
        >
          {giftConfig.grandReveal.highlightNumber}
        </h1>

        {/* Floating Heart over numbers */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '10%',
            color: '#f4c7d5'
          }}
        >
          <Heart size={32} fill="#f4c7d5" />
        </motion.div>
      </motion.div>

      {/* Emotional Core Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1 }}
        className="glass-panel-luxury"
        style={{
          maxWidth: '780px',
          padding: 'clamp(24px, 4vw, 40px)',
          margin: '0 auto 36px',
          border: '1px solid rgba(231, 200, 137, 0.45)'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            lineHeight: '1.6',
            color: '#fff8f3',
            fontWeight: 500,
            textShadow: '0 2px 15px rgba(0,0,0,0.5)'
          }}
        >
          “{giftConfig.grandReveal.mainQuote}”
        </p>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          <span
            style={{
              height: '1px',
              width: '60px',
              background: 'linear-gradient(to right, transparent, rgba(231,200,137,0.8))'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '1.8rem',
              color: '#e7c889'
            }}
          >
            Dành tặng Bé Liễu của Anh
          </span>
          <span
            style={{
              height: '1px',
              width: '60px',
              background: 'linear-gradient(to left, transparent, rgba(231,200,137,0.8))'
            }}
          />
        </div>
      </motion.div>

      {/* Proceed to Sky of Wishes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <button
          type="button"
          onClick={() => {
            playSparkle();
            onNext();
          }}
          className="btn-gold btn-gold-solid"
          style={{
            padding: '16px 36px',
            fontSize: '1.1rem',
            boxShadow: '0 8px 30px rgba(231, 200, 137, 0.5)'
          }}
        >
          <Sparkles size={20} />
          <span>Gửi Điều Ước Lên Bầu Trời Sao</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
};
