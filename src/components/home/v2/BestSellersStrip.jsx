import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

// LOCKED ORDER — Founders Series display sequence. Do not reorder.
// Collection filter: 'founders-series' ONLY. Never pull from other collections.
const FOUNDERS_DISPLAY_ORDER = [
  'washington-blend',
  'franklin-blend',
  'jefferson-blend',
  'lincoln-blend',
  'roosevelt-blend',
  'adams-blend',
];

function ProductCard({ product, index }) {
  const url = `https://torch-republic.com/products/${product.shopify_handle}`;
  const title = product.title.replace(/[-–]\s*Founders Series Coffee/i, '').trim();
  const plain = (product.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const roastMatch = plain.match(/Roast Level[:\s]+([^·|.<\n]+)/i);
  const roast = roastMatch ? roastMatch[1].trim() : '';

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col"
      style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.2)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.75)';
        e.currentTarget.style.boxShadow = '0 0 32px 4px rgba(201,162,74,0.18)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.95 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#FFFFFF', lineHeight: 1.25 }}>{title}</h3>
        {roast && <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.6)' }}>{roast}</p>}
        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ color: '#C9A24A', fontSize: '10px' }}>★</span>
            ))}
          </div>
          <span className="font-mono text-[9px] font-bold" style={{ color: '#C9A24A' }}>4.9</span>
          <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>· Verified</span>
        </div>
        <span className="font-mono font-bold text-sm" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
      </div>
    </motion.a>
  );
}

export default function BestSellersStrip() {
  // LOCKED: only fetches 'founders-series'. staleTime prevents silent reorders on cache expiry.
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-founders-strip'],
    queryFn: () => base44.entities.Product.filter({ collection: 'founders-series' }, '', 20),
    staleTime: 5 * 60 * 1000,
  });

  // Display in locked canonical order — never auto-reorder
  const ordered = FOUNDERS_DISPLAY_ORDER
    .map(h => allProducts.find(p => p.shopify_handle === h))
    .filter(Boolean);
  // Append any founders-series products not in the locked list (e.g. newly added)
  const extras = allProducts.filter(p => !FOUNDERS_DISPLAY_ORDER.includes(p.shopify_handle));
  const display = [...ordered, ...extras].slice(0, 4);

  return (
    <section className="py-14 md:py-20 px-5 md:px-12" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-8 md:mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 1, background: 'rgba(201,162,74,0.6)' }} />
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>Collection 01</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1 font-black"
                  style={{ background: 'rgba(201,162,74,0.15)', color: '#C9A24A', border: '1px solid rgba(201,162,74,0.4)' }}>
                  ● Small Batch
                </span>
                <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1 font-black"
                  style={{ background: 'rgba(201,162,74,0.08)', color: 'rgba(201,162,74,0.7)', border: '1px solid rgba(201,162,74,0.2)' }}>
                  Limited Release
                </span>
                <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1 font-black"
                  style={{ background: 'rgba(201,162,74,0.08)', color: 'rgba(201,162,74,0.7)', border: '1px solid rgba(201,162,74,0.2)' }}>
                  Collect the Series
                </span>
              </div>
              <h2 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                Choose Your Blend
              </h2>
              <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1.8, maxWidth: 460 }}>
                Six founders. Six small-batch blends. Each one retires permanently — collect yours before it's gone.
              </p>
            </div>

            <a
              href="https://torch-republic.com/collections/founders-series"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-90 btn-glow flex-shrink-0"
              style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '14px 28px' }}
            >
              Shop the Founders Series <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* Gold rule */}
        <div className="mb-8" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(201,162,74,0.4) 0%, rgba(201,162,74,0.06) 55%, transparent 100%)' }} />

        {/* Product Grid — 4 columns */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[...Array(4)].map((_, i) => <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />)}
          </div>
        ) : display.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {display.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <p className="font-mono text-sm text-center py-12" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Founders blends loading…
          </p>
        )}

        {/* Bottom CTA row */}
        {!isLoading && display.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="https://torch-republic.com/collections/founders-series"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-90 btn-glow"
              style={{ background: '#C9A24A', color: '#080808', padding: '14px 32px' }}
            >
              Shop the Founders Series →
            </a>
            <a
              href="https://torch-republic.com/collections/all"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60"
              style={{ color: 'rgba(201,162,74,0.55)', borderBottom: '1px solid rgba(201,162,74,0.2)', paddingBottom: '2px' }}
            >
              View All Blends →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}