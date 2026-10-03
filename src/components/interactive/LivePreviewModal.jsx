import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Flame, Volume2, CheckCircle2, RotateCcw, Send, Calendar, Gift, Smile, Coffee, Users, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const LivePreviewModal = ({ demo, onClose }) => {
  const { playPop, playSparkle, playSuccess, playFlame } = useAudio();

  // State for interactive demos
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [askOutAccepted, setAskOutAccepted] = useState(false);
  const [runawayNoPos, setRunawayNoPos] = useState({ x: 0, y: 0 });
  const [forgiveScore, setForgiveScore] = useState(50);
  const [scratched, setScratched] = useState(false);
  const [soundboardPlayed, setSoundboardPlayed] = useState(null);
  const [memoryFlipped, setMemoryFlipped] = useState(false);

  if (!demo) return null;

  const handleBlowCandle = (index) => {
    playFlame();
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every(c => !c)) {
      playSuccess();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8']
        });
      } catch (e) {}
    }
  };

  const resetCandles = () => {
    playPop();
    setCandlesLit([true, true, true]);
  };

  const handleRunawayNo = () => {
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 120;
    setRunawayNoPos({ x: randomX, y: randomY });
    playPop();
  };

  const handleAskOutAccept = () => {
    playSuccess();
    setAskOutAccepted(true);
    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.55 }
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
      confetti({ particleCount: 60, spread: 60 });
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
          backgroundColor: 'rgba(20, 2, 2, 0.88)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'var(--color-burgundy-dark)',
            border: '2px solid var(--color-peach-primary)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-glow)',
            color: 'var(--color-ivory)',
            position: 'relative'
          }}
        >
          {/* Header Bar */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 217, 194, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(141, 11, 11, 0.3)'
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-peach-primary)',
                display: 'inline-block',
                marginBottom: '4px'
              }}>
                Interactive Live Preview • {demo.category}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                color: 'var(--color-ivory)'
              }}>
                {demo.title}
              </h3>
            </div>
            <button
              onClick={onClose}
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

          {/* Interactive Playground Body */}
          <div style={{ padding: '24px' }}>
            
            {/* 1. BIRTHDAY DEMO */}
            {demo.demoType === 'birthday' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <p style={{ color: 'var(--color-peach-soft)', fontSize: '0.95rem', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <PartyPopper size={18} color="var(--color-peach-primary)" />
                  <strong>Tap/Click the candle flames to blow them out!</strong>
                </p>

                {/* Interactive Cake */}
                <div style={{
                  backgroundColor: 'var(--color-burgundy-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '30px 20px',
                  border: '1px solid var(--color-border-light)',
                  marginBottom: '20px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
                    {candlesLit.map((isLit, idx) => (
                      <div key={idx} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => isLit && handleBlowCandle(idx)}>
                        <motion.div
                          animate={isLit ? { scale: [1, 1.2, 1], y: [0, -2, 0] } : { scale: 0, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          style={{
                            width: '16px',
                            height: '24px',
                            backgroundColor: '#FFB703',
                            borderRadius: '50% 50% 20% 20%',
                            boxShadow: isLit ? '0 0 15px #FFB703, 0 0 30px #FB8500' : 'none',
                            margin: '0 auto 4px'
                          }}
                        />
                        <div style={{
                          width: '12px',
                          height: '45px',
                          backgroundColor: 'var(--color-peach-primary)',
                          borderRadius: '4px',
                          margin: '0 auto'
                        }} />
                      </div>
                    ))}
                  </div>

                  {/* Cake Base */}
                  <div style={{
                    backgroundColor: '#5C0707',
                    height: '50px',
                    borderRadius: '12px',
                    border: '2px solid var(--color-peach-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-peach-primary)'
                  }}>
                    {candlesLit.some(c => c) ? "HAPPY BIRTHDAY BESTIE!" : "ALL CANDLES BLOWN! MAKE A WISH!"}
                  </div>
                </div>

                {!candlesLit.some(c => c) ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '20px' }}>
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', color: 'var(--color-peach-primary)' }}>
                      "May your year be filled with zero bugs, endless coffee, and pure joy!"
                    </p>
                    <button onClick={resetCandles} style={{ background: 'none', border: '1px solid var(--color-peach-primary)', color: 'var(--color-peach-primary)', padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <RotateCcw size={14} /> Relight Candles
                    </button>
                  </motion.div>
                ) : null}
              </div>
            )}

            {/* 2. ASK THEM OUT DEMO */}
            {demo.demoType === 'askOut' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <p style={{ color: 'var(--color-peach-soft)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  <strong>Interactive Date Proposal Sandbox</strong>
                </p>

                <div style={{
                  backgroundColor: 'var(--color-burgundy-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '30px 20px',
                  border: '1px solid var(--color-border-light)',
                  marginBottom: '20px',
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {!askOutAccepted ? (
                    <>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-peach-primary)', marginBottom: '16px' }}>
                        "Would you like to get coffee & ramen with me this Friday?"
                      </h4>

                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
                        <MagneticButton variant="primary" onClick={handleAskOutAccept}>
                          YES! ABSOLUTELY
                        </MagneticButton>

                        <motion.button
                          onMouseEnter={handleRunawayNo}
                          onClick={handleRunawayNo}
                          animate={{ x: runawayNoPos.x, y: runawayNoPos.y }}
                          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                          style={{
                            padding: '12px 24px',
                            borderRadius: 'var(--radius-pill)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            background: 'transparent',
                            color: 'var(--color-peach-soft)',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600
                          }}
                        >
                          No, I hate fun
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                      <CheckCircle2 size={48} color="var(--color-peach-primary)" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-peach-primary)' }}>
                        IT'S A DATE!
                      </h4>
                      <p style={{ color: 'var(--color-peach-soft)', marginTop: '8px' }}>
                        Friday 7:00 PM • Coffee & Ramen • Added to Calendar
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* 3. ANNIVERSARY DEMO */}
            {demo.demoType === 'anniversary' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{
                  backgroundColor: 'var(--color-burgundy-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  border: '1px solid var(--color-border-light)'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Live Relationship Counter
                  </span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-peach-primary)', margin: '8px 0' }}>
                    1,248 Days
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)' }}>
                    = 29,952 Hours of endless laughs & stolen hoodies.
                  </p>

                  <div
                    onClick={() => { playSparkle(); setMemoryFlipped(!memoryFlipped); }}
                    style={{
                      marginTop: '20px',
                      padding: '20px',
                      backgroundColor: 'var(--color-burgundy-dark)',
                      borderRadius: '12px',
                      border: '1px dashed var(--color-peach-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.4rem', color: 'var(--color-peach-primary)' }}>
                      {memoryFlipped ? "'I still choose you every single day.'" : "Tap to flip private memory letter"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. APOLOGY DEMO */}
            {demo.demoType === 'apology' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <p style={{ color: 'var(--color-peach-soft)', fontSize: '0.95rem', marginBottom: '16px' }}>
                  <strong>Interactive Forgiveness Meter</strong>
                </p>

                <div style={{
                  backgroundColor: 'var(--color-burgundy-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  border: '1px solid var(--color-border-light)'
                }}>
                  <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--color-peach-primary)', marginBottom: '16px' }}>
                    Current Anger Level: {forgiveScore}%
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={forgiveScore}
                    onChange={(e) => { setForgiveScore(e.target.value); playPop(); }}
                    style={{ width: '80%', accentColor: 'var(--color-peach-primary)', cursor: 'pointer' }}
                  />

                  <p style={{ marginTop: '16px', fontFamily: 'var(--font-handwriting)', fontSize: '1.4rem', color: 'var(--color-peach-soft)' }}>
                    {forgiveScore < 30 ? "'You better bring boba.'" : forgiveScore < 70 ? "'Apology considered...'" : "'Forgiven! Boba delivered!'" }
                  </p>
                </div>
              </div>
            )}

            {/* 5. BEST FRIEND DEMO */}
            {demo.demoType === 'bestFriend' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <p style={{ color: 'var(--color-peach-soft)', fontSize: '0.95rem', marginBottom: '16px' }}>
                  <strong>Inside-Joke Audio Soundboard (Click to play)</strong>
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  {['"Bruh Moment"', '"Remember That Time?"', '"Unhinged Energy"', '"Bestie For Life"'].map((sound, i) => (
                    <button
                      key={i}
                      onClick={() => playSoundbite(sound)}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: soundboardPlayed === sound ? 'var(--color-peach-primary)' : 'var(--color-burgundy-primary)',
                        color: soundboardPlayed === sound ? 'var(--color-burgundy-dark)' : 'var(--color-peach-primary)',
                        border: '1px solid var(--color-peach-muted)',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Volume2 size={16} style={{ marginBottom: '4px' }} />
                      <div>{sound}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 6. JUST BECAUSE DEMO */}
            {demo.demoType === 'justBecause' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{
                  backgroundColor: 'var(--color-burgundy-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  border: '1px solid var(--color-border-light)'
                }}>
                  {!scratched ? (
                    <div
                      onClick={handleScratch}
                      style={{
                        padding: '40px 20px',
                        backgroundColor: 'var(--color-peach-muted)',
                        color: 'var(--color-burgundy-dark)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.2rem'
                      }}
                    >
                      CLICK TO SCRATCH OFF YOUR SURPRISE GIFT
                    </div>
                  ) : (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                      <Gift size={40} color="var(--color-peach-primary)" style={{ margin: '0 auto 8px' }} />
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-peach-primary)' }}>
                        You are officially awesome!
                      </h4>
                      <p style={{ color: 'var(--color-peach-soft)', marginTop: '6px', fontFamily: 'var(--font-handwriting)', fontSize: '1.4rem' }}>
                        "Sending virtual flowers & good energy your way."
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Footer CTA inside Modal */}
            <div style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 217, 194, 0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Want to create a custom link like this for someone?
              </span>
              <MagneticButton to="/contact" variant="primary" size="sm" onClick={onClose}>
                Make one for someone →
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
