import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Sparkles, Smile, Users, Zap, Eye } from 'lucide-react';
import { PRODUCT_DEMOS } from '../../data/demos';
import { useAudio } from '../ui/AudioEffects';

export const HoverFocusCards = ({ onSelectDemo }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const { playPop } = useAudio();

  const iconMap = { Gift, Heart, Sparkles, Smile, Users, Zap };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px'
    }}>
      {PRODUCT_DEMOS.map((demo) => {
        const IconComp = iconMap[demo.iconName] || Sparkles;
        const isHovered = hoveredId === demo.id;
        const isAnyHovered = Boolean(hoveredId);
        const isDimmed = isAnyHovered && !isHovered;

        return (
          <motion.div
            key={demo.id}
            data-cursor="TRY ME"
            onMouseEnter={() => {
              playPop();
              setHoveredId(demo.id);
            }}
            onMouseLeave={() => {
              setHoveredId(null);
            }}
            animate={{
              scale: isHovered ? 1.02 : isDimmed ? 0.97 : 1,
              opacity: isDimmed ? 0.45 : 1,
              filter: isDimmed ? 'blur(1.5px)' : 'none'
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => onSelectDemo(demo)}
            style={{
              backgroundColor: 'var(--color-burgundy-primary)',
              border: '1.5px solid ' + (isHovered ? 'var(--color-peach-primary)' : 'var(--color-border-light)'),
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(24px, 4vw, 32px) clamp(20px, 3.5vw, 28px)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: isHovered ? 'var(--shadow-glow)' : 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '320px'
            }}
          >
            {/* Direction-Aware Highlight Bar */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: isHovered ? 0 : '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                backgroundColor: 'var(--color-peach-primary)'
              }}
            />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-peach-primary)',
                  backgroundColor: 'rgba(255, 217, 194, 0.12)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  {demo.category}
                </span>

                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 217, 194, 0.15)',
                  color: 'var(--color-peach-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComp size={18} />
                </div>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.35rem, 3vw, 1.55rem)',
                color: 'var(--color-ivory)',
                marginBottom: '6px'
              }}>
                {demo.title}
              </h3>

              {/* Text Reveal Layer on Hover */}
              <div style={{ minHeight: '30px', margin: '6px 0 14px' }}>
                {isHovered ? (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      fontFamily: 'var(--font-handwriting)',
                      fontSize: '1.35rem',
                      color: 'var(--color-peach-primary)',
                      fontWeight: 700
                    }}
                  >
                    "{demo.hoverSecret}"
                  </motion.p>
                ) : (
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    color: 'var(--color-peach-soft)'
                  }}>
                    "{demo.subtitle}"
                  </p>
                )}
              </div>

              <p style={{
                fontSize: '0.9rem',
                color: 'var(--color-peach-soft)',
                lineHeight: 1.55,
                marginBottom: '20px'
              }}>
                {demo.description}
              </p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '14px' }}>
              <button style={{
                width: '100%',
                padding: '11px 18px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: isHovered ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.12)',
                color: isHovered ? 'var(--color-burgundy-dark)' : 'var(--color-peach-primary)',
                border: '1px solid var(--color-peach-primary)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <Eye size={15} /> Test live demo
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
