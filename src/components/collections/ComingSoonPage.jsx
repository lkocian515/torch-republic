import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

export default function ComingSoonPage({ name, description }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden"
        style={{ borderBottom: '1px solid rgba(196,163,90,0.08)' }}>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(196,163,90,0.07) 0%, transparent 65%)' }} />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Flame className="w-8 h-8 mx-auto mb-6" style={{ color: 'rgba(196,163,90,0.5)' }} />

            <span className="inline-block font-mono text-[9px] tracking-[0.4em] uppercase px-4 py-1.5 mb-6"
              style={{
                border: '1px solid rgba(196,163,90,0.35)',
                color: '#C9A24A',
                background: 'rgba(196,163,90,0.06)',
              }}>
              Coming Soon
            </span>

            <h1 className="font-serif font-bold mb-5 leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F0EBE1', letterSpacing: '-0.02em' }}>
              {name}
            </h1>

            <p className="font-heading text-sm leading-relaxed mb-8 max-w-xl mx-auto"
              style={{ color: 'rgba(240,235,225,0.5)' }}>
              {description}
            </p>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.4))' }} />
              <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(196,163,90,0.5)' }} />
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.4), transparent)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CENTER MESSAGE ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        {/* Faint background flame */}
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Flame className="w-64 h-64" style={{ color: '#C9A24A' }} />
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif font-bold mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F0EBE1' }}>
              This collection is currently in development.
            </h2>
            <p className="font-heading text-sm leading-relaxed mb-12"
              style={{ color: 'rgba(240,235,225,0.45)' }}>
              We are building something worthy of its name.<br />
              Join the Torchbearers and be first to access when it drops.
            </p>

            {/* Email capture */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 font-mono text-xs outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(196,163,90,0.25)',
                    color: '#F0EBE1',
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all"
                  style={{ background: '#C9A24A', color: '#000', border: '1px solid #C9A24A' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#E4C46A'}
                  onMouseLeave={e => e.currentTarget.style.background = '#C9A24A'}
                >
                  Get Early Access
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-mono text-sm py-4"
                style={{ color: '#C9A24A' }}
              >
                ✓ You're on the list. We'll notify you first.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── BACK CTA ── */}
      <section className="py-12 px-6 text-center" style={{ borderTop: '1px solid rgba(196,163,90,0.07)' }}>
        <Link
          to="/Collections"
          className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-60"
          style={{ color: 'rgba(196,163,90,0.55)', borderBottom: '1px solid rgba(196,163,90,0.2)', paddingBottom: '3px' }}
        >
          ← Back to All Collections
        </Link>
      </section>
    </div>
  );
}