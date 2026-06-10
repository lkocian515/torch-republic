import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductImage, getProductAltText, getImageLoadingProps } from '@/lib/productImageHelpers';

// Fallback placeholder image - Shopify CDN with cache-busting
const FALLBACK_IMAGE = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-product-placeholder.png?v=1781102333';

// Cache-busting helper - forces browser to fetch fresh image from Shopify
function addCacheBust(url) {
  if (!url) return FALLBACK_IMAGE;
  const separator = url.includes('?') ? '&' : '?';
  // Use daily cache bust to ensure fresh images while allowing some caching
  const cacheKey = `v=${Date.now()}`;
  return `${url}${separator}${cacheKey}`;
}

// Best-for label per product shopifyHandle
const BEST_FOR = {
  'torchbearer':          'Bold mornings & deep work',
  'ember-rise':           'Morning energy & momentum',
  'midnight-watch':       'Late nights & quiet focus',
  'suncap-rise':          'Morning energy & fresh starts',
  'glowmind-clarity-blend': 'Deep work & daily focus',
  'mooncap-restore':      'Calm evenings & restoration',
  'dreamcap-blend':       'Evening ritual & nighttime creativity',
  'the-oracle-blend':     'Creative flow & intuition',
  'mystic-bloom-blend':   'Balance & gentle mornings',
  // Matcha
  'the-monk-matcha-blend':       'Focus, calm & presence',
  'the-alchemist-matcha-blend':  'Creativity & inspired focus',
  'the-ascendant-matcha-blend':  'Growth & elevated energy',
};

export default function MushroomProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  // Get image URL from Shopify (with cache-busting)
  const imageUrl = addCacheBust(getProductImage(product, FALLBACK_IMAGE));
  const imageAlt = getProductAltText(product, `${product.name} by Torch Republic`);
  const loadingProps = getImageLoadingProps(index, false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id || product.slug,
      name: product.name,
      price: product.price,
      image: imageUrl,
      category: product.category,
      servings: product.servings,
      shopifyHandle: product.shopifyHandle,
    });
    try {
      if (window.gtag) {
        window.gtag('event', 'add_to_cart', {
          currency: 'USD', value: product.price,
          items: [{ item_id: product.shopifyHandle, item_name: product.name, price: product.price, quantity: 1 }]
        });
      }
    } catch (_) {}
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const bestFor = BEST_FOR[product.shopifyHandle] || product.mood;
  const tasteNotes = product.flavorNotes?.join(', ') || '';

  // Remove the duplicate review stars from image area - they're now in the wrapper

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
      <Link to={`/products/${product.slug}`} className="group block" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
        <div className="relative overflow-hidden flex items-center justify-center product-image-wrap"
          style={{ aspectRatio: '1/1', background: '#141414' }}>
          <img
            src={imageUrl}
            alt={imageAlt}
            width="400"
            height="400"
            {...loadingProps}
            crossOrigin="anonymous"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            style={{ padding: '12px' }}
            onError={(e) => {
              console.warn(`⚠️ Image failed for ${product.name}:`, imageUrl);
              e.currentTarget.src = addCacheBust(FALLBACK_IMAGE);
            }}
          />
          {/* Review Stars */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-mono text-[8px] tracking-[0.15em] text-white">4.9</span>
          </div>
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
        <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
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
            onClick={handleLinkClick}
            className="font-mono text-[8px] tracking-[0.22em] uppercase"
            style={{ color: 'rgba(230,183,173,0.45)', textDecoration: 'none' }}>
            Details →
          </Link>
        </div>
        {/* WELCOME15 nudge */}
        <p className="font-mono text-[7px] tracking-[0.18em] uppercase mt-1.5"
          style={{ color: 'rgba(196,163,90,0.5)' }}>
          First order? Use <span style={{ color: '#C4A35A', fontWeight: 700 }}>WELCOME15</span> for 15% off at checkout
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