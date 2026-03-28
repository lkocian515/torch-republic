import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={createPageUrl('ProductDetail') + `?id=${product.id}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-card mb-3" style={{ aspectRatio: '4/5' }}>
          <img
            src={product.image_url}
            alt={product.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              hovered ? 'scale-105' : 'scale-100'
            }`}
          />
          
          {/* Thermal overlay on hover */}
          <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-primary/5 mix-blend-overlay" />
          </div>

          {/* Quick info overlay */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="bg-background/90 backdrop-blur-sm border border-border p-3 text-center">
              <span className="text-primary font-mono text-xs tracking-widest uppercase">
                View Details
              </span>
            </div>
          </div>

          {/* Out of stock badge */}
          {!product.in_stock && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-mono tracking-wider">
              SOLD OUT
            </div>
          )}

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 text-xs font-mono tracking-wider">
              BEST SELLER
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="text-white font-heading font-bold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {product.title}
          </h3>

          {product.rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-xs font-mono" style={{ color: 'rgba(200,164,77,0.8)' }}>
                {product.rating?.toFixed(1)}
              </span>
              {product.review_count > 0 && (
                <span className="text-xs font-mono text-gray-500">({product.review_count})</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white font-mono font-bold text-sm">
                ${product.price?.toFixed(2)}
              </span>
              {product.compare_at_price > product.price && (
                <span className="text-gray-500 font-mono text-xs line-through">
                  ${product.compare_at_price?.toFixed(2)}
                </span>
              )}
            </div>
            {product.compare_at_price > product.price && (
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5" style={{ backgroundColor: 'rgba(200,164,77,0.15)', color: '#C8A44D' }}>
                SAVE {Math.round((1 - product.price / product.compare_at_price) * 100)}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}