import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

// Ordered by visual priority
const LIBERTY_ORDER = [
  'liberty-torch-blend',
  'lady-liberty-blend',
  'uncle-sams-bold-brew',
  'eagles-flight-blend',
  'old-glory-house-blend',
  'rosies-grind',
];

function LibertyCard({ product, index }) {
  const shopifyUrl = `https://torch-republic.com/products/${product.shopify_handle}`;
  const cleanTitle = product.title.replace(/[-–]\s*Liberty Icons Series Coffee/i, '').trim();
  const plain = (product.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const notesMatch = plain.match(/Tasting Notes?[:\s•]+([^·|.<\n]+)/i);
  const tastingNote = notesMatch ? notesMatch[1].trim().substring(0, 40) : '';

  return (
    <motion.a
      href={shopifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group flex flex-col"
      style={{ background: '#111', border: '1px solid rgba(196,163,90,0.15)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.6)'; e.currentTarget.style.boxShadow = '0 0 22px 2px rgba(201,162,74,0.13)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(196,163,90,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img src={product.image_url} alt={cleanTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.92, filter: 'brightness(1.08)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-serif font-bold leading-snug" style={{ fontSize: '0.95rem', color: '#FFF' }}>{cleanTitle}</h3>
        {tastingNote && <p className="font-mono text-[9px]" style={{ color: 'rgba(240,235,225,0.4)' }}>{tastingNote}</p>}
        <span className="font-mono font-bold text-xs mt-1" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
      </div>
    </motion.a>
  );
}

export default function LibertyIconsStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-liberty-icons-strip'],
    queryFn: () => base44.entities.Product.filter({ category: 'coffee' }, '', 50),
  });

  // Filter strictly to Liberty Icons Series by title keyword
  const liberty = allProducts.filter(p =>
    p.title && p.title.toLowerCase().includes('liberty icons series')
  );

  // Sort by curated order
  const ordered = [
    ...LIBERTY_ORDER.map(h => liberty.find(p => p.shopify_handle === h)).filter(Boolean),
    ...liberty.filter(p => !LIBERTY_ORDER.includes(p.shopify_handle)),
  ];

  if (!isLoading && ordered.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#111', borderTop: '1px solid rgba(196,163,90,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: '#9BB8CC' }}>Collection 02</p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#FFF', letterSpacing: '-0.03em' }}>
              Liberty Icons
            </h2>
            <p className="font-heading mt-2" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.55)', fontWeight: 400 }}>
              Bold blends named for the symbols that define American freedom.
            </p>
          </div>
          <a href="https://torch-republic.com/collections/liberty-icons-coffee" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 transition-opacity hover:opacity-55 pb-0.5"
            style={{ color: '#9BB8CC', borderBottom: '1px solid rgba(155,184,204,0.35)' }}>
            View Collection <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="animate-pulse" style={{ background: '#1A1A1A', aspectRatio: '1/1' }} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {ordered.map((p, i) => <LibertyCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}