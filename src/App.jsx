import React from 'react';
import { AudioProvider, useAudio } from './components/ui/AudioEffects';
import { BirthdayLiveExperience } from './components/interactive/BirthdayLiveExperience';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

const SoundController = () => {
  const { soundEnabled, toggleSound } = useAudio();

  return (
    <button
      onClick={toggleSound}
      title={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
      aria-label="Toggle Sound"
      style={{
        position: 'fixed',
        top: '18px',
        right: '18px',
        zIndex: 99999,
        background: 'rgba(43, 4, 4, 0.85)',
        border: '1.5px solid var(--color-peach-primary)',
        color: 'var(--color-peach-primary)',
        padding: '8px 16px',
        borderRadius: 'var(--radius-pill)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-display)',
        fontSize: '0.82rem',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: 'var(--shadow-glow)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.25s ease'
      }}
    >
      {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span>{soundEnabled ? 'SOUND ON' : 'SOUND MUTED'}</span>
    </button>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <div style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-burgundy-deepest)',
        background: 'radial-gradient(ellipse at 50% 25%, rgba(141, 11, 11, 0.45) 0%, rgba(24, 2, 2, 0.95) 60%, rgba(18, 1, 1, 1) 100%)',
        overflowX: 'hidden'
      }}>
        <SoundController />
        <main style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <BirthdayLiveExperience recipientName="Stacy" />
        </main>
      </div>
    </AudioProvider>
  );
}
