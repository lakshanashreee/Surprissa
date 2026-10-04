import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Gift, Smile, Send, Flame, MessageCircle, Star, Zap, Eye } from 'lucide-react';
import { PRODUCT_DEMOS } from '../data/demos';
import { Sticker } from '../components/ui/Sticker';
import { MagneticButton } from '../components/ui/MagneticButton';
import { LivePreviewModal } from '../components/interactive/LivePreviewModal';
import { MiniGiftSandbox } from '../components/interactive/MiniGiftSandbox';
import { DraggableCards } from '../components/interactive/DraggableCards';
import { HoverFocusCards } from '../components/interactive/HoverFocusCards';
import { TypewriterSubheading, EditorialMarquee } from '../components/interactive/TypewriterAndMarquee';
import { RandomSurpriseWidget } from '../components/interactive/RandomSurpriseWidget';
import { useAudio } from '../components/ui/AudioEffects';
import { useCursor } from '../components/ui/CursorFollower';
import confetti from 'canvas-confetti';

export const Home = () => {
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const { playPop, playSuccess } = useAudio();
  const { setCursorText, clearCursorText } = useCursor();

  const handleOpenEnvelope = () => {
    clearCursorText();
    playSuccess();
    setEnvelopeOpened(true);
    try {
      confetti({
        particleCount: 110,
        spread: 85,
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
          1. HERO SECTION (Clean, Non-Overlapping Layout)
         =================================================== */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(50px, 8vw, 80px) clamp(16px, 4vw, 24px) 40px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        textAlign: 'center'
      }} className="bg-grain">
        
        {/* Soft Radial Background Glow */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '550px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(141, 11, 11, 0.4) 0%, rgba(255, 217, 194, 0.06) 50%, rgba(24, 2, 2, 0) 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)'
        }} />

        <div style={{ maxWidth: '920px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              <Sparkles size={16} /> Happiness Made Digital
            </span>
          </motion.div>

          {/* Main Hero Heading (Refined, Readable Serif Typography) */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 5.5vw, 4.4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--color-ivory)',
              marginBottom: '20px',
              letterSpacing: '-0.01em'
            }}
          >
            Some feelings deserve<br />
            <span style={{
              color: 'var(--color-peach-primary)',
              fontStyle: 'italic'
            }}>
              more than a text.
            </span>
          </motion.h1>

          {/* Interactive Typewriter Subheading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: '28px' }}
          >
            <TypewriterSubheading />
          </motion.div>

          {/* Clean Horizontal Sticker Shelf (No overlap with text!) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '36px'
            }}
          >
            <Sticker text="No boring texts allowed" icon={MessageCircle} rotation={-2} />
            <Sticker text="Made for your favourite human" icon={Heart} color="var(--color-peach-soft)" rotation={3} />
            <Sticker text="Warning: May cause happy tears" icon={Sparkles} color="var(--color-burgundy-primary)" textColor="var(--color-peach-primary)" rotation={-3} />
          </motion.div>

          {/* Hero Interactive Unwrapping Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginBottom: '36px' }}
          >
            {!envelopeOpened ? (
              <div
                onClick={handleOpenEnvelope}
                data-cursor="OPEN ME"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-burgundy-dark)',
                  border: '2px dashed var(--color-peach-primary)',
                  color: 'var(--color-peach-primary)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-glow)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  userSelect: 'none'
                }}
              >
                <Gift size={20} />
                <span>Tap to unwrap a live preview gift</span>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  display: 'inline-block',
                  padding: '20px 28px',
                  borderRadius: '20px',
                  backgroundColor: 'var(--color-peach-soft)',
                  color: 'var(--color-burgundy-dark)',
                  border: '2px solid var(--color-burgundy-primary)',
                  boxShadow: 'var(--shadow-lg)',
                  maxWidth: '92vw'
                }}
              >
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: 'clamp(1.3rem, 3.5vw, 1.7rem)', fontWeight: 700, marginBottom: '4px' }}>
                  "WAIT... THIS IS A WEBSITE FOR A WEBSITE BUSINESS??"
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Yes! Surprissa turns your inside jokes, memories & milestones into custom digital experiences.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            <MagneticButton onClick={scrollToDemos} variant="primary" size="lg">
              See the surprises →
            </MagneticButton>

            <MagneticButton to="/contact" variant="outline" size="lg">
              Make one for someone →
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Editorial Infinite Marquee */}
      <EditorialMarquee />

      {/* Draggable Cards Physics Sandbox */}
      <section style={{ backgroundColor: 'var(--color-burgundy-dark)', padding: '20px 0' }}>
        <DraggableCards />
      </section>

      {/* ===================================================
          2. PRODUCT DEMOS SECTION (Focus & Direction-Aware Cards)
         =================================================== */}
      <section
        id="demos-section"
        style={{
          padding: '90px 24px',
          backgroundColor: 'var(--color-burgundy-dark)',
          position: 'relative'
        }}
        className="bg-grain"
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
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
              marginBottom: '14px'
            }}>
              <Zap size={14} /> Interactive Showcase
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: 'var(--color-ivory)',
              marginBottom: '14px'
            }}>
              Pick your kind of chaos.
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              color: 'var(--color-peach-soft)'
            }}>
              Hover to reveal hidden secrets. Click any card to test a live working mini-experience.
            </p>
          </div>

          {/* HoverFocusCards Grid Component */}
          <HoverFocusCards onSelectDemo={(demo) => setSelectedDemo(demo)} />
        </div>
      </section>

      {/* ===================================================
          3. "HOW IT WORKS" SECTION (Visual 4-Step Flow)
         =================================================== */}
      <section style={{
        padding: '90px 24px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        position: 'relative'
      }} className="bg-grain">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                num: '01',
                title: 'Tell us about them',
                desc: 'Fill out our quick 2-minute vibe form about their quirks, inside jokes, photos, or favorite songs.',
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
                title: 'Watch them lose their mind',
                desc: 'Send it via text/DM and wait for the frantic call, happy tears, or viral story reaction.',
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
        <RandomSurpriseWidget />
      </section>

      {/* ===================================================
          5. EDITORIAL MANIFESTO BANNER
         =================================================== */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 217, 194, 0.1)',
        borderBottom: '1px solid rgba(255, 217, 194, 0.1)'
      }} className="bg-grain">
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
            fontStyle: 'italic',
            color: 'var(--color-peach-primary)',
            lineHeight: 1.5,
            marginBottom: '20px'
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
        padding: '90px 24px',
        backgroundColor: 'var(--color-burgundy-primary)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            color: 'var(--color-ivory)',
            marginBottom: '18px'
          }}>
            Ready to make someone's whole week?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--color-peach-soft)',
            marginBottom: '32px'
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
