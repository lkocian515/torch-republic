import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductImage, getProductAltText, getImageLoadingProps } from '@/lib/productImageHelpers';

const FALLBACK_IMAGE = '/torch-republic-logo-transparent.png';

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
  'the-monk-matcha-blend':       'Focus, calm & presence',
  'the-alchemist-matcha-blend':  'Creativity & inspired focus',
  'the-ascendant-matcha-blend':  'Growth & elevated energy',
};

export default function MushroomProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  const imageUrl = getProductImage(product, FALLBACK_IMAGE);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      className="card-torch flex flex-col h-full"
    >
      <Link to={`/products/${product.slug}`} className="group block" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
        <div className="relative overflow-hidden flex items-center justify-center product-image-wrap"
          style={{ aspectRatio: '1/1', background: '#FFFFFF' }}>
          <img
            src={imageUrl}
            alt={imageAlt}
            width="400"
            height="400"
            {...loadingProps}
            crossOrigin="anonymous"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            style={{ ...loadingProps.style, padding: '12px' }}
            onError={(e) => {
              console.warn(`⚠️ Image failed for ${product.name}:`, imageUrl);
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
          <div className="absolute top-3 right-3">
            <span className="badge-torch" style={{ background: 'rgba(255,255,255,0.92)' }}>
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span style={{ fontWeight: 700 }}>4.9</span>
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <span className="badge-torch">{product.roast}</span>
          </div>
        </div>
      </Link>

      <div className="px-5 pt-4 pb-3 flex flex-col gap-2 flex-1">
        <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
          <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#2D2824', lineHeight: 1.2 }}>
            {product.name}
          </h3>
        </Link>

        <p className="eyebrow" style={{ color: `${product.accent}99` }}>
          Best for: {bestFor}
        </p>

        {tasteNotes && (
          <p className="font-heading text-xs" style={{ color: '#6D625A', lineHeight: 1.6 }}>
            Taste: {tasteNotes.toLowerCase()}
          </p>
        )}

        <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase" style={{ color: '#6D625A' }}>
          {product.category === 'matcha' ? 'Instant Matcha · 25 Servings' : 'Instant Powder Mix · 27 Servings'}
        </p>
        {product.category !== 'matcha' && (
          <p className="font-mono text-[7px] tracking-[0.14em] uppercase" style={{ color: '#8A7D72' }}>
            Lion's Mane + Chaga
          </p>
        )}

        <div className="flex-1" />

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #E4D8C9' }}>
          <div>
            <span className="font-mono font-bold" style={{ color: '#B86543', fontSize: '1.05rem' }}>
              ${product.price.toFixed(2)}
            </span>
            <span className="font-mono text-[7px] ml-1.5" style={{ color: '#6D625A' }}>
              (${(product.price / (product.servings || (product.category === 'matcha' ? 25 : 27))).toFixed(2)}/cup)
            </span>
          </div>
          <Link to={`/products/${product.slug}`}
            onClick={handleLinkClick}
            className="font-mono text-[8px] tracking-[0.22em] uppercase transition-opacity hover:opacity-70"
            style={{ color: '#B86543', textDecoration: 'none' }}>
            Details →
          </Link>
        </div>
        <p className="font-mono text-[7px] tracking-[0.18em] uppercase mt-1.5" style={{ color: '#8A6F3E' }}>
          Subscribe &amp; Save 20% — only ${(product.price * 0.8).toFixed(2)}/mo
        </p>
      </div>

      <div className="px-5 pb-5 pt-0">
        <button onClick={handleAddToCart} className="btn btn-primary w-full">
          <ShoppingBag className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}