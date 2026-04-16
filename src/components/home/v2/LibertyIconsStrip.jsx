import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ShoppingCart } from 'lucide-react';

function LibertyCard({ product, index }) {
  const shopifyUrl = `https://torch-republic.com/products/${product.shopify_handle}`;
  const cleanTitle = product.title
    .replace(/[-–]\s*Liberty Icons Series Coffee/i, '')
    .replace(/[-–]\s*Founders Series Coffee/i, '')
    .trim();

  const plain = (product.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const notesMatch = plain.match(/Tasting Notes?[:\s•]+([^·|.<\n]+)/i);
  const tastingNote = notesMatch ? notesMatch[1].trim() : '';

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
      style={{
        background: '#111111',
        border: '1px solid rgba(196,163,90,0.18)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.65)';
        e.currentTarget.style.boxShadow = '0 0 22px 2px rgba(201,162,74,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(196,163,90,0.18)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image_url}
          alt={cleanTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.92, filter: 'brightness(1.08) contrast(1.03)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-serif font-bold leading-snug" style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>
          {cleanTitle}
        </h3>
        {tastingNote && (
          <p className="font-mono text-[9px]" style={{ color: 'rgba(240,235,225,0.4)', lineHeight: 1.5 }}>
            {tastingNote.substring(0, 50)}
          </p>
        )}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="font-mono font-bold text-sm" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
        </div>
        <div
          className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase py-3 transition-opacity group-hover:opacity-80"
          style={{ background: '#1A1A1A', color: '#C9A24A', fontWeight: 700, border: '1px solid rgba(201,162,74,0.3)' }}
        >
          <ShoppingCart className="w-3 h-3" />
          Shop Now
        </div>
      </div>
    </motion.a>
  );
}

export default function LibertyIconsStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-liberty-icons-strip'],
    queryFn: () => base44.entities.Product.filter({ collection: 'liberty-icons', category: 'coffee' }, '', 20),
  });

  const products = allProducts.filter(p => p.image_url && p.in_stock !== false);

  return (
    <section
      className="py-16 md:py-24 px-6 md:px-12"
      style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(196,163,90,0.08)' }}
    >
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: '#9BB8CC' }}>
              Liberty Icons Series
            </p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
              Icons of Freedom.
            </h2>
            <p className="font-heading mt-3" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 400 }}>
              Bold blends named for the symbols that define American freedom.
            </p>
          </div>
          <a
            href="https://torch-republic.com/collections/liberty-icons-coffee"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55 pb-0.5"
            style={{ color: '#9BB8CC', borderBottom: '1px solid rgba(155,184,204,0.35)' }}
          >
            View All →
          </a>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#1A1A1A', aspectRatio: '1/1' }} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {products.map((p, i) => <LibertyCard key={p.id} product={p} index={i} />)}
          </div>
        ) : null}
      </div>
    </section>
  );
}