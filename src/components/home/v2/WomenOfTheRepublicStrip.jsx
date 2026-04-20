import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const AC = '#D4A0C0';
const AC_RGB = '212,160,192';

const COMING_SOON = [
  { name: 'Eleanor Roosevelt Blend', subtitle: 'Medium Roast · Smooth & Bold' },
  { name: 'Sacagawea Blend', subtitle: 'Medium-Dark · Earthy & Adventurous' },
];

const INTERNAL_ROUTES = {
  'remember-the-ladies': '/AbigailAdamsBlend',
  'midnight-railway': '/HarrietTubmanBlend',
};

const PLACEHOLDER = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80';

function LiveProductCard({ product, index }) {
  // DB field is shopify_handle, not handle
  const handle = product.shopify_handle || product.handle;
  const route = INTERNAL_ROUTES[handle];
  const title = product.title.replace(/[-–]\s*(Women of the Republic|Coffee)\s*/gi, '').trim();
  // Use this product's own image_url only — no cross-product fallback
  const imgSrc = product.image_url || PLACEHOLDER;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      className="group flex flex-col h-full"
      style={{ background: '#0B0B0B', border: `1px solid rgba(${AC_RGB},0.15)`, transition: 'border-color 0.25s, box-shadow 0.25s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `rgba(${AC_RGB},0.5)`;
        e.currentTarget.style.boxShadow = `0 0 24px 2px rgba(${AC_RGB},0.08)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `rgba(${AC_RGB},0.15)`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#111' }}>
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ opacity: 0.85 }}
          onError={e => { e.currentTarget.src = PLACEHOLDER; }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
        <div className="absolute bottom-3 right-3">
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase px-2.5 py-1"
            style={{ background: `rgba(${AC_RGB},0.15)`, border: `1px solid rgba(${AC_RGB},0.35)`, color: AC }}>
            Available Now
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-serif font-bold" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.25 }}>
          {title}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: `1px solid rgba(${AC_RGB},0.08)` }}>
          <span className="font-mono font-black text-sm" style={{ color: AC }}>${product.price?.toFixed(2)}</span>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase flex items-center gap-1" style={{ color: `rgba(${AC_RGB},0.55)` }}>
            Shop Now <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (route) return <Link to={route} style={{ textDecoration: 'none' }}>{inner}</Link>;
  return <a href={`https://torch-republic.com/products/${handle}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>;
}

function ComingSoonCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index + 2) * 0.09 }}
      className="flex flex-col"
      style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.08)', opacity: 0.5 }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#0E0E0E' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ opacity: 0.06 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A24A" strokeWidth="1">
              <path d="M12 2C12 2 8 7 8 12a4 4 0 0 0 8 0c0-5-4-10-4-10z" />
              <path d="M12 14v8" />
            </svg>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1"
            style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.2)', color: 'rgba(201,162,74,0.5)' }}>
            Coming Soon
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-1.5">
        <h3 className="font-serif font-bold" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.25 }}>
          {card.name}
        </h3>
        <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.25)' }}>
          {card.subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export default function WomenOfTheRepublicStrip() {
  // LOCKED: only fetches 'women-of-the-republic'. staleTime prevents silent reorders on cache expiry.
  const { data: liveProducts = [], isLoading } = useQuery({
    queryKey: ['home-women-strip'],
    queryFn: () => base44.entities.Product.filter({ collection: 'women-of-the-republic' }, '', 10),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="py-20 md:py-28 px-5 md:px-12"
      style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.06)' }}>
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
            <div style={{ width: 36, height: 1, background: `rgba(${AC_RGB},0.45)` }} />
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: `rgba(${AC_RGB},0.45)` }}>
              Collection 04
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <h2 className="font-serif leading-none mb-3"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.03em' }}>
                Women of the Republic
              </h2>
              {liveProducts.length > 0 ? (
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1"
                    style={{ background: `rgba(${AC_RGB},0.1)`, border: `1px solid rgba(${AC_RGB},0.3)`, color: AC }}>
                    ● Live Now — {liveProducts.length} Blend{liveProducts.length !== 1 ? 's' : ''} Available
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1"
                    style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.2)', color: 'rgba(201,162,74,0.6)' }}>
                    Coming Soon
                  </span>
                </div>
              )}
              <p className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400, lineHeight: 1.85, maxWidth: 460 }}>
                Stories of courage, conviction, and legacy — honored in every cup.
              </p>
            </div>
            <Link to="/WomenOfTheRepublic"
              className="flex-shrink-0 font-mono text-[10px] tracking-[0.3em] uppercase pb-px transition-opacity hover:opacity-60 flex items-center gap-1"
              style={{ color: `rgba(${AC_RGB},0.55)`, borderBottom: `1px solid rgba(${AC_RGB},0.2)` }}>
              View Collection <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* Gold rule */}
        <div className="mb-10" style={{ height: '1px', background: `linear-gradient(90deg, rgba(${AC_RGB},0.3) 0%, rgba(${AC_RGB},0.05) 55%, transparent 100%)` }} />

        {/* Card Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#161616', aspectRatio: '1/1' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {liveProducts.map((p, i) => (
              <LiveProductCard key={p.shopify_handle || p.id} product={p} index={i} />
            ))}
            {COMING_SOON.map((card, i) => (
              <ComingSoonCard key={card.name} card={card} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/WomenOfTheRepublic"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60 pb-px"
            style={{ color: `rgba(${AC_RGB},0.5)`, borderBottom: `1px solid rgba(${AC_RGB},0.15)` }}>
            Shop Women of the Republic →
          </Link>
        </div>
      </div>
    </section>
  );
}