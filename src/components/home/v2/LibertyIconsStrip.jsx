import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

// Liberty Torch, Lady Liberty, Eagles Flight featured first
const FEATURED_LIBERTY = ['liberty-torch-blend', 'lady-liberty-blend', 'eagles-flight-blend'];

function ProductCard({ product, index }) {
  const url = `https://torch-republic.com/products/${product.shopify_handle}`;
  const title = product.title
    .replace(/[-–]\s*Liberty Icons Series Coffee/i, '')
    .replace(/[-–]\s*Liberty Icons/i, '')
    .trim();
  const plain = (product.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const notesMatch = plain.match(/Tasting Notes?[:\s•]+([^·|.<\n]+)/i);
  const note = notesMatch ? notesMatch[1].trim().split(',')[0] : '';

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
      style={{ background: '#0B0B0B', border: '1px solid rgba(155,184,204,0.18)', textDecoration: 'none', transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.7)';
        e.currentTarget.style.boxShadow = '0 0 30px 3px rgba(201,162,74,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(155,184,204,0.18)';
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
        {note && <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.42)', lineHeight: 1.5 }}>{note}</p>}
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

export default function LibertyIconsStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-liberty-icons-strip'],
    queryFn: () => base44.entities.Product.filter({ collection: 'liberty-icons' }, '', 20),
  });

  const priority = FEATURED_LIBERTY.map(h => allProducts.find(p => p.shopify_handle === h)).filter(Boolean);
  const rest = allProducts.filter(p => !FEATURED_LIBERTY.includes(p.shopify_handle));
  const display = [...priority, ...rest].slice(0, 4);

  if (!isLoading && display.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-5 md:px-12" style={{ backgroundColor: '#0D0D0D', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 36, height: 1, background: '#9BB8CC' }} />
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: '#9BB8CC' }}>Collection 02</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                Liberty Icons
              </h2>
              <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400, lineHeight: 1.8, maxWidth: 440 }}>
                Symbols that outlive time. Bold, identity-driven blends named for the icons of American freedom.
              </p>
            </div>

            <a
              href="https://torch-republic.com/collections/liberty-icons-coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-75 flex-shrink-0 pb-0.5"
              style={{ color: '#9BB8CC', borderBottom: '1px solid rgba(155,184,204,0.35)' }}
            >
              Carry the Flame <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        <div className="mb-10" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(155,184,204,0.55) 0%, rgba(155,184,204,0.08) 55%, transparent 100%)' }} />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[...Array(4)].map((_, i) => <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {display.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}