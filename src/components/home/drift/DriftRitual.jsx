import React from 'react';
import { motion } from 'framer-motion';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';

const RITUAL_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/976716136_generated_image.png';

const STEPS = [
  { num: '01', label: 'Scoop' },
  { num: '02', label: 'Add Water' },
  { num: '03', label: 'Stir + Enjoy' },
];

export default function DriftRitual() {
  return (
    <section style={{ background: D.paper }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-[45fr_55fr] gap-10 md:gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <img src={RITUAL_IMAGE} alt="Instant coffee being stirred into a ceramic cup" className="w-full rounded-lg" style={{ aspectRatio: '4 / 5', objectFit: 'cover' }} />
          </motion.div>
          {/* Copy */}
          <motion.div {...fadeUp} className="order-1 md:order-2">
            <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1.25rem' }}>
              The Ritual
            </p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.05, color: D.ink, margin: '0 0 1rem' }}>
              Scoop. Stir. Sip.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2.5rem', maxWidth: '40ch' }}>
              A premium cup in seconds.
            </p>
            {/* Steps */}
            <div className="flex flex-col gap-4 mb-8">
              {STEPS.map((s) => (
                <div key={s.num} className="flex items-center gap-4">
                  <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', color: D.terracotta, minWidth: '2.5rem' }}>{s.num}</span>
                  <span style={{ fontFamily: MONO, fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: D.ink }}>{s.label}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', color: D.secondary, margin: 0, lineHeight: 1.8 }}>
              NO MACHINE. NO PODS. NO MORNING PRODUCTION.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}