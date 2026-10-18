import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const RandomSurpriseWidget = () => {
  const [currentMessage, setCurrentMessage] = useState(null);
  const { playPop, playSuccess } = useAudio();

  const messages = [
    "Someone should make you a custom website.",
    "Go text your favourite person right now.",
    "You've been chosen for a digital surprise.",
    "Okay, this is your sign to make something memorable.",
    "That person deserves way better than a 3-letter 'hbd' text.",
    "Fun Fact: You just clicked a button that does nothing except bring you joy."
  ];

  const triggerRandom = () => {
    playSuccess();
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 20px',
      backgroundColor: 'rgba(255, 217, 194, 0.05)',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--color-peach-muted)',
      maxWidth: '640px',
      margin: '40px auto 0'
    }}>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', marginBottom: '14px' }}>
        Curious? Tap the button for an unsolicited digital surprise.
      </p>

      <MagneticButton onClick={triggerRandom} variant="peach" size="md">
        Give me something random <RefreshCw size={16} />
      </MagneticButton>

      <AnimatePresence>
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              marginTop: '20px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-burgundy-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-peach-primary)',
              color: 'var(--color-peach-primary)',
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1.6rem',
              fontWeight: 700
            }}
          >
            "{currentMessage}"
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
