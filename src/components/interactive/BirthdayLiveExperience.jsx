import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flame, Volume2, CheckCircle2, RotateCcw, Send, Gift, PartyPopper, ArrowRight, ArrowLeft, Star, Play, Pause, Music, RefreshCw, X, Lock, KeyRound, Mail, Check, Delete } from 'lucide-react';
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
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeFeedback, setPasscodeFeedback] = useState("");
  const [passcodeVerified, setPasscodeVerified] = useState(false);
  const [letterUnsealed, setLetterUnsealed] = useState(false);
  const [lovedPhotos, setLovedPhotos] = useState({});
  const [showPhotoMuseum, setShowPhotoMuseum] = useState(false);
  const voiceNoteAudioRef = useRef(null);

  // Clear timers and audio on unmount
  useEffect(() => {
    return () => {
      if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
      if (voiceNoteAudioRef.current) {
        voiceNoteAudioRef.current.pause();
        voiceNoteAudioRef.current = null;
      }
    };
  }, []);

  // Keyboard navigation for passcode modal
  useEffect(() => {
    if (!passwordModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeypadPress(e.key);
      } else if (e.key === 'Backspace') {
        handleKeypadBackspace();
      } else if (e.key === 'Escape') {
        setPasswordModalOpen(false);
      } else if (e.key === 'Enter') {
        validatePasscode(passcode);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [passwordModalOpen, passcode, passcodeVerified]);

  // Curated Couple Photos Museum Exhibit List
  const coupleMuseumPhotos = [
    {
      id: 'm1',
      img: '/assets/Couple photos/Couples (rose hiding face).jpg',
      title: 'The Rose Thief',
      caption: "Hiding behind flowers like you didn't just steal my whole heart.",
      sticker: '/assets/flowers/bouquet.png',
      dateStamp: 'Chapter 01',
      rotation: -2.5
    },
    {
      id: 'm2',
      img: '/assets/Couple photos/Flowers in head.jpg',
      title: 'Crowning My Human',
      caption: 'Flower crown era was peak unconditional happiness.',
      sticker: '/assets/flowers/Pink flower.png',
      dateStamp: 'Chapter 02',
      rotation: 2
    },
    {
      id: 'm3',
      img: '/assets/Couple photos/Head patting cute.jpg',
      title: 'Gentle Chaos',
      caption: 'The only person on earth allowed to mess up my hair.',
      sticker: '/assets/stickers/cutestwithbouquet.png',
      dateStamp: 'Chapter 03',
      rotation: -1.5
    },
    {
      id: 'm4',
      img: '/assets/Couple photos/Kicking.jpg',
      title: 'Partners In Crime',
      caption: 'Zero seriousness, 100% mutual unhinged laughter forever.',
      sticker: '/assets/cat/birthdaycatwithflowers.png',
      dateStamp: 'Chapter 04',
      rotation: 3
    },
    {
      id: 'm5',
      img: '/assets/Couple photos/Piggy ride.jpg',
      title: 'Carrying The World',
      caption: 'Wherever life takes us, you will never have to walk alone.',
      sticker: '/assets/cat/catwiththreebouquet.png',
      dateStamp: 'Chapter 05',
      rotation: -2
    }
  ];

  // Continuous celebratory confetti cannons
  const triggerConfettiCannons = () => {
    try {
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 40, spread: 360, ticks: 80, zIndex: 999999 };

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 60 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.15, y: 0.55 }, colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8', '#FFB703', '#FB8500'] });
        confetti({ ...defaults, particleCount, origin: { x: 0.85, y: 0.55 }, colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8', '#FFB703', '#FB8500'] });
      }, 200);
    } catch (e) { }
  };

  // Comprehensive Replay Reset
  const handleReplay = () => {
    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
    if (voiceNoteAudioRef.current) {
      voiceNoteAudioRef.current.pause();
      voiceNoteAudioRef.current.currentTime = 0;
    }
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
    setPasswordModalOpen(false);
    setPasscode("");
    setPasscodeFeedback("");
    setPasscodeVerified(false);
    setLetterUnsealed(false);
    setIsPlayingAudio(false);
    setLovedPhotos({});
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
      try { confetti({ particleCount: 80, spread: 70 }); } catch (e) { }
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
      try { confetti({ particleCount: 110, spread: 80 }); } catch (e) { }
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
    if (quizFeedback) return; // Allow user to read the message for 2 seconds
    playSuccess();
    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);

    if (quizStep === 1) {
      setQuizFeedback("Correct.");
      quizTimerRef.current = setTimeout(() => {
        setQuizFeedback("");
        setNoButtonPos({ x: 0, y: 0 });
        setQuizStep(2);
      }, 1500);
    } else if (quizStep === 2) {
      setQuizFeedback("Correct. But aging like absolute royalty.");
      quizTimerRef.current = setTimeout(() => {
        setQuizFeedback("");
        setNoButtonPos({ x: 0, y: 0 });
        setQuizStep(3);
      }, 1500);
    } else if (quizStep === 3) {
      setQuizFeedback("Correct. 100% verified by universal law.");
      quizTimerRef.current = setTimeout(() => {
        setQuizFeedback("");
        setQuizStep(1);
        setCurrentStage(5);
        triggerConfettiCannons();
      }, 1500);
    }
  };

  // --- Voice Note Audio Player Handler ---
  const handleToggleVoiceNote = () => {
    if (!voiceNoteAudioRef.current) {
      voiceNoteAudioRef.current = new Audio('/assets/Voice notes/Vaazhanum Baththa-Downringtone.com.mp3');
      voiceNoteAudioRef.current.onended = () => {
        setIsPlayingAudio(false);
      };
    }

    if (isPlayingAudio) {
      voiceNoteAudioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      playSparkle();
      voiceNoteAudioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((err) => {
        console.warn('Audio play notice:', err);
        setIsPlayingAudio(true);
      });
    }
  };

  // --- Keypad Passcode Verification Handlers ---
  const handleKeypadPress = (digit) => {
    if (passcodeVerified) return;
    playPop();
    if (passcode.length < 4) {
      const nextCode = passcode + digit;
      setPasscode(nextCode);
      setPasscodeFeedback("");
      if (nextCode.length === 4) {
        validatePasscode(nextCode);
      }
    }
  };

  const handleKeypadBackspace = () => {
    if (passcodeVerified) return;
    playPop();
    setPasscode((prev) => prev.slice(0, -1));
    setPasscodeFeedback("");
  };

  const handleKeypadClear = () => {
    if (passcodeVerified) return;
    playPop();
    setPasscode("");
    setPasscodeFeedback("");
  };

  const validatePasscode = (code) => {
    if (code.length === 4) {
      setPasscodeVerified(true);
      playFanfare();
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8']
        });
      } catch (err) { }
      setPasscodeFeedback("Passcode Verified! Unsealing confidential note...");
      setTimeout(() => {
        setPasswordModalOpen(false);
        setLetterUnsealed(true);
        setPasscodeVerified(false);
        setPasscode("");
      }, 850);
    } else {
      playPop();
      setPasscodeFeedback("Enter 4-digit date & month (DDMM)...");
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
                "Your wish has been officially recorded in the universe."
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
          {showPhotoMuseum ? (
            /* ========================================================
                THE PHOTO MUSEUM SUB-PAGE (WITH FALLING HEARTS)
               ======================================================== */
            <motion.div
              key="photoMuseum"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{ width: '100%' }}
            >
              {/* RAINING HEARTS PARTICLES IN PHOTO MUSEUM */}
              <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: `${(i * 4.2) % 100}vw`, opacity: 0.85, scale: 0.6 + (i % 5) * 0.2 }}
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

              {/* Top Back Button */}
              <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                <motion.button
                  onClick={() => { playPop(); setShowPhotoMuseum(false); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'rgba(255, 217, 194, 0.15)',
                    border: '1px solid rgba(255, 217, 194, 0.3)',
                    color: 'var(--color-peach-primary)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  <ArrowLeft size={18} /> Back to Birthday Capsule
                </motion.button>
              </div>

              {/* Museum Header */}
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(255, 217, 194, 0.12)',
                  border: '1px solid rgba(255, 217, 194, 0.25)',
                  color: 'var(--color-peach-primary)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  <Sparkles size={14} /> ✦ THE SACRED PHOTO MUSEUM ✦
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
                  color: 'var(--color-peach-primary)',
                  fontStyle: 'italic',
                  margin: '4px 0 8px'
                }}>
                  "A Living Archive of Our Favorite Stolen Moments"
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', maxWidth: '580px', margin: '0 auto' }}>
                  Hover over each portrait to relive our favorite memories. Tap any frame to leave a heart.
                </p>
              </div>

              {/* Staggered Museum Polaroids Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '26px',
                padding: '10px 0'
              }}>
                {coupleMuseumPhotos.map((photo, idx) => {
                  const isLoved = !!lovedPhotos[photo.id];
                  return (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        rotate: 0,
                        zIndex: 20,
                        boxShadow: '0 20px 45px rgba(255, 217, 194, 0.35)'
                      }}
                      onClick={() => {
                        playSparkle();
                        setLovedPhotos((prev) => ({ ...prev, [photo.id]: !prev[photo.id] }));
                        try {
                          confetti({
                            particleCount: 25,
                            spread: 45,
                            origin: { y: 0.7 },
                            colors: ['#FFD9C2', '#8D0B0B']
                          });
                        } catch (e) { }
                      }}
                      style={{
                        backgroundColor: '#FFF4EB',
                        color: 'var(--color-burgundy-dark)',
                        borderRadius: '18px',
                        padding: '16px 14px 20px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
                        border: '1.5px solid rgba(141, 11, 11, 0.15)',
                        transform: `rotate(${photo.rotation}deg)`,
                        transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      {/* Top Washi Tape Accent */}
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '42px',
                        height: '14px',
                        backgroundColor: 'rgba(255, 217, 194, 0.75)',
                        borderRadius: '2px',
                        border: '1px solid rgba(141, 11, 11, 0.2)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                        zIndex: 5
                      }} />

                      {/* Cute Asset Sticker Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '-14px',
                        right: '-10px',
                        width: '42px',
                        height: '42px',
                        pointerEvents: 'none',
                        zIndex: 6
                      }}>
                        <img
                          src={photo.sticker}
                          alt="Cute Sticker"
                          style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                        />
                      </div>

                      {/* Picture Frame */}
                      <div style={{
                        width: '100%',
                        height: '210px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#1E0202',
                        position: 'relative',
                        marginBottom: '14px'
                      }}>
                        <motion.img
                          src={photo.img}
                          alt={photo.title}
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        {/* Chapter Badge */}
                        <span style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '8px',
                          backgroundColor: 'rgba(18, 1, 1, 0.75)',
                          color: 'var(--color-peach-primary)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.05em'
                        }}>
                          {photo.dateStamp}
                        </span>

                        {/* Loved Heart Badge */}
                        {isLoved && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              left: '8px',
                              backgroundColor: '#8D0B0B',
                              color: '#FFF4EB',
                              borderRadius: '50%',
                              width: '28px',
                              height: '28px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                            }}
                          >
                            <Heart size={14} fill="#FFF4EB" color="#FFF4EB" />
                          </motion.div>
                        )}
                      </div>

                      {/* Polaroid Caption & Details */}
                      <div style={{ textAlign: 'left', padding: '0 4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <div style={{
                            fontFamily: 'var(--font-handwriting)',
                            fontSize: '1.45rem',
                            fontWeight: 700,
                            color: '#8D0B0B'
                          }}>
                            {photo.title}
                          </div>
                          <span style={{ color: isLoved ? '#8D0B0B' : '#baa', display: 'flex', alignItems: 'center' }}>
                            <Heart size={18} fill={isLoved ? '#8D0B0B' : 'none'} />
                          </span>
                        </div>
                        <p style={{
                          fontSize: '0.82rem',
                          color: '#4A0E0E',
                          lineHeight: 1.45,
                          margin: '0 0 6px',
                          fontStyle: 'italic'
                        }}>
                          "{photo.caption}"
                        </p>
                        <span style={{ fontSize: '0.68rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          (Tap frame to heart)
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Back Button */}
              <div style={{ marginTop: '36px', textAlign: 'center' }}>
                <motion.button
                  onClick={() => { playPop(); setShowPhotoMuseum(false); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-peach-primary)',
                    color: 'var(--color-burgundy-dark)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-glow)'
                  }}
                >
                  <ArrowLeft size={18} /> Back to Birthday Capsule
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ========================================================
                MAIN BIRTHDAY CAPSULE (VOICE NOTE, MOMENTS BUTTON, STAR UNLOCK)
               ======================================================== */
            <motion.div
              key="mainCapsule"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              style={{ width: '100%' }}
            >
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

              {/* Voice Note Player (Plays Vaazhanum Baththa-Downringtone.com.mp3) */}
              <div style={{
                backgroundColor: 'var(--color-burgundy-primary)',
                borderRadius: '20px',
                padding: '18px 24px',
                border: '1.5px solid var(--color-peach-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '26px',
                boxShadow: 'var(--shadow-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    type="button"
                    onClick={handleToggleVoiceNote}
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
                      cursor: 'pointer',
                      boxShadow: isPlayingAudio ? '0 0 20px rgba(255, 217, 194, 0.6)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isPlayingAudio ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
                  </button>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-ivory)' }}>
                      ♡ a little piece of my heart.mp3
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-peach-soft)' }}>
                      {isPlayingAudio ? "Playing secret birthday voice note..." : "Tap to play secret voice note"}
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

              {/* View Our Moments Button */}
              <div style={{ marginBottom: '32px' }}>
                <motion.button
                  onClick={() => {
                    playSparkle();
                    setShowPhotoMuseum(true);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 32px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-burgundy-primary)',
                    border: '2px solid var(--color-peach-primary)',
                    color: 'var(--color-peach-primary)',
                    boxShadow: '0 0 25px rgba(255, 217, 194, 0.35)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    letterSpacing: '0.04em'
                  }}
                >
                  <Sparkles size={18} />
                  <span>View Our Moments 📸 →</span>
                </motion.button>
              </div>

              {/* Glowing Star Passcode Button to Unseal Secret Letter */}
              {!letterUnsealed && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    margin: '12px auto 32px',
                    textAlign: 'center',
                    zIndex: 30
                  }}
                >
                  <motion.div
                    onClick={() => { playSparkle(); setPasswordModalOpen(true); }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
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
                      margin: '0 auto 14px',
                      cursor: 'pointer'
                    }}
                  >
                    <Star size={46} fill="var(--color-peach-primary)" color="var(--color-peach-primary)" />
                  </motion.div>

                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    color: 'var(--color-peach-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    ✦ Tap The Star To Enter Passcode & Unseal Secret Letter ✦
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-peach-soft)', marginTop: '4px' }}>
                    Protected by your secret 4-digit code
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ========================================================
              PASSCODE KEYPAD MODAL (DATE & MONTH DDMM PASSCODE)
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
                  backgroundColor: 'rgba(15, 1, 1, 0.88)',
                  backdropFilter: 'blur(14px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px'
                }}
                onClick={() => setPasswordModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: 'var(--color-burgundy-dark)',
                    border: '2px solid var(--color-peach-primary)',
                    borderRadius: '26px',
                    padding: '32px 24px',
                    maxWidth: '380px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-glow)',
                    color: 'var(--color-ivory)',
                    position: 'relative'
                  }}
                >
                  <button
                    type="button"
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

                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--color-burgundy-primary)', border: '1.5px solid var(--color-peach-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <KeyRound size={24} color="var(--color-peach-primary)" />
                  </div>

                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Confidential Passcode Protocol
                  </span>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-peach-primary)', fontStyle: 'italic', margin: '8px 0 4px' }}>
                    "Enter Birthday Passcode"
                  </h3>

                  <p style={{ fontSize: '0.8rem', color: 'var(--color-peach-soft)', marginBottom: '14px' }}>
                    (Hint: Date & month of your birthday — e.g. DDMM)
                  </p>

                  {/* 4 PIN Slots */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', margin: '12px 0 16px' }}>
                    {[0, 1, 2, 3].map((index) => {
                      const isFilled = passcode.length > index;
                      return (
                        <motion.div
                          key={index}
                          animate={isFilled ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            width: '46px',
                            height: '52px',
                            borderRadius: '12px',
                            border: isFilled ? '2px solid var(--color-peach-primary)' : '2px dashed rgba(255, 217, 194, 0.3)',
                            backgroundColor: isFilled ? 'rgba(255, 217, 194, 0.2)' : 'rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                            fontWeight: 800,
                            color: 'var(--color-peach-primary)',
                            boxShadow: isFilled ? '0 0 18px rgba(255, 217, 194, 0.4)' : 'none'
                          }}
                        >
                          {isFilled ? passcode[index] : ''}
                        </motion.div>
                      );
                    })}
                  </div>

                  {passcodeFeedback && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontFamily: 'var(--font-handwriting)',
                        fontSize: '1.25rem',
                        color: passcodeFeedback.includes('Verified') ? '#4ade80' : 'var(--color-peach-primary)',
                        margin: '4px 0 12px'
                      }}
                    >
                      {passcodeFeedback}
                    </motion.p>
                  )}

                  {/* 3x4 Tactile Keypad */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    maxWidth: '280px',
                    margin: '0 auto 8px'
                  }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                      <motion.button
                        key={digit}
                        type="button"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => handleKeypadPress(String(digit))}
                        style={{
                          height: '52px',
                          borderRadius: '14px',
                          backgroundColor: 'rgba(255, 217, 194, 0.1)',
                          border: '1px solid rgba(255, 217, 194, 0.25)',
                          color: 'var(--color-ivory)',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-display)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {digit}
                      </motion.button>
                    ))}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleKeypadClear}
                      style={{
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: 'var(--color-peach-soft)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      CLEAR
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleKeypadPress("0")}
                      style={{
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(255, 217, 194, 0.1)',
                        border: '1px solid rgba(255, 217, 194, 0.25)',
                        color: 'var(--color-ivory)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        cursor: 'pointer'
                      }}
                    >
                      0
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleKeypadBackspace}
                      style={{
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: 'var(--color-peach-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Delete size={20} />
                    </motion.button>
                  </div>
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
