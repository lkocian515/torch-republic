import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const FALLBACK = 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const src = imgErr || !product.image_url ? FALLBACK : product.image_url;
  const hasDiscount = product.compare_at_price > product.price;
  const savings = hasDiscount ? Math.round((1 - product.price / product.compare_at_price) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={createPageUrl('ProductDetail') + `?id=${product.id}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden mb-4"
          style={{
            aspectRatio: '4/5',
            backgroundColor: '#111',
            transition: 'box-shadow 0.5s ease',
            boxShadow: hovered
              ? '0 0 0 1px rgba(201,162,74,0.4), 0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(201,162,74,0.08)'
              : '0 4px 24px rgba(0,0,0,0.5)',
          }}
        >
          <img
            src={src}
            onError={() => setImgErr(true)}
            alt={product.title}
            className="w-full h-full object-cover"
            style={{
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              filter: hovered ? 'brightness(1.05)' : 'brightness(0.95)',
            }}
          />

          {/* Overlay on hover */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transition: 'opacity 0.4s ease',
              opacity: hovered ? 1 : 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
            }}
          />

          {/* "View Product" on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-4 pointer-events-none"
            style={{ transition: 'opacity 0.35s ease, transform 0.35s ease', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)' }}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold" style={{ color: '#C9A24A' }}>
              View Product →
            </span>
          </div>

          {/* Badges */}
          {!product.in_stock && (
            <div className="absolute top-3 left-3 px-3 py-1 font-mono text-[10px] tracking-widest uppercase" style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#666', border: '1px solid #333' }}>
              Sold Out
            </div>
          )}
          {product.in_stock && product.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 font-mono text-[10px] tracking-widest uppercase font-bold" style={{ backgroundColor: '#C9A24A', color: '#0B0B0B' }}>
              Best Seller
            </div>
          )}
          {product.in_stock && !product.featured && hasDiscount && (
            <div className="absolute top-3 left-3 px-3 py-1 font-mono text-[10px] tracking-widest uppercase" style={{ backgroundColor: 'rgba(0,0,0,0.85)', color: '#C9A24A', border: '1px solid rgba(201,162,74,0.3)' }}>
              Save {savings}%
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2 px-1">
          <h3
            className="font-heading font-semibold text-sm leading-snug line-clamp-2 transition-colors duration-300"
            style={{ color: hovered ? '#C9A24A' : 'rgba(255,255,255,0.9)' }}
          >
            {product.title}
          </h3>

          {product.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-2.5 h-2.5" fill={i <= Math.round(product.rating) ? '#C9A24A' : 'transparent'} color={i <= Math.round(product.rating) ? '#C9A24A' : '#444'} />
                ))}
              </div>
              {product.review_count > 0 && (
                <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>({product.review_count})</span>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-base" style={{ color: '#C9A24A' }}>
              ${product.price?.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="font-mono text-xs line-through" style={{ color: 'rgba(255,255,255,0.25)' }}>
                ${product.compare_at_price?.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}