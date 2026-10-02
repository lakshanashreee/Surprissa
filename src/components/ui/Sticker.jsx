import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './AudioEffects';

export const Sticker = ({
  text,
  icon: Icon,
  color = 'var(--color-peach-primary)',
  textColor = 'var(--color-burgundy-dark)',
  rotation = -4,
  className = '',
  onClick
}) => {
  const [clicked, setClicked] = useState(false);
  const { playPop } = useAudio();

  const handleClick = (e) => {
    playPop();
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
    if (onClick) onClick(e);
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ rotate: rotation, scale: 1 }}
      animate={clicked ? { scale: [1, 1.25, 0.95, 1.1, 1], rotate: [rotation, rotation + 8, rotation - 8, rotation] } : { rotate: rotation }}
      whileHover={{ scale: 1.1, rotate: rotation + (rotation > 0 ? 5 : -5) }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: color,
        color: textColor,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '0.85rem',
        letterSpacing: '0.02em',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
        border: '1.5px solid rgba(141, 11, 11, 0.15)',
        cursor: 'pointer',
        userSelect: 'none',
        zIndex: 5
      }}
      className={`surprissa-sticker ${className}`}
    >
      {Icon && <Icon size={14} />}
      <span>{text}</span>
    </motion.div>
  );
};
