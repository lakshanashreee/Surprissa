import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAudio } from './AudioEffects';

export const MagneticButton = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'peach'
  className = '',
  size = 'md',
  disabled = false,
  ...props
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playPop } = useAudio();

  const handleMouseMove = (e) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Subtle magnetic strength factor (0.2)
    setPosition({ x: middleX * 0.22, y: middleY * 0.22 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    if (disabled) return;
    playPop();
    if (onClick) onClick(e);
  };

  // Variant styling
  const variantStyles = {
    primary: {
      background: 'var(--color-peach-primary)',
      color: 'var(--color-burgundy-dark)',
      border: '1px solid rgba(141, 11, 11, 0.2)',
      boxShadow: '0 8px 24px rgba(255, 217, 194, 0.25)'
    },
    secondary: {
      background: 'var(--color-burgundy-primary)',
      color: 'var(--color-ivory)',
      border: '1px solid rgba(255, 217, 194, 0.3)',
      boxShadow: '0 8px 24px rgba(141, 11, 11, 0.3)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-peach-primary)',
      border: '1.5px solid var(--color-peach-primary)'
    },
    peach: {
      background: 'var(--color-peach-soft)',
      color: 'var(--color-burgundy-dark)',
      border: '1px solid var(--color-peach-muted)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-light)',
      border: '1.5px solid rgba(255, 255, 255, 0.15)'
    }
  };

  const sizeStyles = {
    sm: { padding: '8px 18px', fontSize: '0.875rem' },
    md: { padding: '14px 28px', fontSize: '1rem' },
    lg: { padding: '18px 36px', fontSize: '1.125rem' }
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;
  const currentSize = sizeStyles[size] || sizeStyles.md;

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.5 }}
      whileTap={{ scale: 0.94 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '0.02em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        opacity: disabled ? 0.6 : 1,
        ...currentVariant,
        ...currentSize
      }}
      className={`magnetic-button-wrap ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} onClick={handleClick} style={{ textDecoration: 'none', display: 'inline-block' }}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-block' }}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={handleClick} disabled={disabled} style={{ background: 'none', border: 'none', padding: 0, display: 'inline-block' }}>
      {content}
    </button>
  );
};
