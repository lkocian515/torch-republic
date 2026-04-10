import React from 'react';
import { motion } from 'framer-motion';

const FOUNDERS = [
  {
    name: 'George Washington',
    short: 'Washington',
    roast: 'Dark Roast',
    notes: 'Bold · Smoky · Dark Chocolate',
    hook: 'Steady, disciplined, foundational. Built for those who lead from the front — no hesitation, no retreat.',
    color: '#160D04',
    accent: '#C8A44D',
    handle: 'washington-blend',
  },
  {
    name: 'Thomas Jefferson',
    short: 'Jefferson',
    roast: 'Medium Roast',
    notes: 'Smooth · Nutty · Caramel',
    hook: 'Thoughtful, layered, refined. A blend for the philosopher-patriot who sees the world in principles.',
    color: '#080F14',
    accent: '#9BB8CC',
    handle: 'jefferson-blend',
  },
  {
    name: 'Benjamin Franklin',
    short: 'Franklin',
    roast: 'Medium-Dark Roast',
    notes: 'Rich · Spice · Brown Sugar',
    hook: 'Curious, bright, inventive. For the restless mind that experiments before the world wakes up.',
    color: '#0E0E06',
    accent: '#D4C97A',
    handle: 'franklin-blend',
  },
  {
    name: 'Abraham Lincoln',
    short: 'Lincoln',
    roast: 'Dark Roast',
    notes: 'Deep · Earthy · Dark Cherry',
    hook: 'Strong, humble, enduring. Forged in adversity — this blend doesn\'t break under pressure.',
    color: '#100707',
    accent: '#C87070',
    handle: 'lincoln-blend',
  },
  {
    name: 'Theodore Roosevelt',
    short: 'Roosevelt',
    roast: 'Light-Medium Roast',
    notes: 'Bright · Citrus · Honey',
    hook: 'Bold, energetic, vigorous. The man who charged uphill — this cup meets you at the same altitude.',
    color: '#070E07',
    accent: '#7AC87A',
    handle: 'roosevelt-blend',
  },
  {
    name: 'John Adams',
    short: 'Adams',
    roast: 'Medium Roast',
    notes: 'Balanced · Cocoa · Toasted Oak',
    hook: 'Sharp, principled, intense. The conscience of the republic — uncompromising in flavor and character.',
    color: '#0E070E',
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
        background: `linear-gradient(160deg, ${founder.color} 0%, #050505 100%)`,
        border: '1px solid rgba(200,164,77,0.1)',
      }}
    >
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${founder.accent}88, transparent)` }} />

      <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
        {/* Roast badge */}
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase self-start px-2.5 py-1" style={{ color: founder.accent, border: `1px solid ${founder.accent}28`, background: `${founder.accent}08` }}>
          {founder.roast}
        </span>

        {/* Name */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{founder.name}</p>
          <h3 className="font-serif text-white leading-none mb-1" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 700 }}>{founder.short}</h3>
          <p className="font-mono text-[10px] tracking-widest" style={{ color: `${founder.accent}66` }}>Founders Blend</p>
        </div>

        {/* Tasting notes */}
        <p className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {founder.notes}
        </p>

        {/* Story blurb */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(232,223,175,0.55)', fontStyle: 'italic' }}>
          &ldquo;{founder.hook}&rdquo;
        </p>

        {/* CTA */}
        <a
          href={url}
          className="mt-1 py-3 text-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all"
          style={{ border: `1px solid ${founder.accent}40`, color: founder.accent, background: `${founder.accent}08` }}
        >
          Shop This Blend
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
          <h2 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700 }}>
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