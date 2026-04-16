import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

function ShirtCard({ product, index }) {
  const shopifyUrl = `https://torch-republic.com/products/${product.shopify_handle}`;

  return (
    <motion.a
      href={shopifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group flex flex-col"
      style={{
        background: '#111111',
        border: '1px solid rgba(196,163,90,0.15)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.6)';
        e.currentTarget.style.boxShadow = '0 0 20px 2px rgba(201,162,74,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(196,163,90,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.9, filter: 'brightness(1.05)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-serif font-bold leading-snug" style={{ fontSize: '0.88rem', color: '#FFFFFF', lineHeight: 1.4 }}>
          {product.title}
        </h3>
        <span className="font-mono font-bold text-xs" style={{ color: '#C9A24A' }}>
          ${parseFloat(product.price).toFixed(2)}
        </span>
      </div>
    </motion.a>
  );
}

export default function ApparelSection() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-shirts-strip'],
    queryFn: () => base44.entities.Product.filter({ category: 't-shirts' }, '', 50),
  });

  const shirts = allProducts
    .filter(p => p.image_url && p.in_stock !== false)
    .slice(0, 8);

  return (
    <section
      className="py-16 md:py-24 px-6 md:px-12"
      style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(196,163,90,0.08)' }}
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 md:mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: 'rgba(196,163,90,0.55)' }}>
              Graphic Tees
            </p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Wear the Message.
            </h2>
          </div>
          <a
            href="https://torch-republic.com/collections/t-shirts"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55 pb-0.5 flex items-center gap-2"
            style={{ color: 'rgba(196,163,90,0.7)', borderBottom: '1px solid rgba(201,162,74,0.25)' }}
          >
            Shop All Shirts <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#1A1A1A', aspectRatio: '3/4' }} />
            ))}
          </div>
        ) : shirts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {shirts.map((p, i) => <ShirtCard key={p.id} product={p} index={i} />)}
          </div>
        ) : null}
      </div>
    </section>
  );
}