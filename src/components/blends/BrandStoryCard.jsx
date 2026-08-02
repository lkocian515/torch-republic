import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';

export default function BrandStoryCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className="group"
    >
      <Link 
        to={`/products/${product.slug}`} 
        className="block h-full"
        style={{ textDecoration: 'none' }}
      >
        <div 
          className="flex flex-col h-full"
          style={{
            background: '#141414',
            border: `1px solid ${product.accent}20`,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = product.accent;
            e.currentTarget.style.boxShadow = `0 8px 40px ${product.accent}20`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = `${product.accent}20`;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#0F0F0F' }}>
            <img
              src={getProductImage(product)}
              alt={getProductAltText(product)}
              className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span 
                className="font-mono text-[7px] tracking-[0.3em] uppercase px-2 py-1"
                style={{ 
                  background: `${product.accent}18`, 
                  color: product.accent, 
                  border: `1px solid ${product.accent}30`,
                  backdropFilter: 'blur(8px)'
                }}
              >
                {product.category === 'matcha' ? 'Matcha' : product.category === 'classic-coffee' ? 'Classic' : 'Mushroom'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Identity statement */}
            <p 
              className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3"
              style={{ color: product.accent, fontWeight: 700 }}
            >
              {product.tagline}
            </p>

            {/* Name */}
            <h3 
              className="font-serif font-bold mb-3"
              style={{ fontSize: '1.4rem', color: '#F5EFE6', lineHeight: 1.1 }}
            >
              {product.name}
            </h3>

            {/* Archetype/Quality */}
            <div className="mb-4">
              <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.4)' }}>
                Represents
              </p>
              <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 500, lineHeight: 1.6 }}>
                {product.mood.split('·')[0]?.trim() || product.bestFor.split(',')[0]?.trim()}
              </p>
            </div>

            {/* Story */}
            <p 
              className="font-heading text-xs mb-4 flex-1"
              style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300, lineHeight: 1.7 }}
            >
              {product.description}
            </p>

            {/* Price and CTA */}
            <div 
              className="pt-4 mt-auto"
              style={{ borderTop: `1px solid ${product.accent}15` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold" style={{ fontSize: '1.2rem', color: product.accent }}>
                  ${product.price.toFixed(2)}
                </span>
                <span 
                  className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold"
                  style={{ color: product.accent }}
                >
                  View Blend →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}