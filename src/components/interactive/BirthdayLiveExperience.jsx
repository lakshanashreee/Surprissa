import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flame, Volume2, CheckCircle2, RotateCcw, Send, Gift, PartyPopper, ArrowRight, Play, Pause, Music, RefreshCw, X, Lock, KeyRound, Mail, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const BirthdayLiveExperience = ({ onComplete, recipientName = "Stacy" }) => {
  const { playPop, playSparkle, playSuccess, playFlame, playFanfare } = useAudio();

  // Experience Stages: 1: Box, 2: Hearts, 3: Candles, 4: Vibe Check, 5: Reveal
  const [currentStage, setCurrentStage] = useState(1);

  // ==========================================
  // STAGE 1: Suspicious Russian Doll Box State
  // ==========================================
  const [boxStep, setBoxStep] = useState(1); // 1 (Giant), 2 (Medium), 3 (Small), 4 (Tiny)
  const [boxMsg, setBoxMsg] = useState("YOU HAVE 1 UNOPENED GIFT");

  // ==========================================
  // STAGE 2: Catch The Hearts (10 Hearts)
  // ==========================================
  const [caughtHearts, setCaughtHearts] = useState([]);
  const [lastHeartWord, setLastHeartWord] = useState("");
  const heartWords = [
    { id: 1, word: "crazy", x: 12, y: 22 },
    { id: 2, word: "kind", x: 78, y: 18 },
    { id: 3, word: "annoying", x: 22, y: 68 },
    { id: 4, word: "iconic", x: 82, y: 62 },
    { id: 5, word: "idiot", x: 48, y: 14 },
    { id: 6, word: "bestie", x: 50, y: 76 },
    { id: 7, word: "unhinged", x: 18, y: 44 },
    { id: 8, word: "gorgeous", x: 80, y: 40 },
    { id: 9, word: "legend", x: 34, y: 30 },
    { id: 10, word: "my favorite human", x: 64, y: 55 }
  ];

  // ==========================================
  // STAGE 3: Chaotic Candles State
  // ==========================================
  const [candle1Out, setCandle1Out] = useState(false);
  const [candle2Out, setCandle2Out] = useState(false);
  const [candle2Dodges, setCandle2Dodges] = useState(0);
  const [candle2Pos, setCandle2Pos] = useState({ x: 0, y: 0 });
  const [candle3Out, setCandle3Out] = useState(false);
  const [candle3Clicks, setCandle3Clicks] = useState(0); // Needs 5 clicks
  const [isBlackout, setIsBlackout] = useState(false);
  const [blackoutFinished, setBlackoutFinished] = useState(false);

  // ==========================================
  // STAGE 4: Runaway 'No' Button Vibe Check State
  // ==========================================
  const [quizStep, setQuizStep] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [quizFeedback, setQuizFeedback] = useState("");
  const quizTimerRef = useRef(null);

  // ==========================================
  // STAGE 5: Grand Reveal & Secret Letter Heart Unlock State
  // ==========================================
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [letterUnsealed, setLetterUnsealed] = useState(false);

  // Clear any timers on unmount
  useEffect(() => {
    return () => {
      if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
    };
  }, []);

  // Check if all 3 polaroid cards have been flipped
  const allCardsFlipped = !!(flippedCards['card1'] && flippedCards['card2'] && flippedCards['card3']);

  // Play heart shower sound when all 3 cards are flipped
  useEffect(() => {
    if (allCardsFlipped && !letterUnsealed) {
      playSparkle();
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFD9C2', '#8D0B0B', '#FFF1E8']
        });
      } catch (e) {}
    }
  }, [allCardsFlipped, letterUnsealed]);

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
        confetti({ ...defaults, particleCount, origin: { x: 0.15, y: 0.55 }, colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8', '#FFB703', '#FB8500'] });
        confetti({ ...defaults, particleCount, origin: { x: 0.85, y: 0.55 }, colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8', '#FFB703', '#FB8500'] });
      }, 200);
    } catch (e) {}
  };

  // Comprehensive Replay Reset
  const handleReplay = () => {
    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
    playPop();
    setCurrentStage(1);
    setBoxStep(1);
    setBoxMsg("YOU HAVE 1 UNOPENED GIFT");
    setCaughtHearts([]);
    setLastHeartWord("");
    setCandle1Out(false);
    setCandle2Out(false);
    setCandle2Dodges(0);
    setCandle2Pos({ x: 0, y: 0 });
    setCandle3Out(false);
    setCandle3Clicks(0);
    setIsBlackout(false);
    setBlackoutFinished(false);
    setQuizStep(1);
    setNoButtonPos({ x: 0, y: 0 });
    setQuizFeedback("");
    setFlippedCards({});
    setPasswordModalOpen(false);
    setPasswordInput("");
    setPasswordFeedback("");
    setLetterUnsealed(false);
    setIsPlayingAudio(false);
  };

  // --- STAGE 1: Russian Doll Box Handlers ---
  const handleBoxClick = () => {
    if (boxStep === 1) {
      playPop();
      setBoxStep(2);
      setBoxMsg("HAHAHA YOU THOUGHT THERE WAS A GIFT?");
    } else if (boxStep === 2) {
      playPop();
      setBoxStep(3);
      setBoxMsg("Wait, another box?! Are you being pranked?");
    } else if (boxStep === 3) {
      playPop();
      setBoxStep(4);
      setBoxMsg("Hold on, one more tiny one...");
    } else if (boxStep === 4) {
      playSuccess();
      try { confetti({ particleCount: 80, spread: 70 }); } catch (e) {}
      setBoxMsg("Okay NOW there's actually something. Let's see how loved you are...");
      setTimeout(() => {
        setCurrentStage(2);
      }, 950);
    }
  };

  // --- STAGE 2: Catch The Hearts Handlers ---
  const handleCatchHeart = (heart) => {
    if (caughtHearts.includes(heart.id)) return;
    playSparkle();
    const updated = [...caughtHearts, heart.id];
    setCaughtHearts(updated);
    setLastHeartWord(heart.word);

    if (updated.length === 10) {
      playSuccess();
      try { confetti({ particleCount: 110, spread: 80 }); } catch (e) {}
      setTimeout(() => {
        setCurrentStage(3);
      }, 1600);
    }
  };

  // --- STAGE 3: Chaotic Candles Handlers ---
  const handleCandle1 = () => {
    playFlame();
    setCandle1Out(true);
    checkAllCandlesBlown(true, candle2Out, candle3Out);
  };

  // Candle 2 dodges 6 times super fast
  const handleCandle2HoverOrTouch = () => {
    if (candle2Out) return;
    if (candle2Dodges < 6) {
      playPop();
      const randomX = (Math.random() - 0.5) * 260;
      const randomY = (Math.random() - 0.5) * 140;
      setCandle2Pos({ x: randomX, y: randomY });
      setCandle2Dodges(prev => prev + 1);
    }
  };

  const handleCandle2Click = () => {
    if (candle2Dodges < 6) {
      handleCandle2HoverOrTouch();
      return;
    }
    playFlame();
    setCandle2Out(true);
    checkAllCandlesBlown(candle1Out, true, candle3Out);
  };

  // Candle 3 requires 5 rapid taps to extinguish
  const handleCandle3Click = () => {
    if (candle3Out) return;
    const nextClicks = candle3Clicks + 1;
    setCandle3Clicks(nextClicks);

    if (nextClicks < 5) {
      playPop();
    } else {
      playFlame();
      setCandle3Out(true);
      checkAllCandlesBlown(candle1Out, candle2Out, true);
    }
  };

  const checkAllCandlesBlown = (c1, c2, c3) => {
    if (c1 && c2 && c3) {
      setTimeout(() => {
        setIsBlackout(true);
        setTimeout(() => {
          setIsBlackout(false);
          setBlackoutFinished(true);
          playFanfare();
          triggerConfettiCannons();
        }, 1400);
      }, 350);
    }
  };

  // --- STAGE 4: Ultra Fast Runaway 'No' Button Handlers ---
  const handleRunawayNo = () => {
    playPop();
    const randomX = (Math.random() - 0.5) * 440;
    const randomY = (Math.random() - 0.5) * 240;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleQuizYes = () => {
    playSuccess();
    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);

    if (quizStep === 1) {
      setQuizFeedback("Correct.");
      quizTimerRef.current = setTimeout(() => {
        setQuizFeedback("");
        setNoButtonPos({ x: 0, y: 0 });
        setQuizStep(2);
      }, 750);
    } else if (quizStep === 2) {
      setQuizFeedback("Correct. But aging like absolute royalty.");
      quizTimerRef.current = setTimeout(() => {
        setQuizFeedback("");
        setNoButtonPos({ x: 0, y: 0 });
        setQuizStep(3);
      }, 850);
    } else if (quizStep === 3) {
      setQuizFeedback("Correct. 100% verified by universal law.");
      quizTimerRef.current = setTimeout(() => {
        setQuizFeedback("");
        setQuizStep(1);
        setCurrentStage(5);
        triggerConfettiCannons();
      }, 950);
    }
  };

  // Toggle independent card flip
  const toggleCardFlip = (cardId) => {
    playPop();
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Password Verification Logic (Case insensitive & wide range substring matching)
  const handlePasswordSubmit = (e) => {
    if (e) e.preventDefault();
    const cleanInput = passwordInput.toLowerCase().trim();

    // Accepted memory keywords anywhere in the input (e.g. 'sai', 'isai', 'bestie', 'partner', 'coffee', 'stacy')
    const acceptedKeywords = ['sai', 'isai', 'bestie', 'partner', 'coffee', 'love', 'stacy', 'legend', 'forever', 'happy'];
    const isMatch = acceptedKeywords.some(kw => cleanInput.includes(kw)) || cleanInput.length >= 2;

    if (isMatch && cleanInput.length > 0) {
      playFanfare();
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8']
        });
      } catch (err) {}
      setPasswordFeedback("Password Verified! ✨ Unsealing letter...");
      setTimeout(() => {
        setPasswordModalOpen(false);
        setLetterUnsealed(true);
      }, 800);
    } else {
      playPop();
      setPasswordFeedback("You are near! Yes yes, think about our favorite memories... you're so close! ✨");
    }
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

      {/* ========================================================
          TRANSPARENT FLOATING STICKERS & AESTHETIC ELEMENTS
         ======================================================== */}
      {/* Top-Left Pink Flower Sticker */}
      <div style={{ position: 'absolute', top: '15px', left: '15px', width: 'clamp(65px, 10vw, 115px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float">
        <img src="/assets/flowers/Pink flower.png" alt="Flower Sticker" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      {/* Top-Right Blue Flower Sticker */}
      <div style={{ position: 'absolute', top: '15px', right: '15px', width: 'clamp(70px, 11vw, 125px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float-delayed">
        <img src="/assets/flowers/blue-anemone-flower.png" alt="Blue Flower Sticker" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      {/* Bottom-Left Birthday Cat with Bouquet Sticker */}
      <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: 'clamp(75px, 12vw, 130px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float-delayed">
        <img src="/assets/cat/birthdaycatwithflowers.png" alt="Birthday Cat Sticker" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      {/* Bottom-Right Cute Sticker with Bouquet */}
      <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: 'clamp(65px, 10vw, 110px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float">
        <img src="/assets/stickers/cutestwithbouquet.png" alt="Cute Bouquet Sticker" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      {/* ========================================================
          STAGE 1: THE SUSPICIOUS RUSSIAN DOLL GIFT BOX
         ======================================================== */}
      {currentStage === 1 && (
        <motion.div
          key="stage1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{ textAlign: 'center', maxWidth: '580px', zIndex: 10 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-peach-primary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '14px'
          }}>
            <Sparkles size={16} /> SURPRISE TRANSMISSION UNLOCKED
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '26px',
            lineHeight: 1.3
          }}>
            "{boxMsg}"
          </h2>

          {/* Interactive Shrinking Russian Doll Box */}
          <motion.div
            onClick={handleBoxClick}
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.92 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
            style={{
              width: boxStep === 1 ? '170px' : boxStep === 2 ? '120px' : boxStep === 3 ? '85px' : '55px',
              height: boxStep === 1 ? '170px' : boxStep === 2 ? '120px' : boxStep === 3 ? '85px' : '55px',
              margin: '0 auto 28px',
              backgroundColor: 'var(--color-burgundy-primary)',
              border: '3px solid var(--color-peach-primary)',
              borderRadius: boxStep === 4 ? '14px' : '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-glow)',
              position: 'relative',
              transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <Gift size={boxStep === 1 ? 70 : boxStep === 2 ? 48 : boxStep === 3 ? 34 : 24} color="var(--color-peach-primary)" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              style={{ position: 'absolute', top: '-10px', right: '-10px' }}
            >
              <Sparkles size={20} color="#FFD9C2" />
            </motion.div>
          </motion.div>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-peach-soft)' }}>
            Tap the gift box to open it
          </p>
        </motion.div>
      )}

      {/* ========================================================
          STAGE 2: CATCH THE HEARTS ❤️ (10 HEARTS CHALLENGE)
         ======================================================== */}
      {currentStage === 2 && (
        <motion.div
          key="stage2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ width: '100%', maxWidth: '780px', minHeight: '380px', position: 'relative', textAlign: 'center', zIndex: 10 }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', color: 'var(--color-peach-primary)', marginBottom: '6px' }}>
            Catch 10 Hearts For {recipientName}!
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '16px' }}>
            {caughtHearts.length === 10 ? (
              <strong style={{ color: 'var(--color-peach-primary)' }}>10/10 — you're officially loved.</strong>
            ) : (
              <span>Catch them all: <strong>{caughtHearts.length} / 10</strong></span>
            )}
          </p>

          {/* Floating Heart Arena */}
          <div style={{
            position: 'relative',
            height: '280px',
            backgroundColor: 'rgba(24, 2, 2, 0.5)',
            borderRadius: '24px',
            border: '1.5px dashed var(--color-border-light)',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
          }}>
            {heartWords.map((hw) => {
              const isCaught = caughtHearts.includes(hw.id);
              return (
                <motion.div
                  key={hw.id}
                  onClick={() => handleCatchHeart(hw)}
                  animate={!isCaught ? {
                    x: [0, (hw.id % 2 === 0 ? 20 : -20), 0],
                    y: [0, (hw.id % 3 === 0 ? -16 : 16), 0],
                    scale: [1, 1.15, 1]
                  } : { scale: 0, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2.2 + (hw.id % 4) * 0.4, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.35 }}
                  style={{
                    position: 'absolute',
                    top: `${hw.y}%`,
                    left: `${hw.x}%`,
                    cursor: isCaught ? 'default' : 'pointer',
                    display: isCaught ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 12
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-burgundy-primary)',
                    border: '1.5px solid var(--color-peach-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(255, 217, 194, 0.3)'
                  }}>
                    <Heart size={22} fill="var(--color-peach-primary)" color="var(--color-peach-primary)" />
                  </div>
                </motion.div>
              );
            })}

            {/* Revealed Trait Banner */}
            {lastHeartWord && (
              <motion.div
                key={lastHeartWord + caughtHearts.length}
                initial={{ scale: 0.7, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                  color: 'var(--color-peach-primary)',
                  fontWeight: 700,
                  pointerEvents: 'none',
                  textShadow: '0 0 20px rgba(255, 217, 194, 0.5)'
                }}
              >
                "{lastHeartWord}"
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ========================================================
          STAGE 3: THE CHAOTIC CANDLES & BLACKOUT BOOM 🎂🕯️
         ======================================================== */}
      {currentStage === 3 && (
        <motion.div
          key="stage3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{ textAlign: 'center', maxWidth: '640px', zIndex: 10 }}
        >
          {/* Blackout Overlay */}
          <AnimatePresence>
            {isBlackout && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: '#070000',
                  zIndex: 999999,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <motion.p
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.98, 1.02, 0.98] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--color-peach-primary)', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}
                >
                  *Lights out... close your eyes and make a wish...*
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {!blackoutFinished ? (
            <>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', color: 'var(--color-peach-primary)', marginBottom: '6px' }}>
                Extinguish The Birthday Candles
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', marginBottom: '24px' }}>
                Tap each flame to blow it out. (Warning: some candles misbehave!)
              </p>

              {/* Cake Platform */}
              <div style={{
                backgroundColor: 'var(--color-burgundy-primary)',
                borderRadius: '24px',
                padding: '36px 20px',
                border: '2px solid var(--color-peach-primary)',
                boxShadow: 'var(--shadow-glow)',
                marginBottom: '20px',
                position: 'relative'
              }}>
                {/* 3 Misbehaving Candles (Clean, No Text Labels) */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '48px', minHeight: '140px', marginBottom: '16px' }}>
                  
                  {/* Candle 1 (Goes out cleanly with NO blinking) */}
                  <div onClick={!candle1Out ? handleCandle1 : undefined} style={{ textAlign: 'center', cursor: candle1Out ? 'default' : 'pointer' }}>
                    <div style={{ minHeight: '32px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                      {!candle1Out && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7 }}
                          style={{ width: '16px', height: '26px', backgroundColor: '#FFB703', borderRadius: '50% 50% 20% 20%', boxShadow: '0 0 20px #FFB703', margin: '0 auto 4px' }}
                        />
                      )}
                    </div>
                    <div style={{ width: '14px', height: '54px', backgroundColor: 'var(--color-peach-primary)', borderRadius: '4px', margin: '0 auto' }} />
                  </div>

                  {/* Candle 2 (Flame moves away 6 times!) */}
                  <div style={{ textAlign: 'center', position: 'relative' }}>
                    <div style={{ minHeight: '32px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                      {!candle2Out && (
                        <motion.div
                          onMouseEnter={handleCandle2HoverOrTouch}
                          onTouchStart={handleCandle2HoverOrTouch}
                          onClick={handleCandle2Click}
                          animate={{ x: candle2Pos.x, y: candle2Pos.y, scale: [1, 1.25, 1] }}
                          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                          style={{
                            width: '18px',
                            height: '28px',
                            backgroundColor: '#FF9E00',
                            borderRadius: '50% 50% 20% 20%',
                            boxShadow: '0 0 25px #FF9E00',
                            margin: '0 auto 4px',
                            cursor: 'pointer'
                          }}
                        />
                      )}
                    </div>
                    <div style={{ width: '14px', height: '54px', backgroundColor: 'var(--color-peach-soft)', borderRadius: '4px', margin: '0 auto' }} />
                  </div>

                  {/* Candle 3 (Becomes HUGE & requires 5 clicks to blow out!) */}
                  <div onClick={handleCandle3Click} style={{ textAlign: 'center', cursor: candle3Out ? 'default' : 'pointer' }}>
                    <div style={{ minHeight: '32px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                      {!candle3Out && (
                        <motion.div
                          animate={{
                            scale: candle3Clicks > 0 ? [2.6 - candle3Clicks * 0.25, 2.9 - candle3Clicks * 0.25, 2.6 - candle3Clicks * 0.25] : [1, 1.2, 1],
                            y: candle3Clicks > 0 ? -18 : 0,
                            rotate: candle3Clicks > 0 ? [0, -6, 6, 0] : 0
                          }}
                          transition={{ repeat: Infinity, duration: 0.4 }}
                          style={{
                            width: candle3Clicks > 0 ? '36px' : '16px',
                            height: candle3Clicks > 0 ? '50px' : '26px',
                            backgroundColor: '#FF5400',
                            borderRadius: '50% 50% 20% 20%',
                            boxShadow: '0 0 45px #FF5400, 0 0 65px #FFB703',
                            margin: '0 auto 4px'
                          }}
                        />
                      )}
                    </div>
                    <div style={{
                      width: candle3Clicks > 0 ? '24px' : '14px',
                      height: candle3Clicks > 0 ? '72px' : '54px',
                      backgroundColor: 'var(--color-peach-muted)',
                      borderRadius: '4px',
                      margin: '0 auto',
                      transition: 'all 0.25s ease'
                    }} />
                  </div>
                </div>

                {/* Cake Base */}
                <div style={{
                  backgroundColor: '#4A0505',
                  height: '54px',
                  borderRadius: '14px',
                  border: '2px solid var(--color-peach-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'var(--color-peach-primary)'
                }}>
                  HAPPY BIRTHDAY {recipientName.toUpperCase()}!
                </div>
              </div>
            </>
          ) : (
            /* BOOM POST-BLACKOUT CELEBRATION */
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-peach-primary)',
                color: 'var(--color-burgundy-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 45px rgba(255, 217, 194, 0.6)'
              }}>
                <PartyPopper size={48} />
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                color: 'var(--color-peach-primary)',
                fontStyle: 'italic',
                marginBottom: '8px'
              }}>
                HAPPY BIRTHDAY, {recipientName.toUpperCase()}!!!
              </h2>
              <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.8rem', color: 'var(--color-ivory)', marginBottom: '28px' }}>
                "Your wish has been officially recorded in the universe ✨"
              </p>
              <MagneticButton onClick={() => setCurrentStage(4)} variant="primary" size="md">
                Continue to Birthday Vibe Check →
              </MagneticButton>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ========================================================
          STAGE 4: ULTRA-FAST RUNAWAY 'NO' BUTTON VIBE CHECK
         ======================================================== */}
      {currentStage === 4 && (
        <motion.div
          key="stage4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ textAlign: 'center', maxWidth: '600px', zIndex: 10 }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-peach-primary)' }}>
            Official Birthday Vibe Verification
          </span>

          <div
            key={quizStep}
            style={{
              backgroundColor: 'var(--color-burgundy-primary)',
              borderRadius: '24px',
              padding: '40px 24px',
              border: '2px solid var(--color-peach-primary)',
              boxShadow: 'var(--shadow-lg)',
              margin: '20px 0',
              minHeight: '230px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', color: 'var(--color-peach-primary)', marginBottom: '22px', fontStyle: 'italic' }}>
              {quizStep === 1 && `“Are you officially the coolest person alive?”`}
              {quizStep === 2 && `“Are you getting old?”`}
              {quizStep === 3 && `“Do you agree you deserve endless love & cake today?”`}
            </h3>

            {quizFeedback ? (
              <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.7rem', color: 'var(--color-ivory)' }}>
                {quizFeedback}
              </motion.p>
            ) : (
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                <MagneticButton onClick={handleQuizYes} variant="primary" size="md">
                  YES
                </MagneticButton>

                <motion.button
                  onMouseEnter={handleRunawayNo}
                  onMouseMove={handleRunawayNo}
                  onTouchStart={handleRunawayNo}
                  onClick={handleRunawayNo}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: 'spring', stiffness: 900, damping: 10 }}
                  style={{
                    padding: '12px 30px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-peach-soft)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}
                >
                  NO
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ========================================================
          STAGE 5: THE GRAND BIRTHDAY REVEAL & SECRET LETTER HEART UNLOCK
         ======================================================== */}
      {currentStage === 5 && (
        <motion.div
          key="stage5"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ width: '100%', maxWidth: '860px', textAlign: 'center', zIndex: 10, position: 'relative' }}
        >
          {/* RAINING HEARTS PARTICLES (ACTIVATES WHEN ALL 3 CARDS ARE FLIPPED) */}
          {allCardsFlipped && !letterUnsealed && (
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -50, x: `${(i * 4.2) % 100}vw`, opacity: 0.8, scale: 0.6 + (i % 5) * 0.2 }}
                  animate={{
                    y: '110vh',
                    x: `${((i * 4.2) + ((i % 2 === 0 ? 1 : -1) * 8)) % 100}vw`,
                    rotate: [0, 45, -45, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5 + (i % 4) * 0.8,
                    delay: (i * 0.15),
                    ease: 'linear'
                  }}
                  style={{ position: 'absolute', top: 0, color: i % 2 === 0 ? 'var(--color-peach-primary)' : '#FF8585' }}
                >
                  <Heart size={20 + (i % 4) * 6} fill="currentColor" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Celebration Header */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-peach-primary)' }}>
              ✦ Happy Birthday Capsule ✦
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', color: 'var(--color-peach-primary)', fontStyle: 'italic', margin: '6px 0' }}>
              Happy Birthday, {recipientName}!
            </h2>
            <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.65rem', color: 'var(--color-ivory)' }}>
              "Here's to another year of pure chaos, endless laughs, and being iconic."
            </p>
          </div>

          {/* Voice Note Simulation Card */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '20px',
            padding: '18px 24px',
            border: '1.5px solid var(--color-peach-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => { playSparkle(); setIsPlayingAudio(!isPlayingAudio); }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-peach-primary)',
                  color: 'var(--color-burgundy-dark)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isPlayingAudio ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-ivory)' }}>
                  Birthday Voice Note.mp3
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-peach-soft)' }}>
                  {isPlayingAudio ? "Playing secret birthday message... 0:42" : "Tap to play secret voice note"}
                </div>
              </div>
            </div>

            {/* Live Audio Equalizer Waveform */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[18, 32, 24, 42, 16, 30, 36, 22].map((h, i) => (
                <motion.div
                  key={i}
                  animate={isPlayingAudio ? { height: [h * 0.35, h, h * 0.35] } : { height: '8px' }}
                  transition={{ repeat: Infinity, duration: 0.6 + (i % 3) * 0.2 }}
                  style={{ width: '4px', backgroundColor: 'var(--color-peach-primary)', borderRadius: '2px' }}
                />
              ))}
            </div>
          </div>

          {/* INSTRUCTION SUBTITLE FOR POLAROIDS */}
          <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Sparkles size={16} color="var(--color-peach-primary)" />
            <strong>Flip all 3 polaroids to unlock the grand secret:</strong>
          </p>

          {/* TRUE 3D INDEPENDENT POLAROID FLIP CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px', perspective: '1000px' }}>
            {[
              { id: 'card1', img: '/assets/cat/birthdaycatwithflowers.png', caption: 'Partner In Crime', secret: 'You still owe me coffee from last month! ☕' },
              { id: 'card2', img: '/assets/flowers/bouquet.png', caption: 'Virtual Bouquet Delivery', secret: 'Guaranteed to stay fresh forever 🌸' },
              { id: 'card3', img: '/assets/stickers/cutestwithbouquet.png', caption: 'Certified Legend', secret: 'Most likely to make any room 10x brighter ✨' }
            ].map((card) => {
              const isFlipped = !!flippedCards[card.id];
              return (
                <div
                  key={card.id}
                  onClick={() => toggleCardFlip(card.id)}
                  style={{
                    height: '270px',
                    perspective: '1000px',
                    cursor: 'pointer'
                  }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      borderRadius: '16px'
                    }}
                  >
                    {/* Front Face (Cream Polaroid Frame + Clean Transparent Sticker) */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      backgroundColor: '#FFF4EB',
                      color: 'var(--color-burgundy-dark)',
                      padding: '16px 14px 20px',
                      borderRadius: '16px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(141, 11, 11, 0.15)'
                    }}>
                      <div style={{
                        width: '100%',
                        height: '155px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent'
                      }}>
                        <img
                          src={card.img}
                          alt={card.caption}
                          style={{
                            maxHeight: '140px',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.25))'
                          }}
                        />
                      </div>
                      <div style={{ textAlign: 'center', width: '100%' }}>
                        <div style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.35rem', fontWeight: 700 }}>
                          {card.caption}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          (Tap to flip)
                        </span>
                      </div>
                    </div>

                    {/* Back Face (Secret Handwritten Inside Joke) */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      backgroundColor: 'var(--color-burgundy-primary)',
                      border: '2px solid var(--color-peach-primary)',
                      color: 'var(--color-ivory)',
                      padding: '24px 18px',
                      borderRadius: '16px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}>
                      <Sparkles size={24} color="var(--color-peach-primary)" style={{ marginBottom: '12px' }} />
                      <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.5rem', color: 'var(--color-peach-primary)', lineHeight: 1.4 }}>
                        "{card.secret}"
                      </p>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-peach-soft)', marginTop: '12px' }}>
                        (Tap to flip back)
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ========================================================
              GIANT FLOATING HEART COMPONENT (TRIGGERED AFTER 3 FLIPS)
             ======================================================== */}
          {allCardsFlipped && !letterUnsealed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                margin: '20px auto 30px',
                textAlign: 'center',
                zIndex: 60
              }}
            >
              <motion.div
                onClick={() => { playSparkle(); setPasswordModalOpen(true); }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-burgundy-primary)',
                  border: '3px solid var(--color-peach-primary)',
                  boxShadow: '0 0 35px rgba(255, 217, 194, 0.7), 0 0 70px rgba(141, 11, 11, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  cursor: 'pointer'
                }}
              >
                <Heart size={48} fill="var(--color-peach-primary)" color="var(--color-peach-primary)" />
              </motion.div>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ✦ Tap The Heart To Unseal Your Secret Letter ✦
              </h4>
            </motion.div>
          )}

          {/* ========================================================
              PASSWORD / MEMORY QUESTION PROMPT MODAL
             ======================================================== */}
          <AnimatePresence>
            {passwordModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 999999,
                  backgroundColor: 'rgba(15, 1, 1, 0.85)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px'
                }}
                onClick={() => setPasswordModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.88, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.88, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: 'var(--color-burgundy-dark)',
                    border: '2px solid var(--color-peach-primary)',
                    borderRadius: '24px',
                    padding: '36px 28px',
                    maxWidth: '520px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-glow)',
                    color: 'var(--color-ivory)',
                    position: 'relative'
                  }}
                >
                  <button
                    onClick={() => setPasswordModalOpen(false)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-peach-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={20} />
                  </button>

                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-burgundy-primary)', border: '1.5px solid var(--color-peach-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <KeyRound size={26} color="var(--color-peach-primary)" />
                  </div>

                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Confidential Letter Security Check
                  </span>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-peach-primary)', fontStyle: 'italic', margin: '10px 0 6px' }}>
                    "What is our secret inside-joke nickname or memory?"
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--color-peach-soft)', marginBottom: '20px' }}>
                    (Hint: Try 'sai', 'bestie', 'partner', 'coffee', or any word that connects us)
                  </p>

                  <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input
                      type="text"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter memory keyword..."
                      autoFocus
                      style={{
                        padding: '14px 20px',
                        borderRadius: 'var(--radius-pill)',
                        border: '2px solid var(--color-peach-primary)',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        color: 'var(--color-ivory)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        outline: 'none',
                        textAlign: 'center'
                      }}
                    />

                    {passwordFeedback && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          fontFamily: 'var(--font-handwriting)',
                          fontSize: '1.25rem',
                          color: passwordFeedback.includes('Verified') ? '#4ade80' : 'var(--color-peach-primary)',
                          margin: '4px 0'
                        }}
                      >
                        {passwordFeedback}
                      </motion.p>
                    )}

                    <MagneticButton type="submit" variant="primary" size="md">
                      Unlock Letter 💌
                    </MagneticButton>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================
              UNSEALED CONFIDENTIAL BIRTHDAY LETTER
             ======================================================== */}
          <AnimatePresence>
            {letterUnsealed && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  backgroundColor: '#FFF4EB',
                  color: '#2B0404',
                  padding: '36px 30px',
                  borderRadius: '24px',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                  textAlign: 'left',
                  margin: '20px auto 32px',
                  border: '2px solid var(--color-peach-primary)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1.5px solid rgba(141, 11, 11, 0.15)', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={20} color="#8D0B0B" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-burgundy-primary)', letterSpacing: '0.05em' }}>
                      CONFIDENTIAL BIRTHDAY NOTE ✦ UNSEALED
                    </span>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.75rem', lineHeight: 1.6, marginBottom: '14px', color: '#180202' }}>
                  Dear {recipientName},
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', lineHeight: 1.6, marginBottom: '14px', color: '#180202' }}>
                  Happy Birthday! You truly are one of one. Thank you for always being the most unhinged, hilarious, and genuinely caring human in my life. Through every chaotic late-night talk, inside joke, and spontaneous adventure, I am so grateful to have you.
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', lineHeight: 1.6, marginBottom: '16px', color: '#180202' }}>
                  Wishing you another legendary year filled with zero bugs, endless laughter, infinite good coffee, and every wish coming true!
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.65rem', fontWeight: 700, textAlign: 'right', color: '#8D0B0B' }}>
                  — Your Favorite Human
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '16px' }}>
            <button
              onClick={handleReplay}
              style={{
                padding: '12px 24px',
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
              <RotateCcw size={16} /> Replay Experience
            </button>

            <MagneticButton to="/contact" variant="primary" size="md">
              Make one for your favorite person →
            </MagneticButton>
          </div>
        </motion.div>
      )}

    </div>
  );
};
