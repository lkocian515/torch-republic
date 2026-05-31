import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="px-6 py-24" style={{ background: '#0A0909', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[560px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase"
            style={{ color: 'rgba(230,183,173,0.65)' }}>
            The Ritual List
          </p>
          <h2 className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Join the Ritual List
          </h2>
          <p className="font-heading"
            style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Get early access to new blends, bundle drops, launch discounts, and limited-edition coffee rituals.
          </p>

          {submitted ? (
            <div className="w-full py-5 px-6 text-center"
              style={{ border: '1px solid rgba(230,183,173,0.3)', background: 'rgba(230,183,173,0.06)' }}>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: '#E6B7AD' }}>
                ✓ You're on the list. Welcome to the ritual.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3.5 outline-none font-mono text-xs"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(230,183,173,0.22)',
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <button
                type="submit"
                className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: '#E6B7AD', color: '#050505', padding: '14px 24px' }}
              >
                Join the List
              </button>
            </form>
          )}

          <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}