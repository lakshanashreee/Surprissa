import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, CheckCircle2, Heart, Calendar, DollarSign, User, Mail, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../components/ui/AudioEffects';
import { MagneticButton } from '../components/ui/MagneticButton';

export const Contact = () => {
  const { playPop, playSuccess } = useAudio();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lookingFor: 'Personal Experience',
    whoIsItFor: '',
    occasion: 'Birthday',
    message: '',
    budget: '',
    preferredDate: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const occasions = [
    { label: 'Birthday 🎂', val: 'Birthday' },
    { label: 'Anniversary 🥂', val: 'Anniversary' },
    { label: 'Ask Them Out 💌', val: 'Ask Them Out' },
    { label: 'Apology 🕊️', val: 'Apology' },
    { label: 'Best Friend 👯‍♀️', val: 'Best Friend' },
    { label: 'Graduation 🎓', val: 'Graduation' },
    { label: 'Farewell ✈️', val: 'Farewell' },
    { label: 'Just Because 🌟', val: 'Just Because' },
    { label: 'Personal Website ✨', val: 'Personal Website' },
    { label: 'Business Website 🚀', val: 'Business Website' },
    { label: 'Other 🔮', val: 'Other' }
  ];

  const lookingForOptions = [
    'Personal Experience',
    'Creative Web / Brand Site',
    'Custom Surprise Project'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOccasionSelect = (val) => {
    playPop();
    setFormData({ ...formData, occasion: val });
  };

  const handleLookingForSelect = (val) => {
    playPop();
    setFormData({ ...formData, lookingFor: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playPop();
    setStatus('submitting');
    setErrorMessage('');

    // Endpoint configured via VITE_FORMSPREE_ENDPOINT environment variable
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          playSuccess();
          setStatus('success');
          try {
            confetti({
              particleCount: 140,
              spread: 90,
              origin: { y: 0.55 },
              colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8']
            });
          } catch (err) {}
        } else {
          throw new Error('Failed to send inquiry. Please try again.');
        }
      } else {
        // Fallback simulation mode for V1 when environment variable is not yet populated
        await new Promise(res => setTimeout(res, 1200));
        playSuccess();
        setStatus('success');
        try {
          confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.55 },
            colors: ['#8D0B0B', '#FFD9C2', '#FFF1E8']
          });
        } catch (err) {}
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please check your connection.');
    }
  };

  const handleReset = () => {
    playPop();
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      lookingFor: 'Personal Experience',
      whoIsItFor: '',
      occasion: 'Birthday',
      message: '',
      budget: '',
      preferredDate: ''
    });
  };

  return (
    <div style={{ color: 'var(--color-ivory)', overflow: 'hidden' }}>
      <section style={{
        padding: '90px 24px 100px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        position: 'relative'
      }} className="bg-grain">
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(255, 217, 194, 0.12)',
              color: 'var(--color-peach-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px'
            }}>
              Start A Surprise
            </span>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--color-ivory)',
              marginBottom: '16px'
            }}>
              Okay, tell us what you're thinking.
            </h1>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: 'var(--color-peach-soft)'
            }}>
              Tell us who it's for, what you're celebrating, or what crazy idea you have in mind.
            </p>
          </div>

          {/* Form Container */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-dark)',
            border: '2px solid var(--color-peach-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 32px',
            boxShadow: 'var(--shadow-glow)',
            position: 'relative'
          }}>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* Delightful Confirmation Screen */
                <motion.div
                  key="success-state"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  style={{ textAlign: 'center', padding: '40px 20px' }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-peach-primary)',
                    color: 'var(--color-burgundy-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 0 30px rgba(255, 217, 194, 0.4)'
                  }}>
                    <Heart size={44} fill="var(--color-burgundy-dark)" />
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    color: 'var(--color-peach-primary)',
                    marginBottom: '12px'
                  }}>
                    WE GOT IT 💌
                  </h2>

                  <p style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '2rem',
                    color: 'var(--color-ivory)',
                    marginBottom: '20px'
                  }}>
                    Now go pretend you're not excited.
                  </p>

                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-peach-soft)',
                    maxWidth: '480px',
                    margin: '0 auto 36px',
                    lineHeight: 1.6
                  }}>
                    We’ve received your inquiry and will respond within 24 hours with ideas and next steps for your custom experience!
                  </p>

                  <MagneticButton onClick={handleReset} variant="primary">
                    Submit another idea ✨
                  </MagneticButton>
                </motion.div>
              ) : (
                /* Inquiry Form */
                <motion.form
                  key="form-state"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                >
                  {/* Field: What are you looking for? */}
                  <div>
                    <label style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-peach-primary)', display: 'block', marginBottom: '12px' }}>
                      1. What are you looking for?
                    </label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {lookingForOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => handleLookingForSelect(opt)}
                          style={{
                            padding: '12px 20px',
                            borderRadius: 'var(--radius-pill)',
                            border: '1.5px solid ' + (formData.lookingFor === opt ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.2)'),
                            backgroundColor: formData.lookingFor === opt ? 'var(--color-peach-primary)' : 'transparent',
                            color: formData.lookingFor === opt ? 'var(--color-burgundy-dark)' : 'var(--color-ivory)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field: Occasion Option Cards */}
                  <div>
                    <label style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-peach-primary)', display: 'block', marginBottom: '12px' }}>
                      2. Select Occasion:
                    </label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {occasions.map((occ) => (
                        <button
                          type="button"
                          key={occ.val}
                          onClick={() => handleOccasionSelect(occ.val)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: 'var(--radius-pill)',
                            border: '1px solid ' + (formData.occasion === occ.val ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.2)'),
                            backgroundColor: formData.occasion === occ.val ? 'rgba(255, 217, 194, 0.18)' : 'rgba(24, 2, 2, 0.4)',
                            color: formData.occasion === occ.val ? 'var(--color-peach-primary)' : 'var(--color-peach-soft)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {occ.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field Group: Name & Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Jordan Smith"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 217, 194, 0.25)',
                          backgroundColor: 'rgba(24, 2, 2, 0.6)',
                          color: 'var(--color-ivory)',
                          fontSize: '1rem',
                          outline: 'none',
                          fontFamily: 'var(--font-body)'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 217, 194, 0.25)',
                          backgroundColor: 'rgba(24, 2, 2, 0.6)',
                          color: 'var(--color-ivory)',
                          fontSize: '1rem',
                          outline: 'none',
                          fontFamily: 'var(--font-body)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Field Group: Who is it for? & Delivery Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                        Who is it for?
                      </label>
                      <input
                        type="text"
                        name="whoIsItFor"
                        value={formData.whoIsItFor}
                        onChange={handleChange}
                        placeholder="e.g. My best friend Sam, my partner, myself"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 217, 194, 0.25)',
                          backgroundColor: 'rgba(24, 2, 2, 0.6)',
                          color: 'var(--color-ivory)',
                          fontSize: '1rem',
                          outline: 'none',
                          fontFamily: 'var(--font-body)'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                        Preferred Delivery Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 217, 194, 0.25)',
                          backgroundColor: 'rgba(24, 2, 2, 0.6)',
                          color: 'var(--color-ivory)',
                          fontSize: '1rem',
                          outline: 'none',
                          fontFamily: 'var(--font-body)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                      Tell us the vibe, inside jokes, or story behind this idea *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Give us all the juicy details! Inside jokes, memories, favorite colors, songs, or specific features you'd love to see."
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 217, 194, 0.25)',
                        backgroundColor: 'rgba(24, 2, 2, 0.6)',
                        color: 'var(--color-ivory)',
                        fontSize: '1rem',
                        outline: 'none',
                        fontFamily: 'var(--font-body)',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Optional Budget */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                      Optional Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 217, 194, 0.25)',
                        backgroundColor: 'rgba(24, 2, 2, 0.6)',
                        color: 'var(--color-peach-primary)',
                        fontSize: '1rem',
                        outline: 'none',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      <option value="">Select budget option (Optional)</option>
                      <option value="Starter Gift (< $150)">Starter Digital Gift (&lt; $150)</option>
                      <option value="Bespoke Experience ($150 - $350)">Bespoke Interactive Experience ($150 - $350)</option>
                      <option value="Grand Gesture / Brand Web ($350+)">Grand Gesture / Brand Website ($350+)</option>
                    </select>
                  </div>

                  {/* Error display */}
                  {status === 'error' && (
                    <div style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(192, 38, 38, 0.2)',
                      border: '1px solid var(--color-burgundy-light)',
                      color: 'var(--color-peach-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.9rem'
                    }}>
                      <AlertCircle size={20} />
                      <div>{errorMessage}</div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === 'submitting'}
                      style={{ width: '100%' }}
                    >
                      {status === 'submitting' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <RefreshCw className="animate-spin-sparkle" size={18} /> Sending Magic...
                        </span>
                      ) : (
                        'Send inquiry to Surprissa 💌'
                      )}
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};
