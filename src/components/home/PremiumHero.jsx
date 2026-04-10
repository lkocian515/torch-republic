import React from 'react';
import { motion } from 'framer-motion';

export default function PremiumHero() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Very subtle background texture — barely visible */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(201,162,74,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000, transparent)' }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ maxWidth: '680px' }}>

        {/* Eyebrow line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="font-mono uppercase tracking-[0.55em]"
          style={{ fontSize: '9px', color: 'rgba(201,162,74,0.4)', marginBottom: '2.5rem' }}
        >
          Founders Series · Small-Batch Coffee
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif"
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#F0EBE1',
            marginBottom: '2rem',
          }}
        >
          Carry the<br />
          <em style={{ color: '#C9A24A', fontStyle: 'normal' }}>Flame.</em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="font-serif"
          style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'rgba(240,235,225,0.3)',
            marginBottom: '3.5rem',
            maxWidth: '420px',
          }}
        >
          Premium coffee honoring history's greatest figures.
          One collectible blend at a time.
        </motion.p>

        {/* Single gold CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <a
            href="/CoffeeCollection"
            className="inline-flex items-center justify-center font-mono font-black uppercase tracking-[0.3em] transition-opacity hover:opacity-80"
            style={{
              fontSize: '11px',
              background: '#C9A24A',
              color: '#000',
              padding: '1rem 2.75rem',
              boxShadow: '0 0 50px rgba(201,162,74,0.15)',
            }}
          >
            Shop the Founders Series
          </a>
        </motion.div>
      </div>
    </div>
  );
}