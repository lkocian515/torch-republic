import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Shield } from 'lucide-react';

function ProductCard({ product, index }) {
  const url = `https://torch-republic.com/products/${product.shopify_handle}`;
  const title = product.title
    .replace(/[-–]\s*Commanders Series Coffee/i, '')
    .replace(/[-–]\s*Commanders Series/i, '')
    .trim();
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
      style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.16)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.75)';
        e.currentTarget.style.boxShadow = '0 0 32px 4px rgba(201,162,74,0.18)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.16)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.93 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#FFFFFF', lineHeight: 1.25 }}>{title}</h3>
        {roast && <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.6)' }}>{roast}</p>}
        <span className="font-mono font-bold text-sm mt-1" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
      </div>
    </motion.a>
  );
}

function ComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center py-16 px-6"
      style={{ border: '1px solid rgba(201,162,74,0.15)', background: 'rgba(201,162,74,0.03)' }}
    >
      <div className="flex items-center justify-center w-14 h-14 mb-6"
        style={{ border: '1px solid rgba(201,162,74,0.25)', background: 'rgba(201,162,74,0.06)' }}>
        <Shield className="w-6 h-6" style={{ color: 'rgba(201,162,74,0.6)' }} />
      </div>
      <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.55)' }}>
        Coming Soon
      </p>
      <p className="font-heading max-w-md" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, fontWeight: 400 }}>
        Commanders Series is preparing for launch. Check back soon for bold roasts inspired by legendary military leaders.
      </p>
      <a
        href="https://torch-republic.com/collections/commanders-series"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase mt-8 transition-all hover:opacity-75 pb-0.5"
        style={{ color: 'rgba(201,162,74,0.65)', borderBottom: '1px solid rgba(201,162,74,0.25)' }}
      >
        View Collection <ArrowRight className="w-3 h-3" />
      </a>
    </motion.div>
  );
}

export default function CommandersStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-commanders-strip'],
    queryFn: () => base44.entities.Product.filter({ category: 'coffee' }, '', 50),
  });

  // Match only real Commanders Series products by title keyword
  const commanders = allProducts.filter(p =>
    p.title && p.title.toLowerCase().includes('commanders series')
  );

  const display = commanders.slice(0, 6);
  const hasProducts = display.length > 0;

  return (
    <section className="py-20 md:py-28 px-5 md:px-12" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 36, height: 1, background: '#C9A24A' }} />
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: 'rgba(201,162,74,0.65)' }}>Collection 03</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                Commanders Series
              </h2>
              <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', fontWeight: 400, lineHeight: 1.8, maxWidth: 480 }}>
                Bold roasts and battlefield legends. Built for strength, discipline, and resolve.
              </p>
            </div>

            {hasProducts && (
              <a
                href="https://torch-republic.com/collections/commanders-series"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-75 flex-shrink-0 pb-0.5"
                style={{ color: '#C9A24A', borderBottom: '1px solid rgba(201,162,74,0.3)' }}
              >
                Lead From the Front <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Gold rule */}
        <div className="mb-10" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(201,162,74,0.55) 0%, rgba(201,162,74,0.08) 55%, transparent 100%)' }} />

        {/* Content: real products or coming soon */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />
            ))}
          </div>
        ) : hasProducts ? (
          <>
            <div className={`grid grid-cols-2 gap-3 md:gap-5 ${display.length <= 3 ? 'md:grid-cols-3' : display.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3 lg:grid-cols-6'}`}>
              {display.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            <div className="mt-10 flex justify-center">
              <a
                href="https://torch-republic.com/collections/commanders-series"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-80 btn-glow"
                style={{ background: 'transparent', color: '#C9A24A', border: '1px solid rgba(201,162,74,0.35)', padding: '14px 36px' }}
              >
                Shop Commanders Series <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </>
        ) : (
          <ComingSoon />
        )}
      </div>
    </section>
  );
}