import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

// Ordered by visual/brand priority
const FOUNDERS_ORDER = [
  'washington-blend',
  'lincoln-blend',
  'jefferson-blend',
  'franklin-blend',
  'adams-blend',
  'roosevelt-blend',
];

function CoffeeCard({ product, index }) {
  const shopifyUrl = `https://torch-republic.com/products/${product.shopify_handle}`;
  const cleanTitle = product.title.replace(/[-–]\s*Founders Series Coffee/i, '').trim();
  const plain = (product.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const roastMatch = plain.match(/Roast Level[:\s]+([^·|.<\n]+)/i);
  const roast = roastMatch ? roastMatch[1].trim() : '';

  return (
    <motion.a
      href={shopifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group flex flex-col"
      style={{ background: '#111', border: '1px solid rgba(196,163,90,0.18)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.65)'; e.currentTarget.style.boxShadow = '0 0 22px 2px rgba(201,162,74,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(196,163,90,0.18)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img src={product.image_url} alt={cleanTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.92, filter: 'brightness(1.08) contrast(1.03)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-serif font-bold leading-snug" style={{ fontSize: '0.95rem', color: '#FFF' }}>{cleanTitle}</h3>
        {roast && <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.65)' }}>{roast}</p>}
        <span className="font-mono font-bold text-xs mt-1" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
      </div>
    </motion.a>
  );
}

export default function BestSellersStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-founders-strip'],
    queryFn: () => base44.entities.Product.filter({ category: 'coffee' }, '', 50),
  });

  // Filter strictly to Founders Series by title keyword
  const founders = allProducts.filter(p =>
    p.title && p.title.toLowerCase().includes('founders series')
  );

  // Sort by curated order
  const ordered = [
    ...FOUNDERS_ORDER.map(h => founders.find(p => p.shopify_handle === h)).filter(Boolean),
    ...founders.filter(p => !FOUNDERS_ORDER.includes(p.shopify_handle)),
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(196,163,90,0.1)' }}>
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: '#C9A24A' }}>Collection 01</p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#FFF', letterSpacing: '-0.03em' }}>
              Founders Series
            </h2>
            <p className="font-heading mt-2" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.55)', fontWeight: 400 }}>
              Six presidents. Six blends. Each one retires when it's gone.
            </p>
          </div>
          <a href="https://torch-republic.com/collections/founders-series" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 transition-opacity hover:opacity-55 pb-0.5"
            style={{ color: '#C9A24A', borderBottom: '1px solid rgba(201,162,74,0.35)' }}>
            View Collection <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="animate-pulse" style={{ background: '#1A1A1A', aspectRatio: '1/1' }} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {ordered.map((p, i) => <CoffeeCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}