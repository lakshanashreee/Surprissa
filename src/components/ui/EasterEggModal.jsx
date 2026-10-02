import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from './AudioEffects';
import { MagneticButton } from './MagneticButton';

export const EasterEggModal = ({ isOpen, onClose, message }) => {
  const { playSuccess } = useAudio();

  React.useEffect(() => {
    if (isOpen) {
      playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8', '#FFC0A0']
        });
      } catch (e) {
        console.warn(e);
      }
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(24, 2, 2, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--color-burgundy-dark)',
              border: '2px solid var(--color-peach-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 28px',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              boxShadow: 'var(--shadow-glow)',
              position: 'relative',
              color: 'var(--color-ivory)'
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 217, 194, 0.15)',
                border: 'none',
                color: 'var(--color-peach-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-peach-primary)',
              color: 'var(--color-burgundy-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 0 25px rgba(255, 217, 194, 0.4)'
            }}>
              <Sparkles size={32} />
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              color: 'var(--color-peach-primary)',
              marginBottom: '12px'
            }}>
              Secret Unlocked! 🔮
            </h3>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: 'var(--color-peach-soft)',
              marginBottom: '28px'
            }}>
              {message || "You discovered a hidden corner of Surprissa. You are officially certified as a digital explorer!"}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <MagneticButton onClick={onClose} variant="primary">
                Keep Exploring ✨
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
