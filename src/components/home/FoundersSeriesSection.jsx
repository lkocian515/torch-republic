import React from 'react';
import { motion } from 'framer-motion';

const FOUNDERS = [
  {
    name: 'George Washington',
    short: 'Washington',
    roast: 'Dark Roast',
    notes: 'Cocoa · Toasted Nut · Full Body',
    hook: 'Steady, disciplined, foundational. The night was freezing. The river was filled with ice. Most men would have turned back. He didn\'t.',
    color: '#160D04',
    accent: '#C8A44D',
    handle: 'washington-blend',
    route: '/WashingtonBlend',
    code: 'TR-001',
    seriesNum: 'Founders #01',
    rarity: "FOUNDER'S EDITION",
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
  },
  {
    name: 'Thomas Jefferson',
    short: 'Jefferson',
    roast: 'Medium Roast',
    notes: 'Dark Chocolate · Almond · Toffee',
    hook: 'Books. Thought. Coffee. That\'s where revolutions begin. Jefferson declared coffee "the favorite drink of the civilized world."',
    color: '#080F14',
    accent: '#9BB8CC',
    handle: 'jefferson-blend',
    route: '/JeffersonBlend',
    code: 'TR-002',
    seriesNum: 'Founders #02',
    rarity: "FOUNDER'S EDITION",
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/jefferson_mockup_study.png?v=1775823812',
  },
  {
    name: 'Benjamin Franklin',
    short: 'Franklin',
    roast: 'Light Roast',
    notes: 'Caramel · Lemon · Sweet',
    hook: 'He didn\'t scroll. He studied. He didn\'t network. He debated. Coffeehouses were his battlefield — ideas were his weapon.',
    color: '#0E0E06',
    accent: '#D4C97A',
    handle: 'franklin-blend',
    route: '/FranklinBlend',
    code: 'TR-003',
    seriesNum: 'Founders #03',
    rarity: "FOUNDER'S EDITION",
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
  },
  {
    name: 'John Adams',
    short: 'Adams',
    roast: 'Medium Roast',
    notes: 'Toffee · Dark Chocolate · Citrus',
    hook: 'After the Boston Tea Party, he chose coffee. On purpose. Adams didn\'t follow the crowd — he stood for structure when others wanted chaos.',
    color: '#0E070E',
    accent: '#B87AC8',
    handle: 'adams-blend',
    route: '/AdamsBlend',
    code: 'TR-004',
    seriesNum: 'Founders #04',
    rarity: 'CORE',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
  },
  {
    name: 'Abraham Lincoln',
    short: 'Lincoln',
    roast: 'Medium-Dark',
    notes: 'Dark Chocolate · Almond · Toffee',
    hook: 'Slow steps. Strong mind. No retreat. Lincoln carried weight most men would collapse under. He didn\'t ask for comfort.',
    color: '#100707',
    accent: '#C87070',
    handle: 'lincoln-blend',
    route: '/LincolnBlend',
    code: 'TR-005',
    seriesNum: 'Founders #05',
    rarity: 'CORE',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/lifestyle_lincoln_1.png?v=1775827869',
  },
  {
    name: 'Theodore Roosevelt',
    short: 'Roosevelt',
    roast: 'Dark Roast',
    notes: 'Cocoa · Toasted Nut · Full Body',
    hook: 'A gallon of coffee. A morning hunt. A full day of governing the free world. Roosevelt didn\'t believe in limits.',
    color: '#070E07',
    accent: '#7AC87A',
    handle: 'roosevelt-blend',
    route: '/RooseveltBlend',
    code: 'TR-006',
    seriesNum: 'Founders #06',
    rarity: 'CORE',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80',
  },
];

function FounderCard({ founder, index }) {
  const url = founder.route || `https://torch-republic.com/products/${founder.handle}`;
  const isInternal = founder.route;
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
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,163,90,0.45)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(196,163,90,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,164,77,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
  >
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${founder.accent}88, transparent)` }} />

      {/* Product image */}
      <div className="relative overflow-hidden" style={{ height: '200px', background: founder.color }}>
        <img
          src={founder.image}
          alt={`${founder.name} Blend`}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-all duration-700 group-hover:scale-105"
        />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${founder.color}EE 0%, transparent 55%)` }} />
        <div className="absolute bottom-3 left-3">
          <span className="font-mono text-[9px] font-bold tracking-wider px-2 py-1" style={{ color: founder.accent, background: 'rgba(0,0,0,0.7)', border: `1px solid ${founder.accent}40` }}>
            {founder.code}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
        {/* Identity bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[9px] font-bold tracking-wider px-2 py-0.5" style={{ color: founder.accent, background: `${founder.accent}12`, border: `1px solid ${founder.accent}30` }}>
            {founder.code}
          </span>
          <span className="font-mono text-[8px] text-gray-600">|</span>
          <span className="font-mono text-[8px] text-gray-500">{founder.seriesNum}</span>
          <span className="font-mono text-[8px] text-gray-600">|</span>
          <span
            className="font-mono text-[8px] tracking-wider px-2 py-0.5"
            style={{
              color: founder.rarity === "FOUNDER'S EDITION" ? '#E8D08A' : '#6B7280',
              background: founder.rarity === "FOUNDER'S EDITION" ? 'linear-gradient(90deg, rgba(196,163,90,0.15), rgba(232,208,138,0.2), rgba(196,163,90,0.15))' : 'transparent',
              border: founder.rarity === "FOUNDER'S EDITION" ? '1px solid rgba(232,208,138,0.3)' : 'none',
            }}
          >
            {founder.rarity}
          </span>
        </div>

        {/* Roast badge */}
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase self-start px-2.5 py-1" style={{ color: founder.accent, border: `1px solid ${founder.accent}28`, background: `${founder.accent}08` }}>
          {founder.roast}
        </span>

        {/* Name */}
        <div>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{founder.name}</p>
          <h3 className="font-serif text-white leading-none mb-1" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', fontWeight: 700 }}>{founder.short}</h3>
          <p className="font-mono text-[10px] tracking-widest" style={{ color: `${founder.accent}66` }}>Founders Series</p>
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
        {isInternal ? (
          <a href={url} className="mt-1 py-3 text-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all"
            style={{ border: `1px solid ${founder.accent}40`, color: founder.accent, background: `${founder.accent}08` }}>
            Carry the Flame →
          </a>
        ) : (
          <a href={url} className="mt-1 py-3 text-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all"
            style={{ border: `1px solid ${founder.accent}40`, color: founder.accent, background: `${founder.accent}08` }}>
            Carry the Flame →
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function FoundersSeriesSection() {
  return (
    <section id="founders-series" className="py-32 px-6 md:px-10" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>Flagship Collection</span>
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
          </div>
          <h2 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700 }}>
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
            href="/CoffeeCollection"
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