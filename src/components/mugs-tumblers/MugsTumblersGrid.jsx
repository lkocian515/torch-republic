import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function ProductCard({ product, index }) {
  const url = `https://libertees-for-all.myshopify.com/products/${product.handle || product.shopify_handle}`;
  const title = product.title.replace(/[-–]\s*(Mug|Tumbler|Drinkware)/i, '').trim();
  const price = `$${Number(product.price).toFixed(2)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col h-full"
      style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.15)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.6)';
        e.currentTarget.style.boxShadow = '0 0 32px 4px rgba(201,162,74,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#161616' }}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: 0.95 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
            No image
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-serif font-bold" style={{ fontSize: '1rem', color: '#FFFFFF', lineHeight: 1.3 }}>
          {title}
        </h3>

        <p className="font-mono font-bold text-sm" style={{ color: '#C9A24A' }}>
          {price}
        </p>

        <div className="flex items-center gap-2 text-[10px] mt-auto" style={{ color: 'rgba(240,235,225,0.5)' }}>
          <span>Premium Drinkware</span>
        </div>
      </div>

      {/* CTA overlay */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(201,162,74,0.1)' }}>
        <button
          className="w-full font-mono text-[10px] tracking-[0.25em] uppercase py-2.5 transition-all hover:opacity-80"
          style={{ color: '#C9A24A', fontWeight: 600 }}
        >
          View Product <ArrowRight className="inline w-3 h-3 ml-1" />
        </button>
      </div>
    </motion.a>
  );
}

export default function MugsTumblersGrid({ products, isLoading }) {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28" style={{ backgroundColor: '#080808' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.55)' }}>
            Collection
          </p>
          <h2 className="font-serif mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#F0EBE1', letterSpacing: '-0.02em' }}>
            Premium Drinkware
          </h2>
          <p className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.6, maxWidth: '480px' }}>
            Crafted to complement your coffee ritual. Designed for daily use and built to last.
          </p>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-heading" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem' }}>
              No products available at this time.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}