import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AudioProvider } from '../ui/AudioEffects';
import { CursorFollower } from '../ui/CursorFollower';
import { EasterEggModal } from '../ui/EasterEggModal';

export const Layout = ({ children }) => {
  const location = useLocation();
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [easterEggMessage, setEasterEggMessage] = useState('');

  const triggerEasterEgg = (msg) => {
    setEasterEggMessage(msg);
    setEasterEggActive(true);
  };

  return (
    <AudioProvider>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'var(--color-burgundy-deepest)'
      }}>
        {/* Subtle Cursor Sparkle Effect */}
        <CursorFollower />

        {/* Global Navigation Bar */}
        <Navbar onTriggerEasterEgg={triggerEasterEgg} />

        {/* Main Content with Smooth Page Transitions */}
        <main style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Easter Egg Modal */}
        <EasterEggModal
          isOpen={easterEggActive}
          onClose={() => setEasterEggActive(false)}
          message={easterEggMessage}
        />
      </div>
    </AudioProvider>
  );
};
