import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BLENDS = [
  { need: 'Need focus?', blend: 'GlowMind Clarity', slug: 'glowmind-clarity', roast: 'Medium Roast', benefit: 'Supports clarity and deep work' },
  { need: 'Need morning energy?', blend: 'SunCap Rise', slug: 'suncap-rise', roast: 'Light Roast', benefit: 'Bright, uplifting, and energizing' },
  { need: 'Need calm?', blend: 'MoonCap Restore', slug: 'mooncap-restore', roast: 'Dark Roast', benefit: 'Grounding, cozy, and restorative' },
  { need: 'Need creative flow?', blend: 'The Oracle', slug: 'the-oracle', roast: 'Medium Roast', benefit: 'Reflective, intuitive, and immersive' },
  { need: 'Need balance?', blend: 'Mystic Bloom', slug: 'mystic-bloom', roast: 'Medium Roast', benefit: 'Soft, floral, and restorative' },
  { need: 'Need immersive focus?', blend: 'DreamCap', slug: 'dreamcap-blend', roast: 'Medium Roast', benefit: 'Velvety, smooth, and sustained calm' },
];

export default function ChooseYourBlend() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#1A1A1A', position: 'relative' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-3"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            Blend Guide
          </p>
          <h2 className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Which Blend Is Right for You?
          </h2>
          <p className="font-heading max-w-md mx-auto"
            style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Each blend is crafted for a different goal. Pick the one that fits your morning, your work, or your ritual.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BLENDS.map(({ need, blend, slug, roast, benefit }, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/products/${slug}`}
                className="flex items-start gap-4 px-5 py-4 transition-all hover:opacity-80 block"
                style={{ background: '#222222', border: '1px solid rgba(230,183,173,0.1)', textDecoration: 'none' }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[8px] tracking-[0.28em] uppercase mb-1"
                    style={{ color: 'rgba(230,183,173,0.5)' }}>
                    {need}
                  </p>
                  <p className="font-heading font-semibold text-sm mb-0.5"
                    style={{ color: '#F0EBE1' }}>
                    {blend}
                  </p>
                  <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase"
                    style={{ color: 'rgba(230,183,173,0.35)' }}>
                    {roast} · {benefit}
                  </p>
                </div>
                <span style={{ color: 'rgba(230,183,173,0.4)', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
            style={{ background: '#E6B7AD', color: '#080808' }}
          >
            Shop All Six Blends →
          </Link>
        </div>
      </div>
    </section>
  );
}