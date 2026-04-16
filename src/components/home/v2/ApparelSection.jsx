import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

// Curated priority handles — best designs shown first
const PRIORITY_HANDLES = [
  'continental-army-1776-born-free-patriotic-tee',
  't-shirt-no-taxation-without-caffeination-vintage-coffee-liberty-tee',
  'second-amendment-t-shirt-the-second-amendment-1791-rifle-graphic-tee',
  'live-free-stay-ready-hancock-with-american-flag-shirt',
];

function ShirtCard({ product, index }) {
  const url = `https://torch-republic.com/products/${product.shopify_handle}`;
  const title = product.title
    .replace(/^T-Shirt\s*[—–-]\s*/i, '')
    .replace(/\s*[-–]\s*(Patriotic|Vintage|Graphic|Men's)\s*(T-Shirt|Tee|Shirt)?/gi, '')
    .trim();

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      className="group flex flex-col"
      style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.14)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.65)';
        e.currentTarget.style.boxShadow = '0 0 22px 2px rgba(201,162,74,0.13)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.14)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.92 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-serif font-bold leading-snug" style={{ fontSize: '0.9rem', color: '#FFFFFF', lineHeight: 1.3 }}>{title}</h3>
        <span className="font-mono font-bold text-xs" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
      </div>
    </motion.a>
  );
}

export default function ApparelSection() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-shirts-strip'],
    queryFn: () => base44.entities.Product.filter({ category: 't-shirts' }, '', 50),
  });

  const available = allProducts.filter(p => p.image_url && p.in_stock !== false);
  const byHandle = Object.fromEntries(available.map(p => [p.shopify_handle, p]));

  const priority = PRIORITY_HANDLES.map(h => byHandle[h]).filter(Boolean);
  const rest = available.filter(p => !PRIORITY_HANDLES.includes(p.shopify_handle));
  const shirts = [...priority, ...rest].slice(0, 4);

  if (!isLoading && shirts.length === 0) return null;

  return (
    <section className="py-14 md:py-20 px-5 md:px-12" style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.06)' }}>
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-2" style={{ color: 'rgba(201,162,74,0.45)' }}>Shirts</p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Wear the Message.
            </h2>
          </div>
          <a
            href="https://torch-republic.com/collections/t-shirts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55 pb-0.5 flex-shrink-0"
            style={{ color: 'rgba(201,162,74,0.6)', borderBottom: '1px solid rgba(201,162,74,0.2)' }}
          >
            Shop All Shirts <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => <div key={i} className="animate-pulse" style={{ background: '#1A1A1A', aspectRatio: '3/4' }} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {shirts.map((p, i) => <ShirtCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}