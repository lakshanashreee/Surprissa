import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Coffee, Gift, RotateCcw, ArrowRight, Award, Compass, Music, CheckCircle2, ChevronRight, Bookmark, Image as ImageIcon, Send, Star, MessageCircle, Home, Camera, Eye, Zap, ChevronLeft, ShieldCheck, CheckSquare, Square, PenTool, Play, Pause, Lock, Key, Sparkle, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const ApologyLiveExperience = ({ onComplete }) => {
  const { playPop, playSparkle, playSuccess, playFlame, playFanfare } = useAudio();

  // Experience Layers:
  // Layer 0: Dramatic Full-Screen Crying Mascot Hook (Hovers for 5s then transitions)
  // Layer 1: The Formal Apology Treaty & Unconditional Surrender Agreement
  // Layer 2: Hanging Wall Gallery of 5 Couple Picture Frames (Interactive Swings & Zooms)
  // Layer 3: 3 Luxury Gold Foil Peace Cards (Peel to Reveal Honest Vulnerable Truths)
  // Layer 4: The 10-Second Virtual Bear Hug Simulator (Press & Hold to Melt the Tension)
  // Layer 5: Grand Apology Vault & Wax-Sealed Sincere Love Letter
  const [currentLayer, setCurrentLayer] = useState(0);

  // ==========================================
  // LAYER 0: Dramatic Crying Mascot Intro State (5-second auto transition)
  // ==========================================
  const [introCountdown, setIntroCountdown] = useState(5);

  useEffect(() => {
    let timer;
    let countdownInterval;
    if (currentLayer === 0) {
      setIntroCountdown(5);
      countdownInterval = setInterval(() => {
        setIntroCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timer = setTimeout(() => {
        playPop();
        setCurrentLayer(1);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [currentLayer]);

  const handleSkipIntro = () => {
    playPop();
    setCurrentLayer(1);
  };

  // ==========================================
  // LAYER 1: Treaty Clauses State
  // ==========================================
  const [clauses, setClauses] = useState({
    c1: false,
    c2: false,
    c3: false
  });
  const [hasSignedTreaty, setHasSignedTreaty] = useState(false);

  const toggleClause = (key) => {
    playPop();
    setClauses(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allClausesChecked = clauses.c1 && clauses.c2 && clauses.c3;

  const handleSignTreaty = () => {
    if (!allClausesChecked) return;
    playSuccess();
    setHasSignedTreaty(true);
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#FFD9C2', '#8D0B0B', '#FFF1E8'] });
    } catch (e) {}
    setTimeout(() => {
      setCurrentLayer(2);
    }, 900);
  };

  // ==========================================
  // LAYER 2: Hanging Wall Gallery of 5 Portraits
  // ==========================================
  const [activeFrameIndex, setActiveFrameIndex] = useState(null);
  const [viewedFrames, setViewedFrames] = useState([0]); // first frame viewed by default

  const galleryPortraits = [
    {
      id: 1,
      title: "I Miss That Smile",
      subtitle: "Chapter of Warmth",
      img: "/assets/Couple photos/Couples (rose hiding face).jpg",
      quote: "The world is 100x colder and dimmer when you're upset with me. Your smile is my daily fuel.",
      frameColor: "#D4AF37",
      tilt: -4
    },
    {
      id: 2,
      title: "Please Don't Stay Mad",
      subtitle: "Gentle Moments",
      img: "/assets/Couple photos/Head patting cute.jpg",
      quote: "Look at us. We are meant to make each other laugh, not sad. I need my favorite human back.",
      frameColor: "#E0A96D",
      tilt: 3
    },
    {
      id: 3,
      title: "I'm Genuinely So Sorry",
      subtitle: "Sincere Remorse",
      img: "/assets/Couple photos/Flowers in head.jpg",
      quote: "I hate that I caused you even one second of frustration. You deserve only peace and affection.",
      frameColor: "#D4AF37",
      tilt: -2
    },
    {
      id: 4,
      title: "A Fresh Reset",
      subtitle: "Unconditional Laughter",
      img: "/assets/Couple photos/Kicking.jpg",
      quote: "No ego, just us. I promise to listen with an open heart and always choose you.",
      frameColor: "#E0A96D",
      tilt: 4
    },
    {
      id: 5,
      title: "You & Me, Forever",
      subtitle: "Unbreakable Bond",
      img: "/assets/Couple photos/Piggy ride.jpg",
      quote: "Arguments come and go, but you are the only person I ever want to come home to. Always.",
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
      secret: "Winning an argument means nothing to me if it makes you feel unheard. You matter more than being right.",
      bgGradient: "linear-gradient(135deg, #FFD9C2 0%, #E6A98A 100%)",
      accent: "#8D0B0B"
    },
    {
      id: 2,
      tag: "WHAT I REALIZED",
      frontLabel: "Click to Peel Secret #2 ✦",
      secret: "Life is way too short and too precious to waste even one quiet evening apart from your laughter.",
      bgGradient: "linear-gradient(135deg, #FFF1E8 0%, #FFD9C2 100%)",
      accent: "#8D0B0B"
    },
    {
      id: 3,
      tag: "MY SOLEMN PROMISE",
      frontLabel: "Click to Peel Secret #3 ✦",
      secret: "I will choose patience over defensiveness, empathy over pride, and loving you over everything else.",
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

  const handleBreakSeal = () => {
    if (waxSealBroken) return;
    playFanfare();
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
    setWaxSealBroken(true);
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
    setCurrentLayer(0);
    setIntroCountdown(5);
    setClauses({ c1: false, c2: false, c3: false });
    setHasSignedTreaty(false);
    setActiveFrameIndex(null);
    setViewedFrames([0]);
    setPeeledCards([]);
    setHugProgress(0);
    setIsHoldingHug(false);
    setHugCompleted(false);
    setWaxSealBroken(false);
    setIsPlayingSong(false);
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

      {/* Floating Transparent Flower & Mascot Stickers (Visible during interactive layers 1-5) */}
      {currentLayer > 0 && (
        <>
          <div style={{ position: 'absolute', top: '15px', left: '15px', width: 'clamp(65px, 10vw, 115px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float">
            <img src="/assets/sorry/cutestcryyying.png" alt="Crying Mascot" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
          </div>

          <div style={{ position: 'absolute', top: '15px', right: '15px', width: 'clamp(70px, 11vw, 125px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float-delayed">
            <img src="/assets/flowers/Pink flower.png" alt="Flower Decor" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
          </div>

          <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: 'clamp(75px, 12vw, 130px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float-delayed">
            <img src="/assets/cat/birthdaycatwithflowers.png" alt="Cat Mascot" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
          </div>

          <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: 'clamp(65px, 10vw, 110px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float">
            <img src="/assets/stickers/cutestwithbouquet.png" alt="Cute Sticker" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
          </div>
        </>
      )}

      {/* ========================================================
          LAYER 0: DRAMATIC FULL-SCREEN CRYING MASCOT HOOK (5s INTRO) 🥺💔
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
              ✦ AN IMPORTANT MESSAGE FOR YOU ✦
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
              "I'm Really, Really Sorry..."
            </h1>

            <p style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
              color: 'var(--color-ivory)',
              maxWidth: '580px',
              margin: '0 auto 26px',
              lineHeight: 1.4
            }}>
              "Please don't be upset with me... Give me just 2 minutes to explain and make it up to you."
            </p>

            {/* 5-Second Countdown Indicator & Skip Button */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              marginTop: '10px'
            }}>
              <div style={{ width: '220px', height: '6px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  style={{ height: '100%', backgroundColor: 'var(--color-peach-primary)' }}
                />
              </div>

              <button
                onClick={handleSkipIntro}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-peach-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: 0.85,
                  padding: '6px 12px'
                }}
              >
                Opening Peace Protocol in {introCountdown}s (Click to Open Now →)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 1: THE FORMAL APOLOGY TREATY 📜🕊️
         ======================================================== */}
      {currentLayer === 1 && (
        <motion.div
          key="layer1"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          style={{ textAlign: 'center', maxWidth: '720px', width: '100%', zIndex: 10 }}
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
            <ShieldCheck size={18} color="var(--color-peach-primary)" />
            OFFICIAL PEACE PROTOCOL ✦ CHAPTER 1
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.8vw, 3.2rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '8px',
            lineHeight: 1.2
          }}>
            "Declaration of Complete Surrender"
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '28px', lineHeight: 1.5 }}>
            I unconditionally acknowledge all charges of foolishness and plead 100% guilty.
          </p>

          {/* Treaty Paper Box */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '28px',
            padding: '36px 28px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '26px',
            textAlign: 'left'
          }}>
            <div style={{ borderBottom: '1px solid rgba(255, 217, 194, 0.25)', paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#FFD9C2', letterSpacing: '0.06em' }}>
                TREATY OF UNCONDITIONAL APOLOGY #001
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-peach-soft)', fontWeight: 600 }}>
                Status: Awaiting Clemency
              </span>
            </div>

            {/* Clauses */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '26px' }}>
              <div
                onClick={() => toggleClause('c1')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  backgroundColor: clauses.c1 ? 'rgba(255, 217, 194, 0.18)' : 'rgba(0,0,0,0.3)',
                  border: clauses.c1 ? '1.5px solid var(--color-peach-primary)' : '1px solid rgba(255,217,194,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {clauses.c1 ? <CheckSquare size={22} color="#FFD9C2" /> : <Square size={22} color="rgba(255,217,194,0.5)" />}
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FAF4EE' }}>
                  <strong>Clause 1:</strong> I was being a dummy and I take 100% full accountability.
                </span>
              </div>

              <div
                onClick={() => toggleClause('c2')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  backgroundColor: clauses.c2 ? 'rgba(255, 217, 194, 0.18)' : 'rgba(0,0,0,0.3)',
                  border: clauses.c2 ? '1.5px solid var(--color-peach-primary)' : '1px solid rgba(255,217,194,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {clauses.c2 ? <CheckSquare size={22} color="#FFD9C2" /> : <Square size={22} color="rgba(255,217,194,0.5)" />}
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FAF4EE' }}>
                  <strong>Clause 2:</strong> You were right (as always, scientifically verified by the universe).
                </span>
              </div>

              <div
                onClick={() => toggleClause('c3')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  backgroundColor: clauses.c3 ? 'rgba(255, 217, 194, 0.18)' : 'rgba(0,0,0,0.3)',
                  border: clauses.c3 ? '1.5px solid var(--color-peach-primary)' : '1px solid rgba(255,217,194,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {clauses.c3 ? <CheckSquare size={22} color="#FFD9C2" /> : <Square size={22} color="rgba(255,217,194,0.5)" />}
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FAF4EE' }}>
                  <strong>Clause 3:</strong> I promise infinite hugs, favorite snacks, and zero attitude forever.
                </span>
              </div>
            </div>

            {/* Sign Treaty Action Button */}
            <div style={{ textAlign: 'center' }}>
              <motion.button
                onClick={handleSignTreaty}
                disabled={!allClausesChecked}
                whileHover={allClausesChecked ? { scale: 1.04 } : {}}
                whileTap={allClausesChecked ? { scale: 0.96 } : {}}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 36px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: allClausesChecked ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.2)',
                  color: allClausesChecked ? 'var(--color-burgundy-dark)' : 'rgba(255,255,255,0.4)',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: allClausesChecked ? 'pointer' : 'not-allowed',
                  border: 'none',
                  boxShadow: allClausesChecked ? '0 6px 25px rgba(255, 217, 194, 0.45)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <PenTool size={18} />
                {hasSignedTreaty ? 'TREATY SIGNED & RATIFIED' : allClausesChecked ? 'Sign Peace Treaty & Enter Wall Gallery →' : 'Check All 3 Clauses To Sign'}
              </motion.button>
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
            "5 Reasons I Never Want To Lose You"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '28px' }}>
            Tap each hanging picture frame to straighten it on the wall and read my heartfelt thoughts.
          </p>

          {/* Wall Gallery Arena with Hanging Wires */}
          <div style={{
            backgroundColor: '#0D0101',
            borderRadius: '28px',
            padding: '36px 18px 30px',
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

            {/* 5 Hanging Picture Frames Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '20px',
              alignItems: 'start',
              padding: '0 10px'
            }}>
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
                      whileHover={{ scale: 1.06, rotate: 0, y: -4 }}
                      style={{
                        width: '100%',
                        backgroundColor: '#FFF4EB',
                        color: '#2B0404',
                        padding: '12px 10px 16px',
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
                        height: '115px',
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
                            maxHeight: '105px',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.25))'
                          }}
                        />
                      </div>

                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.92rem', color: '#8D0B0B', fontStyle: 'italic', margin: 0, lineHeight: 1.2 }}>
                        {portrait.title}
                      </h4>

                      <div style={{
                        marginTop: '6px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: isViewed ? '#2E7D32' : '#888',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        {isViewed ? <CheckCircle2 size={12} /> : null}
                        {isViewed ? 'Straightened' : 'Tap to View'}
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
                  marginTop: '28px',
                  backgroundColor: 'var(--color-burgundy-primary)',
                  border: '1.5px solid var(--color-peach-primary)',
                  borderRadius: '20px',
                  padding: '20px 24px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#FFF4EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={galleryPortraits[activeFrameIndex].img} alt="Thumb" style={{ maxHeight: '50px', maxWidth: '50px', objectFit: 'contain' }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFD9C2', fontStyle: 'italic', margin: '0 0 4px' }}>
                    "{galleryPortraits[activeFrameIndex].title}"
                  </h4>
                  <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.35rem', color: '#FAF4EE', margin: 0, lineHeight: 1.35 }}>
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
            "3 Honest Truths Straight From My Heart"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '26px' }}>
            Tap each gold foil card to break the seal and reveal what I never want you to forget.
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
            {allCardsPeeled ? "Charge Virtual 10-Second Bear Hug 🫂 →" : "Unlock All 3 & Proceed →"}
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
            "Press & Hold To Squeeze"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '26px' }}>
            Hold down on the glowing heart to charge a 10-second warm bear hug and melt away all the tension.
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
                <span>{hugCompleted ? "Warmth Level: 100% Fully Hugged" : isHoldingHug ? "Squeezing tight... Don't let go" : "Press & Hold the Heart"}</span>
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
                    {hugProgress < 40 ? `"Letting all the tension and frustration melt away..."` : hugProgress < 80 ? `"You are safe in my arms, always."` : `"I'm holding you tight and choosing you forever."`}
                  </motion.p>
                ) : hugCompleted ? (
                  <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.75rem', color: '#FFD9C2', margin: 0, fontWeight: 700 }}>
                    "Tension 100% melted. Opening private apology vault..."
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
          <div style={{ marginBottom: '22px' }}>
            <div style={{ width: '125px', margin: '0 auto 12px' }}>
              <img
                src="/assets/flowers/bouquet.png"
                alt="Peace Bouquet"
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 10px 30px rgba(255, 217, 194, 0.5))' }}
              />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-peach-primary)' }}>
              ✦ PEACE PROTOCOL COMPLETE ✦
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', color: 'var(--color-peach-primary)', fontStyle: 'italic', margin: '6px 0', lineHeight: 1.2 }}>
              I Love You More Than My Pride.
            </h2>
            <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.75rem', color: 'var(--color-ivory)' }}>
              "To the person I never, ever want to go to bed upset with."
            </p>
          </div>

          {/* Simulated Song Player */}
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
                onClick={() => { playSparkle(); setIsPlayingSong(!isPlayingSong); }}
                style={{
                  width: '46px',
                  height: '46px',
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
                {isPlayingSong ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-ivory)' }}>
                  Our Peace Melody (Warm Acoustic).mp3
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-peach-soft)' }}>
                  {isPlayingSong ? "Now playing soft acoustic apology song... 1:45" : "Tap to play our song"}
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
            padding: '36px 28px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            textAlign: 'left',
            marginBottom: '28px',
            position: 'relative'
          }}>
            {!waxSealBroken ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                  onClick={handleBreakSeal}
                  style={{
                    width: '85px',
                    height: '85px',
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
                  <Heart size={32} fill="#FFD9C2" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '2px' }}>UNSEAL</span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#8D0B0B' }}>
                  Tap the Wax Seal to Open Your Sincere Apology Letter
                </h4>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1.5px solid rgba(141,11,11,0.2)', paddingBottom: '10px' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 800, fontSize: '0.92rem', color: '#8D0B0B', letterSpacing: '0.05em' }}>
                    CONFIDENTIAL SINCERE APOLOGY ✦ UNSEALED
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>
                    Straight From The Heart
                  </span>
                </div>

                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.75rem', lineHeight: 1.6, marginBottom: '12px', color: '#180202' }}>
                  My Sweetest Love,
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.55rem', lineHeight: 1.6, marginBottom: '14px', color: '#180202' }}>
                  I never want to go to sleep knowing that I caused you even a second of hurt. You are the brightest part of my days, my absolute favorite person to talk to, and the one whose happiness matters to me more than anything else in the world.
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.55rem', lineHeight: 1.6, marginBottom: '16px', color: '#180202' }}>
                  Thank you for your infinite grace, for tolerating my mistakes, and for loving me even on my clumsy days. I promise to listen better, love harder, and cherish you every single day.
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.65rem', fontWeight: 700, textAlign: 'right', color: '#8D0B0B' }}>
                  — Always Yours, With All My Love
                </p>
              </motion.div>
            )}
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '16px' }}>
            <button
              onClick={handleReplay}
              style={{
                padding: '12px 22px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 217, 194, 0.15)',
                border: '1px solid var(--color-peach-primary)',
                color: 'var(--color-peach-primary)',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
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
              Order one for someone you love →
            </MagneticButton>
          </div>
        </motion.div>
      )}

    </div>
  );
};
