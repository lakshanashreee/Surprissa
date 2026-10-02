import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext({
  soundEnabled: true,
  toggleSound: () => {},
  playPop: () => {},
  playSparkle: () => {},
  playSuccess: () => {},
  playFlame: () => {}
});

export const AudioProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    // Lazy initialize Web Audio API on first user interaction
    const initAudio = () => {
      if (!audioCtx) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioCtx(ctx);
      }
    };

    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, [audioCtx]);

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const playPop = () => {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio playback exception", e);
    }
  };

  const playSparkle = () => {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const startTime = audioCtx.currentTime + i * 0.05;
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.15);
      });
    } catch (e) {
      console.warn("Audio playback exception", e);
    }
  };

  const playSuccess = () => {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const chord = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      chord.forEach(freq => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      });
    } catch (e) {
      console.warn("Audio playback exception", e);
    }
  };

  const playFlame = () => {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn("Audio playback exception", e);
    }
  };

  return (
    <AudioContext.Provider value={{ soundEnabled, toggleSound, playPop, playSparkle, playSuccess, playFlame }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
