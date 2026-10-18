import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Heart, Music, Camera, Mic, Gift, Clock, ShieldCheck, Infinity } from 'lucide-react';
import { useAudio } from '../ui/AudioEffects';
import { MagneticButton } from '../ui/MagneticButton';

export const ServiceBuilderWidget = () => {
  const [selectedCategory, setSelectedCategory] = useState('100% Fully Customizable');
  const [selectedLifespan, setSelectedLifespan] = useState('Forever Vault');
  const [selectedFeatures, setSelectedFeatures] = useState([
    'Custom Interactive Timeline',
    'Voice Note / Audio Player',
    'Interactive Blow Candle / Reveal'
  ]);
  const { playPop, playSuccess } = useAudio();

  const categories = [
    '100% Fully Customizable',
    'Personal Experience',
    'Creative Brand Web'
  ];

  const lifespans = [
    { label: '24 Hours', desc: 'Self-destruct link after viewing', icon: Clock },
    { label: '48 Hours', desc: 'Weekend celebration capsule', icon: Clock },
    { label: '7 Days', desc: 'Birthday / Event celebration week', icon: Clock },
    { label: '30 Days', desc: 'Monthly milestone memory', icon: Clock },
    { label: 'Forever Vault', desc: 'Permanent digital keepsake link', icon: Infinity }
  ];

  const availableFeatures = [
    { name: 'Custom Interactive Timeline', icon: Camera, desc: 'Photos, polaroids & milestone cards' },
    { name: 'Voice Note / Audio Player', icon: Mic, desc: 'Record or upload private audio clips' },
    { name: 'Interactive Blow Candle / Reveal', icon: Gift, desc: 'Touch/click physical-like interactions' },
    { name: 'Custom Background Soundtrack', icon: Music, desc: 'Curated audio score or Spotify embed' },
    { name: 'Password Protected Secret Lock', icon: Heart, desc: 'Private lock code for recipient' },
    { name: 'Hidden Easter Egg Clues', icon: Sparkles, desc: 'Secret unlockable messages' }
  ];

  const toggleFeature = (name) => {
    playPop();
    if (selectedFeatures.includes(name)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== name));
    } else {
      setSelectedFeatures([...selectedFeatures, name]);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-burgundy-dark)',
      border: '2px solid var(--color-peach-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(20px, 4vw, 36px)',
      color: 'var(--color-ivory)',
      boxShadow: 'var(--shadow-lg)',
      position: 'relative'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 14px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 217, 194, 0.15)',
          color: 'var(--color-peach-primary)',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '8px'
        }}>
          <Sparkles size={14} /> Interactive Studio Builder
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)' }}>
          Assemble Your Dream Experience
        </h3>
      </div>

      {/* Step 1: Category Picker */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
          1. Select Category Type:
        </label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); playPop(); }}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid ' + (selectedCategory === cat ? 'var(--color-peach-primary)' : 'rgba(255,255,255,0.15)'),
                backgroundColor: selectedCategory === cat ? 'var(--color-peach-primary)' : 'transparent',
                color: selectedCategory === cat ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flex: '1 1 auto',
                minWidth: '140px',
                textAlign: 'center'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Website Lifespan / Expiry Control */}
      <div style={{ marginBottom: '28px' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Clock size={16} color="var(--color-peach-primary)" /> 2. Choose Website Lifespan (Expiry Time):
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
          {lifespans.map(life => {
            const isSelected = selectedLifespan === life.label;
            const IconComp = life.icon;
            return (
              <div
                key={life.label}
                onClick={() => { setSelectedLifespan(life.label); playPop(); }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? 'var(--color-peach-primary)' : 'rgba(24, 2, 2, 0.5)',
                  border: '1.5px solid ' + (isSelected ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.2)'),
                  color: isSelected ? 'var(--color-burgundy-dark)' : 'var(--color-ivory)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <IconComp size={14} /> {life.label}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '4px' }}>
                  {life.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Feature Toggles */}
      <div style={{ marginBottom: '28px' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
          3. Pick Desired Interactive Touches:
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {availableFeatures.map(feat => {
            const isSelected = selectedFeatures.includes(feat.name);
            const IconComp = feat.icon;
            return (
              <div
                key={feat.name}
                onClick={() => toggleFeature(feat.name)}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? 'rgba(255, 217, 194, 0.12)' : 'rgba(24, 2, 2, 0.5)',
                  border: '1.5px solid ' + (isSelected ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.15)'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.1)',
                  color: isSelected ? 'var(--color-burgundy-dark)' : 'var(--color-peach-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {isSelected ? <Check size={16} /> : <IconComp size={16} />}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-ivory)' }}>
                    {feat.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-peach-muted)', marginTop: '2px' }}>
                    {feat.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Box */}
      <div style={{
        padding: '20px',
        backgroundColor: 'var(--color-burgundy-primary)',
        borderRadius: '12px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        border: '1px solid var(--color-border-light)'
      }}>
        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-peach-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Your Custom Build • Lifespan: {selectedLifespan}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--color-ivory)', marginTop: '2px' }}>
            {selectedCategory} ({selectedFeatures.length} Interactive Features)
          </div>
        </div>

        <MagneticButton to="/contact" variant="primary">
          Start This Surprise →
        </MagneticButton>
      </div>
    </div>
  );
};
