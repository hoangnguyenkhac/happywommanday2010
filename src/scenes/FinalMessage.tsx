import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart, Sparkles, Flower2 } from 'lucide-react';
import { giftConfig } from '../config/gift.config';

interface FinalMessageProps {
  onReplay: () => void;
  playSparkle: () => void;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({ onReplay, playSparkle }) => {
  return (
    <div className="scene-layout" style={{ textAlign: 'center' }}>
      {/* Delicate floating gold heart */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ marginBottom: '24px', position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-15px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(231, 200, 137, 0.3) 0%, transparent 70%)',
            filter: 'blur(15px)',
            animation: 'pulseGlow 3s infinite'
          }}
        />

        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #8c254b 0%, #4a1228 70%, #1e0512 100%)',
            border: '2px solid rgba(231, 200, 137, 0.6)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 25px rgba(231,200,137,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Heart size={44} color="#e7c889" fill="#e7c889" />
        </div>
      </motion.div>

      {/* Main Finale Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="glass-panel-luxury"
        style={{
          maxWidth: '720px',
          padding: 'clamp(28px, 5vw, 46px)',
          border: '1px solid rgba(231, 200, 137, 0.45)',
          marginBottom: '32px'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px'
          }}
        >
          <Flower2 size={16} color="#e7c889" />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#e7c889'
            }}
          >
            Just For You · Gửi Bé Liễu
          </span>
          <Flower2 size={16} color="#e7c889" />
        </div>

        <p
          className="body-romantic"
          style={{
            fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)',
            lineHeight: '1.85',
            color: '#fff8f3',
            fontStyle: 'italic',
            fontWeight: 400
          }}
        >
          “{giftConfig.finalMessage.quote}”
        </p>

        {/* Closing Flourish */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(231, 200, 137, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: '#f4c7d5',
              letterSpacing: '0.08em'
            }}
          >
            {giftConfig.finalMessage.subQuote}
          </span>

          <span
            className="calligraphic-signature"
            style={{
              fontSize: '2.8rem',
              marginTop: '4px'
            }}
          >
            {giftConfig.sender}
          </span>
        </div>
      </motion.div>

      {/* Replay Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <button
          type="button"
          onClick={() => {
            playSparkle();
            onReplay();
          }}
          className="btn-gold"
          style={{ padding: '14px 28px' }}
        >
          <RotateCcw size={18} />
          <span>{giftConfig.finalMessage.actionReplay}</span>
        </button>
      </motion.div>
    </div>
  );
};
