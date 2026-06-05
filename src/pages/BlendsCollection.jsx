import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';
import { useSEO } from '@/hooks/useSEO';
import MushroomProductCard from '../components/mushroom/ProductCard';
import BlendCompare from '../components/mushroom/BlendCompare';

export default function BlendsCollection() {
  useSEO({
    title: 'Shop Instant Mushroom Coffee Blends | Torch Republic Coffee Company',
    description: 'Explore premium instant mushroom coffee blends for focus, energy, calm, balance, and rest. No coffee maker needed — just scoop, mix, and sip.',
  });
  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            The Collection
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            The Six Blends
          </h1>
          <p className="font-heading max-w-lg mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Six instant mushroom coffee blends designed for the way you want your day to feel. Each tube contains 27 servings of premium instant coffee with Lion's Mane + Chaga.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MUSHROOM_PRODUCTS.map((product, i) => (
              <MushroomProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BlendCompare />

      <section className="px-6 py-16 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Can't choose just one?
        </p>
        <h2 className="font-serif font-bold mb-6 text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
          Get All Six in the Bundle
        </h2>
        <Link to="/bundle"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: '#E6B7AD', color: '#080808', padding: '14px 32px' }}>
          Shop the 6-Tube Bundle →
        </Link>
      </section>
    </div>
  );
}