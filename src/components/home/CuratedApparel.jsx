import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star } from 'lucide-react';

const CURATED_HANDLES = [
  'unapologetic-patriot-hoodie',
  'we-the-people-t-shirt',
  'classic-black-white-letterman-jacket',
  'classic-patriot-hat',
];

function ApparelCard({ product, index }) {
  const url = product.shopify_handle ? `https://torch-republic.com/products/${product.shopify_handle}` : 'https://torch-republic.com';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <a href={url} className="block">
        <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4', background: '#0A0A0A', border: '1px solid rgba(200,164,77,0.08)' }}>
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product.compare_at_price > product.price && (
            <div className="absolute top-3 left-3 px-2 py-0.5 font-mono text-[10px] font-bold" style={{ background: 'rgba(200,164,77,0.9)', color: '#000' }}>
              SAVE {Math.round((1 - product.price / product.compare_at_price) * 100)}%
            </div>
          )}
        </div>

        <h3 className="font-heading font-bold text-white text-sm leading-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-sm" style={{ color: '#C8A44D' }}>${product.price?.toFixed(2)}</span>
          {product.compare_at_price > product.price && (
            <span className="font-mono text-xs text-gray-600 line-through">${product.compare_at_price?.toFixed(2)}</span>
          )}
        </div>
      </a>
    </motion.div>
  );
}

export default function CuratedApparel() {
  const { data: allProducts = [] } = useQuery({
    queryKey: ['curated-apparel'],
    queryFn: () => base44.entities.Product.list('-best_seller_rank', 200),
  });

  const products = CURATED_HANDLES
    .map(h => allProducts.find(p => p.shopify_handle === h))
    .filter(Boolean)
    .slice(0, 4);

  // Fallback: top 4 apparel best sellers
  const displayProducts = products.length >= 2
    ? products
    : allProducts.filter(p => ['t-shirts', 'hoodies-sweatshirts', 'hats'].includes(p.category) && p.image_url).slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(200,164,77,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>Coffee Rituals</span>
            </div>
            <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700 }}>
              Carry the Ritual.
            </h2>
            <p className="text-gray-600 font-mono text-xs mt-2">Built for intentional coffee moments.</p>
          </div>
          <a
            href="/shop"
            className="font-mono text-xs tracking-widest uppercase self-start md:self-end pb-1"
            style={{ color: '#C8A44D', borderBottom: '1px solid rgba(200,164,77,0.3)' }}
          >
            View All Products →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {displayProducts.map((p, i) => (
            <ApparelCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}