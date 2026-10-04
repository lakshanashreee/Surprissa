import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';
import { EASTER_EGGS } from '../../data/easterEggs';

export const Navbar = ({ onTriggerEasterEgg }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const { soundEnabled, toggleSound, playPop } = useAudio();
  const location = useLocation();

  const handleLogoClick = () => {
    playPop();
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount >= EASTER_EGGS.logoClicksRequired) {
      if (onTriggerEasterEgg) {
        onTriggerEasterEgg(EASTER_EGGS.logoSecretMessage);
      }
      setLogoClickCount(0);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 990,
      backgroundColor: 'rgba(24, 2, 2, 0.82)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 217, 194, 0.12)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Official Surprissa Logo */}
        <div onClick={handleLogoClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/Website_logo-removebg-preview.png"
              alt="Surprissa Logo"
              style={{
                height: 'clamp(36px, 6.0vw, 70px)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }} className="desktop-only-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={playPop}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: isActive ? 'var(--color-peach-primary)' : 'var(--color-text-light)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  padding: '4px 0'
                }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--color-peach-primary)',
                      borderRadius: '1px'
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right CTA & Sound Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Audio Toggle Button */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
            style={{
              background: 'rgba(255, 217, 194, 0.1)',
              border: '1px solid rgba(255, 217, 194, 0.2)',
              color: 'var(--color-peach-primary)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} opacity={0.5} />}
          </button>

          {/* Desktop CTA Button */}
          <div className="desktop-only-nav">
            <MagneticButton to="/contact" variant="primary" size="sm">
              <Sparkles size={14} /> Start a surprise
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => { playPop(); setMobileMenuOpen(!mobileMenuOpen); }}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-peach-primary)',
              cursor: 'pointer',
              padding: '6px'
            }}
            className="mobile-only-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              backgroundColor: 'var(--color-burgundy-dark)',
              borderBottom: '1px solid var(--color-border-light)',
              overflow: 'hidden'
            }}
            className="mobile-drawer"
          >
            <div style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              textAlign: 'center'
            }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => { playPop(); setMobileMenuOpen(false); }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: location.pathname === link.path ? 'var(--color-peach-primary)' : 'var(--color-ivory)',
                    textDecoration: 'none'
                  }}
                >
                  {link.name}
                </Link>
              ))}

              <div style={{ paddingTop: '10px' }}>
                <MagneticButton to="/contact" variant="primary" size="md" onClick={() => setMobileMenuOpen(false)}>
                  <Sparkles size={16} /> Start a surprise
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only-nav { display: none !important; }
          .mobile-only-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-only-toggle { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </header>
  );
};
