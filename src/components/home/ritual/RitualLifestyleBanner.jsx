import React from 'react';
import { motion } from 'framer-motion';

// Full-bleed lifestyle product shot — the bag in a real home setting with a
// fresh cup beside it. Object-cover crops to keep the centered bag in frame on
// mobile; caption is sized for mobile legibility.
export default function RitualLifestyleBanner({
  image,
  alt,
  accent = '#B7653E',
  eyebrow = 'Brewed for daily ritual',
  title = 'Your daily ritual, in a real cup.',
  subtitle = 'Just add hot water. No machine, no pods, no compromise.',
}) {
  if (!image) return null;
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#1A1612' }}>
      <div data-parallax="32">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-[78vh] max-h-[680px] min-h-[460px] w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,16,14,0.15) 0%, rgba(20,16,14,0) 38%, rgba(20,16,14,0.78) 100%)' }} />
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1100px] px-6 pb-12 pt-24 text-center md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[11px] uppercase tracking-[0.4em] sm:text-xs"
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
            style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', color: '#FBF8F1', lineHeight: 1.12, textWrap: 'balance' }}
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
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.05rem)', color: 'rgba(251,248,241,0.9)', lineHeight: 1.7 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}