import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Crown, Smile, Users, GraduationCap, Zap, User, Rocket, Store, ChevronDown, ChevronUp } from 'lucide-react';
import { PERSONAL_SERVICES, CREATIVE_WEB_SERVICES } from '../data/services';
import { TiltCard } from '../components/ui/TiltCard';
import { MagneticButton } from '../components/ui/MagneticButton';
import { ServiceBuilderWidget } from '../components/interactive/ServiceBuilderWidget';
import { useAudio } from '../components/ui/AudioEffects';

export const Services = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'personal', 'creative'
  const [expandedId, setExpandedId] = useState(null);
  const { playPop } = useAudio();

  const iconMap = {
    Gift, Heart, Sparkles, Crown, Smile, Users, GraduationCap, Zap, User, Rocket, Store
  };

  const toggleExpand = (id) => {
    playPop();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ color: 'var(--color-ivory)', overflow: 'hidden' }}>
      
      {/* Header Banner */}
      <section style={{
        padding: '90px 24px 60px',
        backgroundColor: 'var(--color-burgundy-deepest)',
        textAlign: 'center'
      }} className="bg-grain">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            What We Build
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            color: 'var(--color-ivory)',
            marginBottom: '20px'
          }}>
            Surprises, personal sites & digital experiences.
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem',
            fontStyle: 'italic',
            color: 'var(--color-peach-soft)',
            maxWidth: '640px',
            margin: '0 auto 36px'
          }}>
            No corporate templates. No boring layouts. Everything we make is custom-designed to leave a lasting impression.
          </p>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Services' },
              { id: 'personal', label: 'Personal Experiences ❤️' },
              { id: 'creative', label: 'Creative Web & Brands 🚀' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { playPop(); setActiveTab(tab.id); }}
                style={{
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-pill)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  border: '1.5px solid ' + (activeTab === tab.id ? 'var(--color-peach-primary)' : 'rgba(255,255,255,0.15)'),
                  backgroundColor: activeTab === tab.id ? 'var(--color-peach-primary)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-burgundy-dark)' : 'var(--color-ivory)',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section style={{
        padding: '60px 24px 100px',
        backgroundColor: 'var(--color-burgundy-dark)'
      }} className="bg-grain">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Section 1: Personal Experiences */}
          {(activeTab === 'all' || activeTab === 'personal') && (
            <div style={{ marginBottom: '80px' }}>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-peach-primary)' }}>
                  Personal Experiences 🎁
                </h2>
                <p style={{ color: 'var(--color-peach-soft)', fontSize: '1.05rem' }}>
                  Bespoke digital gifts made for your favorite humans & unforgettable moments.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {PERSONAL_SERVICES.map((srv) => {
                  const IconComp = iconMap[srv.icon] || Sparkles;
                  const isExpanded = expandedId === srv.id;

                  return (
                    <TiltCard key={srv.id}>
                      <div style={{
                        backgroundColor: 'var(--color-burgundy-primary)',
                        border: '1.5px solid var(--color-border-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '28px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-md)'
                      }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 217, 194, 0.15)',
                              color: 'var(--color-peach-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <IconComp size={22} />
                            </div>

                            <span style={{
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              color: 'var(--color-peach-primary)',
                              backgroundColor: 'rgba(24, 2, 2, 0.4)',
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-pill)',
                              border: '1px solid rgba(255, 217, 194, 0.2)'
                            }}>
                              {srv.badge}
                            </span>
                          </div>

                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '6px' }}>
                            {srv.title}
                          </h3>

                          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--color-peach-primary)', marginBottom: '12px' }}>
                            "{srv.tagline}"
                          </p>

                          <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', lineHeight: 1.5, marginBottom: '20px' }}>
                            {srv.description}
                          </p>

                          {/* Expandable Details */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                  paddingTop: '16px',
                                  borderTop: '1px solid rgba(255, 217, 194, 0.15)',
                                  marginBottom: '20px'
                                }}
                              >
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-peach-primary)', marginBottom: '8px' }}>
                                  Included Magic Features:
                                </div>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  {srv.features.map((feat, idx) => (
                                    <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--color-ivory)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <Sparkles size={12} color="var(--color-peach-primary)" /> {feat}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                          <button
                            onClick={() => toggleExpand(srv.id)}
                            style={{
                              flex: 1,
                              padding: '10px 14px',
                              borderRadius: 'var(--radius-pill)',
                              backgroundColor: 'rgba(255, 217, 194, 0.1)',
                              border: '1px solid rgba(255, 217, 194, 0.2)',
                              color: 'var(--color-peach-primary)',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            {isExpanded ? 'Less details' : 'See features'} {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>

                          <MagneticButton to="/contact" variant="primary" size="sm">
                            Get started →
                          </MagneticButton>
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 2: Creative Web */}
          {(activeTab === 'all' || activeTab === 'creative') && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-peach-primary)' }}>
                  Creative Web & Brand Websites 🚀
                </h2>
                <p style={{ color: 'var(--color-peach-soft)', fontSize: '1.05rem' }}>
                  For creators, studios, and brands who want a web presence that feels like art.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {CREATIVE_WEB_SERVICES.map((srv) => {
                  const IconComp = iconMap[srv.icon] || Rocket;

                  return (
                    <TiltCard key={srv.id}>
                      <div style={{
                        backgroundColor: 'var(--color-burgundy-primary)',
                        border: '1.5px solid var(--color-border-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '28px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-md)'
                      }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 217, 194, 0.15)',
                              color: 'var(--color-peach-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <IconComp size={22} />
                            </div>

                            <span style={{
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: 'var(--color-peach-primary)',
                              backgroundColor: 'rgba(24, 2, 2, 0.4)',
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-pill)'
                            }}>
                              {srv.badge}
                            </span>
                          </div>

                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '6px' }}>
                            {srv.title}
                          </h3>

                          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--color-peach-primary)', marginBottom: '12px' }}>
                            "{srv.tagline}"
                          </p>

                          <p style={{ fontSize: '0.9rem', color: 'var(--color-peach-soft)', lineHeight: 1.5, marginBottom: '20px' }}>
                            {srv.description}
                          </p>
                        </div>

                        <MagneticButton to="/contact" variant="primary" size="sm" style={{ width: '100%' }}>
                          Inquire for brand site →
                        </MagneticButton>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Interactive Service Builder Widget */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: 'var(--color-burgundy-deepest)'
      }} className="bg-grain">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <ServiceBuilderWidget />
        </div>
      </section>
    </div>
  );
};
