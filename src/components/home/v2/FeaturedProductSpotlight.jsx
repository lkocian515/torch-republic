import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

// Exact Shopify handle for Washington Blend Pods (coffee pod product, NOT bag)
const POD_HANDLE = 'washington-blend-coffee-pods';

async function fetchPodProduct() {
  // Pull directly from Shopify Storefront API — no DB cache
  const res = await base44.functions.invoke('getSpotlightProduct', { handle: POD_HANDLE });
  return res.data;
}

export default function FeaturedProductSpotlight() {
  const { data: product, isLoading } = useQuery({
    queryKey: ['spotlight-pods', POD_HANDLE],
    queryFn: fetchPodProduct,
    staleTime: 0,        // never serve stale — always fresh from Shopify
    gcTime: 0,           // don't cache in memory
    retry: 1,
  });

  // Hide if product not found after load
  if (!isLoading && !product?.firstImage) return null;

  const price = product?.price ? `$${Number(product.price).toFixed(2)}` : '$20.00';
  const imageUrl = product?.firstImage;
  const shopifyUrl = `https://torch-republic.com/products/${POD_HANDLE}`;

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

          {/* ── LEFT: Product Image (from Shopify) ── */}
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
                background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.12) 0%, transparent 65%)',
                filter: 'blur(40px)',
                borderRadius: '50%',
                zIndex: 0,
              }}
            />

            {isLoading ? (
              <div
                className="animate-pulse w-full"
                style={{ aspectRatio: '1/1', background: '#161616', maxWidth: '480px' }}
              />
            ) : imageUrl ? (
              <div
                className="relative z-10 w-full"
                style={{ maxWidth: '480px' }}
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
                  alt="Washington Blend Pods"
                  className="w-full block"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(201,162,74,0.06)',
                    background: 'transparent',
                  }}
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
              Torch Republic · Founders Series · Pods
            </p>

            {/* Headline */}
            <h2
              className="font-serif leading-none mb-3"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                fontWeight: 800,
                color: '#C9A24A',
                letterSpacing: '-0.02em',
              }}
            >
              WASHINGTON<br />
              <span style={{ color: '#FFFFFF' }}>BLEND PODS</span>
            </h2>

            {/* Subheadline */}
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
              Now available in single-serve pods.
            </p>

            {/* Price */}
            <p className="font-mono font-black mb-8" style={{ fontSize: '1.75rem', color: '#C9A24A' }}>
              {price}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={shopifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-all"
                style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '16px 38px', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = '#DDB95E'}
                onMouseLeave={e => e.currentTarget.style.background = '#C9A24A'}
              >
                SHOP NOW
              </a>
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