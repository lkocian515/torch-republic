import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MUSHROOM_PRODUCTS } from '@/lib/mushroomProducts';

const RG = '#E6B7AD';

// Show up to 5 products, prioritize those with images
function getTopBlends() {
  const all = MUSHROOM_PRODUCTS.filter(p => p.image);
  return all.slice(0, 5);
}

function BlendCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className="flex flex-col"
      style={{ background: '#161514', border: '1px solid rgba(230,183,173,0.1)' }}
    >
      <Link to={`/blends/${product.slug}`} className="block">
        <div className="relative" style={{ aspectRatio: '1/1', background: '#0e0d0c', overflow: 'hidden' }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-6 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span
              className="font-mono text-[7px] tracking-[0.3em] uppercase px-2 py-1"
              style={{ background: `${product.accent}18`, color: product.accent, border: `1px solid ${product.accent}25` }}
            >
              {product.roast}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <Link to={`/blends/${product.slug}`}>
          <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.05rem', lineHeight: 1.2 }}>
            {product.name}
          </h3>
        </Link>
        <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase" style={{ color: `${product.accent}80` }}>
          {product.mood}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {product.flavorNotes?.slice(0, 3).map(n => (
            <span key={n} className="font-mono text-[7px] tracking-[0.15em] uppercase px-2 py-0.5"
              style={{ background: `${product.accent}08`, border: `1px solid ${product.accent}18`, color: `${product.accent}70` }}>
              {n}
            </span>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
          <span className="font-mono font-bold" style={{ color: RG, fontSize: '1.1rem' }}>
            ${product.price.toFixed(2)}
          </span>
          <Link
            to={`/blends/${product.slug}`}
            className="font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60"
            style={{ color: RG }}
          >
            Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestSellersSection() {
  const blends = getTopBlends();

  return (
    <section className="py-24 px-6 md:px-10" style={{ background: '#0a0908' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Our Blends
          </p>
          <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            View Best Sellers
          </h2>
          <p className="font-heading mt-4 max-w-lg mx-auto" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.7 }}>
            Five signature blends, each crafted for a specific moment in your day. Find yours.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {blends.map((p, i) => <BlendCard key={p.id} product={p} index={i} />)}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block font-mono text-[10px] tracking-[0.4em] uppercase font-bold px-10 py-4 transition-all hover:opacity-90"
            style={{ background: '#E6B7AD', color: '#080808' }}
          >
            Shop All Blends
          </Link>
        </div>
      </div>
    </section>
  );
}