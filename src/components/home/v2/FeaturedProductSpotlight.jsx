import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const POD_HANDLE = 'washington-blend-coffee-pods';
const SHOPIFY_URL = `https://torch-republic.com/products/${POD_HANDLE}`;
const TORCH_BOX_URL = 'https://torch-republic.com/products/the-torch-box';

async function fetchPodProduct() {
  const res = await base44.functions.invoke('getSpotlightProduct', { handle: POD_HANDLE });
  return res.data;
}

export default function FeaturedProductSpotlight() {
  const { data: product, isLoading } = useQuery({
    queryKey: ['spotlight-pods', POD_HANDLE],
    queryFn: fetchPodProduct,
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });

  if (!isLoading && !product?.firstImage) return null;

  const price = product?.price ? `$${Number(product.price).toFixed(2)}` : '$15.00';
  const imageUrl = product?.firstImage;

  return (
    <section style={{ background: '#080808', borderTop: '1px solid rgba(201,162,74,0.18)', borderBottom: '1px solid rgba(201,162,74,0.18)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div style={{ width: 28, height: 1, background: 'rgba(201,162,74,0.55)' }} />
          <p className="font-mono text-[9px] tracking-[0.6em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
            Featured Product · Limited Launch
          </p>
        </div>

        {/* Premium container */}
        <div
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24 p-6 md:p-10 lg:p-14"
          style={{
            background: '#0A0A0A',
            border: '1px solid rgba(201,162,74,0.14)',
            boxShadow: '0 4px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,162,74,0.06)',
          }}
        >
          {/* ── LEFT: Product Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:w-[52%] flex-shrink-0 flex items-center justify-center"
          >
            {/* Gold glow halo — stronger */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-10%',
                background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.22) 0%, rgba(201,162,74,0.08) 40%, transparent 70%)',
                filter: 'blur(48px)',
                zIndex: 0,
              }}
            />

            {isLoading ? (
              <div className="animate-pulse w-full" style={{ aspectRatio: '1/1', background: '#161616', maxWidth: '560px' }} />
            ) : imageUrl ? (
              <div className="relative z-10 w-full" style={{ maxWidth: '560px' }}>
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <ProductBadge type="Recommended First" />
                </div>
                <img
                  src={imageUrl}
                  alt="Washington Blend Pods"
                  className="w-full block"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(201,162,74,0.12))',
                    background: 'transparent',
                  }}
                />
              </div>
            ) : null}
          </motion.div>

          {/* ── RIGHT: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center md:items-start text-center md:text-left w-full"
          >
            {/* Eyebrow */}
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.55)' }}>
              Washington Blend · Pods
            </p>

            {/* Headline */}
            <h2
              className="font-serif leading-none mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#C9A24A', letterSpacing: '-0.02em' }}
            >
              Start with<br />
              <span style={{ color: '#FFFFFF' }}>Washington</span>
            </h2>

            {/* Value line */}
            <p className="font-heading mb-4" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.65)', fontWeight: 400, lineHeight: 1.6, maxWidth: '380px' }}>
              Bold, disciplined dark roast. Premium sourced. Small-batch roasted.
            </p>

            {/* Price */}
            <p className="font-mono font-black mb-8" style={{ fontSize: '2rem', color: '#C9A24A' }}>
              {price}
            </p>

            {/* CTAs — fast conversion */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-mono tracking-[0.35em] uppercase transition-all"
                style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '16px 36px', fontSize: '11px', textDecoration: 'none' }}
              >
                Add to Cart
              </a>
              <a
                href={TORCH_BOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-mono tracking-[0.28em] uppercase transition-all"
                style={{ color: '#C9A24A', border: '1px solid rgba(201,162,74,0.5)', padding: '16px 28px', fontSize: '11px', textDecoration: 'none' }}
              >
                Subscribe Instead
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}