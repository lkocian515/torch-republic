import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '@/lib/mushroomProducts';

export default function BundleSection() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#070707' }}>
      <div className="max-w-[1100px] mx-auto">
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
              The Full Ritual Set
            </p>
            <h2 className="font-serif font-bold"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Try the Full Ritual Set
            </h2>
            <p className="font-heading"
              style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.9, fontWeight: 300 }}>
              Can't choose one? Start with the full six-blend collection and discover your daily favorite.
              Each tube delivers 27 servings of premium instant mushroom coffee with Lion's Mane + Chaga.
            </p>

            <div className="flex flex-wrap gap-2">
              {['MoonCap Restore', 'GlowMind', 'SunCap Rise', 'The Oracle', 'DreamCap', 'Mystic Bloom'].map(name => (
                <span key={name} className="font-mono text-[8px] tracking-[0.2em] uppercase px-2.5 py-1.5"
                  style={{ background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.7)' }}>
                  {name}
                </span>
              ))}
            </div>

            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(230,183,173,0.3), transparent)' }} />

            <Link
              to="/bundle"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 w-fit"
              style={{ background: '#E6B7AD', color: '#050505', padding: '14px 32px' }}
            >
              Shop the 6-Tube Bundle →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}