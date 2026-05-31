import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '@/lib/mushroomProducts';

const RG = '#E6B7AD';   // rose gold
const RGD = '#C98F86';  // deeper rose gold
const CH = '#D6B27A';   // champagne

export default function MushroomHero() {
  return (
    <div style={{ background: '#050505' }}>
      {/* ── Full-width hero image immediately under nav ── */}
      <div className="w-full relative overflow-hidden"
        style={{ maxHeight: '680px' }}>
        <img
          src={HERO_IMAGE}
          alt="Torch Republic six instant mushroom coffee tubes lineup"
          className="w-full object-cover object-center"
          style={{ display: 'block', width: '100%', maxHeight: '680px' }}
        />
        {/* Subtle bottom fade into the title section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }} />
      </div>

      {/* ── Title / CTA section below the hero image ── */}
      <section className="px-6 pt-10 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase"
            style={{ color: `${RG}99` }}>
            Torch Republic Coffee Company
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold leading-tight"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
            Instant Mushroom Coffee<br />
            <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
          </h1>

          {/* Subheadline */}
          <p className="font-heading max-w-xl"
            style={{
              fontSize: 'clamp(0.88rem, 1.8vw, 1.05rem)',
              color: 'rgba(247,241,232,0.62)',
              lineHeight: 1.9,
              fontWeight: 300,
            }}>
            Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings,
            clearer routines, and a little everyday magic — without the mess of brewing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              to="/shop"
              className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 btn-glow"
              style={{ background: RG, color: '#050505', padding: '14px 34px' }}
            >
              Shop the Blends
            </Link>
            <Link
              to="/bundle"
              className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80"
              style={{ border: `1px solid ${RG}55`, color: `${RG}CC`, padding: '14px 34px' }}
            >
              Build Your Bundle
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}