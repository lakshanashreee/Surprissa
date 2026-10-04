import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Heart, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAudio } from '../components/ui/AudioEffects';
import { MagneticButton } from '../components/ui/MagneticButton';

export const Contact = () => {
  const { playPop, playSuccess } = useAudio();
  const [step, setStep] = useState(1);

  const targetEmail = "surprissa.enquire@gmail.com";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whoIsItFor: '',
    lookingFor: 'Personal Experience',
    occasion: 'Birthday',
    lifespan: 'Forever Vault (Permanent Keepsake)',
    message: '',
    budget: '',
    preferredDate: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const occasions = [
    { label: 'Birthday', val: 'Birthday' },
    { label: 'Anniversary', val: 'Anniversary' },
    { label: 'Ask Them Out', val: 'Ask Them Out' },
    { label: 'Apology', val: 'Apology' },
    { label: 'Best Friend', val: 'Best Friend' },
    { label: 'Graduation', val: 'Graduation' },
    { label: 'Farewell', val: 'Farewell' },
    { label: 'Just Because', val: 'Just Because' },
    { label: 'Personal Website', val: 'Personal Website' },
    { label: 'Business Website', val: 'Business Website' },
    { label: 'Other', val: 'Other' }
  ];

  const nextStep = () => {
    playPop();
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    playPop();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playPop();
    setStatus('submitting');
    setErrorMessage('');

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    try {
      if (endpoint && !endpoint.includes('YOUR_FORM_ID') && !endpoint.includes('surprissa_enquire')) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _to: targetEmail,
            ...formData
          })
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
          throw new Error('Failed to send inquiry via endpoint. You can email directly below.');
        }
      } else {
        // Direct handling simulation & mailto trigger
        await new Promise((res) => setTimeout(res, 1000));
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
      setErrorMessage(err.message || 'Error submitting form. Please send email directly.');
    }
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`New Surprissa Order Query: ${formData.occasion} for ${formData.whoIsItFor || 'someone special'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Looking For: ${formData.lookingFor}\n` +
      `Occasion: ${formData.occasion}\n` +
      `Who is it for: ${formData.whoIsItFor}\n` +
      `Website Lifespan / Expiry: ${formData.lifespan}\n` +
      `Preferred Date: ${formData.preferredDate || 'Flexible'}\n` +
      `Budget: ${formData.budget || 'Not specified'}\n\n` +
      `Message & Story:\n${formData.message}`
    );
    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const handleReset = () => {
    playPop();
    setStatus('idle');
    setStep(1);
    setFormData({
      name: '',
      email: '',
      whoIsItFor: '',
      lookingFor: 'Personal Experience',
      occasion: 'Birthday',
      lifespan: 'Forever Vault (Permanent Keepsake)',
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
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
              Direct Inquiry Channel
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
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--color-peach-soft)',
              marginBottom: '12px'
            }}>
              All inquiries and order details are routed directly to:
            </p>

            <a
              href={`mailto:${targetEmail}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 217, 194, 0.15)',
                color: 'var(--color-peach-primary)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                border: '1px solid var(--color-peach-primary)'
              }}
            >
              <Mail size={18} /> {targetEmail}
            </a>
          </div>

          {/* Wizard Progress Bar */}
          {status !== 'success' && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--color-peach-primary)', fontWeight: 700 }}>
                <span>Step {step} of 4</span>
                <span>{step === 1 ? 'Who is it for?' : step === 2 ? 'Occasion' : step === 3 ? 'Story & Vibe' : 'Timing & Budget'}</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 217, 194, 0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  style={{ height: '100%', backgroundColor: 'var(--color-peach-primary)' }}
                />
              </div>
            </div>
          )}

          {/* Form Container */}
          <div style={{
            backgroundColor: 'var(--color-burgundy-dark)',
            border: '2px solid var(--color-peach-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 28px',
            boxShadow: 'var(--shadow-glow)',
            position: 'relative'
          }}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* Confirmation Screen */
                <motion.div
                  key="success-state"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  style={{ textAlign: 'center', padding: '30px 10px' }}
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
                    fontSize: '1.8rem',
                    color: 'var(--color-ivory)',
                    marginBottom: '16px'
                  }}>
                    Now go pretend you're not excited.
                  </p>

                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-peach-soft)',
                    maxWidth: '480px',
                    margin: '0 auto 24px',
                    lineHeight: 1.6
                  }}>
                    Your inquiry details have been dispatched to <strong>{targetEmail}</strong>. We will review your story and get back to you within 24 hours!
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
                    <a
                      href={generateMailtoUrl()}
                      style={{
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'rgba(255, 217, 194, 0.15)',
                        border: '1px solid var(--color-peach-primary)',
                        color: 'var(--color-peach-primary)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Mail size={16} /> Open in Email App
                    </a>

                    <MagneticButton onClick={handleReset} variant="primary">
                      Submit another idea ✨
                    </MagneticButton>
                  </div>
                </motion.div>
              ) : (
                /* Multi-Step Wizard */
                <form onSubmit={handleSubmit}>
                  
                  {/* STEP 1: Basic Info & Recipient */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-peach-primary)' }}>
                        Step 1: Who are we making this for?
                      </h3>

                      <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex"
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 217, 194, 0.25)',
                            backgroundColor: 'rgba(24, 2, 2, 0.6)',
                            color: 'var(--color-ivory)',
                            fontSize: '1rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                          Your Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@domain.com"
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 217, 194, 0.25)',
                            backgroundColor: 'rgba(24, 2, 2, 0.6)',
                            color: 'var(--color-ivory)',
                            fontSize: '1rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                          Who is the lucky recipient?
                        </label>
                        <input
                          type="text"
                          value={formData.whoIsItFor}
                          onChange={(e) => setFormData({ ...formData, whoIsItFor: e.target.value })}
                          placeholder="e.g. My best friend Sam, my partner, myself"
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 217, 194, 0.25)',
                            backgroundColor: 'rgba(24, 2, 2, 0.6)',
                            color: 'var(--color-ivory)',
                            fontSize: '1rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.name || !formData.email}
                          style={{
                            padding: '12px 28px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: 'var(--color-peach-primary)',
                            color: 'var(--color-burgundy-dark)',
                            border: 'none',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            cursor: (!formData.name || !formData.email) ? 'not-allowed' : 'pointer',
                            opacity: (!formData.name || !formData.email) ? 0.5 : 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          Next: Occasion <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Occasion Selection */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-peach-primary)' }}>
                        Step 2: What is the occasion?
                      </h3>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                        {occasions.map((occ) => {
                          const isSelected = formData.occasion === occ.val;
                          return (
                            <button
                              type="button"
                              key={occ.val}
                              onClick={() => { playPop(); setFormData({ ...formData, occasion: occ.val }); }}
                              style={{
                                padding: '14px 10px',
                                borderRadius: '12px',
                                border: '1.5px solid ' + (isSelected ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.2)'),
                                backgroundColor: isSelected ? 'var(--color-peach-primary)' : 'rgba(24, 2, 2, 0.5)',
                                color: isSelected ? 'var(--color-burgundy-dark)' : 'var(--color-ivory)',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'center'
                              }}
                            >
                              {occ.label}
                            </button>
                          );
                        })}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                        <button
                          type="button"
                          onClick={prevStep}
                          style={{
                            padding: '12px 20px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: 'transparent',
                            color: 'var(--color-peach-soft)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <ArrowLeft size={16} /> Back
                        </button>

                        <button
                          type="button"
                          onClick={nextStep}
                          style={{
                            padding: '12px 28px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: 'var(--color-peach-primary)',
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
                          Next: The Story <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Message & Story */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-peach-primary)' }}>
                        Step 3: Tell us the vibe & story
                      </h3>

                      <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                          What should this website capture? (Inside jokes, memories, songs, quirks) *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Give us all the details! What makes them laugh? Favorite memory? Songs they love? Any specific feature you want?"
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 217, 194, 0.25)',
                            backgroundColor: 'rgba(24, 2, 2, 0.6)',
                            color: 'var(--color-ivory)',
                            fontSize: '1rem',
                            outline: 'none',
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                        <button
                          type="button"
                          onClick={prevStep}
                          style={{
                            padding: '12px 20px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: 'transparent',
                            color: 'var(--color-peach-soft)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <ArrowLeft size={16} /> Back
                        </button>

                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!formData.message}
                          style={{
                            padding: '12px 28px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: 'var(--color-peach-primary)',
                            color: 'var(--color-burgundy-dark)',
                            border: 'none',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            cursor: !formData.message ? 'not-allowed' : 'pointer',
                            opacity: !formData.message ? 0.5 : 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          Next: Timing <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Timing, Lifespan & Budget */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-peach-primary)' }}>
                        Step 4: Timing & Lifespan (Almost done!)
                      </h3>

                      {/* Lifespan / Expiry Selection */}
                      <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                          Website Lifespan (How long should the link stay live?)
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                          {[
                            { label: '24 Hours', val: '24 Hours (Self-Destruct)' },
                            { label: '48 Hours', val: '48 Hours (Weekend)' },
                            { label: '7 Days', val: '7 Days (Celebration Week)' },
                            { label: '30 Days', val: '30 Days (Month)' },
                            { label: 'Forever Vault', val: 'Forever Vault (Permanent Keepsake)' }
                          ].map((item) => {
                            const isSelected = formData.lifespan === item.val;
                            return (
                              <button
                                type="button"
                                key={item.val}
                                onClick={() => { playPop(); setFormData({ ...formData, lifespan: item.val }); }}
                                style={{
                                  padding: '10px 8px',
                                  borderRadius: '10px',
                                  border: '1.5px solid ' + (isSelected ? 'var(--color-peach-primary)' : 'rgba(255, 217, 194, 0.2)'),
                                  backgroundColor: isSelected ? 'var(--color-peach-primary)' : 'rgba(24, 2, 2, 0.5)',
                                  color: isSelected ? 'var(--color-burgundy-dark)' : 'var(--color-ivory)',
                                  fontFamily: 'var(--font-display)',
                                  fontWeight: 700,
                                  fontSize: '0.82rem',
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                            Preferred Delivery Date
                          </label>
                          <input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '14px 18px',
                              borderRadius: '12px',
                              border: '1px solid rgba(255, 217, 194, 0.25)',
                              backgroundColor: 'rgba(24, 2, 2, 0.6)',
                              color: 'var(--color-ivory)',
                              fontSize: '1rem',
                              outline: 'none'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-soft)', display: 'block', marginBottom: '8px' }}>
                            Optional Budget Range
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '14px 18px',
                              borderRadius: '12px',
                              border: '1px solid rgba(255, 217, 194, 0.25)',
                              backgroundColor: 'rgba(24, 2, 2, 0.6)',
                              color: 'var(--color-peach-primary)',
                              fontSize: '1rem',
                              outline: 'none'
                            }}
                          >
                            <option value="">Select budget option (Optional)</option>
                            <option value="Starter Gift (< $150)">Starter Digital Gift (&lt; $150)</option>
                            <option value="Bespoke Experience ($150 - $350)">Bespoke Interactive Experience ($150 - $350)</option>
                            <option value="Grand Gesture / Brand Web ($350+)">Grand Gesture / Brand Website ($350+)</option>
                          </select>
                        </div>
                      </div>

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

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                        <button
                          type="button"
                          onClick={prevStep}
                          style={{
                            padding: '12px 20px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: 'transparent',
                            color: 'var(--color-peach-soft)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <ArrowLeft size={16} /> Back
                        </button>

                        <button
                          type="submit"
                          disabled={status === 'submitting'}
                          style={{
                            padding: '14px 32px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: 'var(--color-peach-primary)',
                            color: 'var(--color-burgundy-dark)',
                            border: 'none',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 8px 25px rgba(255, 217, 194, 0.3)'
                          }}
                        >
                          {status === 'submitting' ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              <RefreshCw className="animate-spin-sparkle" size={18} /> Sending to surprissa.enquire@gmail.com...
                            </span>
                          ) : (
                            'Send inquiry to Surprissa 💌'
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};
