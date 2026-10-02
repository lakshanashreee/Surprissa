import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Gift, Smile, Send, Flame, MessageCircle, Star, Zap } from 'lucide-react';
import { PRODUCT_DEMOS } from '../data/demos';
import { TiltCard } from '../components/ui/TiltCard';
import { Sticker } from '../components/ui/Sticker';
import { MagneticButton } from '../components/ui/MagneticButton';
import { LivePreviewModal } from '../components/interactive/LivePreviewModal';
import { MiniGiftSandbox } from '../components/interactive/MiniGiftSandbox';
import { useAudio } from '../components/ui/AudioEffects';
import confetti from 'canvas-confetti';

export const Home = () => {
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const { playPop, playSuccess, playSparkle } = useAudio();

  const handleOpenEnvelope = () => {
    playSuccess();
    setEnvelopeOpened(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8']
      });
    } catch (e) {}
  };

  const scrollToDemos = () => {
    playPop();
    const el = document.getElementById('demos-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ color: 'var(--color-ivory)', overflow: 'hidden' }}>
      
      {/* ===================================================
          1. HERO SECTION
         =================================================== */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 60px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        textAlign: 'center'
      }} className="bg-grain">
        
        {/* Floating Decorative Elements / Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(141, 11, 11, 0.45) 0%, rgba(255, 217, 194, 0.08) 50%, rgba(24, 2, 2, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />

        {/* Interactive Floating Stickers */}
        <div style={{ position: 'absolute', top: '14%', left: '8%', display: 'none' }} className="hero-sticker-desktop">
          <Sticker text="No boring texts allowed 🚫" icon={MessageCircle} rotation={-8} />
        </div>
        <div style={{ position: 'absolute', top: '22%', right: '9%', display: 'none' }} className="hero-sticker-desktop">
          <Sticker text="Warning: May cause happy tears 🥹" icon={Heart} color="var(--color-peach-soft)" rotation={6} />
        </div>

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '24px' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(255, 217, 194, 0.12)',
              border: '1px solid rgba(255, 217, 194, 0.25)',
              color: 'var(--color-peach-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}>
              <Sparkles size={16} /> Happiness Made Digital
            </span>
          </motion.div>

          {/* Main Hero Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--color-ivory)',
              marginBottom: '24px',
              letterSpacing: '-0.03em'
            }}
          >
            Some feelings deserve{' '}
            <span style={{
              color: 'var(--color-peach-primary)',
              position: 'relative',
              display: 'inline-block'
            }}>
              more than a text.
              <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,15 Q50,0 100,15" stroke="var(--color-peach-primary)" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.5vw, 1.6rem)',
              fontStyle: 'italic',
              color: 'var(--color-peach-soft)',
              maxWidth: '720px',
              margin: '0 auto 36px',
              lineHeight: 1.5
            }}
          >
            We create highly creative, personalized websites and digital experiences made for your favourite people and moments.
          </motion.p>

          {/* Hero Interactive Unwrapping Envelope */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginBottom: '40px' }}
          >
            {!envelopeOpened ? (
              <div
                onClick={handleOpenEnvelope}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 28px',
                  borderRadius: '20px',
                  backgroundColor: 'var(--color-burgundy-dark)',
                  border: '2px dashed var(--color-peach-primary)',
                  color: 'var(--color-peach-primary)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-glow)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  userSelect: 'none'
                }}
              >
                <Gift size={22} />
                <span>Tap to unwrap a live preview gift 💌</span>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  display: 'inline-block',
                  padding: '24px 32px',
                  borderRadius: '20px',
                  backgroundColor: 'var(--color-peach-soft)',
                  color: 'var(--color-burgundy-dark)',
                  border: '2px solid var(--color-burgundy-primary)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '6px' }}>
                  "WAIT... THIS IS A WEBSITE FOR A WEBSITE BUSINESS?? 😭"
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Yes! Surprissa turns your inside jokes, photos & memories into viral internet experiences.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            <MagneticButton onClick={scrollToDemos} variant="primary" size="lg">
              See what we make →
            </MagneticButton>

            <MagneticButton to="/contact" variant="outline" size="lg">
              Make one for someone →
            </MagneticButton>
          </motion.div>
        </div>

        <style>{`
          @media (min-width: 992px) {
            .hero-sticker-desktop { display: block !important; }
          }
        `}</style>
      </section>

      {/* ===================================================
          2. PRODUCT DEMOS SECTION ("Pick your kind of chaos")
         =================================================== */}
      <section
        id="demos-section"
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--color-burgundy-dark)',
          position: 'relative'
        }}
        className="bg-grain"
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 217, 194, 0.12)',
              color: 'var(--color-peach-primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px'
            }}>
              <Zap size={14} /> Interactive Catalog
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: 'var(--color-ivory)',
              marginBottom: '16px'
            }}>
              Pick your kind of chaos.
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: 'var(--color-peach-soft)'
            }}>
              Click <strong>"View demo"</strong> on any card to test a live working mini-experience.
            </p>
          </div>

          {/* Demos Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {PRODUCT_DEMOS.map((demo) => (
              <TiltCard key={demo.id}>
                <div style={{
                  backgroundColor: 'var(--color-burgundy-primary)',
                  border: '1.5px solid var(--color-border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '30px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Category Tag & Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-peach-primary)',
                      backgroundColor: 'rgba(255, 217, 194, 0.12)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      {demo.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-peach-soft)' }}>
                      {demo.tag}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      color: 'var(--color-ivory)',
                      marginBottom: '6px'
                    }}>
                      {demo.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      color: 'var(--color-peach-primary)',
                      marginBottom: '14px'
                    }}>
                      "{demo.subtitle}"
                    </p>
                    <p style={{
                      fontSize: '0.925rem',
                      color: 'var(--color-peach-soft)',
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}>
                      {demo.description}
                    </p>

                    {/* Highlights bullet tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                      {demo.highlights.map((item, i) => (
                        <span key={i} style={{
                          fontSize: '0.78rem',
                          backgroundColor: 'rgba(24, 2, 2, 0.4)',
                          color: 'var(--color-ivory)',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          border: '1px solid rgba(255, 217, 194, 0.15)'
                        }}>
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div style={{ marginTop: 'auto' }}>
                    <MagneticButton
                      onClick={() => { playPop(); setSelectedDemo(demo); }}
                      variant="primary"
                      size="sm"
                      style={{ width: '100%' }}
                    >
                      View demo 👁️
                    </MagneticButton>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          3. "HOW IT WORKS" SECTION (Visual 4-Step Flow)
         =================================================== */}
      <section style={{
        padding: '100px 24px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        position: 'relative'
      }} className="bg-grain">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 64px' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 217, 194, 0.12)',
              color: 'var(--color-peach-primary)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              Simple Process
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: 'var(--color-ivory)'
            }}>
              From idea to happy tears in 4 steps
            </h2>
          </div>

          {/* 4 Steps Timeline Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '24px',
            position: 'relative'
          }}>
            {[
              {
                num: '01',
                title: 'Tell us about them',
                desc: 'Fill out a quick 2-minute form about their quirks, inside jokes, photos, or favorite songs.',
                icon: MessageCircle
              },
              {
                num: '02',
                title: 'We make the magic',
                desc: 'Our creative studio designs and builds a custom interactive web experience from scratch.',
                icon: Sparkles
              },
              {
                num: '03',
                title: 'You get the link',
                desc: 'You receive a private, custom digital link that works flawlessly on any mobile or desktop browser.',
                icon: Send
              },
              {
                num: '04',
                title: 'Watch them lose their mind 😭',
                desc: 'Send it via text/DM and wait for the frantic call, happy tears, or viral Instagram story.',
                icon: Heart
              }
            ].map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.num}
                  whileHover={{ y: -6 }}
                  style={{
                    backgroundColor: 'var(--color-burgundy-dark)',
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '28px 22px',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.4rem',
                    fontWeight: 800,
                    color: 'var(--color-peach-primary)',
                    opacity: 0.8,
                    marginBottom: '12px'
                  }}>
                    {step.num}
                  </div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 217, 194, 0.12)',
                    color: 'var(--color-peach-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconComponent size={20} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--color-ivory)',
                    marginBottom: '8px'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          4. INTERACTIVE "TASTE OF MAGIC" SANDBOX
         =================================================== */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: 'var(--color-burgundy-dark)',
        position: 'relative'
      }} className="bg-grain">
        <MiniGiftSandbox />
      </section>

      {/* ===================================================
          5. EDITORIAL BRAND MANIFESTO BANNER
         =================================================== */}
      <section style={{
        padding: '90px 24px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 217, 194, 0.1)',
        borderBottom: '1px solid rgba(255, 217, 194, 0.1)'
      }} className="bg-grain">
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 3.2vw, 2.2rem)',
            fontStyle: 'italic',
            color: 'var(--color-peach-primary)',
            lineHeight: 1.5,
            marginBottom: '24px'
          }}>
            "The internet is full of websites. Most of them are made to sell something. We wanted to make websites that make someone FEEL something."
          </p>

          <div style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.8rem',
            color: 'var(--color-peach-soft)'
          }}>
            — The Surprissa Manifesto ✨
          </div>
        </div>
      </section>

      {/* ===================================================
          6. FINAL CTA BANNER
         =================================================== */}
      <section style={{
        padding: '100px 24px',
        backgroundColor: 'var(--color-burgundy-primary)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
            color: 'var(--color-ivory)',
            marginBottom: '20px'
          }}>
            Ready to make someone's whole week?
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--color-peach-soft)',
            marginBottom: '36px'
          }}>
            Tell us who it's for and what you want to celebrate. We'll handle all the magic.
          </p>

          <MagneticButton to="/contact" variant="primary" size="lg">
            Start your surprise project →
          </MagneticButton>
        </div>
      </section>

      {/* Live Preview Modal */}
      <LivePreviewModal
        demo={selectedDemo}
        onClose={() => setSelectedDemo(null)}
      />
    </div>
  );
};
