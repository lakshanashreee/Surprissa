import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Coffee, Utensils, Gamepad2, Compass, CheckCircle2, RotateCcw, Calendar, ArrowRight, ShieldAlert, Zap, Flame, Award, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const AskOutLiveExperience = ({ onComplete }) => {
  const { playPop, playSparkle, playSuccess, playFlame, playFanfare } = useAudio();

  // Experience Layers:
  // Layer 1: The High-Stakes Chemistry Scanner / Vibe Radar
  // Layer 2: Build Our Ideal Date (Interactive Food & Activity Picker)
  // Layer 3: The Unbeatable Proposal Contract (Crazy Runaway 'No' Button with Knife/Gun Meme Stickers)
  // Layer 4: The Grand Bouquet Reveal & Date Ticket Confirmation
  const [currentLayer, setCurrentLayer] = useState(1);

  // ==========================================
  // LAYER 1: Chemistry Scanner State
  // ==========================================
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const scanIntervalRef = useRef(null);

  // ==========================================
  // LAYER 2: Date Customizer State
  // ==========================================
  const [selectedFood, setSelectedFood] = useState("Ramen & Dumplings 🍜");
  const [selectedActivity, setSelectedActivity] = useState("Arcade & Mario Kart 🕹️");
  const [selectedVibe, setSelectedVibe] = useState("Oversized Hoodies & Sneakers 👟");

  // ==========================================
  // LAYER 3: Runaway Proposal State
  // ==========================================
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noButtonText, setNoButtonText] = useState("No, I hate fun");

  // ==========================================
  // LAYER 4: Confirmation State
  // ==========================================
  const [calendarAdded, setCalendarAdded] = useState(false);

  // Cleanup scanner timer
  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  // Continuous celebratory confetti
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

  // --- LAYER 1 HANDLERS: Chemistry Scanner ---
  const startScanning = () => {
    if (isScanning || scanProgress >= 100) return;
    setIsScanning(true);
    playPop();

    scanIntervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanIntervalRef.current);
          setIsScanning(false);
          playSuccess();
          setTimeout(() => {
            setCurrentLayer(2);
          }, 900);
          return 100;
        }
        playSparkle();
        return prev + 10;
      });
    }, 180);
  };

  // --- LAYER 3 HANDLERS: Chaotic Runaway No Button ---
  const handleRunawayNo = () => {
    playPop();
    const nextDodges = dodgeCount + 1;
    setDodgeCount(nextDodges);

    const randomX = (Math.random() - 0.5) * 440;
    const randomY = (Math.random() - 0.5) * 240;
    setNoButtonPos({ x: randomX, y: randomY });

    if (nextDodges === 1) setNoButtonText("Nope! Try again 💨");
    else if (nextDodges === 2) setNoButtonText("Why are you still trying? 😭");
    else if (nextDodges === 3) setNoButtonText("Literally impossible to click 🛡️");
    else if (nextDodges >= 4) setNoButtonText("Fine, YES (tiny)");
  };

  const handleAcceptProposal = () => {
    playFanfare();
    triggerConfettiCannons();
    setCurrentLayer(4);
  };

  const handleReplay = () => {
    playPop();
    setCurrentLayer(1);
    setScanProgress(0);
    setIsScanning(false);
    setDodgeCount(0);
    setNoButtonPos({ x: 0, y: 0 });
    setNoButtonText("No, I hate fun");
    setCalendarAdded(false);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100%',
      color: 'var(--color-ivory)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'clamp(16px, 4vw, 40px)',
      overflowX: 'hidden'
    }}>

      {/* Floating Aesthetic Stickers */}
      <div style={{ position: 'absolute', top: '15px', left: '15px', width: 'clamp(65px, 10vw, 115px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float">
        <img src="/assets/flowers/Pink flower.png" alt="Flower Decor" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', top: '15px', right: '15px', width: 'clamp(70px, 11vw, 125px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float-delayed">
        <img src="/assets/flowers/blue-anemone-flower.png" alt="Flower Decor" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: 'clamp(75px, 12vw, 130px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float-delayed">
        <img src="/assets/cat/catwiththreebouquet.png" alt="Cat with Bouquets" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: 'clamp(65px, 10vw, 110px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float">
        <img src="/assets/stickers/cutestwithbouquet.png" alt="Cute Bouquet" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      {/* ========================================================
          LAYER 1: THE HIGH-STAKES CHEMISTRY SCANNER 📡💖
         ======================================================== */}
      {currentLayer === 1 && (
        <motion.div
          key="layer1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{ textAlign: 'center', maxWidth: '620px', zIndex: 10 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-peach-primary)',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '14px'
          }}>
            <ShieldAlert size={18} color="var(--color-peach-primary)" />
            CLASSIFIED INCOMING PROPOSAL ✦ LEVEL 1
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.7rem, 4vw, 2.6rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '12px',
            lineHeight: 1.3
          }}>
            "Hold to Calibrate Mutual Chemistry"
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '28px' }}>
            Before accessing this transmission, our biometric compatibility must be verified.
          </p>

          {/* Interactive Fingerprint / Chemistry Sensor */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '28px',
            padding: '36px 24px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '24px'
          }}>
            <motion.div
              onClick={startScanning}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: isScanning ? 'rgba(255, 217, 194, 0.25)' : 'rgba(24, 2, 2, 0.6)',
                border: '3px dashed var(--color-peach-primary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                cursor: 'pointer',
                boxShadow: isScanning ? '0 0 35px rgba(255, 217, 194, 0.6)' : 'none'
              }}
            >
              <Zap size={44} color="var(--color-peach-primary)" />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-peach-primary)', marginTop: '4px' }}>
                {isScanning ? 'SCANNING...' : 'TAP TO SCAN'}
              </span>
            </motion.div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              maxWidth: '360px',
              height: '12px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 'var(--radius-pill)',
              margin: '0 auto 12px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 217, 194, 0.3)'
            }}>
              <motion.div
                style={{
                  height: '100%',
                  width: `${scanProgress}%`,
                  backgroundColor: 'var(--color-peach-primary)',
                  borderRadius: 'var(--radius-pill)',
                  transition: 'width 0.2s ease'
                }}
              />
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-peach-soft)' }}>
              {scanProgress === 0 && "Waiting for fingerprint contact..."}
              {scanProgress > 0 && scanProgress < 50 && "Analyzing humor compatibility... 32%"}
              {scanProgress >= 50 && scanProgress < 100 && "Detecting mutual weirdness... 88%"}
              {scanProgress === 100 && "COMPATIBILITY: 100% (DANGEROUSLY HIGH) ✨"}
            </div>
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
          style={{ width: '100%', maxWidth: '780px', textAlign: 'center', zIndex: 10 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-peach-primary)',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '10px'
          }}>
            <Utensils size={18} /> STEP 2 ✦ CO-DESIGN OUR ITINERARY
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.7rem, 4vw, 2.5rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '6px'
          }}>
            "If we go out, what's our move?"
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', marginBottom: '24px' }}>
            Customize the official blueprint for our upcoming adventure.
          </p>

          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '24px',
            padding: '28px 20px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            {/* 1. Food Picker */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-peach-primary)', display: 'block', marginBottom: '10px' }}>
                1. The Food & Fuel:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {[
                  "Ramen & Dumplings 🍜",
                  "Coffee & Pastries ☕",
                  "Late-Night Pizza 🍕",
                  "Iced Matcha & Boba 🧋"
                ].map((food) => (
                  <button
                    key={food}
                    onClick={() => { playPop(); setSelectedFood(food); }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: selectedFood === food ? 'var(--color-peach-primary)' : 'rgba(0,0,0,0.3)',
                      color: selectedFood === food ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                      border: selectedFood === food ? '2px solid var(--color-peach-primary)' : '1px solid rgba(255, 217, 194, 0.2)',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-display)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {food}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Activity Picker */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-peach-primary)', display: 'block', marginBottom: '10px' }}>
                2. The Chaotic Adventure:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {[
                  "Arcade & Mario Kart 🕹️",
                  "Bookstore Wandering 📚",
                  "Stargazing & Music 🌌",
                  "Ice Cream Taste War 🍦"
                ].map((act) => (
                  <button
                    key={act}
                    onClick={() => { playPop(); setSelectedActivity(act); }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: selectedActivity === act ? 'var(--color-peach-primary)' : 'rgba(0,0,0,0.3)',
                      color: selectedActivity === act ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                      border: selectedActivity === act ? '2px solid var(--color-peach-primary)' : '1px solid rgba(255, 217, 194, 0.2)',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-display)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Dress Code */}
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-peach-primary)', display: 'block', marginBottom: '10px' }}>
                3. The Vibe & Dress Code:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {[
                  "Oversized Hoodies & Sneakers 👟",
                  "Matching Sunglasses 🕶️",
                  "Dressed Like Movie Stars ✨"
                ].map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => { playPop(); setSelectedVibe(vibe); }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: selectedVibe === vibe ? 'var(--color-peach-primary)' : 'rgba(0,0,0,0.3)',
                      color: selectedVibe === vibe ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                      border: selectedVibe === vibe ? '2px solid var(--color-peach-primary)' : '1px solid rgba(255, 217, 194, 0.2)',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-display)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <MagneticButton onClick={() => { playSuccess(); setCurrentLayer(3); }} variant="primary" size="md">
            Lock In Date Specs & Proceed to Proposal →
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
          style={{ textAlign: 'center', maxWidth: '640px', width: '100%', position: 'relative', zIndex: 10 }}
        >
          {/* Cute Threat Meme Stickers in Corners */}
          <div style={{ position: 'absolute', top: '-25px', left: '-25px', width: '100px', pointerEvents: 'none', zIndex: 12 }} className="animate-float">
            <img src="/assets/threat/cutest with knife.png" alt="Cute Threat" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '-25px', right: '-25px', width: '100px', pointerEvents: 'none', zIndex: 12 }} className="animate-float-delayed">
            <img src="/assets/threat/cutestwithgun.png" alt="Cute Gun" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }} />
          </div>

          <span style={{ fontSize: '0.85rem', color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>
            FINAL BINDING DATE PROPOSAL
          </span>

          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '28px',
            padding: '44px 28px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            margin: '20px 0',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
              color: 'var(--color-peach-primary)',
              marginBottom: '16px',
              fontStyle: 'italic',
              lineHeight: 1.3
            }}>
              "So... will you get {selectedFood.split(' ')[0]} with me and play {selectedActivity.split(' ')[0]} this Friday?"
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-peach-soft)', marginBottom: '28px' }}>
              (Refusal is legally prohibited by the cuteness protocol above)
            </p>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              <MagneticButton variant="primary" size="md" onClick={handleAcceptProposal}>
                YES! ABSOLUTELY 💖
              </MagneticButton>

              <motion.button
                onMouseEnter={handleRunawayNo}
                onMouseMove={handleRunawayNo}
                onTouchStart={handleRunawayNo}
                onClick={dodgeCount >= 4 ? handleAcceptProposal : handleRunawayNo}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: 'spring', stiffness: 900, damping: 10 }}
                style={{
                  padding: '12px 28px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: dodgeCount >= 4 ? 'var(--color-peach-primary)' : 'transparent',
                  color: dodgeCount >= 4 ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}
              >
                {noButtonText}
              </motion.button>
            </div>
          </div>
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
          style={{ width: '100%', maxWidth: '820px', textAlign: 'center', zIndex: 10 }}
        >
          {/* Virtual Bouquet Delivery Graphic */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '20px' }}
          >
            <div style={{ width: '130px', margin: '0 auto 12px' }}>
              <img
                src="/assets/flowers/bouquet.png"
                alt="Virtual Bouquet"
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 10px 30px rgba(255, 217, 194, 0.5))' }}
              />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-peach-primary)' }}>
              ✦ VIRTUAL BOUQUET DELIVERED ✦
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', color: 'var(--color-peach-primary)', fontStyle: 'italic', margin: '6px 0' }}>
              IT'S OFFICIALLY A DATE!
            </h2>
            <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.7rem', color: 'var(--color-ivory)' }}>
              "You made the right choice. Best date of the year is officially booked."
            </p>
          </motion.div>

          {/* Golden Date Ticket Card */}
          <div style={{
            backgroundColor: '#FFF4EB',
            color: '#2B0404',
            borderRadius: '24px',
            padding: '28px 24px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            marginBottom: '28px',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Cutout Ticket Notches */}
            <div style={{ position: 'absolute', top: '50%', left: '-12px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#120101' }} />
            <div style={{ position: 'absolute', top: '50%', right: '-12px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#120101' }} />

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#8D0B0B', letterSpacing: '0.08em' }}>
                OFFICIAL DATE PASS #2026
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#8D0B0B', margin: '6px 0' }}>
                Friday Evening @ 7:30 PM
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>
                Location: Our secret cozy spot
              </p>
            </div>

            <div style={{ borderLeft: '1.5px dashed rgba(141, 11, 11, 0.25)', paddingLeft: '20px' }}>
              <div style={{ fontSize: '0.85rem', marginBottom: '6px' }}>
                <strong>Food:</strong> {selectedFood}
              </div>
              <div style={{ fontSize: '0.85rem', marginBottom: '6px' }}>
                <strong>Activity:</strong> {selectedActivity}
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <strong>Dress Code:</strong> {selectedVibe}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '16px' }}>
            <button
              onClick={() => { playSuccess(); setCalendarAdded(true); }}
              style={{
                padding: '12px 22px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: calendarAdded ? '#4ade80' : 'var(--color-peach-primary)',
                color: 'var(--color-burgundy-dark)',
                border: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Calendar size={16} />
              {calendarAdded ? "Added to Calendar! 📅" : "Save To Calendar"}
            </button>

            <button
              onClick={handleReplay}
              style={{
                padding: '12px 22px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 217, 194, 0.15)',
                border: '1px solid var(--color-peach-primary)',
                color: 'var(--color-peach-primary)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={16} /> Replay Proposal
            </button>

            <MagneticButton to="/contact" variant="primary" size="md">
              Make one for your crush →
            </MagneticButton>
          </div>
        </motion.div>
      )}

    </div>
  );
};
