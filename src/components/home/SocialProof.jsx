import React from 'react';
import { motion } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'Texas',
    text: "Washington Blend is the best dark roast I've had in years. This is not just coffee — it's an experience.",
    stars: 5,
  },
  {
    name: 'Sarah K.',
    location: 'Virginia',
    text: "The Franklin Blend surprised me. I never drink light roast but this one is incredible. Ordered three bags.",
    stars: 5,
  },
  {
    name: 'James R.',
    location: 'Tennessee',
    text: "Collecting the whole series. Each bag feels like it means something. Can't explain it — just buy it.",
    stars: 5,
  },
];

export default function SocialProof() {
  return (
    <section style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">

        {/* Section label */}
        <div className="flex items-center gap-5 mb-20">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.2))' }} />
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>
            From the Community
          </span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.2), transparent)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col gap-5 p-8"
              style={{ background: '#111111', border: '1px solid rgba(201,162,74,0.08)' }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: r.stars }).map((_, si) => (
                  <span key={si} style={{ color: '#C9A24A', fontSize: '12px' }}>★</span>
                ))}
              </div>

              {/* Review */}
              <p className="font-serif leading-relaxed flex-1" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', fontStyle: 'italic', lineHeight: 1.75 }}>
                "{r.text}"
              </p>

              {/* Name */}
              <div>
                <p className="font-mono text-[10px] font-bold tracking-wider" style={{ color: 'rgba(240,235,225,0.5)' }}>{r.name}</p>
                <p className="font-mono text-[9px]" style={{ color: 'rgba(240,235,225,0.25)' }}>{r.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}