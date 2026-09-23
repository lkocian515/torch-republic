import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Dark espresso-brown seasonal feature section — placed directly below the hero.
// The cream vintage label pops against the warm dark background.
const PUMPKIN_SPICE_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/81a11c090_tcr_coffee_blank_final_latest4.jpeg';

const COLORS = {
  bg: '#2A1A12',        // dark espresso brown (not pure black)
  bgAccent: '#3D2817',  // slightly lighter for gradient depth
  cream: '#F7EEDD',    // label cream
  terracotta: '#D6743A', // pumpkin orange
  burntOrange: '#A93E26', // typography terracotta
  brown: '#5D2F20',    // dark brown
  amber: '#E8A85C',    // amber glow accent
};

export default function PumpkinSpiceFeature() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background: `linear-gradient(135deg, ${COLORS.bg} 0%, ${COLORS.bgAccent} 50%, ${COLORS.bg} 100%)`,
      }}
    >
      {/* Subtle amber glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 30% 40%, ${COLORS.amber}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Bag image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <div
              className="relative"
              style={{
                background: `radial-gradient(ellipse 70% 80% at 50% 50%, ${COLORS.cream}08 0%, transparent 70%)`,
                borderRadius: '20px',
                padding: '1rem',
              }}
            >
              {/* LIMITED EDITION badge */}
              <span
                className="absolute left-2 top-4 z-10 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{
                  background: COLORS.brown,
                  color: COLORS.cream,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                Limited Edition
              </span>

              <img
                src={PUMPKIN_SPICE_IMAGE}
                alt="Torch Republic Pumpkin Spice Whole Bean Coffee — Halloween Special Edition"
                className="h-auto w-full max-w-[380px] object-contain mx-auto"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4 text-center md:text-left"
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.35em]"
              style={{ color: COLORS.terracotta }}
            >
              The Halloween Drop
            </p>

            <h2
              className="font-serif font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: COLORS.cream,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Pumpkin Spice
              <br />
              Whole Bean Coffee
            </h2>

            <p
              className="font-heading"
              style={{
                fontSize: '1.125rem',
                color: `${COLORS.cream}cc`,
                lineHeight: 1.7,
                maxWidth: '440px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Warm, spiced and made for crisp mornings. A limited-edition
              seasonal roast from Torch Republic.
            </p>

            <p
              className="font-heading text-sm"
              style={{ color: COLORS.amber }}
            >
              Here for spooky season only.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: `${COLORS.cream}99` }}
              >
                12 oz &middot; Whole Bean &middot; Limited Batch
              </span>
            </div>

            <div className="pt-3">
              <Link
                to="/products/pumpkin-spice-whole-bean-coffee"
                className="btn"
                style={{
                  background: COLORS.terracotta,
                  color: COLORS.cream,
                  borderColor: COLORS.terracotta,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '0.875rem 2rem',
                }}
              >
                Shop Pumpkin Spice
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}