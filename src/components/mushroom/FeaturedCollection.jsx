import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '@/lib/mushroomProducts';
import MushroomProductCard from './ProductCard';

export default function FeaturedCollection() {
  return (
    <section className="px-6 md:px-10 py-24" style={{ background: '#060606' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4"
            style={{ color: 'rgba(201,162,74,0.6)' }}>
            The Collection
          </p>
          <h2 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Choose Your Ritual
          </h2>
          <p className="font-heading max-w-lg mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Six instant mushroom coffee blends designed for the way you want your day to feel.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MUSHROOM_PRODUCTS.map((product, i) => (
            <MushroomProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80"
            style={{ border: '1px solid rgba(201,162,74,0.4)', color: '#C9A24A', padding: '13px 30px' }}
          >
            View All Blends →
          </Link>
        </div>
      </div>
    </section>
  );
}