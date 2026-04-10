import React from 'react';
import { motion } from 'framer-motion';

const FOUNDERS = [
  {
    name: 'George Washington',
    short: 'Washington',
    roast: 'Dark Roast',
    notes: 'Bold · Smoky · Dark Chocolate',
    hook: 'For those who lead from the front.',
    color: '#2B1A0E',
    accent: '#C8A44D',
    handle: 'washington-blend',
  },
  {
    name: 'Thomas Jefferson',
    short: 'Jefferson',
    roast: 'Medium Roast',
    notes: 'Smooth · Nutty · Caramel',
    hook: 'For the philosopher and the patriot.',
    color: '#0E1E2B',
    accent: '#9BB8CC',
    handle: 'jefferson-blend',
  },
  {
    name: 'Benjamin Franklin',
    short: 'Franklin',
    roast: 'Medium-Dark Roast',
    notes: 'Rich · Spice · Brown Sugar',
    hook: 'Curious mind, relentless spirit.',
    color: '#1A1A0E',
    accent: '#D4C97A',
    handle: 'franklin-blend',
  },
  {
    name: 'Abraham Lincoln',
    short: 'Lincoln',
    roast: 'Dark Roast',
    notes: 'Deep · Earthy · Dark Cherry',
    hook: 'Forged in adversity. Built to endure.',
    color: '#1A0E0E',
    accent: '#C87070',
    handle: 'lincoln-blend',
  },
  {
    name: 'Theodore Roosevelt',
    short: 'Roosevelt',
    roast: 'Light-Medium Roast',
    notes: 'Bright · Citrus · Honey',
    hook: 'Speak softly. Drink boldly.',
    color: '#0E1A0E',
    accent: '#7AC87A',
    handle: 'roosevelt-blend',
  },
  {
    name: 'John Adams',
    short: 'Adams',
    roast: 'Medium Roast',
    notes: 'Balanced · Cocoa · Toasted Oak',
    hook: 'Principled. Unyielding. American.',
    color: '#1A0E1A',
    accent: '#B87AC8',
    handle: 'adams-blend',
  },
];

function FounderCard({ founder, index }) {
  const url = `https://torch-republic.com/products/${founder.handle}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="group relative flex flex-col"
      style={{
        background: `linear-gradient(160deg, ${founder.color} 0%, #080808 100%)`,
        border: '1px solid rgba(200,164,77,0.12)',
      }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${founder.accent}, transparent)` }} />

      <div className="p-6 flex flex-col gap-3 flex-1">
        {/* Roast badge */}
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase self-start px-2 py-1" style={{ color: founder.accent, border: `1px solid ${founder.accent}33` }}>
          {founder.roast}
        </span>

        {/* Name */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-600 mb-1">{founder.name}</p>
          <h3 className="font-heading font-black text-white text-2xl uppercase tracking-tight">{founder.short}</h3>
          <p className="font-mono text-sm mt-0.5" style={{ color: 'rgba(200,164,77,0.5)' }}>Blend</p>
        </div>

        {/* Tasting notes */}
        <p className="font-mono text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {founder.notes}
        </p>

        {/* Hook */}
        <p className="text-sm italic text-gray-400 leading-relaxed flex-1">
          "{founder.hook}"
        </p>

        {/* CTA */}
        <a
          href={url}
          className="mt-2 py-2.5 text-center font-mono font-bold text-[11px] tracking-[0.25em] uppercase transition-all group-hover:opacity-90"
          style={{ border: `1px solid ${founder.accent}55`, color: founder.accent }}
        >
          View Blend →
        </a>
      </div>
    </motion.div>
  );
}

export default function FoundersSeriesSection() {
  return (
    <section id="founders-series" className="py-24 px-6 md:px-10" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(200,164,77,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>Flagship Collection</span>
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
          </div>
          <h2 className="font-heading font-black uppercase text-white tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            The Founders Series
          </h2>
          <p className="text-gray-500 font-mono text-sm max-w-lg mx-auto leading-relaxed">
            Six premium roasts. Six American archetypes. Each blend honors a founder whose conviction shaped a nation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {FOUNDERS.map((f, i) => (
            <FounderCard key={f.short} founder={f} index={i} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <a
            href="https://torch-republic.com/collections/coffee"
            className="inline-flex items-center gap-2 px-8 py-4 font-mono font-bold text-sm tracking-[0.25em] uppercase"
            style={{ border: '1px solid rgba(200,164,77,0.3)', color: '#C8A44D' }}
          >
            Shop All Coffee →
          </a>
        </div>
      </div>
    </section>
  );
}