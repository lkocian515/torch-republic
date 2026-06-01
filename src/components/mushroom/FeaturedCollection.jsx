import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '@/lib/mushroomProducts';
import MushroomProductCard from './ProductCard';

export default function FeaturedCollection() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#060606' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-3"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            The Collection
          </p>
          <h2 className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Choose Your Ritual
          </h2>
          <p className="font-heading max-w-md mx-auto"
            style={{ fontSize: '0.88rem', color: 'rgba(247,241,232,0.42)', lineHeight: 1.85, fontWeight: 300 }}>
            Six instant mushroom coffee blends — each one designed for a different state of mind.
          </p>
        </motion.div>

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