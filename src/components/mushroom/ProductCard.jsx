import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { getShopifyCartUrl } from '@/lib/shopifyCheckout';

// Best-for label per product slug
const BEST_FOR = {
  'mooncap-restore':    'Calm evenings & restoration',
  'glowmind-clarity':   'Deep work & daily focus',
  'suncap-rise':        'Morning energy & fresh starts',
  'the-oracle':         'Creative flow & intuition',
  'mystic-bloom':       'Balance & gentle mornings',
  'dreamcap-blend':     'Evening ritual & nighttime creativity',
  // Matcha
  'the-monk-matcha-blend':       'Focus, calm & presence',
  'the-alchemist-matcha-blend':  'Creativity & inspired focus',
  'the-ascendant-matcha-blend':  'Growth & elevated energy',
};

export default function MushroomProductCard({ product, index = 0 }) {
  const shopifyUrl = getShopifyCartUrl(product.slug, 1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = shopifyUrl || 'https://torchrepublic.com/shop';
  };

  const bestFor = BEST_FOR[product.slug] || product.mood;
  const tasteNotes = product.flavorNotes?.join(', ') || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      className="flex flex-col h-full"
      style={{
        background: '#202020',
        border: '1px solid rgba(230,183,173,0.12)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(11,45,42,0.8)';
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(11,45,42,0.5), 0 0 0 1px rgba(196,163,90,0.15), inset 0 1px 0 rgba(196,163,90,0.06)';
        e.currentTarget.style.background = 'linear-gradient(160deg, rgba(11,45,42,0.12) 0%, #202020 40%)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(230,183,173,0.12)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = '#202020';
      }}
    >
      {/* Clickable image area */}
      <Link to={`/products/${product.slug}`} className="group block" style={{ textDecoration: 'none' }}>
        <div className="relative overflow-hidden flex items-center justify-center"
          style={{ aspectRatio: '1/1', background: '#141414' }}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              style={{ padding: '12px' }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-3 p-8">
              <div className="w-16 h-16 rounded-full border border-dashed"
                style={{ borderColor: `${product.accent}40` }} />
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-center"
                style={{ color: `${product.accent}50` }}>Coming Soon</p>
            </div>
          )}
          {/* Roast badge */}
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1"
              style={{ background: `${product.accent}18`, color: product.accent, border: `1px solid ${product.accent}30` }}>
              {product.roast}
            </span>
          </div>
        </div>
      </Link>

      {/* Info — scan-friendly layout */}
      <div className="px-5 pt-4 pb-3 flex flex-col gap-2 flex-1">
        {/* Name */}
        <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#F5EFE6', lineHeight: 1.2 }}>
            {product.name}
          </h3>
        </Link>

        {/* Best for */}
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: `${product.accent}99` }}>
          Best for: {bestFor}
        </p>

        {/* Taste notes */}
        {tasteNotes && (
          <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.6 }}>
            Taste: {tasteNotes.toLowerCase()}
          </p>
        )}

        {/* Format + servings */}
        <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase"
          style={{ color: 'rgba(230,183,173,0.38)' }}>
          {product.category === 'matcha' ? 'Instant Matcha · 25 Servings' : 'Instant Powder Mix · 27 Servings'}
        </p>
        {product.category !== 'matcha' && (
          <p className="font-mono text-[7px] tracking-[0.14em] uppercase"
            style={{ color: 'rgba(230,183,173,0.28)' }}>
            Lion's Mane + Chaga
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price row */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
          <span className="font-mono font-bold" style={{ color: '#E6B7AD', fontSize: '1.05rem' }}>
            ${product.price.toFixed(2)}
          </span>
          <Link to={`/products/${product.slug}`}
            className="font-mono text-[8px] tracking-[0.22em] uppercase"
            style={{ color: 'rgba(230,183,173,0.45)', textDecoration: 'none' }}>
            Details →
          </Link>
        </div>
        {/* WELCOME15 nudge */}
        <p className="font-mono text-[7px] tracking-[0.18em] uppercase mt-1.5"
          style={{ color: 'rgba(196,163,90,0.5)' }}>
          First order? Use <span style={{ color: '#C4A35A', fontWeight: 700 }}>WELCOME15</span> for 15% off
        </p>
      </div>

      {/* Add to Cart */}
      <div className="px-5 pb-5 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 py-3 min-h-[44px]"
          style={{ background: '#E6B7AD', color: '#080808' }}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}