import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { playPop, playSuccess } = useAudio();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    playSuccess();
    setSubscribed(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch (err) {}
  };

  return (
    <footer style={{
      backgroundColor: 'var(--color-burgundy-deepest)',
      borderTop: '1px solid rgba(255, 217, 194, 0.15)',
      color: 'var(--color-ivory)',
      padding: '64px 24px 32px',
      position: 'relative',
      overflow: 'hidden'
    }} className="bg-grain">
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '40px',
        marginBottom: '48px'
      }}>
        {/* Brand Column */}
        <div>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
            <img
              src="/logo.png"
              alt="Surprissa Logo"
              style={{ height: '48px', width: 'auto' }}
            />
          </Link>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            color: 'var(--color-peach-primary)',
            marginBottom: '12px'
          }}>
            "HAPPINESS MADE DIGITAL"
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '300px' }}>
            Creative websites and personalized digital experiences made for your favourite people, moments and brands.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-peach-primary)',
            marginBottom: '20px'
          }}>
            Explore
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  onClick={playPop}
                  style={{
                    color: 'var(--color-peach-soft)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-peach-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--color-peach-soft)'}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-peach-primary)',
            marginBottom: '20px'
          }}>
            Connect
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playPop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 217, 194, 0.1)',
                color: 'var(--color-peach-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                width: 'fit-content'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              @surprissa
            </a>

            <a
              href="mailto:surprissa.enquire@gmail.com"
              onClick={playPop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-peach-soft)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <Send size={14} color="var(--color-peach-primary)" /> surprissa.enquire@gmail.com
            </a>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            Have a crazy creative idea? We love crazy creative ideas.
          </p>
        </div>

        {/* Surprise Dispatch Newsletter */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-peach-primary)',
            marginBottom: '14px'
          }}>
            The Surprise Dispatch 💌
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-peach-soft)', marginBottom: '14px' }}>
            Zero spam. Only rare drops of Internet magic & secret templates.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(255, 217, 194, 0.3)',
                  backgroundColor: 'rgba(24, 2, 2, 0.6)',
                  color: 'var(--color-ivory)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  flex: 1
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-peach-primary)',
                  color: 'var(--color-burgundy-dark)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                <Send size={14} />
              </button>
            </form>
          ) : (
            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(255, 217, 194, 0.15)',
              color: 'var(--color-peach-primary)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              You're on the list! ✨
            </div>
          )}
        </div>
      </div>

      {/* Playful Footer Bottom Line */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255, 217, 194, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)'
      }}>
        <div>
          © {new Date().getFullYear()} Surprissa. All rights reserved.
        </div>

        <div style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: '1.25rem',
          color: 'var(--color-peach-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          made with questionable amounts of effort. <Heart size={14} fill="var(--color-peach-primary)" color="var(--color-peach-primary)" />
        </div>
      </div>
    </footer>
  );
};
