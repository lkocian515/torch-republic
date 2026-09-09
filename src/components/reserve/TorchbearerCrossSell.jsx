import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getShopifyCartUrl } from '@/lib/shopifyCheckout';

const GOLD = '#C4A35A';
const IMG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5e731e05f_file_00000000219c822f89492705850fcb90.png';

const NOTES = [
  { label: 'Toasted Almond', sub: 'Warm nutty sweetness' },
  { label: 'Berry Brightness', sub: 'Subtle acidity and depth' },
  { label: 'Sweet Toffee', sub: 'Rich, smooth satisfaction' },
];

/**
 * TorchbearerCrossSell
 * Drop into any mushroom blend page — recommends Torchbearer pure coffee.
 */
export default function TorchbearerCrossSell() {
  const cartUrl = getShopifyCartUrl('torchbearer-premium-instant-coffee', 1);

  return (
    <motion.div
      className="mt-12 relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{
        background: 'linear-gradient(135deg, #100d07 0%, #0d0a05 100%)',
        border: `1px solid ${GOLD}22`,
        borderRadius: '2px',
      }}
    >
      {/* Top gold accent */}
      <div style={{ height: '2px', background: `linear-gradient(90deg, transparent 0%, ${GOLD}70 40%, ${GOLD}40 80%, transparent 100%)` }} />

      <div className="flex flex-col md:flex-row">
        {/* Image panel */}
        <div
          className="md:w-64 flex-shrink-0 relative overflow-hidden"
          style={{ minHeight: '200px', background: '#0c0907' }}
        >
          <img
            src={IMG}
            alt="Torchbearer™ Premium Instant Coffee"
            className="w-full h-full object-cover"
            style={{ minHeight: '200px', objectPosition: 'center 15%' }}
          />
          {/* Gradient fade to content on desktop */}
          <div
            className="absolute inset-y-0 right-0 w-12 hidden md:block"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #0d0a05 100%)' }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-7">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: '16px', height: '1px', background: `${GOLD}60` }} />
            <span className="font-mono text-[7px] tracking-[0.45em] uppercase" style={{ color: `${GOLD}80` }}>
              Also from Torch Republic
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Title + desc */}
            <div className="flex-1">
              <h3
                className="font-serif font-bold mb-1"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#F5EDE0', letterSpacing: '0.04em' }}
              >
                TORCHBEARER™
              </h3>
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
                Premium Instant Coffee · No Mushrooms
              </p>
              <p className="font-heading text-sm mb-5" style={{ color: 'rgba(240,230,210,0.55)', lineHeight: 1.75 }}>
                Single-origin Papua New Guinea Arabica. Medium roast. Freeze-dried for exceptional flavor. Pure specialty coffee — no adaptogens, just the cup.
              </p>

              {/* Tasting notes strip */}
              <div className="flex gap-4 mb-5">
                {NOTES.map((n) => (
                  <div key={n.label}>
                    <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: GOLD }}>
                      {n.label}
                    </p>
                    <p className="font-mono text-[6px] tracking-[0.1em] uppercase mt-0.5" style={{ color: 'rgba(240,230,210,0.35)' }}>
                      {n.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Specs row */}
              <div className="flex flex-wrap gap-x-5 gap-y-1 mb-5">
                {['Medium Roast', 'Single-Origin Papua New Guinea', '27 Servings', '100% Arabica'].map((s) => (
                  <span key={s} className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(240,230,210,0.3)' }}>
                    ◆ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA column */}
            <div className="flex flex-col gap-2 sm:items-end sm:min-w-[140px]">
              <p className="font-serif font-bold text-xl" style={{ color: '#F5EDE0' }}>$24.99</p>
              <p className="font-mono text-[7px] tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(240,230,210,0.3)' }}>
                54g · 27 servings
              </p>
              <a
                href={cartUrl}
                className="text-center font-mono text-[9px] tracking-[0.28em] uppercase px-5 py-3 transition-all hover:opacity-90 whitespace-nowrap"
                style={{
                  background: GOLD,
                  color: '#0A0806',
                  fontWeight: 700,
                  borderRadius: '2px',
                }}
              >
                Add To Cart
              </a>
              <Link
                to="/torchbearer"
                className="text-center font-mono text-[8px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all hover:opacity-70 whitespace-nowrap"
                style={{
                  background: 'transparent',
                  color: GOLD,
                  fontWeight: 600,
                  borderRadius: '2px',
                  border: `1px solid ${GOLD}35`,
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}