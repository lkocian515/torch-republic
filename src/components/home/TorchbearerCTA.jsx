import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function TorchbearerCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative flame */}
          <div className="flex justify-center mb-10">
            <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, transparent, #C8A44D, transparent)' }} />
          </div>

          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.5)' }}>
            Join the Legacy
          </p>

          <h2 className="font-serif text-white mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Become a Torchbearer.
          </h2>

          <p className="font-mono mb-12 max-w-md mx-auto"
            style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.9 }}>
            Join thousands who carry the flame. Receive early access to new blends, exclusive drops, and legacy stories delivered to your inbox. No spam. Unsubscribe anytime.
          </p>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(196,163,90,0.15)', border: '1px solid rgba(196,163,90,0.3)' }}>
                <span style={{ color: '#C8A44D' }}>✓</span>
              </div>
              <p className="font-mono text-sm" style={{ color: 'rgba(196,163,90,0.8)' }}>You're in. The flame is lit.</p>
              <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Check your inbox for your welcome offer.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-4 text-sm font-mono outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(196,163,90,0.2)',
                  borderRight: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '12px',
                }}
              />
              <button type="submit"
                className="flex items-center justify-center gap-2 px-7 py-4 font-mono font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-85"
                style={{ fontSize: '11px', background: '#C8A44D', color: '#000', flexShrink: 0 }}>
                Join <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="font-mono text-[9px] mt-5" style={{ color: 'rgba(255,255,255,0.15)' }}>
            First order: 15% off + free shipping. No spam. Pause anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}