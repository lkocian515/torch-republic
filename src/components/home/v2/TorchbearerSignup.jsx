import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TorchbearerSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      className="relative overflow-hidden py-28 px-6"
      style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.08)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,163,90,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-[600px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: 'rgba(196,163,90,0.45)' }}>
            Torchbearers
          </p>
          <h2 className="font-serif mb-4 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#F7F2E9' }}>
            Join the Torchbearers
          </h2>
          <p className="font-heading text-sm mb-10 leading-relaxed" style={{ color: 'rgba(240,235,225,0.38)', fontWeight: 300 }}>
            Early access. Limited drops. The archive before it retires. No noise — only signal.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-5 px-8"
              style={{ border: '1px solid rgba(196,163,90,0.25)', background: 'rgba(196,163,90,0.05)' }}
            >
              <p className="font-mono text-xs tracking-widest uppercase" style={{ color: '#E6AC45' }}>
                Welcome to the movement.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-4 font-mono text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(196,163,90,0.2)',
                  color: '#F7F2E9',
                }}
              />
              <button
                type="submit"
                className="px-7 py-4 font-mono text-xs tracking-[0.3em] uppercase transition-all hover:opacity-85 whitespace-nowrap"
                style={{ background: '#E6AC45', color: '#000', fontWeight: 700 }}
              >
                Join Now
              </button>
            </form>
          )}

          <p className="font-mono text-[9px] mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}