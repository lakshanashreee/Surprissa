import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Smile, CheckCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Sticker } from '../components/ui/Sticker';
import { useAudio } from '../components/ui/AudioEffects';
import confetti from 'canvas-confetti';
import { EASTER_EGGS } from '../data/easterEggs';

export const About = () => {
  const [starClicked, setStarClicked] = useState(false);
  const [noteFlipped, setNoteFlipped] = useState(false);
  const { playPop, playSuccess, playSparkle } = useAudio();

  const handleStarClick = () => {
    playSuccess();
    setStarClicked(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div style={{ color: 'var(--color-ivory)', overflow: 'hidden' }}>

      {/* Editorial Hero Banner */}
      <section style={{
        padding: '100px 24px 70px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        textAlign: 'center',
        position: 'relative'
      }} className="bg-grain">
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '20px' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(255, 217, 194, 0.12)',
              color: 'var(--color-peach-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Our Story
            </span>
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5.8vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--color-ivory)',
            lineHeight: 1.08,
            marginBottom: '28px'
          }}>
            The internet can be personal again.
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.2rem, 2.8vw, 1.7rem)',
            fontStyle: 'italic',
            color: 'var(--color-peach-soft)',
            lineHeight: 1.6,
            marginBottom: '40px'
          }}>
            "The internet is full of websites. Most of them are made to sell something. We wanted to make websites that make someone <span style={{ color: 'var(--color-peach-primary)', fontStyle: 'normal', fontWeight: 700 }}>FEEL</span> something. That became Surprissa."
          </p>

          <div style={{ display: 'inline-block' }}>
            <Sticker text="Pure Digital Craft ✨" icon={Sparkles} rotation={-4} />
          </div>
        </div>
      </section>

      {/* Editorial Story Section 1: Why We Exist */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: 'var(--color-burgundy-dark)'
      }} className="bg-grain">
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              01 • Why We Exist
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-ivory)', marginTop: '8px', marginBottom: '20px' }}>
              Beyond blue links and generic texts
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-peach-soft)', lineHeight: 1.7, marginBottom: '16px' }}>
              We live in a world where birthdays, anniversaries, apologies, and big life moments are often reduced to a generic text message or a 5-second Instagram story.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-peach-soft)', lineHeight: 1.7 }}>
              Surprissa was born from a simple obsession: what if a digital link felt like opening a physical, custom-crafted gift box designed specifically for one person in the world?
            </p>
          </div>

          {/* Interactive Flip Note Card */}
          <div
            onClick={() => { playPop(); setNoteFlipped(!noteFlipped); }}
            style={{
              backgroundColor: 'var(--color-burgundy-primary)',
              border: '2px dashed var(--color-peach-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 28px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <Sparkles size={36} color="var(--color-peach-primary)" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', color: 'var(--color-peach-primary)', lineHeight: 1.5 }}>
              {noteFlipped
                ? "✨ 'We believe code can carry emotion, laughter, and happy tears.'"
                : "Tap this handwritten note to flip secret belief 💌"}
            </p>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '16px', display: 'inline-block' }}>
              (Click to toggle)
            </span>
          </div>
        </div>
      </section>

      {/* Editorial Story Section 2: What We Believe */}
      <section style={{
        padding: '90px 24px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        borderTop: '1px solid rgba(255, 217, 194, 0.1)',
        borderBottom: '1px solid rgba(255, 217, 194, 0.1)'
      }} className="bg-grain">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)' }}>
              What We Believe
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                title: 'No Corporate Jargon',
                desc: 'We talk like humans. We don’t use words like "synergy", "paradigm shift", or "leverage". We build internet joy.',
                icon: MessageCircle
              },
              {
                title: '60fps Delight',
                desc: 'Creative does not mean laggy. Every visual transition, candle blow, and tilt effect runs smoothly at 60fps.',
                icon: Sparkles
              },
              {
                title: 'Authentic Connection',
                desc: 'No fake client logos, no fake statistics, no fake testimonials. Just real creative digital experiences made with heart.',
                icon: ShieldCheck
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} style={{
                  backgroundColor: 'var(--color-burgundy-dark)',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '30px 24px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 217, 194, 0.12)',
                    color: 'var(--color-peach-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-ivory)', marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hidden Easter Egg Star Trigger */}
      <section style={{
        padding: '70px 24px',
        backgroundColor: 'var(--color-burgundy-dark)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            Looking for secret surprises?
          </p>
          <button
            onClick={handleStarClick}
            style={{
              background: starClicked ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.12)',
              color: starClicked ? 'var(--color-burgundy-dark)' : 'var(--color-peach-primary)',
              border: '1px solid var(--color-peach-primary)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Star size={18} fill={starClicked ? "var(--color-burgundy-dark)" : "none"} />
            {starClicked ? "Easter Egg Activated! 🎉" : "Click this hidden star"}
          </button>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section style={{
        padding: '90px 24px',
        backgroundColor: 'var(--color-burgundy-primary)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
            Let's make something unforgettable together.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-peach-soft)', marginBottom: '32px' }}>
            Have a person or moment in mind? Let's turn it into a custom website.
          </p>
          <MagneticButton to="/contact" variant="primary" size="lg">
            Start a surprise →
          </MagneticButton>
        </div>
      </section>
    </div>
  );
};
