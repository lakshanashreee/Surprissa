import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CursorFollower = () => {
  const [enabled, setEnabled] = useState(false);
  const cursorX = useSpring(-100, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Only enable on fine pointer desktop devices & if reduced motion is not preferred
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isTouch && !prefersReducedMotion) {
      setEnabled(true);
      const moveHandler = (e) => {
        cursorX.set(e.clientX - 12);
        cursorY.set(e.clientY - 12);
      };
      window.addEventListener('mousemove', moveHandler);
      return () => window.removeEventListener('mousemove', moveHandler);
    }
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 217, 194, 0.25)',
        border: '1.5px solid rgba(255, 217, 194, 0.6)',
        boxShadow: '0 0 15px rgba(255, 217, 194, 0.4)',
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'difference'
      }}
    />
  );
};
