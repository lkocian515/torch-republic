import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

function ProductCard({ product, index }) {
  const url = product.shopify_handle ? `https://torch-republic.com/products/${product.shopify_handle}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="group"
    >
      <a
        href={url || undefined}
        onClick={e => { if (url) { e.preventDefault(); window.location.href = url; } else e.preventDefault(); }}
        className={`block ${url ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '4/5', background: '#0A0A0A', border: '1px solid rgba(196,163,90,0.08)' }}>
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: 0.88 }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}>
            <div className="w-full p-4 text-center font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ background: '#C9A24A', color: '#000' }}>
              Shop Now →
            </div>
          </div>
          {product.compare_at_price > product.price && (
            <div className="absolute top-3 left-3 font-mono text-[9px] font-bold px-2 py-1" style={{ background: '#C9A24A', color: '#000' }}>
              SAVE {Math.round((1 - product.price / product.compare_at_price) * 100)}%
            </div>
          )}
        </div>

        <h3 className="font-heading font-bold text-sm text-white mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm" style={{ color: '#C9A24A' }}>${product.price?.toFixed(2)}</span>
          {product.compare_at_price > product.price && (
            <span className="font-mono text-xs text-gray-600 line-through">${product.compare_at_price?.toFixed(2)}</span>
          )}
        </div>
      </a>
    </motion.div>
  );
}

export default function HomeFeaturedProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['home-featured'],
    queryFn: () => base44.entities.Product.filter({ collection: 'best-sellers' }, 'best_seller_rank', 6),
  });

  const display = products.filter(p => p.image_url).slice(0, 6);

  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(196,163,90,0.45)' }}>Best Sellers</p>
            <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1 }}>
              Most Loved
            </h2>
          </div>
          <Link
            to="/BestSellers"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60"
            style={{ color: 'rgba(196,163,90,0.6)', borderBottom: '1px solid rgba(196,163,90,0.25)', paddingBottom: '2px' }}
          >
            View All →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-900 mb-4" style={{ aspectRatio: '4/5' }} />
                <div className="h-3 bg-gray-900 mb-2 w-3/4" />
                <div className="h-3 bg-gray-900 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {display.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}