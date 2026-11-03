import React from 'react';
import { motion } from 'framer-motion';

// Full-bleed crave shot: instant coffee flakes being stirred into a cup.
// The image is the star; a soft bottom gradient carries a short ritual caption.
export default function RitualMomentStrip({
  image,
  alt,
  accent = '#9B4E2F',
  eyebrow = 'The Ritual',
  title = 'Just add hot water.',
  subtitle = 'Scoop, stir, sip. A cafe-quality cup in seconds, with no machine, no pods and nothing to clean.',
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#1A1612' }}>
      <motion.img
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-[58vh] max-h-[560px] min-h-[320px] w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0" style={{ background: 'linear-gradient(180deg, rgba(20,16,14,0) 0%, rgba(20,16,14,0.8) 100%)' }}>
        <div className="mx-auto max-w-[1100px] px-6 pb-12 pt-20 text-center md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[10px] uppercase tracking-[0.4em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 font-serif font-bold"
            style={{ fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', color: '#F7F2E9', lineHeight: 1.1, textWrap: 'balance' }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-3 max-w-xl font-heading"
              style={{ fontSize: '0.92rem', color: 'rgba(251,248,241,0.88)', lineHeight: 1.7 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}