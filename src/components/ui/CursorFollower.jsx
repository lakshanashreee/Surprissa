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
      <CursorFollower manualText={cursorText} onClearManual={() => setCursorTextState('')} />
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);

const CursorFollower = ({ manualText, onClearManual }) => {
  const [enabled, setEnabled] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const cursorX = useSpring(-100, { stiffness: 450, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Strictly disable on touch or mobile devices & if reduced motion is preferred
    const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileWidth = window.innerWidth <= 768;

    if (!isTouch && !prefersReducedMotion && !isMobileWidth) {
      setEnabled(true);
      
      const moveHandler = (e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        // Check element under cursor for data-cursor attribute
        const target = e.target;
        const cursorEl = target?.closest?.('[data-cursor]');
        if (cursorEl) {
          const text = cursorEl.getAttribute('data-cursor');
          setHoverText(text || '');
        } else {
          setHoverText('');
          if (manualText) onClearManual();
        }
      };

      const leaveHandler = () => {
        setHoverText('');
        if (manualText) onClearManual();
      };

      const scrollHandler = () => {
        setHoverText('');
        if (manualText) onClearManual();
      };

      window.addEventListener('mousemove', moveHandler, { passive: true });
      document.addEventListener('mouseleave', leaveHandler);
      window.addEventListener('scroll', scrollHandler, { passive: true });

      return () => {
        window.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseleave', leaveHandler);
        window.removeEventListener('scroll', scrollHandler);
      };
    } else {
      setEnabled(false);
    }
  }, [cursorX, cursorY, manualText, onClearManual]);

  if (!enabled) return null;

  const currentText = hoverText || manualText;
  const isTextActive = Boolean(currentText);

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
          width: isTextActive ? 'auto' : '16px',
          height: isTextActive ? 'auto' : '16px',
          padding: isTextActive ? '5px 12px' : '0px',
          borderRadius: isTextActive ? '20px' : '50%',
          backgroundColor: isTextActive ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.25)',
          color: 'var(--color-burgundy-dark)',
          scale: isTextActive ? 1 : 1
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 26 }}
        style={{
          border: '1.5px solid var(--color-peach-primary)',
          boxShadow: '0 0 16px rgba(255, 217, 194, 0.35)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none'
        }}
      >
        {currentText}
      </motion.div>
    </motion.div>
  );
};
