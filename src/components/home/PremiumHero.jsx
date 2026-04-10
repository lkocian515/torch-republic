import React from 'react';
import { motion } from 'framer-motion';

export default function PremiumHero() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#000000',
        backgroundImage: 'url(https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/27cb9ad61_generated_image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Very subtle background texture — barely visible */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(201,162,74,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Text backdrop — deep radial behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)',
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
          style={{ fontSize: '9px', color: 'rgba(201,162,74,0.65)', marginBottom: '2.5rem', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
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
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '2.5rem',
            textShadow: '0 2px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)',
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
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            fontStyle: 'italic',
            fontWeight: 500,
            lineHeight: 2,
            color: 'rgba(255,255,255,0.6)',
            textShadow: '0 1px 12px rgba(0,0,0,0.9)',
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