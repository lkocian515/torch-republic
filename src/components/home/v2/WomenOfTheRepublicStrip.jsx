import React from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  { name: 'Abigail Adams Blend', subtitle: 'Light Roast · Floral & Bright' },
  { name: 'Eleanor Roosevelt Blend', subtitle: 'Medium Roast · Smooth & Bold' },
  { name: 'Sacagawea Blend', subtitle: 'Medium-Dark · Earthy & Adventurous' },
  { name: 'Susan B. Anthony Blend', subtitle: 'Dark Roast · Rich & Resolute' },
];

function PlaceholderCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      className="flex flex-col"
      style={{
        background: '#0B0B0B',
        border: '1px solid rgba(201,162,74,0.12)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        cursor: 'default',
        opacity: 0.82,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)';
        e.currentTarget.style.boxShadow = '0 0 20px 2px rgba(201,162,74,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.12)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image placeholder */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#111' }}>
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,162,74,0.06) 0%, transparent 70%)',
        }} />
        {/* Torch / flame icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ opacity: 0.12 }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C9A24A" strokeWidth="1">
              <path d="M12 2C12 2 8 7 8 12a4 4 0 0 0 8 0c0-5-4-10-4-10z" />
              <path d="M12 14v8" />
            </svg>
          </div>
        </div>
        {/* Coming Soon badge */}
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1"
            style={{ background: 'rgba(201,162,74,0.12)', border: '1px solid rgba(201,162,74,0.3)', color: '#C9A24A' }}>
            Coming Soon
          </span>
        </div>
        {/* Bottom overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-1.5">
        <h3 className="font-serif font-bold" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.25 }}>
          {card.name}
        </h3>
        <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>
          {card.subtitle}
        </p>
        <div className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(201,162,74,0.35)', paddingTop: '8px', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
          — Notify Me —
        </div>
      </div>
    </motion.div>
  );
}

export default function WomenOfTheRepublicStrip() {
  return (
    <section className="py-20 md:py-28 px-5 md:px-12"
      style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.06)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 36, height: 1, background: 'rgba(201,162,74,0.45)' }} />
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Collection 04
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <h2
                className="font-serif leading-none mb-3"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.82)',
                  letterSpacing: '-0.03em',
                }}
              >
                Women of the Republic
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-[10px] tracking-[0.45em] uppercase px-3 py-1"
                  style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.25)', color: '#C9A24A' }}
                >
                  Coming Soon
                </span>
              </div>
              <p className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', fontWeight: 400, lineHeight: 1.85, maxWidth: 460 }}>
                Stories of courage, conviction, and legacy — arriving soon.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Gold rule */}
        <div className="mb-10" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(201,162,74,0.3) 0%, rgba(201,162,74,0.05) 55%, transparent 100%)' }} />

        {/* Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {CARDS.map((card, i) => (
            <PlaceholderCard key={card.name} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}