import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HomeFinalCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.08)' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(196,163,90,0.07) 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-[600px] mx-auto"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.3))' }} />
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.45)' }}>Join Us</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.3), transparent)' }} />
        </div>

        <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#F7F2E9', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          Join the Torchbearers
        </h2>
        <p className="font-heading mb-10 leading-relaxed" style={{ color: 'rgba(240,235,225,0.4)', fontSize: '0.95rem', fontWeight: 300 }}>
          Early access to new blends. Exclusive drops. Stories worth reading.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-5 px-8 font-mono text-sm tracking-wider"
            style={{ border: '1px solid rgba(196,163,90,0.3)', color: 'rgba(196,163,90,0.8)' }}
          >
            ✓ You're in. The flame is lit.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-[480px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 font-mono text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,163,90,0.2)', borderRight: 'none', color: '#F7F2E9' }}
            />
            <button
              type="submit"
              className="px-8 py-4 font-mono text-xs tracking-[0.3em] uppercase font-bold transition-all"
              style={{ background: '#E6AC45', color: '#000', border: '1px solid #E6AC45', flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.background = '#E4C46A'}
              onMouseLeave={e => e.currentTarget.style.background = '#E6AC45'}
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="font-mono text-[9px] mt-5" style={{ color: 'rgba(255,255,255,0.15)' }}>
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}