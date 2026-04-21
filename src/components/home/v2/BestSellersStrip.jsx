import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';
import ProductBadge from '../../products/ProductBadge';

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

function ProductCard({ product, index, badge }) {
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
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <ProductBadge type={badge} />
        </div>
      )}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image_url}
          alt={`${title} premium coffee from Torch Republic`}
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
     retry: 2,
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
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>Torch Republic · Collection 01 · Founders Series</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1 font-black mb-3 inline-block"
                style={{ background: 'rgba(201,162,74,0.15)', color: '#C9A24A', border: '1px solid rgba(201,162,74,0.4)' }}>
                Build Your Set
              </span>
              <h2 className="font-serif leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                The Founders Series
              </h2>
              <p className="font-heading mb-0" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', fontWeight: 400, lineHeight: 1.6, maxWidth: 400 }}>
                Six premium small-batch blends inspired by American legacy. Each roasted once. Each retires forever.
              </p>
            </div>

            <a
              href="https://torch-republic.com/collections/founders-series"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-90 btn-glow flex-shrink-0"
              style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '14px 28px' }}
            >
              Explore All Six <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mb-6" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(201,162,74,0.4) 0%, rgba(201,162,74,0.06) 55%, transparent 100%)' }} />

        {/* Product Grid — 4 columns, fast load */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />)}
          </div>
        ) : display.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {display.map((p, i) => {
              // First product is recommended for first-time customers
              const badge = i === 0 ? 'Recommended First' : i === 1 ? 'Best Seller' : null;
              return <ProductCard key={p.id} product={p} index={i} badge={badge} />;
            })}
          </div>
        ) : null}

        {/* Stacked boxes visual + CTA */}
        {!isLoading && display.length > 0 && (
          <div className="mt-10 p-6 flex flex-col md:flex-row items-center gap-8"
            style={{ background: '#0D0D0D', border: '1px solid rgba(201,162,74,0.14)' }}>
            {/* Stacked boxes visual */}
            <div className="flex-shrink-0 flex items-end gap-[-8px]">
              {display.slice(0, 4).map((p, i) => (
                <div key={p.id}
                  className="w-16 h-16 overflow-hidden rounded-sm border"
                  style={{
                    marginLeft: i === 0 ? 0 : '-12px',
                    zIndex: display.length - i,
                    position: 'relative',
                    border: '1px solid rgba(201,162,74,0.35)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
                    transform: `rotate(${[-2, 1, -1, 2][i]}deg)`,
                  }}>
                  <img src={p.image_url} alt={`${p.title} premium coffee from Torch Republic`} className="w-full h-full object-cover" style={{ opacity: 0.9 }} />
                </div>
              ))}
              <div className="w-16 h-16 flex items-center justify-center rounded-sm ml-[-12px] relative z-0"
                style={{ border: '1px dashed rgba(201,162,74,0.35)', background: 'rgba(201,162,74,0.07)' }}>
                <span className="font-mono text-[11px] font-black" style={{ color: 'rgba(201,162,74,0.55)' }}>+2</span>
              </div>
            </div>
            {/* Text + CTA */}
            <div className="flex-1 text-center md:text-left">
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: 'rgba(201,162,74,0.55)' }}>Complete the Set</p>
              <p className="font-serif font-bold mb-2" style={{ fontSize: '1.15rem', color: '#FFFFFF', letterSpacing: '-0.01em' }}>Collect All 6 Founders</p>
              <p className="font-heading text-[9.5px] mb-5" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>Premium sourced. Small-batch roasted. Quality guaranteed. Each blend retires permanently.</p>
              <a
                href="https://torch-republic.com/collections/founders-series"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-90 btn-glow"
                style={{ background: '#C9A24A', color: '#080808', padding: '14px 32px', boxShadow: '0 4px 20px rgba(201,162,74,0.25)' }}
              >
                Collect the Full Series <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}