import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const HANDLE = 'washington-blend';
const INTERNAL_ROUTE = '/WashingtonBlend';
const FALLBACK_HANDLE = 'jefferson-blend';
const FALLBACK_ROUTE = '/JeffersonBlend';

export default function FeaturedProductSpotlight() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featured-spotlight', HANDLE],
    queryFn: async () => {
      const primary = await base44.entities.Product.filter({ shopify_handle: HANDLE }, '', 1);
      if (primary.length > 0) return primary;
      return base44.entities.Product.filter({ shopify_handle: FALLBACK_HANDLE }, '', 1);
    },
    staleTime: 5 * 60 * 1000,
  });

  const product = products[0];

  // Hide section if no product found and not loading
  if (!isLoading && !product) return null;

  const price = product?.price ? `$${Number(product.price).toFixed(2)}` : '$20.00';
  const imageUrl = product?.image_url;
  const route = product?.shopify_handle === HANDLE ? INTERNAL_ROUTE : FALLBACK_ROUTE;

  return (
    <section
      style={{
        background: '#0B0B0B',
        borderTop: '1px solid rgba(201,162,74,0.08)',
        borderBottom: '1px solid rgba(201,162,74,0.08)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div style={{ width: 28, height: 1, background: 'rgba(201,162,74,0.5)' }} />
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
            Featured Product
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24">

          {/* ── LEFT: Product Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:w-[46%] flex-shrink-0 flex items-center justify-center"
          >
            {/* Gold glow halo */}
            <div
              className="absolute"
              style={{
                inset: '5%',
                background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.1) 0%, transparent 65%)',
                filter: 'blur(40px)',
                borderRadius: '50%',
                zIndex: 0,
              }}
            />

            {isLoading ? (
              <div
                className="animate-pulse w-full"
                style={{ aspectRatio: '4/5', background: '#161616', maxWidth: '440px' }}
              />
            ) : imageUrl ? (
              <div
                className="relative z-10 w-full overflow-hidden"
                style={{
                  maxWidth: '440px',
                  boxShadow: '0 24px 72px rgba(0,0,0,0.7), 0 0 40px rgba(201,162,74,0.05)',
                }}
              >
                {/* Founders Series badge */}
                <div
                  className="absolute top-4 left-4 z-20 font-mono text-[8px] tracking-[0.35em] uppercase px-3 py-1.5"
                  style={{ background: '#C9A24A', color: '#080808', fontWeight: 800 }}
                >
                  FOUNDERS SERIES
                </div>

                <img
                  src={imageUrl}
                  alt="Washington Blend — Founders Series Coffee"
                  className="w-full block"
                  style={{ aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            ) : null}
          </motion.div>

          {/* ── RIGHT: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center md:items-start text-center md:text-left w-full"
          >
            {/* Eyebrow */}
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.55)' }}>
              Torch Republic · Founders #01
            </p>

            {/* Headline */}
            <h2
              className="font-serif leading-none mb-3"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 800,
                color: '#C9A24A',
                letterSpacing: '-0.02em',
              }}
            >
              WASHINGTON<br />
              <span style={{ color: '#FFFFFF' }}>BLEND</span>
            </h2>

            {/* Subheadline — flavor notes */}
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.55)' }}>
              Dark Roast · Cocoa · Smoke · Bold Spice
            </p>

            {/* Gold rule */}
            <div className="mb-6 self-start hidden md:block" style={{ height: '1px', width: '40px', background: 'rgba(201,162,74,0.4)' }} />

            {/* Body */}
            <p
              className="font-heading mb-4"
              style={{
                fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                color: 'rgba(240,235,225,0.68)',
                fontWeight: 400,
                lineHeight: 1.9,
                maxWidth: '400px',
              }}
            >
              Strength without noise. Built for discipline, not comfort.<br />
              A bold, full-bodied dark roast inspired by the man who set the standard.
            </p>

            {/* Price */}
            <p className="font-mono font-black mb-8" style={{ fontSize: '1.75rem', color: '#C9A24A' }}>
              {price}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to={route}
                className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-all"
                style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '16px 38px' }}
                onMouseEnter={e => e.currentTarget.style.background = '#DDB95E'}
                onMouseLeave={e => e.currentTarget.style.background = '#C9A24A'}
              >
                SHOP NOW
              </Link>
              <Link
                to="/CoffeeCollection"
                className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.28em] uppercase transition-all"
                style={{ color: '#C9A24A', border: '1px solid rgba(201,162,74,0.45)', padding: '16px 28px' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#C9A24A';
                  e.currentTarget.style.background = 'rgba(201,162,74,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,162,74,0.45)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                VIEW FOUNDERS SERIES
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}