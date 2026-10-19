import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Utensils, RotateCcw, ShieldAlert, Zap, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const AskOutLiveExperience = ({ recipientName = "Stacy", onComplete }) => {
  const { playPop, playSparkle, playSuccess, playFlame, playFanfare } = useAudio();

  // Experience Layers:
  // Layer 1: Continuous Hold Biometric Chemistry Scanner
  // Layer 2: Co-Design Date Specifications (Food, Activity, Vibe)
  // Layer 3: The Binding Proposal Contract (Playful Free-Roaming 'NO' Button)
  // Layer 4: Grand Bouquet Delivery & Official Golden Date Pass
  const [currentLayer, setCurrentLayer] = useState(1);

  // ==========================================
  // LAYER 1: Long Press Chemistry Scanner State
  // ==========================================
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const scanIntervalRef = useRef(null);
  const isPressingRef = useRef(false);

  // ==========================================
  // LAYER 2: Date Customizer State
  // ==========================================
  const [selectedFood, setSelectedFood] = useState("Ramen & Dumplings");
  const [selectedActivity, setSelectedActivity] = useState("Arcade & Mario Kart");
  const [selectedVibe, setSelectedVibe] = useState("Oversized Hoodies & Sneakers");

  // ==========================================
  // LAYER 3: Free-Roaming 'NO' Button State
  // ==========================================
  const [hasDodged, setHasDodged] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  // Continuous celebratory confetti cannons
  const triggerConfettiCannons = () => {
    try {
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 40, spread: 360, ticks: 80, zIndex: 999999 };

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 60 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.15, y: 0.55 }, colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8', '#FFB703', '#FF4D6D'] });
        confetti({ ...defaults, particleCount, origin: { x: 0.85, y: 0.55 }, colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8', '#FFB703', '#FF4D6D'] });
      }, 200);
    } catch (e) {}
  };

  // --- LAYER 1 HANDLERS: Continuous Press & Hold (Long Press) ---
  const handlePressStart = (e) => {
    if (e && e.cancelable && e.type === 'touchstart') e.preventDefault();
    if (scanProgress >= 100) return;

    isPressingRef.current = true;
    setIsScanning(true);
    playPop();

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    scanIntervalRef.current = setInterval(() => {
      if (!isPressingRef.current) {
        clearInterval(scanIntervalRef.current);
        return;
      }

      setScanProgress(prev => {
        // Increment smoothly (takes ~2.2 seconds of unbroken hold to reach 100)
        const next = prev + 2;
        if (next % 16 === 0) playSparkle();

        if (next >= 100) {
          clearInterval(scanIntervalRef.current);
          setIsScanning(false);
          isPressingRef.current = false;
          playSuccess();
          setTimeout(() => {
            setCurrentLayer(2);
          }, 750);
          return 100;
        }
        return next;
      });
    }, 45);
  };

  const handlePressEnd = () => {
    // If user releases before 100%, immediately reset to 0%
    if (scanProgress >= 100) return;

    isPressingRef.current = false;
    setIsScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    setScanProgress(0);
  };

  // --- LAYER 3 HANDLERS: Roaming 'NO' Button (Fixed coords, doesn't affect box layout) ---
  const handleRunawayNo = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playPop();
    setHasDodged(true);

    const btnWidth = 80;
    const btnHeight = 44;
    const margin = 16;

    const maxW = typeof window !== 'undefined' ? Math.max(margin, window.innerWidth - btnWidth - margin) : 320;
    const maxH = typeof window !== 'undefined' ? Math.max(margin, window.innerHeight - btnHeight - margin) : 500;

    const newX = margin + Math.random() * (maxW - margin);
    const newY = margin + Math.random() * (maxH - margin);

    setNoPos({ x: newX, y: newY });
  };

  const handleAcceptProposal = () => {
    playFanfare();
    triggerConfettiCannons();
    setCurrentLayer(4);
    if (onComplete) onComplete();
  };

  const handleReplay = () => {
    playPop();
    setCurrentLayer(1);
    setScanProgress(0);
    setIsScanning(false);
    isPressingRef.current = false;
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    setHasDodged(false);
    setNoPos({ x: 0, y: 0 });
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100dvh',
      color: 'var(--color-ivory)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 'clamp(16px, 3.5vw, 40px) clamp(12px, 3vw, 24px)',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>

      {/* ========================================================
          SUBTLE SURPRISSA DEMO WATERMARK (CENTER FRAME HALLMARK)
         ======================================================== */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.4rem, 3.4vw, 2.3rem)',
          fontStyle: 'italic',
          letterSpacing: '0.12em',
          color: 'rgba(255, 217, 194, 0.18)',
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          textShadow: '0 0 16px rgba(255, 217, 194, 0.15)'
        }}
      >
        <span>✦ surprissa demo ✦</span>
      </div>

      {/* Floating Aesthetic Stickers - Sized fluidly, bottom ones hidden on mobile to avoid overlap */}
      <div style={{ position: 'absolute', top: '16px', left: '16px', width: 'clamp(42px, 7vw, 95px)', pointerEvents: 'none', zIndex: 1, opacity: 0.85 }} className="animate-float">
        <img src="/assets/flowers/Pink flower.png" alt="Pink Flower" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', top: '16px', right: '16px', width: 'clamp(46px, 7.5vw, 105px)', pointerEvents: 'none', zIndex: 1, opacity: 0.85 }} className="animate-float-delayed">
        <img src="/assets/flowers/blue-anemone-flower.png" alt="Blue Flower" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: 'clamp(65px, 10vw, 120px)', pointerEvents: 'none', zIndex: 1, opacity: 0.9 }} className="hide-on-mobile animate-float-delayed">
        <img src="/assets/cat/catwiththreebouquet.png" alt="Cat with Bouquets" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: 'clamp(60px, 9vw, 105px)', pointerEvents: 'none', zIndex: 1, opacity: 0.9 }} className="hide-on-mobile animate-float">
        <img src="/assets/stickers/cutestwithbouquet.png" alt="Cute Bouquet" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      {/* ========================================================
          LAYER 1: BIOMETRIC MUTUAL CHEMISTRY SCANNER (LONG PRESS) 📡💖
         ======================================================== */}
      {currentLayer === 1 && (
        <motion.div
          key="layer1"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', maxWidth: '640px', width: '100%', margin: 'auto 0', zIndex: 10 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-peach-primary)',
            fontSize: 'clamp(0.68rem, 2.2vw, 0.82rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '14px',
            backgroundColor: 'rgba(255, 217, 194, 0.1)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(255, 217, 194, 0.25)',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            <ShieldAlert size={16} color="var(--color-peach-primary)" />
            CLASSIFIED INCOMING TRANSMISSION FOR {recipientName.toUpperCase()} ✦ LEVEL 1
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '10px',
            lineHeight: 1.25
          }}>
            "{recipientName}, Hold to Calibrate Mutual Chemistry"
          </h1>

          <p style={{ fontSize: 'clamp(0.85rem, 2.4vw, 0.98rem)', color: 'var(--color-peach-soft)', marginBottom: '22px', lineHeight: 1.5 }}>
            Press and hold down continuously until calibration reaches 100%. Releasing early resets to 0%!
          </p>

          {/* Interactive Biometric Sensor (Continuous Press & Hold) */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '24px',
            padding: 'clamp(24px, 5vw, 36px) clamp(16px, 4vw, 24px)',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '20px',
            position: 'relative',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            <div style={{ position: 'relative', width: '136px', height: '136px', margin: '0 auto 24px' }}>
              {/* Circular SVG Progress Ring */}
              <svg width="136" height="136" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)', pointerEvents: 'none' }}>
                <circle
                  cx="68"
                  cy="68"
                  r="62"
                  stroke="rgba(255, 217, 194, 0.2)"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="68"
                  cy="68"
                  r="62"
                  stroke="var(--color-peach-primary)"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 62}
                  strokeDashoffset={2 * Math.PI * 62 - (scanProgress / 100) * (2 * Math.PI * 62)}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                />
              </svg>

              {/* The Touchable Hold Sensor */}
              <motion.div
                onPointerDown={handlePressStart}
                onPointerUp={handlePressEnd}
                onPointerLeave={handlePressEnd}
                onPointerCancel={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                onContextMenu={(e) => e.preventDefault()}
                animate={{
                  scale: isScanning ? 1.05 : 1,
                  boxShadow: isScanning ? '0 0 45px rgba(255, 217, 194, 0.85)' : '0 8px 25px rgba(0,0,0,0.35)'
                }}
                transition={{ duration: 0.15 }}
                style={{
                  width: '124px',
                  height: '124px',
                  borderRadius: '50%',
                  backgroundColor: isScanning ? 'rgba(255, 217, 194, 0.3)' : 'rgba(24, 2, 2, 0.7)',
                  border: '2px dashed var(--color-peach-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '6px',
                  left: '6px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  touchAction: 'none'
                }}
              >
                <Zap size={44} color="var(--color-peach-primary)" />
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-peach-primary)', marginTop: '4px', letterSpacing: '0.06em' }}>
                  {isScanning ? `${Math.round(scanProgress)}%` : 'HOLD TO SCAN'}
                </span>
              </motion.div>
            </div>

            {/* Horizontal Progress Bar */}
            <div style={{
              width: '100%',
              maxWidth: '380px',
              height: '14px',
              backgroundColor: 'rgba(0,0,0,0.55)',
              borderRadius: 'var(--radius-pill)',
              margin: '0 auto 16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 217, 194, 0.35)'
            }}>
              <motion.div
                style={{
                  height: '100%',
                  width: `${scanProgress}%`,
                  background: 'linear-gradient(90deg, #FFB703, var(--color-peach-primary))',
                  borderRadius: 'var(--radius-pill)',
                  transition: 'width 0.05s linear'
                }}
              />
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.02rem', color: 'var(--color-peach-soft)', minHeight: '28px' }}>
              {scanProgress === 0 && `Press & hold to calibrate compatibility with ${recipientName}...`}
              {scanProgress > 0 && scanProgress < 35 && `Calibrating smile frequency with ${recipientName}... ${Math.round(scanProgress)}% (Keep holding!)`}
              {scanProgress >= 35 && scanProgress < 75 && `Analyzing mutual vibe & music taste... ${Math.round(scanProgress)}% (Don't let go!)`}
              {scanProgress >= 75 && scanProgress < 100 && `Dangerously high chemistry detected... ${Math.round(scanProgress)}% (Almost there!)`}
              {scanProgress === 100 && `✦ 100% MUTUAL CHEMISTRY CONFIRMED! ✦`}
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-peach-primary)', opacity: 0.75, marginTop: '10px', marginBottom: 0 }}>
              (Must hold continuously until 100% • Releasing early restarts from 0%)
            </p>
          </div>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 2: BUILD OUR IDEAL DATE (INTERACTIVE PICKER) 🍜☕
         ======================================================== */}
      {currentLayer === 2 && (
        <motion.div
          key="layer2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', maxWidth: '780px', margin: 'auto 0', textAlign: 'center', zIndex: 10 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-peach-primary)',
            fontSize: 'clamp(0.68rem, 2.2vw, 0.82rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px',
            backgroundColor: 'rgba(255, 217, 194, 0.1)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(255, 217, 194, 0.25)',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            <Utensils size={16} /> STEP 2 ✦ CO-DESIGN OUR ITINERARY
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '6px',
            lineHeight: 1.25
          }}>
            "{recipientName}, if we go out, what's our move?"
          </h2>
          <p style={{ fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)', color: 'var(--color-peach-soft)', marginBottom: '20px', lineHeight: 1.5 }}>
            Pick your favorites to customize the official blueprint for our upcoming adventure.
          </p>

          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '24px',
            padding: 'clamp(20px, 4vw, 32px) clamp(14px, 3.5vw, 24px)',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '24px',
            textAlign: 'left',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            {/* 1. Food Picker */}
            <div style={{ marginBottom: '22px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-peach-primary)', display: 'block', marginBottom: '10px', letterSpacing: '0.04em' }}>
                1. The Food & Fuel:
              </span>
              <div className="askout-options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                {[
                  "Ramen & Dumplings",
                  "Coffee & Pastries",
                  "Late-Night Pizza",
                  "Iced Matcha & Boba"
                ].map((food) => (
                  <button
                    key={food}
                    onClick={() => { playPop(); setSelectedFood(food); }}
                    style={{
                      padding: 'clamp(10px, 2.5vw, 14px) clamp(8px, 2vw, 14px)',
                      borderRadius: '14px',
                      backgroundColor: selectedFood === food ? 'var(--color-peach-primary)' : 'rgba(0,0,0,0.35)',
                      color: selectedFood === food ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                      border: selectedFood === food ? '2px solid var(--color-peach-primary)' : '1px solid rgba(255, 217, 194, 0.22)',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 'clamp(0.78rem, 2.2vw, 0.88rem)',
                      fontFamily: 'var(--font-display)',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedFood === food ? '0 4px 15px rgba(255, 217, 194, 0.35)' : 'none',
                      minHeight: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      wordBreak: 'break-word'
                    }}
                  >
                    {food}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Activity Picker */}
            <div style={{ marginBottom: '22px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-peach-primary)', display: 'block', marginBottom: '10px', letterSpacing: '0.04em' }}>
                2. The Adventure:
              </span>
              <div className="askout-options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                {[
                  "Arcade & Mario Kart",
                  "Bookstore Wandering",
                  "Stargazing & Music",
                  "Ice Cream Taste War"
                ].map((act) => (
                  <button
                    key={act}
                    onClick={() => { playPop(); setSelectedActivity(act); }}
                    style={{
                      padding: 'clamp(10px, 2.5vw, 14px) clamp(8px, 2vw, 14px)',
                      borderRadius: '14px',
                      backgroundColor: selectedActivity === act ? 'var(--color-peach-primary)' : 'rgba(0,0,0,0.35)',
                      color: selectedActivity === act ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                      border: selectedActivity === act ? '2px solid var(--color-peach-primary)' : '1px solid rgba(255, 217, 194, 0.22)',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 'clamp(0.78rem, 2.2vw, 0.88rem)',
                      fontFamily: 'var(--font-display)',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedActivity === act ? '0 4px 15px rgba(255, 217, 194, 0.35)' : 'none',
                      minHeight: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      wordBreak: 'break-word'
                    }}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Dress Code */}
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-peach-primary)', display: 'block', marginBottom: '10px', letterSpacing: '0.04em' }}>
                3. The Vibe & Dress Code:
              </span>
              <div className="askout-options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {[
                  "Oversized Hoodies & Sneakers",
                  "Matching Sunglasses",
                  "Dressed Like Movie Stars"
                ].map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => { playPop(); setSelectedVibe(vibe); }}
                    style={{
                      padding: 'clamp(10px, 2.5vw, 14px) clamp(8px, 2vw, 14px)',
                      borderRadius: '14px',
                      backgroundColor: selectedVibe === vibe ? 'var(--color-peach-primary)' : 'rgba(0,0,0,0.35)',
                      color: selectedVibe === vibe ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                      border: selectedVibe === vibe ? '2px solid var(--color-peach-primary)' : '1px solid rgba(255, 217, 194, 0.22)',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 'clamp(0.78rem, 2.2vw, 0.88rem)',
                      fontFamily: 'var(--font-display)',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedVibe === vibe ? '0 4px 15px rgba(255, 217, 194, 0.35)' : 'none',
                      minHeight: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      wordBreak: 'break-word'
                    }}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <MagneticButton onClick={() => { playSuccess(); setCurrentLayer(3); }} variant="primary" size="lg">
            Lock In Date Specs & Proceed →
          </MagneticButton>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 3: THE UNBEATABLE PROPOSAL CONTRACT (MEME THREAT) 😈🗡️
         ======================================================== */}
      {currentLayer === 3 && (
        <motion.div
          key="layer3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', maxWidth: '640px', width: '100%', margin: 'auto 0', position: 'relative', zIndex: 10 }}
        >
          {/* Playful Threat Meme Stickers in Corners - Sized and positioned safely to never overlap headers or card boundaries */}
          <div style={{ position: 'absolute', top: '-24px', left: '-12px', width: 'clamp(55px, 12vw, 95px)', pointerEvents: 'none', zIndex: 12 }} className="proposal-threat-sticker-top animate-float">
            <img src="/assets/threat/cutest with knife.png" alt="Cute Kitten with Knife" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.45))' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '-24px', right: '-12px', width: 'clamp(55px, 12vw, 95px)', pointerEvents: 'none', zIndex: 12 }} className="proposal-threat-sticker-bottom animate-float-delayed">
            <img src="/assets/threat/cutestwithgun.png" alt="Cute Kitten with Gun" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.45))' }} />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-peach-primary)',
            fontSize: 'clamp(0.68rem, 2.2vw, 0.82rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px',
            backgroundColor: 'rgba(255, 217, 194, 0.1)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(255, 217, 194, 0.25)',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            <Sparkles size={16} /> OFFICIAL PROPOSAL FOR {recipientName.toUpperCase()} ✦ FINAL STEP
          </div>

          {/* Proposal Card - Fixed layout, never changes when NO button roams */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '24px',
            padding: 'clamp(28px, 6vw, 44px) clamp(16px, 4.5vw, 32px)',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            margin: '18px 0',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxSizing: 'border-box',
            width: '100%',
            overflow: 'hidden'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 4.2vw, 2.2rem)',
              color: 'var(--color-peach-primary)',
              marginBottom: '14px',
              fontStyle: 'italic',
              lineHeight: 1.35
            }}>
              "So {recipientName}... will you get {selectedFood.split(' ')[0]} with me and play {selectedActivity.split(' ')[0]} this Friday?"
            </h3>

            <p style={{ fontSize: 'clamp(0.82rem, 2.2vw, 0.9rem)', color: 'var(--color-peach-soft)', marginBottom: '26px' }}>
              (Refusal is legally prohibited by the cuteness protocol above)
            </p>

            {/* Stable Button Row - Fits within card boundaries on phone, tablet, and desktop */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(10px, 2.5vw, 18px)',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              minHeight: '52px',
              position: 'relative'
            }}>
              <MagneticButton variant="primary" size="md" onClick={handleAcceptProposal}>
                YES! ABSOLUTELY 💖
              </MagneticButton>

              {/* Initial NO button in flow; once dodged, placeholder keeps card layout 100% steady */}
              {!hasDodged ? (
                <button
                  onMouseEnter={handleRunawayNo}
                  onMouseMove={handleRunawayNo}
                  onTouchStart={handleRunawayNo}
                  onPointerDown={handleRunawayNo}
                  onClick={handleRunawayNo}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    background: 'rgba(0,0,0,0.35)',
                    color: 'var(--color-peach-soft)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)',
                    letterSpacing: '0.05em',
                    userSelect: 'none',
                    transition: 'all 0.15s ease',
                    minWidth: '72px'
                  }}
                >
                  NO
                </button>
              ) : (
                <div style={{ width: '72px', height: '44px', pointerEvents: 'none', opacity: 0 }} />
              )}
            </div>
          </div>

          {/* Roaming 'NO' Button across screen - Fixed coordinates, 100% independent of card layout */}
          {hasDodged && (
            <motion.button
              onMouseEnter={handleRunawayNo}
              onMouseMove={handleRunawayNo}
              onTouchStart={handleRunawayNo}
              onPointerDown={handleRunawayNo}
              onClick={handleRunawayNo}
              animate={{ left: noPos.x, top: noPos.y }}
              transition={{ type: 'spring', stiffness: 650, damping: 22 }}
              style={{
                position: 'fixed',
                zIndex: 999999,
                padding: '12px 24px',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid rgba(255,255,255,0.45)',
                background: 'rgba(38, 3, 3, 0.95)',
                color: 'var(--color-peach-soft)',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)',
                letterSpacing: '0.05em',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                boxShadow: '0 10px 35px rgba(0,0,0,0.7), 0 0 25px rgba(255, 217, 194, 0.25)',
                backdropFilter: 'blur(10px)',
                touchAction: 'none'
              }}
            >
              NO
            </motion.button>
          )}
        </motion.div>
      )}

      {/* ========================================================
          LAYER 4: GRAND BOUQUET REVEAL & DATE TICKET CONFIRMATION 💐🎟️
         ======================================================== */}
      {currentLayer === 4 && (
        <motion.div
          key="layer4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '820px', margin: 'auto 0', textAlign: 'center', zIndex: 10 }}
        >
          {/* Virtual Bouquet Delivery Graphic */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '20px' }}
          >
            <div style={{ width: 'clamp(95px, 16vw, 135px)', margin: '0 auto 12px' }}>
              <img
                src="/assets/flowers/bouquet.png"
                alt="Virtual Bouquet"
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 12px 35px rgba(255, 217, 194, 0.55))' }}
              />
            </div>
            <span style={{ fontSize: 'clamp(0.75rem, 2.2vw, 0.88rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-peach-primary)' }}>
              ✦ VIRTUAL BOUQUET DELIVERED TO {recipientName.toUpperCase()} ✦
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.7rem, 5.5vw, 3.2rem)', color: 'var(--color-peach-primary)', fontStyle: 'italic', margin: '6px 0' }}>
              IT'S OFFICIALLY A DATE, {recipientName.toUpperCase()}!
            </h1>
            <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: 'clamp(1.15rem, 3.5vw, 1.7rem)', color: 'var(--color-ivory)', margin: '4px 0 14px' }}>
              "You made the absolute best choice, {recipientName}. Best date of the year is officially booked."
            </p>
          </motion.div>

          {/* Golden Date Ticket Card */}
          <div style={{
            backgroundColor: '#FFF4EB',
            color: '#2B0404',
            borderRadius: '24px',
            padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 28px)',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            marginBottom: '28px',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 'clamp(16px, 3vw, 24px)',
            position: 'relative',
            boxSizing: 'border-box',
            width: '100%',
            overflow: 'hidden'
          }}>
            {/* Cutout Ticket Notches */}
            <div style={{ position: 'absolute', top: '50%', left: '-14px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-burgundy-deepest)', transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', top: '50%', right: '-14px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-burgundy-deepest)', transform: 'translateY(-50%)' }} />

            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#8D0B0B', letterSpacing: '0.1em' }}>
                OFFICIAL DATE PASS #2026
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3.8vw, 1.75rem)', color: '#8D0B0B', margin: '6px 0 2px' }}>
                Friday Evening @ 7:30 PM
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#666', margin: '0 0 10px' }}>
                Location: Our secret cozy spot
              </p>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(141, 11, 11, 0.1)', color: '#8D0B0B', padding: '4px 12px', borderRadius: 'var(--radius-pill)', fontSize: '0.78rem', fontWeight: 800 }}>
                Guest of Honor: {recipientName}
              </div>
            </div>

            <div className="askout-ticket-right" style={{ borderLeft: '1.5px dashed rgba(141, 11, 11, 0.3)', paddingLeft: 'clamp(16px, 3vw, 24px)' }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '8px', color: '#2B0404' }}>
                <strong style={{ color: '#8D0B0B' }}>Food & Fuel:</strong> {selectedFood}
              </div>
              <div style={{ fontSize: '0.9rem', marginBottom: '8px', color: '#2B0404' }}>
                <strong style={{ color: '#8D0B0B' }}>Adventure:</strong> {selectedActivity}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#2B0404' }}>
                <strong style={{ color: '#8D0B0B' }}>Dress Code:</strong> {selectedVibe}
              </div>
            </div>
          </div>

          {/* Action Row - Cleaned up without Save To Calendar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={handleReplay}
              style={{
                padding: '14px 26px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 217, 194, 0.15)',
                border: '1.5px solid var(--color-peach-primary)',
                color: 'var(--color-peach-primary)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={16} />
            </button>

            <MagneticButton onClick={() => { playFanfare(); triggerConfettiCannons(); }} variant="primary" size="md">
              Can't wait for Friday, {recipientName}! 💖✨
            </MagneticButton>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export const AskOutExperience = AskOutLiveExperience;
export default AskOutLiveExperience;
