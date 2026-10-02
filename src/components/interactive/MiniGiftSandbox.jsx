import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Smile, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const MiniGiftSandbox = () => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [generatedCard, setGeneratedCard] = useState(null);
  const { playPop, playSuccess, playSparkle } = useAudio();

  const occasions = [
    { name: 'Birthday', emoji: '🎂', phrase: 'is legally getting older today!' },
    { name: 'Anniversary', emoji: '🥂', phrase: 'tolerated you for another whole year!' },
    { name: 'Ask Them Out', emoji: '💌', phrase: 'deserves a date far better than a boring text message.' },
    { name: 'Apology', emoji: '🕊️', phrase: 'deserves an official peace offering & boba.' },
    { name: 'Best Friend', emoji: '👯‍♀️', phrase: 'is the official partner in crime.' }
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    const name = recipient.trim() || 'My Favorite Person';
    const selectedOccasion = occasions.find(o => o.name === occasion) || occasions[0];

    playSuccess();
    setGeneratedCard({
      name,
      occasion: selectedOccasion.name,
      emoji: selectedOccasion.emoji,
      phrase: selectedOccasion.phrase
    });

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8']
      });
    } catch (err) {}
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-burgundy-dark)',
      border: '2px solid var(--color-peach-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: '36px 28px',
      maxWidth: '720px',
      margin: '0 auto',
      boxShadow: 'var(--shadow-lg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 14px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 217, 194, 0.15)',
          color: 'var(--color-peach-primary)',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '8px'
        }}>
          <Sparkles size={14} /> Taste of Magic Generator
        </span>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          color: 'var(--color-ivory)'
        }}>
          Test a live surprise preview in 3 seconds
        </h3>
      </div>

      <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Who is this for? (e.g. Alex, Bestie, Maya)"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={{
              flex: '1 1 240px',
              padding: '14px 20px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255, 217, 194, 0.3)',
              backgroundColor: 'rgba(24, 2, 2, 0.6)',
              color: 'var(--color-ivory)',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'var(--font-body)'
            }}
          />

          <select
            value={occasion}
            onChange={(e) => { setOccasion(e.target.value); playPop(); }}
            style={{
              flex: '0 1 180px',
              padding: '14px 20px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255, 217, 194, 0.3)',
              backgroundColor: 'var(--color-burgundy-primary)',
              color: 'var(--color-peach-primary)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {occasions.map(o => (
              <option key={o.name} value={o.name}>
                {o.emoji} {o.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <MagneticButton type="submit" variant="primary" size="md">
            Generate Live Preview ✨
          </MagneticButton>
        </div>
      </form>

      {/* Generated Card Preview output */}
      <AnimatePresence>
        {generatedCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{
              marginTop: '28px',
              padding: '24px',
              backgroundColor: 'var(--color-peach-soft)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-burgundy-dark)',
              textAlign: 'center',
              border: '2px dashed var(--color-burgundy-primary)',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
              {generatedCard.emoji}
            </div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              color: 'var(--color-burgundy-dark)',
              marginBottom: '6px'
            }}>
              Hey {generatedCard.name}!
            </h4>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              color: 'var(--color-text-muted)',
              marginBottom: '16px'
            }}>
              Someone made this digital experience specifically for you because you {generatedCard.phrase}
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              backgroundColor: 'var(--color-burgundy-primary)',
              color: 'var(--color-peach-primary)',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.85rem',
              fontWeight: 700
            }}>
              <Check size={14} /> Live Customized Surprissa Preview Link Ready
            </div>

            <div style={{ marginTop: '20px' }}>
              <MagneticButton to="/contact" variant="secondary" size="sm">
                Create the full version of this →
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
