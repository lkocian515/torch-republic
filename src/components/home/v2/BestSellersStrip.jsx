import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ShoppingCart } from 'lucide-react';

const FOUNDER_HANDLES = [
  'washington-blend',
  'lincoln-blend',
  'jefferson-blend',
  'franklin-blend',
  'adams-blend',
  'roosevelt-blend',
];

function CoffeeProductCard({ product, index }) {
  const shopifyUrl = `https://torch-republic.com/products/${product.shopify_handle}`;

  // Extract a clean short title
  const cleanTitle = product.title
    .replace(/[-–]\s*Founders Series Coffee/i, '')
    .replace(/[-–]\s*Liberty Icons Series Coffee/i, '')
    .trim();

  // Extract roast level from description
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
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image_url}
          alt={cleanTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.92, filter: 'brightness(1.08) contrast(1.03)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
        {product.best_seller_rank === 1 && (
          <div className="absolute top-3 left-3 px-2.5 py-1 font-mono text-[9px] font-black tracking-widest uppercase"
            style={{ background: '#D4AE57', color: '#080808' }}>#1 Seller</div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 md:p-5 flex flex-col gap-2.5 flex-1">
        <div>
          <h3 className="font-serif font-bold leading-snug mb-1" style={{ fontSize: '1rem', color: '#FFFFFF' }}>
            {cleanTitle}
          </h3>
          {roast && (
            <p className="font-mono text-[9px] tracking-widest uppercase mb-1.5" style={{ color: 'rgba(201,162,74,0.7)' }}>
              {roast}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm" style={{ color: '#C9A24A' }}>${parseFloat(product.price).toFixed(2)}</span>
            {product.compare_at_price > product.price && (
              <span className="font-mono text-xs line-through" style={{ color: 'rgba(255,255,255,0.28)' }}>${parseFloat(product.compare_at_price).toFixed(2)}</span>
            )}
          </div>
        </div>
        <div
          className="mt-auto flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase py-3 transition-opacity group-hover:opacity-80"
          style={{ background: '#D4AE57', color: '#080808', fontWeight: 700 }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </div>
      </div>
    </motion.a>
  );
}

export default function BestSellersStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-founders-strip'],
    queryFn: () => base44.entities.Product.filter({ category: 'coffee' }, '', 50),
  });

  // Prioritize the 6 Founders handles in order, then fill with other coffee
  const founders = FOUNDER_HANDLES
    .map(h => allProducts.find(p => p.shopify_handle === h))
    .filter(Boolean);

  const displayProducts = founders.length >= 4
    ? founders.slice(0, 6)
    : allProducts.filter(p => p.image_url && p.in_stock !== false && p.category === 'coffee').slice(0, 6);

  return (
    <section
      className="py-16 md:py-24 px-6 md:px-12"
      style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: '#C9A24A' }}>
              Founders Series
            </p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
              Start With the Founders.
            </h2>
            <p className="font-heading mt-3" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', fontWeight: 400 }}>
              Three blends. One standard.
            </p>
          </div>
          <a
            href="https://torch-republic.com/collections/founders-series"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55 pb-0.5"
            style={{ color: '#C9A24A', borderBottom: '1px solid rgba(201,162,74,0.35)' }}
          >
            View All →
          </a>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#111', aspectRatio: '1/1' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {displayProducts.map((p, i) => <CoffeeProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}