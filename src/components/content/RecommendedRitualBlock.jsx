import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

/**
 * Reusable "Recommended Ritual" block for educational guide pages.
 * Drives users from learn → buy with a subscription CTA.
 *
 * Props:
 *  - productName: display name e.g. "GlowMind Clarity Blend"
 *  - productSlug: e.g. "glowmind-clarity-blend"
 *  - tagline: short benefit line
 *  - accentColor: optional hex, defaults to rose gold
 */
export default function RecommendedRitualBlock({
  productName = "GlowMind Clarity Blend",
  productSlug = "glowmind-clarity-blend",
  tagline = "Lion's Mane + Cordyceps + Reishi mushroom coffee for focus, clarity, and sustained energy.",
  accentColor = RG,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 p-6 md:p-8"
      style={{
        background: `rgba(230,183,173,0.04)`,
        border: `1px solid ${accentColor}30`,
      }}
    >
      <p className="font-mono text-[8px] tracking-[0.45em] uppercase mb-3" style={{ color: `${accentColor}70` }}>
        Recommended Ritual
      </p>
      <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#FFFFFF' }}>
        Start with {productName}
      </h3>
      <p className="font-heading text-sm mb-5" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
        {tagline}
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Link
          to={`/products/${productSlug}`}
          className="inline-flex items-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3 px-6"
          style={{ background: accentColor, color: '#080808' }}
        >
          Try {productName} →
        </Link>
        <Link
          to="/subscription"
          className="font-mono text-[8px] tracking-[0.2em] uppercase transition-all hover:opacity-70"
          style={{ color: `${accentColor}70` }}
        >
          Subscribe &amp; Save 20% →
        </Link>
      </div>
      <p className="font-mono text-[7px] tracking-[0.2em] mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
        30-day satisfaction guarantee · Free shipping $50+ · Cancel anytime
      </p>
    </motion.div>
  );
}