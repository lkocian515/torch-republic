import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function DriftNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      await base44.entities.EmailSubscriber.create({
        email,
        source: 'homepage_newsletter',
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" style={{ background: D.espresso, position: 'relative', overflow: 'hidden' }}>
      {/* Warm atmospheric glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '80%',
          background: `radial-gradient(ellipse at center, ${D.terracotta}15 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />
      <div className="mx-auto max-w-[700px] px-6 py-16 md:py-24 text-center relative z-10">
        <motion.div {...fadeUp}>
          <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1.25rem' }}>
            Stay Connected
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.cream, margin: '0 0 1.25rem', textWrap: 'balance' }}>
            Keep the fire going.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(250,247,241,0.72)', margin: '0 0 2.5rem', maxWidth: '44ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Coffee rituals, product releases and thoughtful updates &mdash; sent occasionally.
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3"
            style={{ padding: '1rem 2rem', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: `1px solid ${D.terracotta}40` }}
          >
            <Check size={18} style={{ color: D.terracotta }} />
            <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.cream }}>You&rsquo;re on the list. Welcome to the Republic.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-[440px]">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                placeholder="Your email"
                required
                aria-label="Email address"
                disabled={status === 'loading'}
                style={{
                  flex: 1, minHeight: 52, padding: '0 1.25rem', borderRadius: '6px',
                  background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(255,255,255,0.15)`,
                  color: D.cream, fontFamily: SANS, fontSize: '0.9375rem',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]"
                style={{
                  minHeight: 52, padding: '0 1.75rem', borderRadius: '6px',
                  background: D.terracotta, color: D.cream,
                  fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem',
                  border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1, whiteSpace: 'nowrap',
                }}
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
                {status !== 'loading' && <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />}
              </button>
            </div>
            {status === 'error' && (
              <p role="alert" style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.sunrise, margin: '0.75rem 0 0' }}>
                Something went wrong. Please try again.
              </p>
            )}
            <p style={{ fontFamily: SANS, fontSize: '0.75rem', color: 'rgba(250,247,241,0.4)', margin: '0.75rem 0 0' }}>
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}