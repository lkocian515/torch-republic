import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function MushroomProductCard({ product, index = 0 }) {
  const { addItem, setDrawerOpen } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setDrawerOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      className="flex flex-col h-full"
      style={{
        background: 'linear-gradient(160deg, #111010 0%, #0E0D0D 100%)',
        border: '1px solid rgba(230,183,173,0.12)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${product.accent}55`;
        e.currentTarget.style.boxShadow = `0 8px 40px ${product.accent}18`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(230,183,173,0.12)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Clickable image + info area */}
      <Link to={`/blends/${product.slug}`} className="group flex flex-col flex-1" style={{ textDecoration: 'none' }}>
        {/* Image */}
        <div className="relative overflow-hidden flex items-center justify-center"
          style={{ aspectRatio: '1/1', background: '#0C0C0C' }}>
          {product.imagePlaceholder || !product.image ? (
            <div className="flex flex-col items-center justify-center w-full h-full gap-3 p-8"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              <div className="w-16 h-16 rounded-full border border-dashed"
                style={{ borderColor: `${product.accent}40` }} />
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-center"
                style={{ color: `${product.accent}50` }}>Image coming soon</p>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.alt}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              style={{ padding: '12px' }}
            />
          )}
          {/* Roast badge */}
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1"
              style={{ background: `${product.accent}18`, color: product.accent, border: `1px solid ${product.accent}30` }}>
              {product.roast}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="px-5 pt-5 pb-3 flex flex-col flex-1 gap-3">
          <div>
            <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.05rem', lineHeight: 1.2 }}>
              {product.name}
            </h3>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: `${product.accent}80` }}>
              {product.mood}
            </p>
          </div>
          <p className="font-heading text-xs leading-relaxed flex-1" style={{ color: 'rgba(240,235,225,0.5)' }}>
            {product.tagline}
          </p>
          <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
            <span className="font-mono font-bold" style={{ color: '#E6B7AD', fontSize: '1rem' }}>
              ${product.price.toFixed(2)}
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase transition-all"
              style={{ color: 'rgba(230,183,173,0.55)' }}>
              View Blend →
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart button — outside the Link */}
      <div className="px-5 pb-5 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 py-3"
          style={{ background: '#E6B7AD', color: '#080808' }}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}