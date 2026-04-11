import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function TorchbearerCTA() {
  return (
    <section
      className="relative overflow-hidden py-28 px-6 text-center"
      style={{
        background: 'linear-gradient(160deg, #090909 0%, #0D1A0E 50%, #090909 100%)',
        borderTop: '1px solid rgba(196,163,90,0.1)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(196,163,90,0.06) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        {/* Flame ornament */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.4))' }} />
          <span style={{ fontSize: '1.4rem' }}>🔥</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.4), transparent)' }} />
        </div>

        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.55)' }}>
          Become a Torchbearer
        </p>

        <h2
          className="font-serif text-white mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em' }}
        >
          Carry the Flame.<br />
          <span style={{ color: '#C4A35A' }}>Live the Legacy.</span>
        </h2>

        <p
          className="font-serif mb-12"
          style={{
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.9,
            maxWidth: '480px',
            margin: '0 auto 3rem',
          }}
        >
          Join thousands of Americans who start every morning with purpose — a premium small-batch cup and a commitment to legacy, discipline, and freedom.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/CoffeeCollection"
            className="inline-flex items-center justify-center font-mono font-black uppercase tracking-[0.3em] transition-opacity hover:opacity-80"
            style={{ fontSize: '11px', background: '#C4A35A', color: '#000', padding: '1rem 2.75rem' }}
          >
            Shop the Collection
          </Link>
          <Link
            to="/TheTorchBox"
            className="inline-flex items-center justify-center font-mono uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
            style={{ fontSize: '11px', color: 'rgba(196,163,90,0.7)', padding: '1rem 2rem', border: '1px solid rgba(196,163,90,0.25)' }}
          >
            Join Torch Box →
          </Link>
        </div>

        {/* Trust micro-line */}
        <div className="flex items-center justify-center gap-6 flex-wrap mt-12">
          {['No commitments', 'Pause anytime', '30-day guarantee', 'Proudly American'].map((t, i) => (
            <span key={i} className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {i > 0 && <span className="mr-6" style={{ color: 'rgba(196,163,90,0.15)' }}>·</span>}
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}