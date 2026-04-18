import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const LIVE_PRODUCTS = [
  {
    name: 'Abigail Adams Blend',
    subtitle: 'Light Roast · Floral & Bright',
    price: '$19.99',
    route: '/AbigailAdamsBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/29.png?v=1776037980',
    code: 'WR-001',
  },
  {
    name: 'Harriet Tubman Blend',
    subtitle: 'Dark Roast · Bold & Unyielding',
    price: '$19.99',
    route: '/HarrietTubmanBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
    code: 'WR-002',
  },
];

const COMING_SOON = [
  { name: 'Eleanor Roosevelt Blend', subtitle: 'Medium Roast · Smooth & Bold' },
  { name: 'Sacagawea Blend', subtitle: 'Medium-Dark · Earthy & Adventurous' },
];

const AC = '#D4A0C0';

function LiveProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
    >
      <Link
        to={product.route}
        className="group flex flex-col h-full"
        style={{ background: '#0B0B0B', border: `1px solid rgba(212,160,192,0.15)`, transition: 'border-color 0.25s, box-shadow 0.25s' }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(212,160,192,0.5)';
          e.currentTarget.style.boxShadow = '0 0 24px 2px rgba(212,160,192,0.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(212,160,192,0.15)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#111' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ opacity: 0.85 }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1"
              style={{ background: `rgba(212,160,192,0.12)`, border: `1px solid rgba(212,160,192,0.3)`, color: AC }}>
              {product.code}
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase px-2.5 py-1"
              style={{ background: 'rgba(212,160,192,0.15)', border: '1px solid rgba(212,160,192,0.35)', color: AC }}>
              Available Now
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <h3 className="font-serif font-bold" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.25 }}>
            {product.name}
          </h3>
          <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: `rgba(212,160,192,0.55)` }}>
            {product.subtitle}
          </p>
          <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(212,160,192,0.08)' }}>
            <span className="font-mono font-black text-sm" style={{ color: AC }}>{product.price}</span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase flex items-center gap-1 transition-all group-hover:opacity-100"
              style={{ color: `rgba(212,160,192,0.55)` }}>
              Shop Now <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ComingSoonCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index + 2) * 0.09 }}
      className="flex flex-col"
      style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.08)', opacity: 0.55 }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#0E0E0E' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ opacity: 0.08 }}>
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
            <div style={{ width: 36, height: 1, background: `rgba(212,160,192,0.45)` }} />
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: `rgba(212,160,192,0.45)` }}>
              Collection 04
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <h2 className="font-serif leading-none mb-3"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.03em' }}>
                Women of the Republic
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1"
                  style={{ background: `rgba(212,160,192,0.1)`, border: `1px solid rgba(212,160,192,0.3)`, color: AC }}>
                  ● Live Now — 2 Blends Available
                </span>
              </div>
              <p className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400, lineHeight: 1.85, maxWidth: 460 }}>
                Stories of courage, conviction, and legacy — honored in every cup.
              </p>
            </div>
            <Link to="/WomenOfTheRepublic"
              className="flex-shrink-0 font-mono text-[10px] tracking-[0.3em] uppercase pb-px transition-opacity hover:opacity-60 flex items-center gap-1"
              style={{ color: `rgba(212,160,192,0.55)`, borderBottom: `1px solid rgba(212,160,192,0.2)` }}>
              View Collection <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* Gold rule */}
        <div className="mb-10" style={{ height: '1px', background: `linear-gradient(90deg, rgba(212,160,192,0.3) 0%, rgba(212,160,192,0.05) 55%, transparent 100%)` }} />

        {/* Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {LIVE_PRODUCTS.map((product, i) => (
            <LiveProductCard key={product.name} product={product} index={i} />
          ))}
          {COMING_SOON.map((card, i) => (
            <ComingSoonCard key={card.name} card={card} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/WomenOfTheRepublic"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60 pb-px"
            style={{ color: `rgba(212,160,192,0.5)`, borderBottom: `1px solid rgba(212,160,192,0.15)` }}>
            Shop Women of the Republic →
          </Link>
        </div>
      </div>
    </section>
  );
}