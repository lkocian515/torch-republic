import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'Nashville, TN',
    text: "Best coffee I've had in years. The Washington Blend is my daily ritual now.",
    rating: 5,
  },
  {
    name: 'Rachel B.',
    location: 'Knoxville, TN',
    text: 'The Torch Box is unreal. Premium packaging, premium coffee — worth every penny.',
    rating: 5,
  },
  {
    name: 'James R.',
    location: 'Austin, TX',
    text: 'I bought the Founders Series for myself and three friends. Everyone reordered within a week.',
    rating: 5,
  },
  {
    name: 'David M.',
    location: 'Bozeman, MT',
    text: 'Bold flavors, zero bitterness. The story behind each blend makes every cup mean something.',
    rating: 5,
  },
];

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#C9A24A' }} />
      ))}
    </div>
  );
}

export default function HomeReviewStrip() {
  return (
    <section className="py-16 md:py-20 px-5 md:px-12"
      style={{ background: '#080808', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Verified Reviews
          </p>
          <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Trusted by Those Who Carry the Flame
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="flex flex-col gap-3 p-5 rounded-sm"
              style={{ background: '#0E0E0E', border: '1px solid rgba(201,162,74,0.1)' }}
            >
              <Stars n={r.rating} />
              <p className="font-heading text-sm leading-relaxed flex-1" style={{ color: 'rgba(240,235,225,0.72)', fontWeight: 300, lineHeight: 1.8, fontStyle: 'italic' }}>
                "{r.text}"
              </p>
              <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>{r.name}</span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{r.location}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/Reviews" className="font-mono text-[9px] tracking-[0.35em] uppercase transition-opacity hover:opacity-60 pb-0.5"
            style={{ color: 'rgba(201,162,74,0.45)', borderBottom: '1px solid rgba(201,162,74,0.15)' }}>
            View All Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}