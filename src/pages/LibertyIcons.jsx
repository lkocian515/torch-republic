import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import TorchBoxCollectionBanner from '../components/collections/TorchBoxCollectionBanner';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80';

// Internal routes for blends that have dedicated pages
const INTERNAL_ROUTES = {
  'eagles-flight-blend':   '/EaglesFlightBlend',
  'liberty-torch-blend':   '/LibertyTorchBlend',
  'old-glory-house-blend': '/OldGloryHouseBlend',
  'rosies-grind':          '/RosiesGrind',
  'uncle-sams-bold-brew':  '/UncleSamsBoldBrew',
  'lady-liberty-blend':    '/LadyLibertyBlend',
};

function ProductCard({ product, index }) {
  const handle = product.shopify_handle;
  const route = INTERNAL_ROUTES[handle];
  const title = product.title
    .replace(/[-–]\s*(Liberty Icons Series Coffee|Liberty Icons Series|Liberty Icons|Coffee)\s*/gi, '')
    .trim();
  const imgSrc = product.image_url || PLACEHOLDER;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col"
      style={{
        background: '#0B0B0B',
        border: '1px solid rgba(155,184,204,0.15)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.65)';
        e.currentTarget.style.boxShadow = '0 0 28px 3px rgba(201,162,74,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(155,184,204,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#111' }}>
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.9 }}
          onError={e => { e.currentTarget.src = PLACEHOLDER; }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
        <div className="absolute top-3 right-3">
          <span className="font-mono text-[7px] font-bold tracking-wider px-2 py-1"
            style={{ background: 'rgba(201,162,74,0.18)', color: 'rgba(201,162,74,0.9)', border: '1px solid rgba(201,162,74,0.3)' }}>
            In Torch Box
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#F0EBE1', lineHeight: 1.25 }}>{title}</h3>
        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(155,184,204,0.08)' }}>
          <span className="font-mono font-bold text-sm" style={{ color: '#9BB8CC' }}>${product.price?.toFixed(2)}</span>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>View →</span>
        </div>
      </div>
    </motion.div>
  );

  if (route) return <Link key={product.id} to={route} style={{ textDecoration: 'none' }}>{inner}</Link>;
  return (
    <a key={product.id}
      href={`https://torch-republic.com/products/${handle}`}
      target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}>
      {inner}
    </a>
  );
}

export default function LibertyIcons() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['liberty-icons-products'],
    queryFn: () => base44.entities.Product.filter({ collection: 'liberty-icons' }, '', 20),
    staleTime: 0,
  });

  return (
    <div style={{ backgroundColor: '#000000', color: '#F0EBE1' }}>

      {/* ════ HERO ════ */}
      <section className="py-20 px-6 border-b" style={{ borderColor: 'rgba(201,162,74,0.1)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <Flame className="w-8 h-8" style={{ color: '#9BB8CC' }} />
            </div>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div style={{ width: 36, height: 1, background: '#9BB8CC' }} />
              <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: '#9BB8CC' }}>Collection 02</p>
              <div style={{ width: 36, height: 1, background: '#9BB8CC' }} />
            </div>
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Liberty Icons Series
            </h1>
            <p className="font-heading text-sm max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.85 }}>
              Symbols that outlive time. Bold, identity-driven blends named for the icons of American freedom — each one a distinct character, a distinct roast, a distinct story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ COLLECTION GRID ════ */}
      <section className="py-12 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <TorchBoxCollectionBanner />

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════ ABOUT THIS SERIES ════ */}
      <section className="py-16 px-6 border-t" style={{ borderColor: 'rgba(201,162,74,0.1)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-widest mb-4" style={{ color: 'rgba(155,184,204,0.55)' }}>
              ABOUT THIS SERIES
            </p>
            <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)' }}>
              The Liberty Icons series honors the symbols and figures that define the American spirit — the soaring eagle, the eternal flame, the stars and stripes, and the people who embodied freedom's cost. Each blend is crafted to carry that character forward, one cup at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <Link
              to="/CoffeeCollection"
              className="px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all"
              style={{ backgroundColor: '#C9A24A', color: '#000000', border: '1px solid #C9A24A' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E4C46A'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C9A24A'}
            >
              View All Coffee
            </Link>
            <Link
              to="/TheTorchBox"
              className="px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all"
              style={{ backgroundColor: 'transparent', color: '#C9A24A', border: '1px solid rgba(201,162,74,0.45)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(201,162,74,0.08)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Join Torch Box →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}