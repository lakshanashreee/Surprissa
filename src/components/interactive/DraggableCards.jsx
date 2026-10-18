import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift, Smile, Users, MessageSquare } from 'lucide-react';
import { useAudio } from '../ui/AudioEffects';

export const DraggableCards = () => {
  const { playPop } = useAudio();

  const cards = [
    { title: "for your girlfriend", icon: Heart, rot: -5, bg: "var(--color-peach-primary)", text: "var(--color-burgundy-dark)" },
    { title: "for your bestie", icon: Users, rot: 4, bg: "var(--color-burgundy-primary)", text: "var(--color-peach-primary)" },
    { title: "for someone you miss", icon: Sparkles, rot: -3, bg: "var(--color-peach-soft)", text: "var(--color-burgundy-dark)" },
    { title: "for saying sorry", icon: Smile, rot: 6, bg: "var(--color-burgundy-dark)", text: "var(--color-ivory)", border: "1px solid var(--color-peach-primary)" },
    { title: "just because", icon: Gift, rot: -4, bg: "var(--color-peach-primary)", text: "var(--color-burgundy-dark)" }
  ];

  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 14px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 217, 194, 0.12)',
          color: 'var(--color-peach-primary)',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Sparkles size={14} /> Interactive Physics Sandbox
        </span>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          color: 'var(--color-ivory)',
          marginTop: '8px'
        }}>
          Who are you surprising today? (Drag cards around!)
        </h3>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        minHeight: '160px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {cards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <motion.div
              key={idx}
              drag
              dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }}
              whileHover={{ scale: 1.06 }}
              onDragStart={playPop}
              initial={{ rotate: card.rot }}
              style={{
                padding: '16px 24px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: card.bg,
                color: card.text,
                border: card.border || '1px solid rgba(141, 11, 11, 0.15)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                cursor: 'grab',
                userSelect: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <IconComp size={18} />
              <span>{card.title}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
