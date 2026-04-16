import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

function CommanderCard({ product, index }) {
  const shopifyUrl = `https://torch-republic.com/products/${product.shopify_handle}`;
  const cleanTitle = product.title
    .replace(/[-–]\s*Commanders Series Coffee/i, '')
    .replace(/[-–]\s*Commanders Series/i, '')
    .trim();
  const plain = (product.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const roastMatch = plain.match(/Roast Level[:\s]+([^·|.<\n]+)/i);
  const roast = roastMatch ? roastMatch[1].trim() : '';

  return (
    <motion.a
      href={shopifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col"
      style={{ background: '#111', border: '1px solid rgba(196,163,90,0.15)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.65)';
        e.currentTarget.style.boxShadow = '0 0 24px 2px rgba(201,162,74,0.14)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(196,163,90,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img src={product.image_url} alt={cleanTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.92 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-serif font-bold leading-snug" style={{ fontSize: '0.93rem', color: '#FFF' }}>{cleanTitle}</h3>
        {roast && <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.65)' }}>{roast}</p>}
        <span className="font-mono font-bold text-xs mt-1" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
      </div>
    </motion.a>
  );
}

export default function CommandersStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-commanders-strip'],
    queryFn: () => base44.entities.Product.filter({ category: 'coffee' }, '', 50),
  });

  const commanders = allProducts.filter(p =>
    p.title && p.title.toLowerCase().includes('commanders series')
  );

  if (!isLoading && commanders.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-6 md:px-12" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 32, height: 1, background: '#C9A24A' }} />
            <p className="font-mono text-[10px] tracking-[0.6em] uppercase" style={{ color: 'rgba(196,163,90,0.7)' }}>Collection 03</p>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: '#FFF', letterSpacing: '-0.03em' }}>
                Commanders Series
              </h2>
              <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.65)', fontWeight: 400, maxWidth: 460 }}>
                Built for those who lead. Strength, conviction, and command in every cup.
              </p>
            </div>
            <a
              href="https://torch-republic.com/collections/commanders-series"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase flex-shrink-0 transition-all hover:opacity-70 pb-0.5"
              style={{ color: '#C9A24A', borderBottom: '1px solid rgba(201,162,74,0.35)' }}
            >
              View Commanders Series <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        <div className="mb-10" style={{ height: 1, background: 'linear-gradient(90deg, rgba(201,162,74,0.5) 0%, rgba(201,162,74,0.08) 60%, transparent 100%)' }} />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="animate-pulse" style={{ background: '#1A1A1A', aspectRatio: '1/1' }} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {commanders.map((p, i) => <CommanderCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}