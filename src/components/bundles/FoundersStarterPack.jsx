import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Star } from 'lucide-react';

const BUNDLE_PRODUCTS = [
  {
    name: 'Washington Blend',
    roast: 'Dark Roast',
    note: 'Smoky · Dark Chocolate · Full Body',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/053b77352_generated_image.png',
    route: '/WashingtonBlend',
    price: 16.99,
  },
  {
    name: 'Lincoln Blend',
    roast: 'Medium-Dark Roast',
    note: 'Bittersweet Chocolate · Caramel · Smooth',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5a35c9646_generated_image.png',
    route: '/LincolnBlend',
    price: 16.99,
  },
  {
    name: 'Jefferson Blend',
    roast: 'Medium Roast',
    note: 'Citrus · Honey · Clean Finish',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/24258672a_generated_image.png',
    route: '/JeffersonBlend',
    price: 16.99,
  },
];

const RETAIL_PRICE = 50.97; // 3 × $16.99
const BUNDLE_PRICE = 42.99;
const SAVINGS = (RETAIL_PRICE - BUNDLE_PRICE).toFixed(2);
const SHOPIFY_BUNDLE_URL = 'https://torch-republic.com/collections/coffee';

export default function FoundersStarterPack({ compact = false }) {
  return (
    <section
      className="relative py-20 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: compact ? 'transparent' : '#0A0A0A', borderTop: compact ? 'none' : '1px solid rgba(196,163,90,0.1)' }}
    >
      {/* Ambient glow */}
      {!compact && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div style={{ width: '900px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(196,163,90,0.04) 0%, transparent 60%)' }} />
        </div>
      )}

      <div className={`relative z-10 ${compact ? '' : 'max-w-[1200px] mx-auto'}`}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12"
        >
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5"
              style={{ background: 'rgba(212,174,87,0.12)', border: '1px solid rgba(212,174,87,0.35)' }}>
              <Star className="w-3 h-3 fill-current" style={{ color: '#D4AE57' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold" style={{ color: '#D4AE57' }}>
                Best Place to Start
              </span>
            </div>
            <h2 className="font-serif leading-tight mb-3" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Founders Starter Pack
            </h2>
            <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.78)', fontWeight: 400, lineHeight: 1.85, maxWidth: '480px' }}>
              Not sure where to start? This is it. Three of our most iconic blends, built for your daily ritual.
            </p>
          </div>

          {/* Pricing summary — desktop */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-baseline gap-3">
              <span className="font-serif font-black" style={{ fontSize: '2.2rem', color: '#D4AE57' }}>${BUNDLE_PRICE}</span>
              <span className="font-mono text-sm line-through" style={{ color: 'rgba(255,255,255,0.25)' }}>${RETAIL_PRICE}</span>
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1"
              style={{ background: 'rgba(212,174,87,0.12)', color: '#D4AE57', border: '1px solid rgba(212,174,87,0.25)' }}>
              Save ${SAVINGS}
            </span>
          </div>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {BUNDLE_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={product.route}
                className="group flex flex-col overflow-hidden transition-all"
                style={{ background: '#111', border: '1px solid rgba(196,163,90,0.14)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,174,87,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.14)'}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ opacity: 0.82, filter: 'brightness(1.05)' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
                  {/* Number badge */}
                  <div className="absolute top-4 left-4 w-7 h-7 flex items-center justify-center font-mono font-black text-xs"
                    style={{ background: '#D4AE57', color: '#080808' }}>
                    0{i + 1}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold mb-1" style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>{product.name}</h3>
                  <p className="font-mono text-[9px] tracking-widest uppercase mb-2" style={{ color: 'rgba(201,162,74,0.65)' }}>{product.roast}</p>
                  <p className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.6 }}>{product.note}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-5"
          style={{ background: '#111', border: '1px solid rgba(196,163,90,0.2)', padding: '1.75rem 2rem' }}
        >
          {/* What's included */}
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
            {['3 small-batch bags', '15% bundle savings', 'Free shipping'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#D4AE57' }} />
                <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.78)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Mobile price */}
          <div className="flex md:hidden items-baseline gap-3">
            <span className="font-serif font-black" style={{ fontSize: '1.8rem', color: '#D4AE57' }}>${BUNDLE_PRICE}</span>
            <span className="font-mono text-sm line-through" style={{ color: 'rgba(255,255,255,0.25)' }}>${RETAIL_PRICE}</span>
          </div>

          <a
            href={SHOPIFY_BUNDLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-85 btn-glow flex-shrink-0"
            style={{ background: '#D4AE57', color: '#080808', fontWeight: 800, padding: '16px 40px' }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add Bundle to Cart →
          </a>
        </motion.div>
      </div>
    </section>
  );
}