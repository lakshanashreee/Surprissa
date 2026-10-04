import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Flame, Volume2, CheckCircle2, RotateCcw, Send, Calendar, Gift, Smile, Coffee, Users, PartyPopper, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';
import { BirthdayLiveExperience } from './BirthdayLiveExperience';

export const LivePreviewModal = ({ demo, onClose }) => {
  const { playPop, playSparkle, playSuccess } = useAudio();

  // Locked default recipient name: Stacy
  const recipientName = "Stacy";

  // State for other interactive demo types
  const [askOutAccepted, setAskOutAccepted] = useState(false);
  const [runawayNoPos, setRunawayNoPos] = useState({ x: 0, y: 0 });
  const [forgiveScore, setForgiveScore] = useState(50);
  const [scratched, setScratched] = useState(false);
  const [soundboardPlayed, setSoundboardPlayed] = useState(null);
  const [memoryFlipped, setMemoryFlipped] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!demo) return null;

  const handleRunawayNo = () => {
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 140;
    setRunawayNoPos({ x: randomX, y: randomY });
    playPop();
  };

  const handleAskOutAccept = () => {
    playSuccess();
    setAskOutAccepted(true);
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8']
      });
    } catch (e) {}
  };

  const playSoundbite = (soundName) => {
    playSparkle();
    setSoundboardPlayed(soundName);
    setTimeout(() => setSoundboardPlayed(null), 1200);
  };

  const handleScratch = () => {
    playSparkle();
    setScratched(true);
    try {
      confetti({ particleCount: 80, spread: 70 });
    } catch (e) {}
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99990,
          backgroundColor: '#120101',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* ========================================================
            TOP BAR: FULL-SCREEN PRODUCT REPLICA HEADER
           ======================================================== */}
        <header style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 99995,
          backgroundColor: 'rgba(24, 2, 2, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 217, 194, 0.18)',
          padding: '12px clamp(16px, 4vw, 36px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          {/* Left: Brand + Demo Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 217, 194, 0.12)',
                border: '1px solid rgba(255, 217, 194, 0.3)',
                color: 'var(--color-peach-primary)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> Exit Demo
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-peach-primary)',
                  backgroundColor: 'rgba(141, 11, 11, 0.6)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 217, 194, 0.2)'
                }}>
                  Live Product Replica
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-peach-soft)', fontWeight: 600 }}>
                  {demo.title}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Direct CTA & Close Button (No editable name input) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <MagneticButton to="/contact" variant="primary" size="sm" onClick={onClose}>
              Make one for someone →
            </MagneticButton>

            <button
              onClick={onClose}
              title="Close Fullscreen"
              style={{
                background: 'rgba(255, 217, 194, 0.15)',
                border: 'none',
                color: 'var(--color-peach-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* ========================================================
            FULLSCREEN INTERACTIVE REPLICA CANVAS
           ======================================================== */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '24px 16px 60px',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(141, 11, 11, 0.35) 0%, rgba(18, 1, 1, 1) 75%)'
        }}>

          {/* 1. BIRTHDAY PRODUCT DEMO REPLICA */}
          {demo.demoType === 'birthday' && (
            <BirthdayLiveExperience
              recipientName={recipientName}
              onComplete={() => {}}
            />
          )}

          {/* 2. ASK THEM OUT PRODUCT DEMO REPLICA */}
          {demo.demoType === 'askOut' && (
            <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%', position: 'relative', zIndex: 10 }}>
              {/* Decorative Threat / Cute Meme Assets */}
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '90px', pointerEvents: 'none', opacity: 0.8 }} className="animate-float">
                <img src="/assets/threat/cutest with knife.png" alt="Cute Threat" style={{ width: '100%', height: 'auto', borderRadius: '12px', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.3))' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '90px', pointerEvents: 'none', opacity: 0.8 }} className="animate-float-delayed">
                <img src="/assets/threat/cutestwithgun.png" alt="Cute Gun" style={{ width: '100%', height: 'auto', borderRadius: '12px', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.3))' }} />
              </div>

              <span style={{ fontSize: '0.85rem', color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                High-Stakes Date Proposal Protocol
              </span>

              <div style={{
                backgroundColor: 'var(--color-burgundy-primary)',
                borderRadius: '24px',
                padding: '44px 28px',
                border: '2px solid var(--color-peach-primary)',
                boxShadow: 'var(--shadow-glow)',
                margin: '24px 0',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {!askOutAccepted ? (
                  <>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--color-peach-primary)', marginBottom: '24px', fontStyle: 'italic', lineHeight: 1.3 }}>
                      "Would you like to get coffee & ramen with me this Friday?"
                    </h3>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
                      <MagneticButton variant="primary" size="md" onClick={handleAskOutAccept}>
                        YES! ABSOLUTELY
                      </MagneticButton>

                      <motion.button
                        onMouseEnter={handleRunawayNo}
                        onTouchStart={handleRunawayNo}
                        onClick={handleRunawayNo}
                        animate={{ x: runawayNoPos.x, y: runawayNoPos.y }}
                        transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                        style={{
                          padding: '12px 28px',
                          borderRadius: 'var(--radius-pill)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          background: 'transparent',
                          color: 'var(--color-peach-soft)',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '0.95rem'
                        }}
                      >
                        No, I hate fun
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <CheckCircle2 size={54} color="var(--color-peach-primary)" style={{ margin: '0 auto 14px' }} />
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-peach-primary)', fontStyle: 'italic' }}>
                      IT'S A DATE!
                    </h3>
                    <p style={{ color: 'var(--color-ivory)', marginTop: '8px', fontSize: '1.1rem', fontFamily: 'var(--font-handwriting)' }}>
                      "Friday 7:00 PM • Coffee & Ramen • Officially locked in."
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* 3. ANNIVERSARY PRODUCT DEMO REPLICA */}
          {demo.demoType === 'anniversary' && (
            <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%', position: 'relative', zIndex: 10 }}>
              <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '90px', pointerEvents: 'none', opacity: 0.8 }} className="animate-float">
                <img src="/assets/flowers/Pink flower.png" alt="Floral decor" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
              </div>

              <div style={{
                backgroundColor: 'var(--color-burgundy-primary)',
                borderRadius: '24px',
                padding: '40px 24px',
                border: '2px solid var(--color-peach-primary)',
                boxShadow: 'var(--shadow-glow)'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  Live Relationship Time Machine
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 800, color: 'var(--color-peach-primary)', margin: '12px 0' }}>
                  1,248 Days
                </div>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-peach-soft)', marginBottom: '24px' }}>
                  = 29,952 Hours of stolen hoodies, midnight snack runs & pure love.
                </p>

                <div
                  onClick={() => { playSparkle(); setMemoryFlipped(!memoryFlipped); }}
                  style={{
                    padding: '24px',
                    backgroundColor: 'var(--color-burgundy-dark)',
                    borderRadius: '16px',
                    border: '1.5px dashed var(--color-peach-primary)',
                    cursor: 'pointer',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.4)'
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', color: 'var(--color-peach-primary)' }}>
                    {memoryFlipped ? "'I still choose you every single day.'" : "Tap to flip private anniversary memory letter 💌"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. APOLOGY PRODUCT DEMO REPLICA */}
          {demo.demoType === 'apology' && (
            <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%', position: 'relative', zIndex: 10 }}>
              {/* Cute Crying Stickers */}
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '90px', pointerEvents: 'none', opacity: 0.8 }} className="animate-float">
                <img src="/assets/sorry/cutestcryyying.png" alt="Crying Cute" style={{ width: '100%', height: 'auto', borderRadius: '12px', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.3))' }} />
              </div>

              <div style={{
                backgroundColor: 'var(--color-burgundy-primary)',
                borderRadius: '24px',
                padding: '40px 24px',
                border: '2px solid var(--color-peach-primary)',
                boxShadow: 'var(--shadow-glow)'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  Interactive Forgiveness Peace Meter
                </span>

                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-peach-primary)', margin: '18px 0' }}>
                  Current Anger Level: {forgiveScore}%
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={forgiveScore}
                  onChange={(e) => { setForgiveScore(e.target.value); playPop(); }}
                  style={{ width: '80%', accentColor: 'var(--color-peach-primary)', cursor: 'pointer', height: '8px' }}
                />

                <p style={{ marginTop: '24px', fontFamily: 'var(--font-handwriting)', fontSize: '1.7rem', color: 'var(--color-peach-soft)' }}>
                  {forgiveScore < 30 ? "'You better bring boba & iced matcha immediately.'" : forgiveScore < 70 ? "'Apology currently under executive consideration...'" : "'Officially forgiven! Boba peace offering accepted! 🌸'" }
                </p>
              </div>
            </div>
          )}

          {/* 5. BEST FRIEND PRODUCT DEMO REPLICA */}
          {demo.demoType === 'bestFriend' && (
            <div style={{ textAlign: 'center', maxWidth: '680px', width: '100%', position: 'relative', zIndex: 10 }}>
              <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '85px', pointerEvents: 'none', opacity: 0.85 }} className="animate-float-delayed">
                <img src="/assets/cat/catwiththreebouquet.png" alt="Cat decor" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
              </div>

              <span style={{ fontSize: '0.85rem', color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                Inside-Joke Audio Soundboard
              </span>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                marginTop: '20px'
              }}>
                {['"Bruh Moment"', '"Remember That Night?"', '"Unhinged Energy"', '"Bestie For Life"'].map((sound, i) => (
                  <button
                    key={i}
                    onClick={() => playSoundbite(sound)}
                    style={{
                      padding: '24px 16px',
                      borderRadius: '16px',
                      backgroundColor: soundboardPlayed === sound ? 'var(--color-peach-primary)' : 'var(--color-burgundy-primary)',
                      color: soundboardPlayed === sound ? 'var(--color-burgundy-dark)' : 'var(--color-peach-primary)',
                      border: '1.5px solid var(--color-peach-muted)',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '1rem',
                      fontFamily: 'var(--font-display)',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Volume2 size={20} style={{ marginBottom: '8px', display: 'block', margin: '0 auto 8px' }} />
                    <div>{sound}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 6. JUST BECAUSE PRODUCT DEMO REPLICA */}
          {demo.demoType === 'justBecause' && (
            <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%', position: 'relative', zIndex: 10 }}>
              <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '85px', pointerEvents: 'none', opacity: 0.85 }} className="animate-float">
                <img src="/assets/flowers/Pink flower.png" alt="Flower decor" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
              </div>

              <div style={{
                backgroundColor: 'var(--color-burgundy-primary)',
                borderRadius: '24px',
                padding: '40px 24px',
                border: '2px solid var(--color-peach-primary)',
                boxShadow: 'var(--shadow-glow)'
              }}>
                {!scratched ? (
                  <div
                    onClick={handleScratch}
                    style={{
                      padding: '50px 24px',
                      backgroundColor: 'var(--color-peach-muted)',
                      color: 'var(--color-burgundy-dark)',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.3rem',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  >
                    CLICK TO SCRATCH OFF YOUR SURPRISE COMPLIMENT ✦
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <Gift size={48} color="var(--color-peach-primary)" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-peach-primary)', fontStyle: 'italic' }}>
                      You are officially awesome!
                    </h4>
                    <p style={{ color: 'var(--color-ivory)', marginTop: '8px', fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem' }}>
                      "Sending virtual flowers & good energy your way."
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          )}

        </main>
      </motion.div>
    </AnimatePresence>
  );
};
