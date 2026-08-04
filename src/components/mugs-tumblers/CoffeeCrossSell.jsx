import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

async function fetchFeaturedCoffee() {
  try {
    const res = await base44.entities.Product.filter({ collection: 'founders-series' }, '-best_seller_rank', 4);
    return res || [];
  } catch (error) {
    console.error('Error fetching coffee products:', error);
    return [];
  }
}

function CoffeeCard({ product, index }) {
  const title = product.title.replace(/[-–]\s*Founders Series Coffee/i, '').trim();
  const url = `https://torch-republic.com/products/${product.shopify_handle}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col"
      style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.12)', textDecoration: 'none' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.12)';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#161616' }}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ opacity: 0.9 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
            No image
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
      </div>

      <div className="p-4">
        <h4 className="font-serif text-sm font-bold mb-1" style={{ color: '#FFFFFF' }}>
          {title}
        </h4>
        <p className="font-mono text-[9px] mb-3" style={{ color: '#C9A24A', fontWeight: 600 }}>
          ${Number(product.price).toFixed(2)}
        </p>
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.4)' }}>
          View Details <ArrowRight className="inline w-2 h-2" />
        </p>
      </div>
    </motion.a>
  );
}

export default function CoffeeCrossSell() {
  const { data: coffeeProducts = [], isLoading } = useQuery({
    queryKey: ['mugs-coffee-cross-sell'],
    queryFn: fetchFeaturedCoffee,
    staleTime: 10 * 60 * 1000,
  });

  if (!coffeeProducts.length && !isLoading) return null;

  return (
    <section className="px-6 md:px-12 py-24 md:py-28" style={{ backgroundColor: '#080808' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.6)' }}>
            Complete the Experience
          </p>
          <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#F0EBE1', letterSpacing: '-0.02em' }}>
            Pair with Your Coffee
          </h2>
          <p className="font-heading mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.6, maxWidth: '480px' }}>
            Premium blends from the Founders Series to complete your daily ritual.
          </p>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {coffeeProducts.map((product, i) => (
              <CoffeeCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <a
            href="/shop/instant-coffee"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-90"
            style={{ color: '#C9A24A', borderBottom: '1px solid rgba(201,162,74,0.4)', paddingBottom: '4px' }}
          >
            Explore All Blends →
          </a>
        </div>
      </div>
    </section>
  );
}