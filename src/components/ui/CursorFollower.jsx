import React, { useEffect, useState, createContext, useContext } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorContext = createContext({
  setCursorText: () => {},
  clearCursorText: () => {}
});

export const CursorProvider = ({ children }) => {
  const [cursorText, setCursorTextState] = useState('');

  const setCursorText = (text) => setCursorTextState(text);
  const clearCursorText = () => setCursorTextState('');

  return (
    <CursorContext.Provider value={{ cursorText, setCursorText, clearCursorText }}>
      {children}
      <CursorFollower text={cursorText} />
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);

const CursorFollower = ({ text }) => {
  const [enabled, setEnabled] = useState(false);
  const cursorX = useSpring(-100, { stiffness: 450, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only enable on fine pointer desktop devices & if reduced motion is not preferred
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isTouch && !prefersReducedMotion) {
      setEnabled(true);
      const moveHandler = (e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };
      window.addEventListener('mousemove', moveHandler);
      return () => window.removeEventListener('mousemove', moveHandler);
    }
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  const isTextActive = Boolean(text);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
        zIndex: 999999,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <motion.div
        animate={{
          width: isTextActive ? 'auto' : '20px',
          height: isTextActive ? 'auto' : '20px',
          padding: isTextActive ? '6px 14px' : '0px',
          borderRadius: isTextActive ? '20px' : '50%',
          backgroundColor: isTextActive ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.3)',
          color: 'var(--color-burgundy-dark)'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          border: '1.5px solid var(--color-peach-primary)',
          boxShadow: '0 0 20px rgba(255, 217, 194, 0.4)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
};
