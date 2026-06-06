import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '@/lib/mushroomProducts';

export default function BundleSection() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#131313', position: 'relative', overflow: 'hidden' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      {/* Deep teal-navy atmospheric glow — premium highlight for bundle section */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(11,45,42,0.2) 0%, rgba(8,16,26,0.14) 50%, transparent 100%)',
      }} />
      {/* Warm rose-gold glow from right */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '50%', height: '120%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(230,183,173,0.06) 0%, transparent 70%)',
      }} />
      <div className="max-w-[1100px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            <div className="absolute inset-0" style={{ background: '#0C0C0C' }} />
            <img
              src={HERO_IMAGE}
              alt="Torch Republic six instant mushroom coffee tubes lineup"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ opacity: 0.75 }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to right, rgba(7,7,7,0.4) 0%, transparent 60%)',
            }} />
            {/* Badge */}
            <div className="absolute top-5 left-5">
              <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-3 py-1.5"
                style={{ background: 'rgba(230,183,173,0.12)', color: '#E6B7AD', border: '1px solid rgba(230,183,173,0.3)' }}>
                All Six Blends
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase"
              style={{ color: 'rgba(230,183,173,0.65)' }}>
              The Six-Blend Bundle
            </p>
            <h2 className="font-serif font-bold"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Try All Six. Find the One That Changes Your Day.
            </h2>
            <p className="font-heading"
              style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.9, fontWeight: 300 }}>
              The six-blend bundle is the most popular way to start. One tube for each part of your day — focus, morning energy, evening calm, restoration, balance, and flow. Each with 27 servings of clinically-studied Lion's Mane + Chaga. 162 servings total. One ritual that transforms your relationship with energy, clarity, and wellness.
            </p>

            <div className="flex flex-wrap gap-2">
              {['MoonCap Restore', 'GlowMind', 'SunCap Rise', 'The Oracle', 'DreamCap', 'Mystic Bloom'].map(name => (
                <span key={name} className="font-mono text-[8px] tracking-[0.2em] uppercase px-2.5 py-1.5"
                  style={{ background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.7)' }}>
                  {name}
                </span>
              ))}
            </div>

            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #0B2D2A 0%, #08101A 35%, #E6B7AD 75%, transparent 100%)', opacity: 0.6 }} />

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/bundle"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 w-fit"
                style={{ background: '#E6B7AD', color: '#050505', padding: '14px 32px' }}
              >
                Build Your Bundle →
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-75 w-fit"
                style={{ border: '1px solid rgba(230,183,173,0.35)', color: 'rgba(230,183,173,0.8)', padding: '14px 28px' }}
              >
                Try the Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}