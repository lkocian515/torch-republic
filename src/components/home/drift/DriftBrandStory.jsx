import React from 'react';
import { motion } from 'framer-motion';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';

const STORY_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/fc0c5b2e7_generated_image.png';

const PRINCIPLES = [
  { label: 'Intentionally Simple', body: 'Two products, chosen with care.' },
  { label: 'Real, Clean Ingredients', body: 'Single-origin coffee and clearly listed ingredients.' },
  { label: 'Made for Daily Life', body: 'Premium quality built around everyday routines.' },
];

export default function DriftBrandStory() {
  return (
    <section style={{ background: D.cream }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-[55fr_45fr] gap-10 md:gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <img src={STORY_IMAGE} alt="Warm morning kitchen scene with ceramic cups and coffee" className="w-full rounded-lg" style={{ aspectRatio: '4 / 3', objectFit: 'cover' }} />
          </motion.div>
          {/* Copy */}
          <motion.div {...fadeUp} className="order-1 md:order-2">
            <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
              Why Torch Republic
            </p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', lineHeight: 1.12, color: D.ink, margin: '0 0 1.5rem', textWrap: 'balance' }}>
              Good mornings don&rsquo;t need to be complicated.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2.25rem', maxWidth: '44ch' }}>
              Torch Republic makes two simple daily rituals &mdash; designed to be easy to love and easy to trust.
            </p>
            <div className="flex flex-col gap-5">
              {PRINCIPLES.map((p) => (
                <div key={p.label}>
                  <p style={{ fontFamily: MONO, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: D.ink, margin: '0 0 0.35rem' }}>
                    {p.label}
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: '0.9375rem', lineHeight: 1.6, color: D.secondary, margin: 0 }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}