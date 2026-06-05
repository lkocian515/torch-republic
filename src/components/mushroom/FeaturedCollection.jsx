import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '@/lib/mushroomProducts';
import MushroomProductCard from './ProductCard';

export default function FeaturedCollection() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#141414', position: 'relative', overflow: 'hidden' }}>
      {/* Gradient divider top rule */}
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      {/* Subtle teal atmospheric halo */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '200px', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(11,45,42,0.16) 0%, transparent 100%)',
      }} />
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-3"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            Six Blends · Instant Mushroom Coffee
          </p>
          <h2 className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            The Collection
          </h2>
          <p className="font-heading max-w-lg mx-auto"
            style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.9, fontWeight: 300 }}>
            Six premium instant mushroom coffee blends — each crafted to support a different part of your day. Focus. Energy. Balance. Calm. Restoration. Creative flow.
          </p>
        </motion.div>

        {/* Blend guide strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12 max-w-3xl mx-auto">
          {[
            { need: 'Focus', blend: 'GlowMind Clarity', slug: 'glowmind-clarity' },
            { need: 'Morning energy', blend: 'SunCap Rise', slug: 'suncap-rise' },
            { need: 'Calm & restoration', blend: 'MoonCap Restore', slug: 'mooncap-restore' },
            { need: 'Creative flow', blend: 'The Oracle', slug: 'the-oracle' },
            { need: 'Gentle balance', blend: 'Mystic Bloom', slug: 'mystic-bloom' },
            { need: 'Immersive focus', blend: 'DreamCap', slug: 'dreamcap-blend' },
          ].map(({ need, blend, slug }) => (
            <Link key={slug} to={`/products/${slug}`}
              className="flex flex-col gap-1 px-4 py-3"
              style={{ background: '#1E1E1E', border: '1px solid rgba(230,183,173,0.1)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(11,45,42,0.65)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(11,45,42,0.35)'; e.currentTarget.style.background = 'linear-gradient(135deg, rgba(11,45,42,0.14) 0%, #1E1E1E 100%)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#1E1E1E'; }}>
              <span className="font-mono text-[7.5px] tracking-[0.22em] uppercase" style={{ color: 'rgba(230,183,173,0.45)' }}>Need {need}?</span>
              <span className="font-heading font-medium text-sm" style={{ color: '#F0EBE1' }}>→ {blend}</span>
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MUSHROOM_PRODUCTS.map((product, i) => (
            <MushroomProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-75"
            style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)', padding: '12px 28px' }}
          >
            View All Blends →
          </Link>
        </div>
      </div>
    </section>
  );
}