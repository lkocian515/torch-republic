import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, Mountain } from 'lucide-react';

// Brand-trust pillars. Intentionally distinct from the "how to prepare"
// section (RitualMomentStrip) so the homepage never repeats the
// "no machine / just add water" message in multiple places.
const PILLARS = [
  {
    icon: Sparkles,
    title: 'Intentionally simple',
    body: 'Two products, chosen with care. Classic coffee or mushroom coffee — each one worth your morning.',
  },
  {
    icon: Leaf,
    title: 'Real, clean ingredients',
    body: 'Single-origin coffee and functional mushrooms, listed clearly, with nothing artificial.',
  },
  {
    icon: Mountain,
    title: 'Made for daily life',
    body: 'Premium quality designed for everyday routines, wherever the day takes you.',
  },
];

export default function RitualWhy() {
  return (
    <section style={{ background: '#F7F2E9' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: '#9B4E2F' }}>
            Why Torch Republic
          </p>
          <h2
            className="mt-4 font-serif font-semibold"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', color: '#32190F', textWrap: 'balance' }}
          >
            Good mornings don&apos;t need to be complicated.
          </h2>
          <p className="mt-4 font-heading" style={{ color: '#5E4639', lineHeight: 1.7 }}>
            Torch Republic makes two simple daily rituals &mdash; designed to be easy to love and easy to trust.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-torch p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: '#EFE5D6' }}>
                <p.icon className="h-5 w-5" style={{ color: '#9B4E2F' }} />
              </div>
              <h3 className="font-serif font-bold" style={{ fontSize: '1.1rem', color: '#32190F' }}>
                {p.title}
              </h3>
              <p className="mt-2 font-heading text-sm" style={{ color: '#5E4639', lineHeight: 1.6 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}