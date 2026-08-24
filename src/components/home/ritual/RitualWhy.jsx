import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Clock, Sparkles } from 'lucide-react';

const PILLARS = [
  {
    icon: Sparkles,
    title: 'Three rituals, no clutter',
    body: 'Coffee, matcha, or mushrooms — and nothing asking you to choose between seven things.',
  },
  {
    icon: Clock,
    title: 'Easy to prepare',
    body: 'Just add hot or iced water. No machine, no mess, no waiting on a brew.',
  },
  {
    icon: Leaf,
    title: 'Real ingredients',
    body: 'Single-origin coffee, ceremonial matcha, and functional mushrooms — listed clearly.',
  },
];

export default function RitualWhy() {
  return (
    <section style={{ background: '#F7F1E7' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2
            className="font-serif font-semibold"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', color: '#292622', textWrap: 'balance' }}
          >
            Good mornings don’t need to be complicated.
          </h2>
          <p className="mt-4 font-heading" style={{ color: '#5F574F', lineHeight: 1.7 }}>
            Torch Republic makes three simple daily rituals designed to be easy to prepare and easy to love.
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
                <p.icon className="h-5 w-5" style={{ color: '#B7653E' }} />
              </div>
              <h3 className="font-serif font-bold" style={{ fontSize: '1.1rem', color: '#292622' }}>
                {p.title}
              </h3>
              <p className="mt-2 font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.6 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}