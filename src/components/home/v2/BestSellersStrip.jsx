import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ShoppingCart } from 'lucide-react';

const PRIORITY_HANDLES = ['washington-blend', 'lincoln-blend', 'liberty-torch-blend', 'lady-liberty-blend'];

function ProductCard({ product, index }) {
  const shopifyUrl = product.shopify_handle
    ? `https://torch-republic.com/products/${product.shopify_handle}`
    : 'https://torch-republic.com/collections/coffee';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group flex flex-col"
      style={{ background: '#111111', border: '1px solid rgba(196,163,90,0.12)' }}
    >
      {/* Image */}
      <a href={shopifyUrl} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.88, filter: 'brightness(1.06) contrast(1.04)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
        {product.on_sale && (
          <div className="absolute top-3 left-3 px-2 py-0.5 font-mono text-[9px] font-black tracking-widest uppercase"
            style={{ background: '#D4AE57', color: '#080808' }}>SALE</div>
        )}
        {product.best_seller_rank === 1 && (
          <div className="absolute top-3 left-3 px-2 py-0.5 font-mono text-[9px] font-black tracking-widest uppercase"
            style={{ background: '#D4AE57', color: '#080808' }}>#1 Seller</div>
        )}
      </a>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-serif font-bold leading-tight mb-1" style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm" style={{ color: '#C9A24A' }}>${product.price?.toFixed(2)}</span>
            {product.compare_at_price > product.price && (
              <span className="font-mono text-xs line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>${product.compare_at_price?.toFixed(2)}</span>
            )}
          </div>
        </div>
        <a
          href={shopifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase py-3.5 transition-all hover:opacity-80"
          style={{ background: '#D4AE57', color: '#080808', fontWeight: 700 }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </a>
      </div>
    </motion.div>
  );
}

export default function BestSellersStrip() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-best-sellers-strip'],
    queryFn: () => base44.entities.Product.filter({ collection: 'best-sellers' }, '', 50),
  });

  const products = allProducts
    .filter(p => p.image_url && p.in_stock !== false)
    .sort((a, b) => (a.best_seller_rank || 999) - (b.best_seller_rank || 999))
    .slice(0, 4);

  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.1)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: '#C9A24A' }}>Top Picks</p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Start Here.
            </h2>
          </div>
          <a
            href="https://torch-republic.com/collections/coffee"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55 pb-0.5"
            style={{ color: '#C9A24A', borderBottom: '1px solid rgba(201,162,74,0.35)' }}
          >
            View All →
          </a>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#111', aspectRatio: '1/1' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}