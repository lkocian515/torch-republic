import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '@/lib/mushroomProducts';

const RG = '#E6B7AD';

export default function MushroomHero() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: '#050505' }}>
      {/* ── Full-width hero image ── */}
      <img
        src={HERO_IMAGE}
        alt="Torch Republic six instant mushroom coffee tubes lineup"
        className="w-full object-cover object-center block"
        style={{ maxHeight: '90vh', minHeight: '520px' }}
      />

      {/* ── Dark overlay for text legibility ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.18) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.92) 100%)' }}
      />

      {/* ── Overlaid text + CTAs ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 px-5">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-5 max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase"
            style={{ color: `${RG}99` }}>
            Torch Republic Coffee Company
          </p>

          {/* Headline — overlaid on image */}
          <h1 className="font-serif font-bold leading-tight"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 4rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              textShadow: '0 2px 24px rgba(0,0,0,0.55)',
            }}>
            Instant Mushroom Coffee<br />
            <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
          </h1>

          {/* Subheadline */}
          <p className="font-heading max-w-2xl"
            style={{
              fontSize: 'clamp(0.85rem, 1.7vw, 1rem)',
              color: 'rgba(247,241,232,0.72)',
              lineHeight: 1.9,
              fontWeight: 300,
              textShadow: '0 1px 12px rgba(0,0,0,0.6)',
            }}>
            Premium instant coffee blended with Lion's Mane + Chaga, crafted for
            smoother mornings, clearer routines, and a little everyday magic — without the mess of brewing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              to="/shop"
              className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 btn-glow"
              style={{ background: RG, color: '#050505', padding: '14px 36px' }}
            >
              Shop the Blends
            </Link>
            <Link
              to="/bundle"
              className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80"
              style={{ border: `1px solid ${RG}88`, color: `${RG}DD`, padding: '14px 36px', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}
            >
              Build Your Bundle
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}