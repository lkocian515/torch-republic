import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PremiumHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/d9a87ee6a_torch_republic_cinematic_hero.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.38, objectPosition: 'center 30%' }}
        />
        {/* Heavy black vignette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.3) 40%, rgba(11,11,11,0.85) 80%, #0B0B0B 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(11,11,11,0.6) 100%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.45em' }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-mono text-[10px] uppercase mb-10"
          style={{ color: 'rgba(201,162,74,0.65)' }}
        >
          Founders Series — Now Collecting
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif mb-8"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 700, lineHeight: 1.05, color: '#F0EBE1', letterSpacing: '-0.01em' }}
        >
          Live Free.<br />Stay Ready.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mb-14 mx-auto"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'rgba(240,235,225,0.5)', lineHeight: 1.8, maxWidth: '460px', fontWeight: 300 }}
        >
          Collectible coffee inspired by the minds that built a nation.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <Link
            to="/CoffeeCollection"
            className="inline-flex items-center gap-3 px-10 py-4 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-80"
            style={{ background: '#C9A24A', color: '#0B0B0B', fontWeight: 700 }}
          >
            Shop the Founders Series
          </Link>
        </motion.div>
      </div>

      {/* Subtle scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(201,162,74,0.4), transparent)' }} />
      </motion.div>
    </section>
  );
}