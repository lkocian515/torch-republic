import React from 'react';
import { motion } from 'framer-motion';

export default function PremiumHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#000' }}>

      {/* Background image — very dark, barely visible */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/d9a87ee6a_torch_republic_cinematic_hero.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.18, objectPosition: 'center' }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)' }} />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-mono text-[9px] tracking-[0.6em] uppercase mb-10"
          style={{ color: 'rgba(201,162,74,0.45)' }}
        >
          Founders Series · Small-Batch Coffee
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-serif leading-none tracking-tight mb-8"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.02em' }}
        >
          Carry the<br />
          <span style={{ color: '#C9A24A' }}>Flame.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.75 }}
          className="font-serif"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'rgba(240,235,225,0.35)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.7, maxWidth: '460px', margin: '0 auto 3.5rem' }}
        >
          Premium coffee honoring history's greatest figures.<br />
          One collectible blend at a time.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          <a
            href="/CoffeeCollection"
            className="inline-flex items-center justify-center px-10 py-4 font-mono font-black text-sm tracking-[0.25em] uppercase transition-all hover:opacity-85"
            style={{ background: '#C9A24A', color: '#0B0B0B', boxShadow: '0 0 40px rgba(201,162,74,0.2)' }}
          >
            Shop the Founders Series
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
    </div>
  );
}