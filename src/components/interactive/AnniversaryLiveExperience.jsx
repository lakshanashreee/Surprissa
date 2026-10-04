import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Clock, Calendar, Film, Upload, Play, Pause, RotateCcw, ArrowRight, Award, Compass, Music, CheckCircle2, ChevronRight, Bookmark, Image as ImageIcon, Send, Star, MessageCircle, Home, Camera, Eye, Zap, ChevronLeft, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const AnniversaryLiveExperience = ({ onComplete }) => {
  const { playPop, playSparkle, playSuccess, playFlame, playFanfare } = useAudio();

  // Experience Layers:
  // Layer 1: The Precision Time Machine (Clean Proportional Sans Numbers & No Overlap)
  // Layer 2: True Continuous Vertical Line Milestone Timeline with Glowing Stem & Badges
  // Layer 3: Vintage 3D Film Reel (8+ Photos, 100% Smooth Auto-Drift & Glitch-Free Swiping)
  // Layer 4: Interactive Cupid's Bow & Pull-To-Aim Archery Mini-Game
  // Layer 5: Grand Anniversary Love Vault & Wax Seal Letter
  const [currentLayer, setCurrentLayer] = useState(1);

  // ==========================================
  // LAYER 1: Time Machine State
  // ==========================================
  const [counterProgress, setCounterProgress] = useState(0);
  const [isFastForwarding, setIsFastForwarding] = useState(false);
  const counterTimerRef = useRef(null);

  // ==========================================
  // LAYER 2: Vertical Timeline Data
  // ==========================================
  const [activeTimelineNode, setActiveTimelineNode] = useState(1);
  const verticalMilestones = [
    {
      id: 1,
      tag: "Day 1",
      date: "May 14, 2022",
      title: "The Very First Text",
      story: "You left me on delivered for 4 hours, but then replied with 12 consecutive voice notes. The rest was history.",
      img: "/assets/cat/birthdaycatwithflowers.png",
      badge: "ORIGIN STORY"
    },
    {
      id: 2,
      tag: "Day 89",
      date: "August 11, 2022",
      title: "The Night You Said Yes",
      story: "Under the warm streetlights by the harbor. Hands shaking, laughing uncontrollably, best decision of my life.",
      img: "/assets/flowers/Pink flower.png",
      badge: "OFFICIAL CHAPTER"
    },
    {
      id: 3,
      tag: "Day 340",
      date: "April 19, 2023",
      title: "The 3-Hour Lost Road Trip",
      story: "GPS failed, rain poured, we ended up at an empty diner eating warm pie at 2 AM. Pure cinematic perfection.",
      img: "/assets/stickers/cutestwithbouquet.png",
      badge: "CORE MEMORY"
    },
    {
      id: 4,
      tag: "Day 812",
      date: "August 4, 2024",
      title: "Moving In & Mascot Adoption",
      story: "Half-built furniture everywhere and eating pizza on cardboard boxes. Officially our home together.",
      img: "/assets/cat/catwiththreebouquet.png",
      badge: "HOME SWEET HOME"
    },
    {
      id: 5,
      tag: "Day 1,248",
      date: "Today & Forever",
      title: "Still Choosing You Every Single Day",
      story: "Still my favorite laugh to hear, favorite hoodie thief, and the only person I want in every single future chapter.",
      img: "/assets/flowers/bouquet.png",
      badge: "ETERNAL LOVE"
    }
  ];

  // ==========================================
  // LAYER 3: 3D Rotating & Glitch-Free Gliding Camera Roll
  // ==========================================
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isAutoDrifting, setIsAutoDrifting] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [viewfinderPhoto, setViewfinderPhoto] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [shutterFlash, setShutterFlash] = useState(false);
  const filmReelContainerRef = useRef(null);
  const scrollPosRef = useRef(0);
  const fileInputRef = useRef(null);
  const userInteractionTimeoutRef = useRef(null);

  const initialCameraRoll = [
    { id: 'p1', img: '/assets/cat/birthdaycatwithflowers.png', title: 'Day 1 Partner', note: 'You fell asleep on my shoulder within 10 minutes.', dateStamp: "'22 05 14", frameNum: '01' },
    { id: 'p2', img: '/assets/flowers/Pink flower.png', title: 'First Surprise Bouquet', note: 'Your smile lit up the entire room.', dateStamp: "'22 08 11", frameNum: '02' },
    { id: 'p3', img: '/assets/stickers/cutestwithbouquet.png', title: 'Midnight Diner Date', note: 'Warm cherry pie and endless laughter at 2 AM.', dateStamp: "'23 01 22", frameNum: '03' },
    { id: 'p4', img: '/assets/cat/catwiththreebouquet.png', title: 'Adopting Our Mascot', note: 'The day our little family grew by four paws.', dateStamp: "'23 04 19", frameNum: '04' },
    { id: 'p5', img: '/assets/flowers/blue-anemone-flower.png', title: 'Coastline Road Trip', note: 'Wind in your hair and singing off-key to indie songs.', dateStamp: "'23 09 08", frameNum: '05' },
    { id: 'p6', img: '/assets/stickers/cutest.png', title: 'Lazy Sunday Mornings', note: 'Pancakes, black coffee, and comfortable silence.', dateStamp: "'24 02 14", frameNum: '06' },
    { id: 'p7', img: '/assets/flowers/bouquet.png', title: 'Anniversary Celebration', note: '1,248 days and I still get butterflies every time.', dateStamp: "'24 08 04", frameNum: '07' },
    { id: 'p8', img: '/assets/cat/birthdaycatwithflowers.png', title: 'Forever & Always', note: 'Every single chapter is better because you are in it.', dateStamp: "'24 10 04", frameNum: '08' }
  ];

  const allPhotos = [...initialCameraRoll, ...uploadedPhotos];

  // Guaranteed smooth continuous auto-drift using subpixel accumulator
  useEffect(() => {
    if (currentLayer !== 3) return;
    let animFrameId;
    let lastTime = performance.now();

    const scrollLoop = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (isAutoDrifting && !isUserInteracting && filmReelContainerRef.current) {
        const el = filmReelContainerRef.current;
        scrollPosRef.current += delta * 45;
        if (scrollPosRef.current >= el.scrollWidth - el.clientWidth - 5) {
          scrollPosRef.current = 0;
        }
        el.scrollLeft = Math.round(scrollPosRef.current);
      }
      animFrameId = requestAnimationFrame(scrollLoop);
    };

    animFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animFrameId);
  }, [currentLayer, isAutoDrifting, isUserInteracting]);

  const handleUserInteractionStart = () => {
    setIsUserInteracting(true);
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
  };

  const handleUserInteractionEnd = (delay = 1800) => {
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = setTimeout(() => {
      if (filmReelContainerRef.current) {
        scrollPosRef.current = filmReelContainerRef.current.scrollLeft;
      }
      setIsUserInteracting(false);
    }, delay);
  };

  const handleManualScroll = () => {
    if (filmReelContainerRef.current && isUserInteracting) {
      scrollPosRef.current = filmReelContainerRef.current.scrollLeft;
    }
  };

  const handleReelNav = (direction) => {
    handleUserInteractionStart();
    playPop();
    if (filmReelContainerRef.current) {
      const newPos = filmReelContainerRef.current.scrollLeft + (direction === 'left' ? -260 : 260);
      filmReelContainerRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
      scrollPosRef.current = Math.max(0, newPos);
    }
    handleUserInteractionEnd(2500);
  };

  // ==========================================
  // LAYER 4: CUPID'S BOW & PULL-TO-AIM ARCHERY 🏹💘
  // ==========================================
  const [arrowStatus, setArrowStatus] = useState('idle'); // 'idle', 'pulling', 'fired', 'hit', 'miss'
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [flightTarget, setFlightTarget] = useState({ x: 0, y: -480 });
  const [missFeedback, setMissFeedback] = useState("");
  const [isRainingHearts, setIsRainingHearts] = useState(false);
  const [rainingHeartsList, setRainingHeartsList] = useState([]);
  const balloonPosRef = useRef({ x: 0 });

  // Handle pull release to calculate launch angle and hit testing
  const handleArrowRelease = (e, info) => {
    const pullDistance = Math.hypot(info.offset.x, info.offset.y);
    const pullY = info.offset.y;

    // Must be pulled down sufficiently (at least 28px downward)
    if (pullY > 28 && pullDistance > 30) {
      playFlame();
      playSparkle();
      setArrowStatus('fired');

      // Aim trajectory calculation (opposite of pull vector)
      const aimAngleX = -info.offset.x * 3.2;
      setFlightTarget({ x: aimAngleX, y: -480 });

      // Hit detection vs balloon position
      setTimeout(() => {
        // Balloon current position check (horizontal range +/- 85px)
        const balloonX = balloonPosRef.current.x || 0;
        const hitDelta = Math.abs(aimAngleX - balloonX);

        if (hitDelta < 88) {
          // Direct Hit!
          setArrowStatus('hit');
          playSuccess();
          playFanfare();
          triggerFullHeartRain();
        } else {
          // Missed because balloon drifted away
          setArrowStatus('miss');
          playPop();
          setMissFeedback("Whoosh! Close! Aim ahead of the drifting balloon!");
          setTimeout(() => {
            setArrowStatus('idle');
            setDragOffset({ x: 0, y: 0 });
            setMissFeedback("");
          }, 1100);
        }
      }, 420);
    } else {
      // Not pulled enough, snap back with spring
      setArrowStatus('idle');
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const triggerFullHeartRain = () => {
    setIsRainingHearts(true);
    triggerConfettiCannons();

    // Generate 45 raining hearts
    const hearts = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      delay: Math.random() * 2.2,
      duration: 2.8 + Math.random() * 2.2,
      size: 18 + Math.random() * 26,
      color: ['#FFD9C2', '#FF4D6D', '#FFB703', '#FFF1E8', '#8D0B0B'][Math.floor(Math.random() * 5)]
    }));
    setRainingHeartsList(hearts);

    // Auto unlock Layer 5
    setTimeout(() => {
      setCurrentLayer(5);
    }, 2600);
  };

  // ==========================================
  // LAYER 5: Love Vault & Audio
  // ==========================================
  const [waxSealBroken, setWaxSealBroken] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(false);

  // Trigger celebratory confetti cannons
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

  // --- LAYER 1 HANDLER: Fast Forward ---
  const handleTimeMachineHold = () => {
    if (isFastForwarding || counterProgress >= 100) return;
    setIsFastForwarding(true);
    playPop();

    counterTimerRef.current = setInterval(() => {
      setCounterProgress(prev => {
        if (prev >= 100) {
          clearInterval(counterTimerRef.current);
          setIsFastForwarding(false);
          playSuccess();
          setTimeout(() => {
            setCurrentLayer(2);
          }, 850);
          return 100;
        }
        playSparkle();
        return prev + 12;
      });
    }, 160);
  };

  // --- LAYER 3 HANDLER: Shutter Click & Viewfinder ---
  const handlePhotoClick = (photo, idx) => {
    handleUserInteractionStart();
    playPop();
    setSelectedPhotoIndex(idx);
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 180);
    handleUserInteractionEnd(2000);
  };

  const handleOpenViewfinder = (photo) => {
    playSparkle();
    setViewfinderPhoto(photo);
  };

  // --- LAYER 3 HANDLER: Photo Upload ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      playSparkle();
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const newPhoto = {
          id: `up-${Date.now()}`,
          img: uploadEvent.target.result,
          title: 'Custom Memory Upload',
          note: 'A precious captured moment added to our rotating reel.',
          dateStamp: "'24 TODAY",
          frameNum: `0${allPhotos.length + 1}`
        };
        setUploadedPhotos(prev => [...prev, newPhoto]);
        setSelectedPhotoIndex(allPhotos.length);
        playSuccess();
      };
      reader.readAsDataURL(file);
    }
  };

  // --- LAYER 5 HANDLER: Break Wax Seal ---
  const handleBreakSeal = () => {
    if (waxSealBroken) return;
    playFanfare();
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
    setWaxSealBroken(true);
  };

  const handleReplay = () => {
    playPop();
    setCurrentLayer(1);
    setCounterProgress(0);
    setIsFastForwarding(false);
    setActiveTimelineNode(1);
    setSelectedPhotoIndex(0);
    setArrowStatus('idle');
    setDragOffset({ x: 0, y: 0 });
    setIsRainingHearts(false);
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

      {/* Shutter Flash Overlay */}
      {shutterFlash && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#FFF1E8',
          zIndex: 999999,
          pointerEvents: 'none',
          opacity: 0.85,
          transition: 'opacity 0.2s ease-out'
        }} />
      )}

      {/* Raining Hearts Shower Across Entire Screen (Triggered upon Balloon Hit) */}
      {isRainingHearts && (
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          overflow: 'hidden'
        }}>
          {rainingHeartsList.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: -60, x: `${heart.x}vw`, opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{
                y: '105vh',
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1, 0.8],
                rotate: [-25, 25, -25]
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                top: 0,
                color: heart.color,
                filter: `drop-shadow(0 0 12px ${heart.color})`
              }}
            >
              <Heart size={heart.size} fill={heart.color} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Transparent Flower & Mascot Stickers */}
      <div style={{ position: 'absolute', top: '15px', left: '15px', width: 'clamp(65px, 10vw, 115px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float">
        <img src="/assets/flowers/Pink flower.png" alt="Flower Decor" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', top: '15px', right: '15px', width: 'clamp(70px, 11vw, 125px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float-delayed">
        <img src="/assets/flowers/blue-anemone-flower.png" alt="Flower Decor" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: 'clamp(75px, 12vw, 130px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float-delayed">
        <img src="/assets/cat/catwiththreebouquet.png" alt="Cat Mascot" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: 'clamp(65px, 10vw, 110px)', pointerEvents: 'none', zIndex: 2, opacity: 0.9 }} className="animate-float">
        <img src="/assets/stickers/cutestwithbouquet.png" alt="Cute Sticker" style={{ width: '100%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))' }} />
      </div>

      {/* ========================================================
          LAYER 1: THE RELATIONSHIP TIME MACHINE (CRISP NUMBERS, ZERO OVERLAP) ⏳
         ======================================================== */}
      {currentLayer === 1 && (
        <motion.div
          key="layer1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{ textAlign: 'center', maxWidth: '780px', width: '100%', zIndex: 10 }}
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
            <Clock size={18} color="var(--color-peach-primary)" />
            RELATIONSHIP TIME MACHINE ✦ CHAPTER 1
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.8vw, 3.2rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '10px',
            lineHeight: 1.2
          }}>
            "1,248 Days of Loving You"
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '28px', lineHeight: 1.5 }}>
            A real-time precision countdown of every hour, minute, and heartbeat spent together.
          </p>

          {/* Time Metrics Container with Crisp Proportional Sans Numbers & Generous Padding */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '28px',
            padding: 'clamp(24px, 4vw, 36px) clamp(16px, 3vw, 28px)',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '26px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
              gap: '16px',
              marginBottom: '28px'
            }}>
              {/* 1. Days */}
              <div style={{
                padding: '22px 14px',
                borderRadius: '18px',
                backgroundColor: 'rgba(0,0,0,0.38)',
                border: '1px solid rgba(255, 217, 194, 0.28)',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)',
                  fontWeight: 800,
                  color: 'var(--color-peach-primary)',
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.15
                }}>
                  1,248
                </div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-peach-soft)', fontWeight: 800, marginTop: '8px', letterSpacing: '0.08em' }}>
                  Days Together
                </div>
              </div>

              {/* 2. Hours */}
              <div style={{
                padding: '22px 14px',
                borderRadius: '18px',
                backgroundColor: 'rgba(0,0,0,0.38)',
                border: '1px solid rgba(255, 217, 194, 0.28)',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)',
                  fontWeight: 800,
                  color: 'var(--color-peach-primary)',
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.15
                }}>
                  29,952
                </div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-peach-soft)', fontWeight: 800, marginTop: '8px', letterSpacing: '0.08em' }}>
                  Hours Shared
                </div>
              </div>

              {/* 3. Minutes */}
              <div style={{
                padding: '22px 14px',
                borderRadius: '18px',
                backgroundColor: 'rgba(0,0,0,0.38)',
                border: '1px solid rgba(255, 217, 194, 0.28)',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)',
                  fontWeight: 800,
                  color: 'var(--color-peach-primary)',
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.15
                }}>
                  1.79M+
                </div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-peach-soft)', fontWeight: 800, marginTop: '8px', letterSpacing: '0.08em' }}>
                  Minutes of Joy
                </div>
              </div>

              {/* 4. Heartbeats */}
              <div style={{
                padding: '22px 14px',
                borderRadius: '18px',
                backgroundColor: 'rgba(0,0,0,0.38)',
                border: '1px solid rgba(255, 217, 194, 0.28)',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)',
                  fontWeight: 800,
                  color: 'var(--color-peach-primary)',
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.15
                }}>
                  107M+
                </div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-peach-soft)', fontWeight: 800, marginTop: '8px', letterSpacing: '0.08em' }}>
                  Heartbeats
                </div>
              </div>
            </div>

            {/* Fast-Forward Button */}
            <motion.button
              onClick={handleTimeMachineHold}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-peach-primary)',
                color: 'var(--color-burgundy-dark)',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 6px 25px rgba(255, 217, 194, 0.45)'
              }}
            >
              <Sparkles size={18} />
              {isFastForwarding ? 'SYNCHRONIZING MEMORIES...' : 'Fast-Forward 1,248 Days →'}
            </motion.button>

            {counterProgress > 0 && (
              <div style={{ width: '100%', maxWidth: '340px', height: '6px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '3px', margin: '18px auto 0', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${counterProgress}%`, backgroundColor: 'var(--color-peach-primary)', transition: 'width 0.2s ease' }} />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 2: TRUE VERTICAL LINE SACRED TIMELINE 📜✨
         ======================================================== */}
      {currentLayer === 2 && (
        <motion.div
          key="layer2"
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
            <Bookmark size={18} /> STEP 2 ✦ OUR SACRED VERTICAL TIMELINE
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.8vw, 3rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '8px',
            lineHeight: 1.2
          }}>
            "Every Step Leading To Us"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '36px' }}>
            Follow the central path from our very first hello to today. Tap any memory along the line!
          </p>

          {/* CONTINUOUS VERTICAL LINE TIMELINE CONTAINER */}
          <div style={{
            position: 'relative',
            padding: '24px 0 36px',
            marginBottom: '32px'
          }}>
            {/* The Central Glowing Vertical Line */}
            <div style={{
              position: 'absolute',
              top: '10px',
              bottom: '20px',
              left: 'clamp(24px, 50%, 50%)',
              transform: 'translateX(-50%)',
              width: '4px',
              background: 'linear-gradient(to bottom, #FFD9C2 0%, rgba(255, 217, 194, 0.8) 50%, #FFD9C2 100%)',
              boxShadow: '0 0 16px rgba(255, 217, 194, 0.7)',
              borderRadius: '4px',
              zIndex: 1
            }} />

            {/* Vertical Milestone Nodes Along the Line */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {verticalMilestones.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const isSelected = activeTimelineNode === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isEven ? 'flex-start' : 'flex-end',
                      width: '100%',
                      zIndex: 2,
                      paddingLeft: isEven ? '0' : 'clamp(0px, 4vw, 20px)',
                      paddingRight: isEven ? 'clamp(0px, 4vw, 20px)' : '0'
                    }}
                  >
                    {/* Glowing Node Marker ON the Central Line */}
                    <div
                      onClick={() => { playPop(); setActiveTimelineNode(item.id); }}
                      style={{
                        position: 'absolute',
                        left: 'clamp(24px, 50%, 50%)',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: isSelected ? '30px' : '22px',
                        height: isSelected ? '30px' : '22px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#FFD9C2' : '#8D0B0B',
                        border: '3px solid #FFD9C2',
                        boxShadow: isSelected ? '0 0 20px #FFD9C2' : '0 0 10px rgba(255, 217, 194, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 4,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isSelected ? '#8D0B0B' : '#FFD9C2' }} />
                    </div>

                    {/* Milestone Card */}
                    <motion.div
                      onClick={() => { playPop(); setActiveTimelineNode(item.id); }}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        width: 'clamp(270px, 44%, 350px)',
                        backgroundColor: 'var(--color-burgundy-primary)',
                        border: isSelected ? '2px solid var(--color-peach-primary)' : '1.5px solid rgba(255, 217, 194, 0.4)',
                        borderRadius: '22px',
                        padding: '22px 20px',
                        boxShadow: isSelected ? '0 12px 35px rgba(255, 217, 194, 0.3)' : '0 8px 24px rgba(0,0,0,0.5)',
                        textAlign: 'left',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Ribbon Tag Badge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}>
                        <span style={{
                          backgroundColor: '#2B0404',
                          color: 'var(--color-peach-primary)',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          border: '1px solid rgba(255,217,194,0.3)'
                        }}>
                          ✦ {item.tag}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-peach-soft)', fontWeight: 600 }}>
                          {item.date}
                        </span>
                      </div>

                      {/* Photo Thumbnail + Title */}
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '14px',
                          backgroundColor: '#FFF4EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                        }}>
                          <img src={item.img} alt={item.title} style={{ maxHeight: '44px', maxWidth: '44px', objectFit: 'contain' }} />
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-peach-primary)', margin: 0, fontStyle: 'italic', lineHeight: 1.25 }}>
                          {item.title}
                        </h4>
                      </div>

                      {/* Story Text */}
                      <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.35rem', color: 'var(--color-ivory)', margin: 0, lineHeight: 1.4 }}>
                        "{item.story}"
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <MagneticButton onClick={() => { playSuccess(); setCurrentLayer(3); }} variant="primary" size="md">
            Enter Vintage 3D Camera Reel →
          </MagneticButton>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 3: VINTAGE 3D CINEMATIC ROTATING CAMERA REEL (8+ PHOTOS, CONTINUOUS DRIFT) 🎞️📸
         ======================================================== */}
      {currentLayer === 3 && (
        <motion.div
          key="layer3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{ width: '100%', maxWidth: '940px', textAlign: 'center', zIndex: 10 }}
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
            <Film size={18} /> STEP 3 ✦ THE VINTAGE 3D FILM REEL
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.8vw, 3rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '6px',
            lineHeight: 1.2
          }}>
            "Our Memory Carousel in Motion"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '20px' }}>
            Watch the frames slowly drift and rotate. Swipe freely or tap any memory to inspect in the vintage loupe!
          </p>

          {/* VINTAGE FILM CASSETTE WRAPPER */}
          <div style={{
            backgroundColor: '#0A0000',
            borderRadius: '28px',
            padding: '22px 16px 18px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '26px',
            position: 'relative'
          }}>
            {/* Reel Header Info & Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 12px 12px', borderBottom: '1px solid rgba(255,217,194,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-peach-primary)', letterSpacing: '0.1em' }}>
                <Camera size={15} /> KODAK PORTRA 400 • ISO 200 • 35MM
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Manual Navigation Arrows */}
                <button
                  onClick={() => handleReelNav('left')}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,217,194,0.15)',
                    border: '1px solid var(--color-peach-primary)',
                    color: 'var(--color-peach-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => handleReelNav('right')}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,217,194,0.15)',
                    border: '1px solid var(--color-peach-primary)',
                    color: 'var(--color-peach-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => setIsAutoDrifting(!isAutoDrifting)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backgroundColor: isAutoDrifting ? 'rgba(255,217,194,0.2)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--color-peach-primary)',
                    color: 'var(--color-peach-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {isAutoDrifting ? <Pause size={12} /> : <Play size={12} />}
                  {isAutoDrifting ? 'Auto-Drift ON' : 'Paused'}
                </button>
              </div>
            </div>

            {/* Sprocket Holes Top */}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0 16px', opacity: 0.4 }}>
              {[...Array(16)].map((_, i) => (
                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: '#FFF4EB', borderRadius: '2px' }} />
              ))}
            </div>

            {/* 3D ROTATING & CONTINUOUSLY DRIFTING FILM FRAMES */}
            <div
              ref={filmReelContainerRef}
              onMouseEnter={handleUserInteractionStart}
              onMouseLeave={() => handleUserInteractionEnd(1500)}
              onTouchStart={handleUserInteractionStart}
              onTouchEnd={() => handleUserInteractionEnd(2000)}
              onScroll={handleManualScroll}
              onWheel={() => { handleUserInteractionStart(); handleUserInteractionEnd(1800); }}
              style={{
                display: 'flex',
                gap: '24px',
                overflowX: 'auto',
                padding: '20px 12px 24px',
                perspective: '1200px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollBehavior: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {allPhotos.map((photo, idx) => {
                const isSelected = selectedPhotoIndex === idx;
                const tiltZ = (idx % 2 === 0 ? -3.5 : 3.5);
                const tiltY = (idx % 2 === 0 ? 5 : -5);

                return (
                  <motion.div
                    key={photo.id}
                    onClick={() => handlePhotoClick(photo, idx)}
                    animate={{
                      rotateZ: isSelected ? 0 : [tiltZ, -tiltZ, tiltZ],
                      rotateY: isSelected ? 0 : [tiltY, -tiltY, tiltY],
                      y: isSelected ? -10 : [0, -8, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.2 + (idx % 4) * 0.5,
                      ease: 'easeInOut'
                    }}
                    whileHover={{ scale: 1.08, rotateZ: 0, rotateY: 0, y: -12 }}
                    style={{
                      flex: '0 0 clamp(200px, 26vw, 240px)',
                      backgroundColor: '#FFF4EB',
                      color: '#2B0404',
                      padding: '14px 14px 20px',
                      borderRadius: '16px',
                      boxShadow: isSelected ? '0 16px 40px rgba(255, 217, 194, 0.6)' : '0 10px 30px rgba(0,0,0,0.7)',
                      border: isSelected ? '2.5px solid #8D0B0B' : '1px solid rgba(0,0,0,0.2)',
                      cursor: 'pointer',
                      transformStyle: 'preserve-3d',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Retro Film Frame Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', fontWeight: 800, color: '#888', marginBottom: '8px' }}>
                      <span>EXP-{photo.frameNum || `0${idx + 1}`}</span>
                      <span style={{ color: '#E06D1A', fontFamily: 'monospace', fontWeight: 900 }}>{photo.dateStamp}</span>
                    </div>

                    {/* Image Frame */}
                    <div style={{
                      height: '145px',
                      width: '100%',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={photo.img}
                        alt={photo.title}
                        style={{
                          maxHeight: '130px',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.28))'
                        }}
                      />
                    </div>

                    {/* Title & Handwritten Note */}
                    <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '0.95rem', color: '#8D0B0B', fontStyle: 'italic' }}>
                      {photo.title}
                    </div>
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.2rem', color: '#444', margin: '4px 0 8px', lineHeight: 1.3 }}>
                      "{photo.note}"
                    </p>

                    {/* Inspect Viewfinder Button */}
                    <div
                      onClick={(e) => { e.stopPropagation(); handleOpenViewfinder(photo); }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#8D0B0B',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(141, 11, 11, 0.08)'
                      }}
                    >
                      <Eye size={12} /> Inspect Loupe
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sprocket Holes Bottom */}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0 6px', opacity: 0.4 }}>
              {[...Array(16)].map((_, i) => (
                <div key={i} style={{ width: '12px', height: '8px', backgroundColor: '#FFF4EB', borderRadius: '2px' }} />
              ))}
            </div>
          </div>

          {/* Viewfinder Loupe Lightbox Modal */}
          <AnimatePresence>
            {viewfinderPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setViewfinderPhoto(null)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(10, 0, 0, 0.88)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 99999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, rotateZ: -4 }}
                  animate={{ scale: 1, rotateZ: 0 }}
                  exit={{ scale: 0.8, rotateZ: 4 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: '#FFF4EB',
                    color: '#2B0404',
                    borderRadius: '24px',
                    padding: '28px',
                    maxWidth: '420px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                    border: '3px solid #8D0B0B',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8D0B0B' }}>
                      ✦ RETRO VIEWFINDER LOUPE ✦
                    </span>
                    <span style={{ color: '#E06D1A', fontFamily: 'monospace', fontWeight: 900 }}>
                      {viewfinderPhoto.dateStamp}
                    </span>
                  </div>

                  <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '14px 0' }}>
                    <img src={viewfinderPhoto.img} alt={viewfinderPhoto.title} style={{ maxHeight: '185px', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.3))' }} />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#8D0B0B', fontStyle: 'italic', marginBottom: '6px' }}>
                    {viewfinderPhoto.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.5rem', color: '#180202', lineHeight: 1.4, marginBottom: '20px' }}>
                    "{viewfinderPhoto.note}"
                  </p>

                  <button
                    onClick={() => setViewfinderPhoto(null)}
                    style={{
                      padding: '10px 28px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: '#8D0B0B',
                      color: '#FFF4EB',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Close Viewfinder
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Photo Upload Sandbox & Proceed Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: '14px 24px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 217, 194, 0.15)',
                border: '1.5px dashed var(--color-peach-primary)',
                color: 'var(--color-peach-primary)',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            >
              <Upload size={16} /> Upload Photo Memory (Live Test)
            </button>

            <MagneticButton onClick={() => { playSuccess(); setCurrentLayer(4); }} variant="primary" size="md">
              Shoot Cupid's Arrow 🏹 →
            </MagneticButton>
          </div>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 4: INTERACTIVE CUPID'S BOW & PULL-TO-AIM ARCHERY 🏹💘
         ======================================================== */}
      {currentLayer === 4 && (
        <motion.div
          key="layer4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{ textAlign: 'center', maxWidth: '780px', width: '100%', zIndex: 10 }}
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
            <Target size={18} /> STEP 4 ✦ CUPID'S ARCHERY CHALLENGE
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4.8vw, 3rem)',
            color: 'var(--color-peach-primary)',
            fontStyle: 'italic',
            marginBottom: '6px',
            lineHeight: 1.2
          }}>
            "Pull The Bow & Hit The Drifting Heart"
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-peach-soft)', marginBottom: '22px' }}>
            Grab Cupid's arrow, drag it backward to draw the bowstring, aim at the moving balloon, and release!
          </p>

          {/* Cupid's Extended Height Interactive Arena */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-primary)',
            borderRadius: '28px',
            padding: '28px 20px',
            border: '2px solid var(--color-peach-primary)',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '24px',
            minHeight: '520px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            userSelect: 'none',
            touchAction: 'none'
          }}>
            
            {/* Top: Horizontally Drifting & Swaying Heart Balloon (Interactive Target) */}
            <div style={{ position: 'relative', width: '100%', height: '160px', display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence>
                {arrowStatus !== 'hit' ? (
                  <motion.div
                    animate={{
                      x: [-130, 130, -130],
                      y: [-8, 8, -8],
                      rotate: [-6, 6, -6]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.8,
                      ease: 'easeInOut'
                    }}
                    onUpdate={(latest) => {
                      if (latest.x !== undefined) {
                        balloonPosRef.current.x = latest.x;
                      }
                    }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 5
                    }}
                  >
                    {/* Glowing Halo */}
                    <div style={{
                      position: 'absolute',
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 77, 109, 0.45) 0%, transparent 70%)',
                      top: '-15px'
                    }} />

                    {/* 3D Heart Balloon */}
                    <div style={{
                      width: '110px',
                      height: '100px',
                      backgroundColor: '#FF4D6D',
                      borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                      background: 'radial-gradient(circle at 35% 35%, #FFA8BA 0%, #FF4D6D 50%, #8D0B0B 100%)',
                      boxShadow: '0 12px 30px rgba(255, 77, 109, 0.6), inset -4px -4px 12px rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      transform: 'rotate(-45deg)'
                    }}>
                      <div style={{
                        position: 'absolute',
                        width: '110px',
                        height: '100px',
                        backgroundColor: '#FF4D6D',
                        borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                        background: 'radial-gradient(circle at 35% 35%, #FFA8BA 0%, #FF4D6D 50%, #8D0B0B 100%)',
                        boxShadow: '0 12px 30px rgba(255, 77, 109, 0.6)',
                        transform: 'rotate(90deg)'
                      }} />
                      <div style={{ position: 'relative', zIndex: 2, transform: 'rotate(45deg)', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#FFF4EB', textShadow: '0 2px 8px rgba(0,0,0,0.5)', letterSpacing: '0.05em' }}>
                          1,248 DAYS
                        </span>
                      </div>
                    </div>

                    {/* Balloon Knot & Ribbon */}
                    <div style={{ width: '8px', height: '6px', backgroundColor: '#FFD9C2', borderRadius: '2px', marginTop: '3px' }} />
                    <svg width="24" height="40" viewBox="0 0 24 40" style={{ marginTop: '-2px' }}>
                      <path d="M 12,0 Q 4,12 18,24 T 12,38" fill="none" stroke="#FFD9C2" strokeWidth="2" strokeDasharray="3,2" />
                    </svg>
                  </motion.div>
                ) : (
                  /* Balloon Burst State */
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1.15, opacity: 1 }}
                    style={{ textAlign: 'center', paddingTop: '20px' }}
                  >
                    <div style={{ fontSize: '3.2rem', marginBottom: '8px' }}>💥💘✨</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFD9C2', fontStyle: 'italic', margin: 0 }}>
                      BULLSEYE DIRECT HIT!
                    </h3>
                    <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem', color: '#FAF4EE', margin: '4px 0 0' }}>
                      "Releasing 1,248 Days of Pure Eternal Love..."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mid-Area: Aiming Guide Laser & Miss Tooltip */}
            <div style={{ minHeight: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {missFeedback ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#FFD9C2',
                    padding: '6px 16px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: '1px solid #FFD9C2'
                  }}
                >
                  {missFeedback}
                </motion.div>
              ) : arrowStatus === 'pulling' ? (
                <div style={{
                  color: '#FFD9C2',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Zap size={14} color="#FFD9C2" /> Release to Fire Arrow!
                </div>
              ) : arrowStatus === 'idle' ? (
                <div style={{
                  color: 'var(--color-peach-soft)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  opacity: 0.85
                }}>
                  ⬇️ Drag and pull the golden arrow down to draw the bow ⬇️
                </div>
              ) : null}
            </div>

            {/* Bottom: Cupid's Bow with Real String Physics & Pull Dragging */}
            {arrowStatus !== 'hit' && (
              <div style={{ position: 'relative', width: '280px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                
                {/* Bow Graphics & String that bends when arrow is pulled */}
                <svg width="240" height="100" viewBox="0 0 240 100" style={{ position: 'absolute', bottom: '25px', pointerEvents: 'none' }}>
                  {/* Outer Bow Arc */}
                  <path
                    d="M 20,30 Q 120,95 220,30"
                    fill="none"
                    stroke="#FFD9C2"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 8px rgba(255,217,194,0.5))"
                  />
                  {/* Left String segment connecting to pulled arrow */}
                  <line
                    x1="20"
                    y1="30"
                    x2={120 + dragOffset.x}
                    y2={30 + (dragOffset.y > 0 ? dragOffset.y * 0.75 : 0)}
                    stroke="rgba(255,217,194,0.85)"
                    strokeWidth="2.5"
                  />
                  {/* Right String segment connecting to pulled arrow */}
                  <line
                    x1={120 + dragOffset.x}
                    y1={30 + (dragOffset.y > 0 ? dragOffset.y * 0.75 : 0)}
                    x2="220"
                    y2="30"
                    stroke="rgba(255,217,194,0.85)"
                    strokeWidth="2.5"
                  />
                </svg>

                {/* Trajectory Guide Laser while pulling */}
                {arrowStatus === 'pulling' && dragOffset.y > 15 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '90px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${-dragOffset.x * 0.4}deg)`,
                    transformOrigin: 'bottom center',
                    width: '2px',
                    height: '220px',
                    background: 'linear-gradient(to top, rgba(255,217,194,0.8), transparent)',
                    pointerEvents: 'none',
                    borderLeft: '2px dashed #FFD9C2'
                  }} />
                )}

                {/* Interactive Golden Arrow (Drag down & angle to aim) */}
                <motion.div
                  drag={arrowStatus === 'idle' || arrowStatus === 'pulling'}
                  dragConstraints={{ top: 0, bottom: 65, left: -45, right: 45 }}
                  dragElastic={0.15}
                  onDragStart={() => setArrowStatus('pulling')}
                  onDrag={(e, info) => setDragOffset({ x: info.offset.x, y: info.offset.y })}
                  onDragEnd={handleArrowRelease}
                  animate={arrowStatus === 'fired' ? {
                    x: flightTarget.x,
                    y: flightTarget.y,
                    rotate: flightTarget.x * 0.08,
                    scale: [1, 1.2, 0.85],
                    transition: { duration: 0.45, ease: 'easeIn' }
                  } : arrowStatus === 'idle' ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    transition: { type: 'spring', stiffness: 400, damping: 20 }
                  } : {
                    rotate: -dragOffset.x * 0.35
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '35px',
                    cursor: 'grab',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10,
                    touchAction: 'none'
                  }}
                >
                  {/* Glowing Arrow Tip */}
                  <div style={{
                    width: '0',
                    height: '0',
                    borderLeft: '11px solid transparent',
                    borderRight: '11px solid transparent',
                    borderBottom: '20px solid #FFD9C2',
                    filter: 'drop-shadow(0 0 10px #FFD9C2)'
                  }} />
                  {/* Arrow Shaft */}
                  <div style={{
                    width: '5px',
                    height: '85px',
                    backgroundColor: '#FFD9C2',
                    boxShadow: '0 0 12px rgba(255,217,194,0.9)',
                    borderRadius: '2px'
                  }} />
                  {/* Arrow Feather Fletching / Grip Area */}
                  <div style={{
                    width: '24px',
                    height: '18px',
                    borderLeft: '5px solid #FF4D6D',
                    borderRight: '5px solid #FF4D6D',
                    borderTop: '10px solid transparent',
                    backgroundColor: 'rgba(255, 77, 109, 0.3)'
                  }} />
                  {/* Pull Indicator Pill */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-28px',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: '#2B0404',
                    backgroundColor: '#FFD9C2',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    pointerEvents: 'none'
                  }}>
                    PULL & AIM
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ========================================================
          LAYER 5: GRAND ANNIVERSARY LOVE VAULT & WAX SEAL LETTER 💐💌
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
                alt="Anniversary Bouquet"
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 10px 30px rgba(255, 217, 194, 0.5))' }}
              />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-peach-primary)' }}>
              ✦ HAPPY 1,248 DAYS ANNIVERSARY ✦
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', color: 'var(--color-peach-primary)', fontStyle: 'italic', margin: '6px 0', lineHeight: 1.2 }}>
              I Still Choose You, Always.
            </h2>
            <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.75rem', color: 'var(--color-ivory)' }}>
              "To the person who turned every single day into my favorite story."
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
                  Our Song (Endless Love Acoustic).mp3
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-peach-soft)' }}>
                  {isPlayingSong ? "Now playing special anniversary acoustic melody... 2:48" : "Tap to play our song"}
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
                  Tap the Wax Seal to Open Your Private Anniversary Letter
                </h4>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1.5px solid rgba(141,11,11,0.2)', paddingBottom: '10px' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 800, fontSize: '0.92rem', color: '#8D0B0B', letterSpacing: '0.05em' }}>
                    SACRED ANNIVERSARY LETTER ✦ UNSEALED
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>
                    May 14, 2022 — Forever
                  </span>
                </div>

                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.75rem', lineHeight: 1.6, marginBottom: '12px', color: '#180202' }}>
                  My Dearest Love,
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.55rem', lineHeight: 1.6, marginBottom: '14px', color: '#180202' }}>
                  1,248 days ago, I had no idea that one conversation would change the entire trajectory of my life. Thank you for tolerating my terrible jokes, stealing all my hoodies, and making the simplest grocery run feel like a romantic comedy.
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.55rem', lineHeight: 1.6, marginBottom: '16px', color: '#180202' }}>
                  Here is to another 100,000 hours, a million more inside jokes, and choosing you in every single lifetime.
                </p>
                <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.65rem', fontWeight: 700, textAlign: 'right', color: '#8D0B0B' }}>
                  — Yours Forever & Always
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
              <RotateCcw size={16} /> Replay Time Machine
            </button>

            <MagneticButton to="/contact" variant="primary" size="md">
              Make one for your anniversary →
            </MagneticButton>
          </div>
        </motion.div>
      )}

    </div>
  );
};
