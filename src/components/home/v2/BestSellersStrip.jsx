import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

// Washington, Lincoln, Franklin are the 3 featured founders
const FEATURED_FOUNDERS = ['washington-blend', 'lincoln-blend', 'franklin-blend'];

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
        <span className="font-mono font-bold text-sm mt-1" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
      </div>
    </motion.a>
  );
}

export default function BestSellersStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-founders-strip'],
    queryFn: () => base44.entities.Product.filter({ category: 'coffee' }, '', 50),
  });

  const founders = allProducts.filter(p =>
    p.title && p.title.toLowerCase().includes('founders series')
  );

  // Show Washington, Lincoln, Franklin first — then fill to 4 if available
  const priority = FEATURED_FOUNDERS.map(h => founders.find(p => p.shopify_handle === h)).filter(Boolean);
  const rest = founders.filter(p => !FEATURED_FOUNDERS.includes(p.shopify_handle));
  const display = [...priority, ...rest].slice(0, 4);

  return (
    <section className="py-20 md:py-28 px-5 md:px-12" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.15)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 36, height: 1, background: '#C9A24A' }} />
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: '#C9A24A' }}>Collection 01</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                Founders Series
              </h2>
              <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1.8, maxWidth: 460 }}>
                Where it all began. Balanced, reliable blends built for your daily ritual — named for the men who built a nation.
              </p>
            </div>

            <a
              href="https://torch-republic.com/collections/founders-series"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-80 btn-glow flex-shrink-0"
              style={{ background: '#D4AE57', color: '#080808', fontWeight: 800, padding: '15px 36px' }}
            >
              Start With the Founders <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Gold rule */}
        <div className="mb-10" style={{ height: '1px', background: 'linear-gradient(90deg, #C9A24A 0%, rgba(201,162,74,0.12) 55%, transparent 100%)' }} />

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
      </div>
    </section>
  );
}