import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TorchBoxBanner from './TorchBoxBanner';

/**
 * CollectionPageTemplate
 *
 * Props:
 *  - bannerImage: string (full-width background image URL)
 *  - eyebrow: string (small mono label above title)
 *  - title: string (large serif title)
 *  - subtitle: string (short tagline)
 *  - description: string (one paragraph below the banner)
 *  - quote: string (closing large serif quote)
 *  - quoteAttrib: string (optional attribution)
 *  - accentColor: string (default '#C9A24A')
 *  - children: product grid
 */
export default function CollectionPageTemplate({
  bannerImage,
  eyebrow,
  title,
  subtitle,
  description,
  quote,
  quoteAttrib,
  accentColor = '#C9A24A',
  children,
}) {
  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1' }}>

      {/* ════════════════════════════════════════════
          CINEMATIC BANNER
      ════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: 'clamp(420px, 62vh, 720px)' }}>
        {/* Background image */}
        {/* Dark matte background so no bright bleed-through */}
        <div className="absolute inset-0" style={{ background: '#0B0B0B' }} />

        <img
          src={bannerImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.32 }}
        />

        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(6,6,8,0.52)' }} />

        {/* Edge fades */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #0B0B0B 0%, transparent 22%, transparent 58%, #0B0B0B 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0B0B0B 0%, transparent 18%, transparent 82%, #0B0B0B 100%)' }} />

        {/* Overlay content — centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {/* Eyebrow */}
            {eyebrow && (
              <p className="font-mono text-[10px] tracking-[0.55em] uppercase"
                style={{ color: `${accentColor}80` }}>
                {eyebrow}
              </p>
            )}

            {/* Title */}
            <h1
              className="font-serif leading-none"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 60px rgba(0,0,0,0.9)',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="font-mono text-xs tracking-[0.25em] uppercase"
                style={{ color: 'rgba(240,235,225,0.65)', maxWidth: '480px' }}>
                {subtitle}
              </p>
            )}

            {/* Gold rule */}
            <div className="h-px w-24 mt-1"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SERIES DESCRIPTION
      ════════════════════════════════════════════ */}
      {description && (
        <section className="max-w-[760px] mx-auto px-6 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: 'rgba(240,235,225,0.52)',
              lineHeight: 2,
              fontWeight: 300,
            }}
          >
            {description}
          </motion.p>
        </section>
      )}

      {/* ════════════════════════════════════════════
          PRODUCT GRID (children)
      ════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pb-28">
        <TorchBoxBanner />
        {children}
      </section>

      {/* ════════════════════════════════════════════
          CLOSING QUOTE
      ════════════════════════════════════════════ */}
      {quote && (
        <section
          className="px-6 py-28 text-center"
          style={{ borderTop: '1px solid rgba(196,163,90,0.07)', backgroundColor: '#060606' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[860px] mx-auto"
          >
            <blockquote
              className="font-serif italic leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                color: '#F0EBE1',
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              "{quote}"
            </blockquote>
            {quoteAttrib && (
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase mt-8"
                style={{ color: `${accentColor}50` }}>
                — {quoteAttrib}
              </p>
            )}
          </motion.div>
        </section>
      )}
    </div>
  );
}