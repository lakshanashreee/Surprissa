import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Coffee, Gift, RotateCcw, ArrowRight, Award, Compass, Music, CheckCircle2, ChevronRight, Bookmark, Image as ImageIcon, Send, Star, MessageCircle, Home, Camera, Eye, Zap, ChevronLeft, Play, Pause, Lock, Key, Sparkle, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const ApologyLiveExperience = ({ recipientName = "Stacy", onComplete }) => {
  const { playPop, playSparkle, playSuccess, playFlame, playFanfare } = useAudio();

  // Experience Layers:
  // Layer 0: Dramatic Full-Screen Crying Mascot Hook (Emotional intro with instant CTA)
  // Layer 1: Putting My Pride Away: A Fresh Start & Three Sincere Promises
  // Layer 2: Hanging Wall Gallery of 5 Couple Picture Frames (Interactive Swings & Zooms)
  // Layer 3: 3 Luxury Gold Foil Peace Cards (Peel to Reveal Honest Vulnerable Truths)
  // Layer 4: The 10-Second Virtual Bear Hug Simulator (Press & Hold to Melt the Tension)
  // Layer 5: Grand Apology Vault & Wax-Sealed Sincere Love Letter
  const [currentLayer, setCurrentLayer] = useState(0);

  // ==========================================
  // LAYER 1: Realistic Apple Notes Typewriter State
  // ==========================================
  const noteLines = [
    { type: 'title', text: "a little note for you." },
    { type: 'body', text: "hey, i'm really sorry." },
    { type: 'body', text: "i know i can't undo what happened, and i wish i had handled things differently." },
    { type: 'body', text: "you mean so much to me, and the last thing i'd ever want is to be the reason you feel hurt." },
    { type: 'body', text: "i can't change what happened, but i can try to do better. and i want you to know that i mean that." },
    { type: 'closing', text: "take your time, okay? 🤍" },
    { type: 'closing', text: "when you're ready, tap next." }
  ];

  const [completedLineCount, setCompletedLineCount] = useState(0);
  const [currentLineCharCount, setCurrentLineCharCount] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (currentLayer !== 1 || isTypingDone) return;

    if (completedLineCount >= noteLines.length) {
      setIsTypingDone(true);
      return;
    }

    const currentLine = noteLines[completedLineCount];
    const targetText = currentLine.text;

    if (currentLineCharCount < targetText.length) {
      const char = targetText[currentLineCharCount];
      let delay = 12;

      if (char === ',') {
        delay = 80;
      } else if (char === '.' || char === '?' || char === '!') {
        delay = 140;
      } else {
        delay = 10 + Math.floor(Math.random() * 6);
      }

      const timer = setTimeout(() => {
        setCurrentLineCharCount(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // Line completed - snappy, natural pause before next line
      let pauseAfterLine = 240;
      if (completedLineCount === 0) {
        pauseAfterLine = 240;
      } else if (completedLineCount === 4) {
        pauseAfterLine = 380;
      } else if (completedLineCount === 5) {
        pauseAfterLine = 200;
      }

      const timer = setTimeout(() => {
        setCompletedLineCount(prev => prev + 1);
        setCurrentLineCharCount(0);
      }, pauseAfterLine);

      return () => clearTimeout(timer);
    }
  }, [currentLayer, completedLineCount, currentLineCharCount, isTypingDone]);

  const handleFastForwardNote = () => {
    if (!isTypingDone) {
      setCompletedLineCount(noteLines.length);
      setCurrentLineCharCount(0);
      setIsTypingDone(true);
    }
  };

  const renderLineText = (index) => {
    if (completedLineCount > index) {
      return noteLines[index].text;
    }
    if (completedLineCount === index) {
      return noteLines[index].text.slice(0, currentLineCharCount);
    }
    return '';
  };

  const isLineActive = (index) => {
    return completedLineCount === index && !isTypingDone;
  };

  // ==========================================
  // LAYER 2: Hanging Wall Gallery of 5 Portraits
  // ==========================================
  const [activeFrameIndex, setActiveFrameIndex] = useState(null);
  const [viewedFrames, setViewedFrames] = useState([]); // Empty initially; each clicked frame shows "you're the best"

  const galleryPortraits = [
    {
      id: 1,
      title: "I Miss That Smile",
      subtitle: "Chapter of Warmth",
      img: "/assets/Couple photos/Couples (rose hiding face).jpg",
      quote: `The world is 100x colder and dimmer when you're upset with me, ${recipientName}. Your smile is my daily fuel.`,
      frameColor: "#D4AF37",
      tilt: -4
    },
    {
      id: 2,
      title: "Please Don't Stay Mad",
      subtitle: "Gentle Moments",
      img: "/assets/Couple photos/Head patting cute.jpg",
      quote: `Look at us, ${recipientName}. We are meant to make each other laugh, not sad. I need my favorite human back.`,
      frameColor: "#E0A96D",
      tilt: 3
    },
    {
      id: 3,
      title: "I'm Genuinely So Sorry",
      subtitle: "Sincere Remorse",
      img: "/assets/Couple photos/Flowers in head.jpg",
      quote: `I hate that I caused you even one second of frustration, ${recipientName}. You deserve only peace and affection.`,
      frameColor: "#D4AF37",
      tilt: -2
    },
    {
      id: 4,
      title: "A Fresh Reset",
      subtitle: "Unconditional Laughter",
      img: "/assets/Couple photos/Kicking.jpg",
      quote: `No ego, just us. I promise to listen to ${recipientName} with an open heart and always choose you.`,
      frameColor: "#E0A96D",
      tilt: 4
    },
    {
      id: 5,
      title: "You & Me, Forever",
      subtitle: "Unbreakable Bond",
      img: "/assets/Couple photos/Piggy ride.jpg",
      quote: `Arguments come and go, but you are the only person I ever want to come home to, ${recipientName}. Always.`,
      frameColor: "#D4AF37",
      tilt: -3
    }
  ];

  const handleFrameClick = (idx) => {
    playPop();
    setActiveFrameIndex(idx);
    if (!viewedFrames.includes(idx)) {
      setViewedFrames(prev => [...prev, idx]);
    }
  };

  // ==========================================
  // LAYER 3: 3 Gold Foil Peace Cards (Peel & Reveal Secrets)
  // ==========================================
  const [peeledCards, setPeeledCards] = useState([]);

  const peaceCards = [
    {
      id: 1,
      tag: "THE UNFILTERED TRUTH",
      frontLabel: "Click to Peel Secret #1 ✦",
      secret: `Winning an argument means nothing to me if it makes you feel unheard, ${recipientName}. You matter more than being right.`,
      bgGradient: "linear-gradient(135deg, #FFD9C2 0%, #E6A98A 100%)",
      accent: "#8D0B0B"
    },
    {
      id: 2,
      tag: "WHAT I REALIZED",
      frontLabel: "Click to Peel Secret #2 ✦",
      secret: `Life is way too short and too precious to waste even one quiet evening apart from ${recipientName}'s laughter.`,
      bgGradient: "linear-gradient(135deg, #FFF1E8 0%, #FFD9C2 100%)",
      accent: "#8D0B0B"
    },
    {
      id: 3,
      tag: "MY SOLEMN PROMISE",
      frontLabel: "Click to Peel Secret #3 ✦",
      secret: `I will choose patience over defensiveness, empathy over pride, and loving you, ${recipientName}, over everything else.`,
      bgGradient: "linear-gradient(135deg, #FFD9C2 0%, #F3C4AA 100%)",
      accent: "#8D0B0B"
    }
  ];

  const handlePeelCard = (id) => {
    if (peeledCards.includes(id)) return;
    playSparkle();
    playPop();
    setPeeledCards(prev => [...prev, id]);
  };

  const allCardsPeeled = peeledCards.length === 3;

  // ==========================================
  // LAYER 4: 10-Second Virtual Bear Hug Simulator (Hold to Charge)
  // ==========================================
  const [hugProgress, setHugProgress] = useState(0);
  const [isHoldingHug, setIsHoldingHug] = useState(false);
  const [hugCompleted, setHugCompleted] = useState(false);
  const hugTimerRef = useRef(null);

  const startHugCharge = () => {
    if (hugCompleted) return;
    setIsHoldingHug(true);
    playPop();

    hugTimerRef.current = setInterval(() => {
      setHugProgress(prev => {
        if (prev >= 100) {
          clearInterval(hugTimerRef.current);
          setIsHoldingHug(false);
          setHugCompleted(true);
          playSuccess();
          playFanfare();
          triggerConfettiCannons();
          setTimeout(() => {
            setCurrentLayer(5);
          }, 1500);
          return 100;
        }
        playSparkle();
        return prev + 10;
      });
    }, 240); // 10 steps * 240ms = ~2.4s charge of pure warmth
  };

  const stopHugCharge = () => {
    if (hugCompleted) return;
    setIsHoldingHug(false);
    if (hugTimerRef.current) {
      clearInterval(hugTimerRef.current);
    }
    // Gently reset if released early
    setHugProgress(0);
  };

  // ==========================================
  // LAYER 5: Grand Apology Vault
  // ==========================================
  const [waxSealBroken, setWaxSealBroken] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [forgiven, setForgiven] = useState(false);
  const songAudioRef = useRef(null);

  useEffect(() => {
    if (isPlayingSong) {
      if (songAudioRef.current) {
        songAudioRef.current.play().catch(() => {});
      }
    } else {
      if (songAudioRef.current) {
        songAudioRef.current.pause();
      }
    }
  }, [isPlayingSong]);

  const handleBreakSeal = () => {
    if (waxSealBroken) return;
    playFanfare();
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
    setWaxSealBroken(true);
  };

  const handleForgiveness = () => {
    playFanfare();
    playSuccess();
    triggerConfettiCannons();
    setForgiven(true);
  };

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

  const handleReplay = () => {
    playPop();
    if (songAudioRef.current) {
      songAudioRef.current.pause();
      songAudioRef.current.currentTime = 0;
    }
    setCurrentLayer(0);
    setCompletedLineCount(0);
    setCurrentLineCharCount(0);
    setIsTypingDone(false);
    setActiveFrameIndex(null);
    setViewedFrames([]);
    setPeeledCards([]);
    setHugProgress(0);
    setIsHoldingHug(false);
    setHugCompleted(false);
    setWaxSealBroken(false);
    setIsPlayingSong(false);
    setForgiven(false);
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
      padding: 'clamp(14px, 3.5vw, 36px) clamp(12px, 3vw, 24px) clamp(32px, 6vw, 60px)',
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

      {/* Background Audio Player Element for Real Music */}
      <audio ref={songAudioRef} src="/assets/Voice notes/Vaazhanum Baththa-Downringtone.com.mp3" loop />

      {/* Floating Transparent Flower & Mascot Stickers (Visible on Laptops/Desktops > 900px, hidden on Phones to eliminate overlap) */}
      {currentLayer > 1 && (
        <>
          <div style={{ top: '24px', left: '24px', width: 'clamp(65px, 8vw, 115px)' }} className="floating-decor-sticker animate-float">
            <img src="/assets/sorry/cutestcryyying.png" alt="Crying Mascot" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
          </div>

          <div style={{ top: '24px', right: '24px', width: 'clamp(70px, 8vw, 125px)' }} className="floating-decor-sticker animate-float-delayed">
            <img src="/assets/flowers/Pink flower.png" alt="Flower Decor" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
          </div>

          <div style={{ bottom: '24px', left: '24px', width: 'clamp(75px, 9vw, 130px)' }} className="floating-decor-sticker animate-float-delayed">
            <img src="/assets/cat/birthdaycatwithflowers.png" alt="Cat Mascot" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
          </div>

          <div style={{ bottom: '24px', right: '24px', width: 'clamp(65px, 8vw, 110px)' }} className="floating-decor-sticker animate-float">
            <img src="/assets/stickers/cutestwithbouquet.png" alt="Cute Sticker" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
          </div>
        </>
      )}

      {/* ========================================================
          LAYER 0: DRAMATIC FULL-SCREEN CRYING MASCOT HOOK 🥺💔
         ======================================================== */}
      {currentLayer === 0 && (
        <motion.div
          key="layer0"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            textAlign: 'center',
            maxWidth: '740px',
            width: '100%',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          {/* Big Hovering & Quivering Crying Mascot */}
          <motion.div
            animate={{
              y: [-12, 12, -12],
              scale: [1, 1.05, 1],
              rotate: [-2, 2, -2]
            }}
            transition={{
              repeat: Infinity,
              duration: 3.2,
              ease: 'easeInOut'
            }}
            style={{
              position: 'relative',
              width: 'clamp(220px, 38vw, 320px)',
              marginBottom: '28px'
            }}
          >
            {/* Glowing Soft Heart Aura */}
            <div style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 217, 194, 0.35) 0%, rgba(141, 11, 11, 0.2) 60%, transparent 80%)',
              filter: 'blur(20px)',
              zIndex: 1
            }} />

            <img
              src="/assets/sorry/cutestcryyying.png"
              alt="Crying Mascot"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.6))',
                position: 'relative',
                zIndex: 2
              }}
            />
          </motion.div>

          {/* Emotional Headline & Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-peach-primary)',
              backgroundColor: 'rgba(141, 11, 11, 0.6)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255,217,194,0.3)',
              display: 'inline-block',
              marginBottom: '14px'
            }}>
              ✦ AN IMPORTANT MESSAGE FOR {recipientName.toUpperCase()} ✦
            </span>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 6.5vw, 4.2rem)',
              color: 'var(--color-peach-primary)',
              fontStyle: 'italic',
              margin: '0 0 10px',
              lineHeight: 1.15,
              textShadow: '0 4px 25px rgba(0,0,0,0.5)'
            }}>
              "I'm Really, Really Sorry, {recipientName}..."
            </h1>

            <p style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
              color: 'var(--color-ivory)',
              maxWidth: '580px',
              margin: '0 auto 26px',
              lineHeight: 1.4
            }}>
              "Please don't be upset with me, {recipientName}... Give me just 2 minutes to explain and make it up to you."
            </p>

            {/* Direct, Beautiful Action Button */}
            <div style={{ marginTop: '16px' }}>
              <MagneticButton
                onClick={() => {
                  playPop();
                  setCurrentLayer(1);
                }}
                variant="primary"
                size="lg"
              >
                Hear Me Out, {recipientName} ❤️ →
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 1: REALISTIC APPLE NOTES APP INTERFACE 📝📱
         ======================================================== */}
      {currentLayer === 1 && (
        <motion.div
          key="layer1"
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -14 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            width: '100%',
            maxWidth: '414px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
            margin: '0 auto'
          }}
        >
          {/* Subtle Chapter Marker Above Phone */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 217, 194, 0.7)',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginBottom: '14px'
          }}>
            ✦ CHAPTER 1 ✦
          </div>

          {/* Exact Realistic iPhone Apple Notes Frame */}
          <div
            onClick={handleFastForwardNote}
            title={!isTypingDone ? "Tap to reveal note instantly" : ""}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '44px',
              border: '8px solid #1C1C1E',
              boxShadow: '0 28px 80px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif',
              color: '#1C1C1E',
              textAlign: 'left',
              minHeight: '620px',
              position: 'relative',
              cursor: isTypingDone ? 'default' : 'pointer'
            }}
          >
            {/* iOS Status Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 22px 6px',
              backgroundColor: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '-0.3px',
              color: '#000000',
              zIndex: 10
            }}>
              {/* Clock */}
              <span style={{ fontWeight: 600, fontSize: '14px' }}>9:41</span>

              {/* Dynamic Island Pill */}
              <div style={{
                width: '96px',
                height: '25px',
                backgroundColor: '#000000',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 9px'
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0d131f' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#111827', border: '1px solid #1f2937' }} />
              </div>

              {/* Cellular, Wi-Fi, Battery Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* Cellular Signal Bars */}
                <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                  <rect x="0" y="8" width="3" height="3" rx="0.8" fill="#000000" />
                  <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.8" fill="#000000" />
                  <rect x="9" y="3" width="3" height="8" rx="0.8" fill="#000000" />
                  <rect x="13.5" y="0" width="3" height="11" rx="0.8" fill="#000000" />
                </svg>
                {/* Wi-Fi Icon */}
                <svg width="15" height="11" viewBox="0 0 15 11" fill="#000000">
                  <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" />
                  <path d="M3.75 6.75C4.78 5.72 6.13 5.09 7.5 5.09C8.87 5.09 10.22 5.72 11.25 6.75C11.54 7.04 12.02 7.04 12.31 6.75C12.6 6.46 12.6 5.98 12.31 5.69C11.02 4.4 9.3 3.63 7.5 3.63C5.7 3.63 3.98 4.4 2.69 5.69C2.4 5.98 2.4 6.46 2.69 6.75C2.98 7.04 3.46 7.04 3.75 6.75Z" />
                  <path d="M0.44 3.44C2.36 1.52 4.93 0.44 7.5 0.44C10.07 0.44 12.64 1.52 14.56 3.44C14.85 3.73 15.33 3.73 15.62 3.44C15.91 3.15 15.91 2.67 15.62 2.38C13.43 0.19 10.51 -0.99 7.5 -0.99C4.49 -0.99 1.57 0.19 -0.62 2.38C-0.91 2.67 -0.91 3.15 -0.62 3.44C-0.33 3.73 0.15 3.73 0.44 3.44Z" />
                </svg>
                {/* Battery Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                  <div style={{
                    width: '21px',
                    height: '11px',
                    border: '1.5px solid #000000',
                    borderRadius: '3.5px',
                    padding: '1.5px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <div style={{ width: '82%', height: '100%', backgroundColor: '#000000', borderRadius: '1.5px' }} />
                  </div>
                  <div style={{ width: '1.5px', height: '4px', backgroundColor: '#000000', borderTopRightRadius: '1px', borderBottomRightRadius: '1px' }} />
                </div>
              </div>
            </div>

            {/* iOS Notes Navigation Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 18px 10px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
              {/* Back Link in Apple Notes Amber */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#D4A017',
                fontSize: '17px',
                fontWeight: 400,
                letterSpacing: '-0.3px',
                cursor: 'default'
              }}>
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none">
                  <path d="M9.5 1.5L1.5 9L9.5 16.5" stroke="#D4A017" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Notes</span>
              </div>

              {/* Action Icons in Apple Notes Amber */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', color: '#D4A017' }}>
                {/* Share Sheet Icon */}
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <path d="M9 1V13M9 1L4 6M9 1L14 6" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 8.5V19C1 20.1 1.9 21 3 21H15C16.1 21 17 20.1 17 19V8.5" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Circle with Three Dots */}
                <div style={{
                  width: '23px',
                  height: '23px',
                  borderRadius: '50%',
                  border: '1.8px solid #D4A017',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px'
                }}>
                  <div style={{ width: '2.5px', height: '2.5px', borderRadius: '50%', backgroundColor: '#D4A017' }} />
                  <div style={{ width: '2.5px', height: '2.5px', borderRadius: '50%', backgroundColor: '#D4A017' }} />
                  <div style={{ width: '2.5px', height: '2.5px', borderRadius: '50%', backgroundColor: '#D4A017' }} />
                </div>
              </div>
            </div>

            {/* Note Content Canvas */}
            <div style={{
              flex: 1,
              padding: '16px 22px 24px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Note Date Header */}
              <div style={{
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 400,
                color: '#8E8E93',
                marginBottom: '16px',
                letterSpacing: '-0.2px'
              }}>
                Today at 9:41 AM
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#000000',
                lineHeight: 1.25,
                margin: '0 0 16px',
                letterSpacing: '-0.4px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                {renderLineText(0)}
                {isLineActive(0) && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '2.2px',
                      height: '1.15em',
                      backgroundColor: '#D4A017',
                      marginLeft: '2px',
                      verticalAlign: 'text-bottom',
                      animation: 'appleNotesBlink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                  />
                )}
              </h2>

              {/* Body Paragraphs */}
              {completedLineCount >= 1 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  fontSize: '15.5px',
                  lineHeight: 1.55,
                  color: '#1C1C1E',
                  letterSpacing: '-0.25px',
                  fontWeight: 400
                }}>
                  {/* Paragraph 1 */}
                  <p style={{ margin: 0 }}>
                    {renderLineText(1)}
                    {isLineActive(1) && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '2px',
                          height: '1.15em',
                          backgroundColor: '#D4A017',
                          marginLeft: '2px',
                          verticalAlign: 'text-bottom',
                          animation: 'appleNotesBlink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }}
                      />
                    )}
                  </p>

                  {/* Paragraph 2 */}
                  {completedLineCount >= 2 && (
                    <p style={{ margin: 0 }}>
                      {renderLineText(2)}
                      {isLineActive(2) && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '2px',
                            height: '1.15em',
                            backgroundColor: '#D4A017',
                            marginLeft: '2px',
                            verticalAlign: 'text-bottom',
                            animation: 'appleNotesBlink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                          }}
                        />
                      )}
                    </p>
                  )}

                  {/* Paragraph 3 */}
                  {completedLineCount >= 3 && (
                    <p style={{ margin: 0 }}>
                      {renderLineText(3)}
                      {isLineActive(3) && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '2px',
                            height: '1.15em',
                            backgroundColor: '#D4A017',
                            marginLeft: '2px',
                            verticalAlign: 'text-bottom',
                            animation: 'appleNotesBlink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                          }}
                        />
                      )}
                    </p>
                  )}

                  {/* Paragraph 4 */}
                  {completedLineCount >= 4 && (
                    <p style={{ margin: 0 }}>
                      {renderLineText(4)}
                      {isLineActive(4) && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '2px',
                            height: '1.15em',
                            backgroundColor: '#D4A017',
                            marginLeft: '2px',
                            verticalAlign: 'text-bottom',
                            animation: 'appleNotesBlink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                          }}
                        />
                      )}
                    </p>
                  )}
                </div>
              )}

              {/* Subtle Closing Lines (revealed after main message) */}
              {completedLineCount >= 5 && (
                <div style={{
                  marginTop: '22px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {/* Line 5 */}
                  <p style={{
                    margin: 0,
                    fontSize: '15px',
                    color: '#3A3A3C',
                    lineHeight: 1.5,
                    letterSpacing: '-0.2px'
                  }}>
                    {renderLineText(5)}
                    {isLineActive(5) && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '2px',
                          height: '1.15em',
                          backgroundColor: '#D4A017',
                          marginLeft: '2px',
                          verticalAlign: 'text-bottom',
                          animation: 'appleNotesBlink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }}
                      />
                    )}
                  </p>

                  {/* Line 6 */}
                  {completedLineCount >= 6 && (
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: '#8E8E93',
                      lineHeight: 1.5,
                      letterSpacing: '-0.2px'
                    }}>
                      {renderLineText(6)}
                      {(isLineActive(6) || isTypingDone) && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '2px',
                            height: '1.15em',
                            backgroundColor: '#D4A017',
                            marginLeft: '2px',
                            verticalAlign: 'text-bottom',
                            animation: 'appleNotesBlink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                          }}
                        />
                      )}
                    </p>
                  )}
                </div>
              )}

              {/* Minimal Next → Button (appears ONLY after text finishes) */}
              {isTypingDone && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{
                    marginTop: '22px',
                    display: 'flex',
                    justifyContent: 'flex-start'
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playPop();
                      setCurrentLayer(2);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '9px 20px',
                      backgroundColor: '#1C1C1E',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '-0.2px',
                      cursor: 'pointer',
                      boxShadow: '0 3px 12px rgba(0,0,0,0.14)',
                      transition: 'all 0.2s ease',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#D4A017';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1C1C1E';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>Next</span>
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}
            </div>

            {/* iOS Notes Bottom Toolbar */}
            <div style={{
              marginTop: 'auto',
              backgroundColor: '#F9F9FB',
              borderTop: '1px solid #E5E5EA',
              padding: '12px 24px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              {/* Toolbar Icons in Apple Notes Gold */}
              <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#D4A017'
              }}>
                {/* Checklist Icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>

                {/* Camera Icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>

                {/* Markup / Pencil Icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                  <path d="M2 2l7.586 7.586"/>
                  <circle cx="11" cy="11" r="2"/>
                </svg>

                {/* Compose Icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>

              {/* iOS Home Indicator Bar */}
              <div style={{
                width: '134px',
                height: '5px',
                backgroundColor: '#000000',
                borderRadius: '100px',
                opacity: 0.85
              }} />
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 2: WALL GALLERY OF 5 HANGING PICTURE FRAMES 🖼️✨
         ======================================================== */}
      {currentLayer === 2 && (
        <motion.div
          key="layer2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{ width: '100%', maxWidth: '960px', textAlign: 'center', zIndex: 10 }}
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
            <ImageIcon size={18} /> STEP 2 ✦ THE HANGING WALL GALLERY
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.8vw, 3rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '6px',
            lineHeight: 1.2
          }}>
            "5 Reasons I Never Want To Lose You, {recipientName}"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '28px' }}>
            Tap each hanging picture frame to open our special moments and see why {recipientName} means everything to me.
          </p>

          {/* Wall Gallery Arena with Hanging Wires */}
          <div style={{
            backgroundColor: '#0D0101',
            borderRadius: '28px',
            padding: 'clamp(22px, 4vw, 36px) clamp(10px, 2.5vw, 18px) clamp(20px, 4vw, 30px)',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '26px',
            position: 'relative'
          }}>
            {/* Top Gallery Rail */}
            <div style={{
              width: '92%',
              height: '6px',
              backgroundColor: '#D4AF37',
              borderRadius: '3px',
              margin: '0 auto 20px',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)'
            }} />

            {/* 5 Hanging Picture Frames Grid (2 columns on mobile, fluid on desktop) */}
            <div className="gallery-frames-grid">
              {galleryPortraits.map((portrait, idx) => {
                const isSelected = activeFrameIndex === idx;
                const isViewed = viewedFrames.includes(idx);

                return (
                  <div key={portrait.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Hanging Wire from Rail */}
                    <div style={{
                      width: '2px',
                      height: '24px',
                      backgroundColor: 'rgba(255, 217, 194, 0.4)',
                      marginBottom: '-2px'
                    }} />

                    {/* Brass Wall Pin */}
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#D4AF37',
                      border: '2px solid #2B0404',
                      marginBottom: '-5px',
                      zIndex: 3
                    }} />

                    {/* Hanging Frame with Subtle Pendulum Sway */}
                    <motion.div
                      onClick={() => handleFrameClick(idx)}
                      animate={{
                        rotate: isSelected ? 0 : [portrait.tilt, -portrait.tilt, portrait.tilt]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.8 + idx * 0.4,
                        ease: 'easeInOut'
                      }}
                      whileHover={{ scale: 1.05, rotate: 0, y: -4 }}
                      style={{
                        width: '100%',
                        backgroundColor: '#FFF4EB',
                        color: '#2B0404',
                        padding: 'clamp(10px, 2.5vw, 12px) clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)',
                        borderRadius: '16px',
                        boxShadow: isSelected ? '0 15px 35px rgba(255, 217, 194, 0.6)' : '0 8px 24px rgba(0,0,0,0.7)',
                        border: isSelected ? '3px solid #8D0B0B' : '2.5px solid #D4AF37',
                        cursor: 'pointer',
                        textAlign: 'center',
                        position: 'relative'
                      }}
                    >
                      {/* Frame Tag */}
                      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#8D0B0B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        FRAME #{idx + 1}
                      </div>

                      {/* Image Inside Frame */}
                      <div style={{
                        height: 'clamp(95px, 25vw, 115px)',
                        width: '100%',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={portrait.img}
                          alt={portrait.title}
                          style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.25))'
                          }}
                        />
                      </div>

                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)', color: '#8D0B0B', fontStyle: 'italic', margin: 0, lineHeight: 1.25 }}>
                        {portrait.title}
                      </h4>

                      {/* Frame Status: "Tap to view" initially, permanently turns into "you're the best ❤️" once clicked */}
                      <div style={{
                        marginTop: '8px',
                        fontSize: 'clamp(0.7rem, 2vw, 0.74rem)',
                        fontWeight: 800,
                        color: isViewed ? '#8D0B0B' : '#777',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.25s ease'
                      }}>
                        {isViewed ? "you're the best ❤️" : "Tap to view"}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Active Selected Portrait Story Card (Lightbox Display) */}
            {activeFrameIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '24px',
                  backgroundColor: 'var(--color-burgundy-primary)',
                  border: '1.5px solid var(--color-peach-primary)',
                  borderRadius: '20px',
                  padding: 'clamp(14px, 3.5vw, 20px) clamp(14px, 3.5vw, 24px)',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(12px, 3vw, 18px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ width: 'clamp(48px, 12vw, 60px)', height: 'clamp(48px, 12vw, 60px)', borderRadius: '12px', backgroundColor: '#FFF4EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={galleryPortraits[activeFrameIndex].img} alt="Thumb" style={{ maxHeight: '85%', maxWidth: '85%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.05rem, 2.8vw, 1.25rem)', color: '#FFD9C2', fontStyle: 'italic', margin: '0 0 4px' }}>
                    "{galleryPortraits[activeFrameIndex].title}"
                  </h4>
                  <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: 'clamp(1.15rem, 3.2vw, 1.35rem)', color: '#FAF4EE', margin: 0, lineHeight: 1.35 }}>
                    "{galleryPortraits[activeFrameIndex].quote}"
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <MagneticButton onClick={() => { playSuccess(); setCurrentLayer(3); }} variant="primary" size="md">
            Unlock 3 Golden Peace Cards →
          </MagneticButton>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 3: 3 LUXURY GOLD FOIL PEACE CARDS (PEEL & REVEAL SECRETS) 🪙✨
         ======================================================== */}
      {currentLayer === 3 && (
        <motion.div
          key="layer3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{ width: '100%', maxWidth: '820px', textAlign: 'center', zIndex: 10 }}
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
            <Sparkles size={18} /> STEP 3 ✦ GOLDEN PEACE CARDS
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.8vw, 3rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '6px',
            lineHeight: 1.2
          }}>
            "3 Honest Truths Straight From My Heart To {recipientName}"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '26px' }}>
            Tap each gold foil card to break the seal and reveal what I never want {recipientName} to forget.
          </p>

          {/* 3 Gold Foil Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '20px',
            marginBottom: '28px'
          }}>
            {peaceCards.map((card) => {
              const isPeeled = peeledCards.includes(card.id);
              return (
                <motion.div
                  key={card.id}
                  onClick={() => handlePeelCard(card.id)}
                  whileHover={!isPeeled ? { scale: 1.04, y: -6 } : {}}
                  style={{
                    backgroundColor: isPeeled ? '#FFF4EB' : 'var(--color-burgundy-primary)',
                    color: isPeeled ? '#2B0404' : 'var(--color-peach-primary)',
                    border: isPeeled ? '2.5px solid #8D0B0B' : '2px solid var(--color-peach-primary)',
                    borderRadius: '22px',
                    padding: '24px 20px',
                    minHeight: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isPeeled ? '0 12px 35px rgba(255, 217, 194, 0.4)' : '0 8px 25px rgba(0,0,0,0.5)',
                    cursor: isPeeled ? 'default' : 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'left'
                  }}
                >
                  {/* Card Header Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      backgroundColor: isPeeled ? '#8D0B0B' : '#2B0404',
                      color: isPeeled ? '#FFF4EB' : 'var(--color-peach-primary)',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em'
                    }}>
                      ✦ {card.tag}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {isPeeled ? <Mail size={16} /> : <Lock size={16} />}
                    </span>
                  </div>

                  {/* Body: Sealed or Unsealed Secret */}
                  {!isPeeled ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 217, 194, 0.15)',
                        border: '1.5px dashed var(--color-peach-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        color: 'var(--color-peach-primary)'
                      }}>
                        <Sparkle size={24} />
                      </div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-peach-primary)' }}>
                        {card.frontLabel}
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.45rem', lineHeight: 1.45, color: '#180202', margin: '12px 0 0' }}>
                        "{card.secret}"
                      </p>
                    </motion.div>
                  )}

                  {/* Bottom Status */}
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isPeeled ? '#8D0B0B' : 'rgba(255,217,194,0.6)', textAlign: 'right' }}>
                    {isPeeled ? "✦ Unsealed & Stored in Memory" : "Tap to Unlock"}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <MagneticButton
            onClick={() => {
              if (allCardsPeeled) {
                playSuccess();
                setCurrentLayer(4);
              } else {
                playPop();
                setPeeledCards([1, 2, 3]);
                setTimeout(() => setCurrentLayer(4), 500);
              }
            }}
            variant="primary"
            size="md"
          >
            {allCardsPeeled ? `Charge Virtual 10-Second Bear Hug for ${recipientName} 🫂 →` : `Unlock All 3 & Proceed to Hug ${recipientName} →`}
          </MagneticButton>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 4: 10-SECOND VIRTUAL BEAR HUG SIMULATOR 🫂💖✨
         ======================================================== */}
      {currentLayer === 4 && (
        <motion.div
          key="layer4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{ textAlign: 'center', maxWidth: '740px', width: '100%', zIndex: 10 }}
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
            <Heart size={18} fill="#FFD9C2" /> STEP 4 ✦ VIRTUAL BEAR HUG SIMULATOR
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.8vw, 3rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '6px',
            lineHeight: 1.2
          }}>
            "Press & Hold To Give {recipientName} a Warm Bear Hug"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '26px' }}>
            Hold down on the glowing heart to charge a 10-second warm bear hug for {recipientName} and melt away all the tension.
          </p>

          {/* Virtual Hug Sensory Box */}
          <div style={{
            backgroundColor: isHoldingHug ? '#240202' : 'var(--color-burgundy-primary)',
            borderRadius: '28px',
            padding: '40px 24px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: isHoldingHug ? '0 0 60px rgba(255, 217, 194, 0.7)' : 'var(--shadow-glow)',
            marginBottom: '26px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.4s ease'
          }}>
            
            {/* Glowing Warm Aura Waves */}
            {isHoldingHug && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                style={{
                  position: 'absolute',
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 217, 194, 0.5) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              />
            )}

            {/* The Interactive Glowing Heart (Press and Hold Trigger) */}
            <motion.div
              onMouseDown={startHugCharge}
              onMouseUp={stopHugCharge}
              onMouseLeave={stopHugCharge}
              onTouchStart={startHugCharge}
              onTouchEnd={stopHugCharge}
              animate={isHoldingHug ? {
                scale: [1, 1.18, 1],
                rotate: [-2, 2, -2]
              } : { scale: 1 }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              whileTap={{ scale: 1.15 }}
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                backgroundColor: hugCompleted ? '#2E7D32' : '#8D0B0B',
                border: '3px solid #FFD9C2',
                boxShadow: isHoldingHug ? '0 0 40px #FFD9C2' : '0 0 20px rgba(255, 217, 194, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                touchAction: 'none',
                zIndex: 10,
                marginBottom: '24px',
                position: 'relative'
              }}
            >
              <Heart size={42} fill="#FFD9C2" color="#FFD9C2" />
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#FFD9C2', marginTop: '6px', letterSpacing: '0.05em' }}>
                {hugCompleted ? "HUGGED!" : isHoldingHug ? "HOLDING..." : "HOLD ME"}
              </span>
            </motion.div>

            {/* Hug Progress Bar */}
            <div style={{ width: '100%', maxWidth: '340px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 800, color: '#FFD9C2', marginBottom: '8px' }}>
                <span>{hugCompleted ? "Warmth Level: 100% Fully Hugged" : isHoldingHug ? `Squeezing tight... Don't let go, ${recipientName}` : "Press & Hold the Heart"}</span>
                <span>{hugProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${hugProgress}%`, backgroundColor: '#FFD9C2', transition: 'width 0.2s ease' }} />
              </div>
            </div>

            {/* Hug Whispers / Emotional Reassurance */}
            <div style={{ minHeight: '36px', textAlign: 'center' }}>
              <AnimatePresence>
                {isHoldingHug ? (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.65rem', color: '#FFF1E8', margin: 0 }}>
                    {hugProgress < 40 ? `"Letting all the tension and frustration melt away for ${recipientName}..."` : hugProgress < 80 ? `"${recipientName}, you are safe in my arms, always."` : `"I'm holding you tight, ${recipientName}, and choosing you forever."`}
                  </motion.p>
                ) : hugCompleted ? (
                  <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.75rem', color: '#FFD9C2', margin: 0, fontWeight: 700 }}>
                    "Tension 100% melted. Opening private apology vault for {recipientName}..."
                  </motion.p>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-peach-soft)', margin: 0 }}>
                    Touch and hold to charge the full 10-second squeeze
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 5: GRAND APOLOGY VAULT & WAX SEAL LETTER 💌🌸
         ======================================================== */}
      {currentLayer === 5 && (
        <motion.div
          key="layer5"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ width: '100%', maxWidth: '840px', textAlign: 'center', zIndex: 10 }}
        >
          {/* Virtual Bouquet Header */}
          <div style={{ marginBottom: 'clamp(16px, 3.5vw, 22px)' }}>
            <div style={{ width: 'clamp(85px, 20vw, 120px)', margin: '0 auto 10px' }}>
              <img
                src="/assets/flowers/bouquet.png"
                alt="Peace Bouquet"
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 10px 30px rgba(255, 217, 194, 0.5))' }}
              />
            </div>
            <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-peach-primary)' }}>
              ✦ WITH ALL MY LOVE ✦
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 5.2vw, 3.6rem)', color: 'var(--color-peach-primary)', fontStyle: 'italic', margin: '6px 0', lineHeight: 1.2 }}>
              I Love You More Than My Pride, {recipientName}.
            </h2>
            <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: 'clamp(1.25rem, 3.5vw, 1.7rem)', color: 'var(--color-ivory)', lineHeight: 1.35, margin: 0 }}>
              "To {recipientName} — the person I never, ever want to go to bed upset with."
            </p>
          </div>

          {/* Song Player */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '20px',
            padding: 'clamp(12px, 3vw, 18px) clamp(14px, 3.5vw, 24px)',
            border: '1.5px solid var(--color-peach-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: 'clamp(18px, 4vw, 26px)',
            boxShadow: 'var(--shadow-md)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '200px' }}>
              <button
                onClick={() => { playSparkle(); setIsPlayingSong(!isPlayingSong); }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-peach-primary)',
                  color: 'var(--color-burgundy-dark)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {isPlayingSong ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)', color: 'var(--color-ivory)' }}>
                  Our Peace Melody (Warm Acoustic).mp3
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-peach-soft)' }}>
                  {isPlayingSong ? "Now playing soft acoustic apology song..." : "Tap to play our song"}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[18, 34, 24, 40, 16, 28, 36, 20].map((h, i) => (
                <motion.div
                  key={i}
                  animate={isPlayingSong ? { height: [h * 0.35, h, h * 0.35] } : { height: '8px' }}
                  transition={{ repeat: Infinity, duration: 0.6 + (i % 3) * 0.2 }}
                  style={{ width: '4px', backgroundColor: 'var(--color-peach-primary)', borderRadius: '2px' }}
                />
              ))}
            </div>
          </div>

          {/* Interactive Sealed Letter with Wax Seal */}
          <div style={{
            backgroundColor: '#FFF4EB',
            color: '#2B0404',
            borderRadius: '24px',
            padding: 'clamp(22px, 5vw, 36px) clamp(16px, 4vw, 28px)',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            textAlign: 'left',
            marginBottom: 'clamp(20px, 4.5vw, 28px)',
            position: 'relative'
          }}>
            {!waxSealBroken ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div
                  onClick={handleBreakSeal}
                  style={{
                    width: 'clamp(75px, 18vw, 85px)',
                    height: 'clamp(75px, 18vw, 85px)',
                    borderRadius: '50%',
                    backgroundColor: '#8D0B0B',
                    border: '3px solid #FFD9C2',
                    boxShadow: '0 0 25px rgba(141, 11, 11, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    cursor: 'pointer',
                    color: '#FFD9C2'
                  }}
                >
                  <Heart size={30} fill="#FFD9C2" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '2px' }}>UNSEAL</span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 3.4vw, 1.4rem)', color: '#8D0B0B', margin: '0 0 4px' }}>
                  Tap the Wax Seal to Open Your Sincere Apology Letter
                </h4>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1.5px solid rgba(141,11,11,0.2)', paddingBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(0.78rem, 2vw, 0.92rem)', color: '#8D0B0B', letterSpacing: '0.05em' }}>
                    CONFIDENTIAL SINCERE APOLOGY ✦ UNSEALED FOR {recipientName.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#666', fontWeight: 600 }}>
                    Straight From The Heart
                  </span>
                </div>

                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: 'clamp(1.4rem, 4vw, 1.75rem)', lineHeight: 1.5, marginBottom: '12px', color: '#180202' }}>
                  My Sweetest {recipientName},
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: 'clamp(1.2rem, 3.4vw, 1.55rem)', lineHeight: 1.5, marginBottom: '14px', color: '#180202' }}>
                  I never want to go to sleep knowing that I caused you even a second of hurt. You are the brightest part of my days, my absolute favorite person to talk to, and the one whose happiness matters to me more than anything else in the world.
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: 'clamp(1.2rem, 3.4vw, 1.55rem)', lineHeight: 1.5, marginBottom: '16px', color: '#180202' }}>
                  Thank you for your infinite grace, for tolerating my mistakes, and for loving me even on my clumsy days. I promise to listen better, love harder, and cherish you every single day, {recipientName}.
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: 'clamp(1.25rem, 3.6vw, 1.65rem)', fontWeight: 700, textAlign: 'right', color: '#8D0B0B', margin: 0 }}>
                  — Always Yours, With All My Love, Forever & Always
                </p>
              </motion.div>
            )}
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={handleReplay}
              title="Replay Experience"
              aria-label="Replay Experience"
              style={{
                padding: '12px 20px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 217, 194, 0.15)',
                border: '1px solid var(--color-peach-primary)',
                color: 'var(--color-peach-primary)',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={16} />
            </button>

            <MagneticButton
              onClick={handleForgiveness}
              variant="primary"
              size="md"
            >
              <Heart size={16} fill="currentColor" /> {forgiven ? "Forgiven with Love! ❤️" : "I Forgive You ❤️"}
            </MagneticButton>
          </div>

          {/* Forgiveness Confirmation Banner */}
          {forgiven && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              style={{
                marginTop: '22px',
                marginBottom: '32px',
                padding: 'clamp(18px, 4vw, 24px) clamp(16px, 4vw, 26px)',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 217, 194, 0.15)',
                border: '1.5px solid var(--color-peach-primary)',
                boxShadow: 'var(--shadow-glow)',
                textAlign: 'center',
                maxWidth: '620px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '8px' }}>
                🫂✨❤️
              </span>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.2rem, 3.4vw, 1.45rem)',
                color: 'var(--color-peach-primary)',
                fontStyle: 'italic',
                margin: '0 0 8px'
              }}>
                Thank you for forgiving me, {recipientName}!
              </h3>
              <p style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: 'clamp(1.15rem, 3.2vw, 1.45rem)',
                color: 'var(--color-ivory)',
                margin: 0,
                lineHeight: 1.45
              }}>
                I promise to cherish you, make you laugh, and love you unconditionally every single day. You have my whole heart!
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

    </div>
  );
};

export default ApologyLiveExperience;
