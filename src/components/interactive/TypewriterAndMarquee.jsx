import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const TypewriterSubheading = () => {
  const words = [
    "a birthday surprise?",
    "an apology peace offer?",
    "an ask-them-out date site?",
    "an anniversary capsule?",
    "whatever it is, make it memorable."
  ];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === words.length) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <div style={{
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)',
      fontStyle: 'italic',
      color: 'var(--color-peach-soft)',
      minHeight: '2.5em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}>
      <span>Are you building</span>
      <span style={{
        color: 'var(--color-peach-primary)',
        fontWeight: 700,
        borderBottom: '2px stroke var(--color-peach-primary)',
        fontStyle: 'normal'
      }}>
        {words[index].substring(0, subIndex)}
      </span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{ color: 'var(--color-peach-primary)' }}
      >
        |
      </motion.span>
    </div>
  );
};

export const EditorialMarquee = () => {
  const items = [
    'BIRTHDAYS',
    'ANNIVERSARIES',
    'ASK-OUTS',
    'APOLOGIES',
    'BEST FRIENDS',
    'JUST BECAUSE',
    'CREATIVE BRANDS'
  ];

  return (
    <div style={{
      overflow: 'hidden',
      backgroundColor: 'var(--color-burgundy-primary)',
      borderTop: '1px solid var(--color-border-light)',
      borderBottom: '1px solid var(--color-border-light)',
      padding: '16px 0',
      userSelect: 'none'
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
          gap: '32px'
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: 'var(--color-peach-primary)'
          }}>
            <span>{item}</span>
            <Sparkles size={14} color="var(--color-peach-soft)" opacity={0.6} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
