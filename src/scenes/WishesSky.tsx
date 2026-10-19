import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { giftConfig } from '../config/gift.config';

interface WishesSkyProps {
  onNext: () => void;
  playFirework: () => void;
  playSparkle: () => void;
}

export const WishesSky: React.FC<WishesSkyProps> = ({ onNext, playFirework, playSparkle }) => {
  const [wishText, setWishText] = useState('');
  const [submittedWish, setSubmittedWish] = useState<string | null>(null);

  useEffect(() => {
    // Load existing wish from localStorage if available
    const saved = localStorage.getItem('lieu_wish_2010');
    if (saved) {
      setSubmittedWish(saved);
    }
  }, []);

  const triggerHeartFireworks = () => {
    playFirework();

    // Heart shaped confetti burst
    const scalar = 2;
    const heart = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    });

    confetti({
      shapes: [heart],
      scalar,
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f4c7d5', '#e7c889', '#ffffff', '#8c254b']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#e7c889', '#f7e4bd', '#ffd27d']
      });
    }, 400);
  };

  const handleSendWish = (e?: React.FormEvent) => {
    e?.preventDefault();
    const finalWish = wishText.trim() || giftConfig.wishes.quickWishes[0];
    setSubmittedWish(finalWish);
    localStorage.setItem('lieu_wish_2010', finalWish);
    triggerHeartFireworks();
  };

  const handleQuickWish = (text: string) => {
    setWishText(text);
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
        padding: '80px 20px 90px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center'
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '32px' }}
      >
        <span className="badge-luxury" style={{ marginBottom: '12px' }}>
          Bầu Trời Điều Ước
        </span>
        <h2 className="heading-title text-gold-gradient" style={{ marginTop: '8px' }}>
          {giftConfig.wishes.prompt}
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
          {giftConfig.wishes.subPrompt}
        </p>
      </motion.div>

      {/* Main Wish Box / Confirmation */}
      <div style={{ width: '100%', maxWidth: '640px' }}>
        <AnimatePresence mode="wait">
          {!submittedWish ? (
            <motion.form
              key="wish-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSendWish}
              className="glass-panel-luxury"
              style={{ padding: '36px 30px' }}
            >
              {/* Quick wish pill suggestions */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                {giftConfig.wishes.quickWishes.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickWish(item)}
                    style={{
                      background: 'rgba(231, 200, 137, 0.1)',
                      border: '1px solid rgba(231, 200, 137, 0.3)',
                      color: '#f7e4bd',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ✨ {item}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <textarea
                  rows={3}
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder={giftConfig.wishes.placeholder}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    backgroundColor: 'rgba(30, 7, 18, 0.7)',
                    border: '1px solid rgba(231, 200, 137, 0.45)',
                    borderRadius: '16px',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    outline: 'none',
                    resize: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4) inset'
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <button type="submit" className="btn-gold btn-gold-solid">
                  <Send size={18} />
                  <span>Thả Điều Ước Lên Trời</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleSendWish();
                  }}
                  className="btn-subtle"
                >
                  Gửi điều ước mặc định
                </button>
              </div>
            </motion.form>
          ) : (
            /* Wish Received & Khắc's Response */
            <motion.div
              key="wish-confirmed"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="glass-panel-luxury"
              style={{
                padding: '40px 32px',
                border: '1px solid rgba(231, 200, 137, 0.5)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #f7e4bd 0%, #e7c889 100%)',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(231, 200, 137, 0.6)'
                }}
              >
                <Heart size={32} color="#651b36" fill="#651b36" />
              </div>

              <span
                style={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#e7c889'
                }}
              >
                Điều ước của Bé Liễu đã được gửi tới các vì sao
              </span>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                  color: '#fff',
                  margin: '16px 0',
                  fontWeight: 600
                }}
              >
                “{submittedWish}”
              </p>

              <div
                style={{
                  padding: '16px 20px',
                  background: 'rgba(140, 37, 75, 0.3)',
                  border: '1px solid rgba(231, 200, 137, 0.3)',
                  borderRadius: '16px',
                  margin: '20px 0 24px'
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: '#f7e4bd',
                    fontSize: '1.05rem',
                    lineHeight: '1.6'
                  }}
                >
                  {giftConfig.wishes.replyMessage}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  flexWrap: 'wrap'
                }}
              >
                <button
                  type="button"
                  onClick={triggerHeartFireworks}
                  className="btn-subtle"
                >
                  <Sparkles size={16} />
                  <span>Bắn thêm pháo hoa</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSparkle();
                    onNext();
                  }}
                  className="btn-gold btn-gold-solid"
                >
                  <span>Lời Kết Từ Anh</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
