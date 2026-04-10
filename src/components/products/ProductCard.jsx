import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Ruler } from 'lucide-react';
import SizeGuide from './SizeGuide';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80';

const StarRow = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
    ))}
  </div>
);

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const imageSrc = imgError || !product.image_url ? FALLBACK_IMAGE : product.image_url;
  const detailImageSrc = product.image_url_2 || null;
  const productHandle = product.shopify_handle || null;
  const categoryMap = {
    't-shirts': 'tshirts',
    'hoodies-sweatshirts': 'hoodies',
    'hats': 'hats',
  };
  const sizeCategory = categoryMap[product.category] || 'tshirts';

  if (!productHandle) {
    console.error(`[ProductCard] Missing Shopify handle for product: "${product.title}"`);
  }

  const productUrl = productHandle
    ? `https://torch-republic.com/products/${productHandle}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <a
        href={productUrl || undefined}
        onClick={(e) => {
          if (!productUrl) { e.preventDefault(); return; }
          e.preventDefault();
          window.location.href = productUrl;
        }}
        className={`group block ${productUrl ? 'cursor-pointer' : 'cursor-default opacity-70'}`}
        style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #050505 100%)', border: '1px solid rgba(200,164,77,0.12)', padding: '0 0 8px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '4/5', background: 'linear-gradient(135deg, #0a0f1f 0%, #0E2A2F 50%, #000 100%)', boxShadow: hovered ? '0 8px 40px rgba(200,164,77,0.15)' : '0 4px 20px rgba(0,0,0,0.4)', transition: 'box-shadow 0.4s ease' }}>
        <img
         src={showDetail && detailImageSrc ? detailImageSrc : imageSrc}
         onError={() => setImgError(true)}
         alt={product.title}
         className={`w-full h-full object-cover transition-all duration-700 ${
           hovered ? 'scale-105' : 'scale-100'
         }`}
        />

        {/* Detail image indicator */}
        {detailImageSrc && (
         <button
           onClick={(e) => {
             e.preventDefault();
             setShowDetail(!showDetail);
           }}
           className="absolute top-3 right-3 px-2 py-1 text-xs font-mono font-bold tracking-wider rounded opacity-90 hover:opacity-100 transition-opacity"
           style={{
             background: showDetail ? '#C8A44D' : 'rgba(14,42,47,0.7)',
             color: showDetail ? '#000' : '#C8A44D',
             border: '1px solid rgba(200,164,77,0.5)',
           }}
         >
           {showDetail ? '← MAIN' : 'DETAIL →'}
         </button>
        )}
          
          {/* Thermal overlay on hover */}
          <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-primary/5 mix-blend-overlay" />
          </div>

          {/* Quick info overlay */}
          {productUrl && (
          <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-500 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="space-y-2">
              <div className="p-3 text-center" style={{ background: '#C4A35A' }}>
                <span className="text-white font-heading font-black text-xs tracking-widest uppercase">
                  Shop Now →
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSizeGuideOpen(true);
                }}
                className="w-full p-2 text-center flex items-center justify-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase rounded"
                style={{ background: 'rgba(200,164,77,0.2)', color: '#C8A44D', border: '1px solid rgba(200,164,77,0.5)' }}
              >
                <Ruler className="w-3 h-3" />
                Size Guide
              </button>
            </div>
          </div>
          )}

          {/* Out of stock badge */}
          {!product.in_stock && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-mono tracking-wider">
              SOLD OUT
            </div>
          )}

          {/* Top rated badge */}
          {product.rating >= 4.8 && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 text-xs font-mono font-bold tracking-wider" style={{ background: 'linear-gradient(135deg, #0E2A2F, #1B5060)', border: '1px solid rgba(200,164,77,0.5)', color: '#C8A44D' }}>
              <Flame className="w-3 h-3" /> HOT
            </div>
          )}
          {product.featured && product.rating < 4.8 && (
            <div className="absolute top-3 left-3 px-2 py-1 text-xs font-mono tracking-wider" style={{ background: 'linear-gradient(135deg, #0E2A2F, #C8A44D)', color: '#fff' }}>
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
            <div className="flex items-center gap-2 mb-2">
              <StarRow rating={product.rating} />
              <span className="text-xs font-mono font-bold" style={{ color: '#C8A44D' }}>
                {product.rating?.toFixed(1)}
              </span>
              {product.review_count > 0 && (
                <span className="text-xs text-gray-500">({product.review_count} reviews)</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base" style={{ color: '#C8A44D' }}>
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
      </a>
      
      {/* Size Guide Modal */}
      <SizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={sizeCategory}
      />
    </motion.div>
  );
}