import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '@/lib/mushroomProducts';

export default function MushroomHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(560px, 85vh, 900px)' }}>
      {/* Dark base */}
      <div className="absolute inset-0" style={{ background: '#080808' }} />

      {/* Hero image */}
      <img
        src={HERO_IMAGE}
        alt="Torch Republic six instant mushroom coffee tubes lineup"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.6 }}
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(6,6,6,0.55) 0%, rgba(6,6,6,0.15) 40%, rgba(6,6,6,0.7) 100%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(6,6,6,0.6) 0%, transparent 50%, rgba(6,6,6,0.4) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6"
        style={{ minHeight: 'clamp(560px, 85vh, 900px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase"
            style={{ color: 'rgba(201,162,74,0.75)' }}>
            Torch Republic Coffee Company
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold leading-tight"
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 60px rgba(0,0,0,0.8)',
              lineHeight: 1.1,
            }}>
            Instant Mushroom Coffee<br />
            <span style={{ color: '#C9A24A' }}>for Focus, Flow & Daily Ritual</span>
          </h1>

          {/* Subheadline */}
          <p className="font-heading max-w-xl"
            style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              color: 'rgba(240,235,225,0.72)',
              lineHeight: 1.85,
              fontWeight: 300,
            }}>
            Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings,
            clearer routines, and a little everyday magic — without the mess of brewing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              to="/shop"
              className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
              style={{ background: '#C9A24A', color: '#080808', padding: '14px 32px' }}
            >
              Shop the Blends
            </Link>
            <Link
              to="/bundle"
              className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(201,162,74,0.5)', color: 'rgba(201,162,74,0.85)', padding: '14px 32px' }}
            >
              Build Your Bundle
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}