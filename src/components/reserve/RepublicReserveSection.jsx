import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getShopifyCartUrl } from '@/lib/shopifyCheckout';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

const TASTING_NOTES = [
  { icon: '🌰', label: 'Toasted Almond', desc: 'Warm, smooth nuttiness' },
  { icon: '🫐', label: 'Berry Brightness', desc: 'Subtle fruit acidity' },
  { icon: '🍬', label: 'Sweet Toffee', desc: 'Rich, balanced sweetness' },
];

const HIGHLIGHTS = [
  'Medium Roast',
  'Single-Origin Papua New Guinea',
  'Freeze-Dried Instant',
  '27 Servings',
  '100% Arabica',
];

export default function RepublicReserveSection() {
  return (
    <section
      className="py-24 px-6 md:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0806 0%, #0d0a06 50%, #0a0806 100%)',
        borderTop: '1px solid rgba(196,163,90,0.15)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(196,163,90,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.45em] uppercase mb-4"
            style={{ color: `${GOLD}99` }}
          >
            Republic Reserve Collection
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#F5EDE0',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            For Those Who Simply Want<br className="hidden md:block" /> Exceptional Coffee
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(240,230,210,0.5)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Premium single-origin instant coffee for those who carry the flame.
          </p>
        </motion.div>

        {/* Product Card */}
        <motion.div
          className="relative rounded-sm overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #100d08 0%, #0d0a05 60%, #130f08 100%)',
            border: '1px solid rgba(196,163,90,0.2)',
          }}
        >
          {/* Gold top accent line */}
          <div style={{ height: '2px', background: `linear-gradient(90deg, transparent 0%, ${GOLD} 40%, ${RG} 70%, transparent 100%)` }} />

          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            {/* Image Side */}
            <div
              className="relative flex items-center justify-center p-8 md:p-12 min-h-[380px]"
              style={{
                background: 'linear-gradient(135deg, rgba(196,163,90,0.04) 0%, rgba(0,0,0,0) 60%)',
                borderRight: '1px solid rgba(196,163,90,0.1)',
              }}
            >
              {/* Badge */}
              <div
                className="absolute top-6 left-6 font-mono text-[7px] tracking-[0.3em] uppercase px-3 py-1"
                style={{
                  background: `${GOLD}18`,
                  border: `1px solid ${GOLD}40`,
                  color: GOLD,
                  borderRadius: '2px',
                }}
              >
                Republic Reserve
              </div>

              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6cbd6bb7b_fsdgfrtre.png"
                alt="Torchbearer Premium Instant Coffee"
                className="relative z-10 object-contain w-full max-w-sm"
                style={{ maxHeight: '340px', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.8))' }}
              />
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              {/* Product name */}
              <p
                className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3"
                style={{ color: `${GOLD}80` }}
              >
                Premium Instant Coffee
              </p>
              <h3
                className="font-serif font-bold mb-2"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  color: '#F5EDE0',
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}
              >
                TORCHBEARER™
              </h3>
              <p
                className="font-mono text-[10px] tracking-[0.35em] uppercase mb-6"
                style={{ color: GOLD }}
              >
                Carry The Flame
              </p>

              <p
                className="font-heading mb-8"
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(240,230,210,0.65)',
                  lineHeight: 1.75,
                  maxWidth: '360px',
                }}
              >
                Single-origin Arabica from the volcanic highlands of Papua New Guinea. Smooth, balanced, and exceptionally drinkable.
              </p>

              {/* Tasting Notes */}
              <div className="flex gap-4 mb-8">
                {TASTING_NOTES.map((note) => (
                  <div key={note.label} className="flex-1 text-center">
                    <div className="text-xl mb-1">{note.icon}</div>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>
                      {note.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-8">
                {HIGHLIGHTS.map((h) => (
                  <span
                    key={h}
                    className="font-mono text-[7px] tracking-[0.15em] uppercase px-2.5 py-1"
                    style={{
                      background: 'rgba(196,163,90,0.07)',
                      border: '1px solid rgba(196,163,90,0.18)',
                      color: 'rgba(196,163,90,0.75)',
                      borderRadius: '2px',
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex items-center gap-4">
                <a
                  href={getShopifyCartUrl('torchbearer-premium-instant-coffee', 1)}
                  className="font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-4 transition-all hover:opacity-90"
                  style={{
                    background: GOLD,
                    color: '#0A0806',
                    fontWeight: 700,
                    borderRadius: '2px',
                    letterSpacing: '0.28em',
                  }}
                >
                  Add To Cart
                </a>
                <Link
                  to="/torchbearer"
                  className="font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-70"
                  style={{ color: `${GOLD}70`, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div style={{ height: '1px', background: `linear-gradient(90deg, transparent 0%, ${GOLD}30 50%, transparent 100%)` }} />
        </motion.div>

        {/* Collection note */}
        <motion.p
          className="text-center mt-8 font-mono text-[8px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(196,163,90,0.35)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Republic Reserve · More releases coming soon
        </motion.p>
      </div>
    </section>
  );
}