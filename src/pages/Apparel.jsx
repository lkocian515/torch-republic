import React, { useState } from 'react';
import { useNoIndex } from '@/hooks/useNoIndex';

import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const AC = '#C9A24A';

async function fetchApparel() {
  const res = await base44.functions.invoke('fetchShopifyCollection', { handle: 'apparel' });
  return res.data?.products || [];
}

function ProductCard({ product, index }) {
  const url = `https://libertees-for-all.myshopify.com/products/${product.handle}`;
  const price = product.price ? `$${Number(product.price).toFixed(2)}` : '';

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group flex flex-col h-full"
      style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.15)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.6)';
        e.currentTarget.style.boxShadow = '0 0 32px 4px rgba(201,162,74,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#161616' }}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: 0.95 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
            No image
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
        {!product.available && (
          <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wider px-2 py-1"
            style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Sold Out
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-serif font-bold" style={{ fontSize: '0.95rem', color: '#FFFFFF', lineHeight: 1.3 }}>
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(201,162,74,0.08)' }}>
          <span className="font-mono font-black text-sm" style={{ color: AC }}>{price}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(201,162,74,0.55)' }}>Shop →</span>
        </div>
      </div>
    </motion.a>
  );
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 't-shirt', label: 'T-Shirts' },
  { id: 'hoodie', label: 'Hoodies' },
  { id: 'hat', label: 'Hats' },
];

export default function Apparel() {
  useNoIndex();
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['apparel-collection'],
    queryFn: fetchApparel,
    staleTime: 10 * 60 * 1000,
  });

  const filtered = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.title.toLowerCase().includes(activeCategory) || (p.product_type || '').toLowerCase().includes(activeCategory));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* Hero */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden" style={{ background: '#080808', borderBottom: '1px solid rgba(201,162,74,0.1)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,162,74,0.05) 0%, transparent 70%)' }} />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 28, height: 1, background: AC }} />
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: AC }}>Torch Republic</p>
          </div>
          <h1 className="font-serif mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Wear the Republic
          </h1>
          <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.65)', lineHeight: 1.7, maxWidth: '480px' }}>
            Historically inspired designs. Built for everyday wear. Crafted for those who carry the flame.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      {allProducts.length > 0 && (
        <section className="px-6 md:px-12 py-6" style={{ backgroundColor: '#050505', borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
          <div className="max-w-[1280px] mx-auto flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="font-mono text-[10px] tracking-[0.3em] uppercase transition-all px-4 py-2"
                style={{
                  background: activeCategory === cat.id ? AC : 'transparent',
                  color: activeCategory === cat.id ? '#080808' : 'rgba(240,235,225,0.6)',
                  border: activeCategory === cat.id ? 'none' : '1px solid rgba(201,162,74,0.2)',
                }}
              >
                {cat.label}
              </button>
            ))}
            <span className="ml-auto font-mono text-[9px] self-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {filtered.length} products
            </span>
          </div>
        </section>
      )}

      {/* Product grid */}
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#080808' }}>
        <div className="max-w-[1280px] mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.handle} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-heading" style={{ color: 'rgba(240,235,225,0.4)', fontSize: '0.95rem' }}>
                No products found.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}