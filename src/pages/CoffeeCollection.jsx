import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    code: 'TR-001', seriesNum: 'Founders #01', rarity: "FOUNDER'S EDITION",
    name: 'Washington Blend', roast: 'Dark Roast', notes: 'Cocoa · Toasted Nut · Full Body',
    price: '$18.99', accent: '#C8A44D', color: '#160D04',
    route: '/WashingtonBlend',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
  },
  {
    code: 'TR-002', seriesNum: 'Founders #02', rarity: "FOUNDER'S EDITION",
    name: 'Jefferson Blend', roast: 'Medium Roast', notes: 'Dark Chocolate · Almond · Toffee',
    price: '$18.99', accent: '#9BB8CC', color: '#080F14',
    route: '/JeffersonBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/jefferson_mockup_study.png?v=1775823812',
  },
  {
    code: 'TR-003', seriesNum: 'Founders #03', rarity: "FOUNDER'S EDITION",
    name: 'Franklin Blend', roast: 'Light Roast', notes: 'Caramel · Lemon · Sweet Finish',
    price: '$18.99', accent: '#D4C97A', color: '#0E0E06',
    route: '/FranklinBlend',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
  },
  {
    code: 'TR-004', seriesNum: 'Founders #04', rarity: 'CORE',
    name: 'Adams Blend', roast: 'Medium Roast', notes: 'Toffee · Dark Chocolate · Citrus',
    price: '$18.99', accent: '#B87AC8', color: '#0E070E',
    route: '/AdamsBlend',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
  },
  {
    code: 'TR-005', seriesNum: 'Founders #05', rarity: 'CORE',
    name: 'Lincoln Blend', roast: 'Medium-Dark Roast', notes: 'Dark Chocolate · Almond · Toffee',
    price: '$18.99', accent: '#C87070', color: '#100707',
    route: '/LincolnBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/lifestyle_lincoln_1.png?v=1775827869',
  },
  {
    code: 'TR-006', seriesNum: 'Founders #06', rarity: 'CORE',
    name: 'Roosevelt Blend', roast: 'Dark Roast', notes: 'Cocoa · Toasted Nut · Full Body',
    price: '$18.99', accent: '#7AC87A', color: '#070E07',
    route: '/RooseveltBlend',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80',
  },
];

const FILTERS = ['ALL', 'CORE', "FOUNDER'S EDITION"];

function ProductCard({ p, index }) {
  const isFounder = p.rarity === "FOUNDER'S EDITION";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="group relative flex flex-col"
      style={{
        background: `linear-gradient(160deg, ${p.color} 0%, #050505 100%)`,
        border: '1px solid rgba(200,164,77,0.1)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,163,90,0.45)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(196,163,90,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,164,77,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}88, transparent)` }} />
      <div className="relative overflow-hidden" style={{ height: '180px' }}>
        <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-all duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${p.color}EE 0%, transparent 55%)` }} />
        <div className="absolute top-3 right-3">
          <span className="font-mono text-[8px] font-bold tracking-wider px-2 py-1"
            style={{
              color: isFounder ? '#E8D08A' : '#6B7280',
              background: isFounder ? 'rgba(196,163,90,0.15)' : 'rgba(0,0,0,0.6)',
              border: isFounder ? '1px solid rgba(232,208,138,0.35)' : '1px solid rgba(107,114,128,0.3)',
            }}>
            {p.rarity}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] font-bold tracking-wider" style={{ color: p.accent }}>{p.code}</span>
          <span className="font-mono text-[8px] text-gray-700">·</span>
          <span className="font-mono text-[9px] text-gray-500">{p.seriesNum}</span>
        </div>
        <div>
          <h3 className="font-serif text-white mb-1" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{p.name}</h3>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: p.accent + '88' }}>{p.roast}</p>
        </div>
        <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{p.notes}</p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-mono font-bold text-lg" style={{ color: p.accent }}>{p.price}</span>
          <Link to={p.route} className="font-mono text-[10px] tracking-[0.25em] uppercase px-4 py-2 transition-all"
            style={{ border: `1px solid ${p.accent}40`, color: p.accent, background: `${p.accent}08` }}>
            Carry the Flame →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoffeeCollection() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.rarity === activeFilter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* Header */}
      <section className="py-24 px-6 md:px-12" style={{ borderBottom: '1px solid rgba(196,163,90,0.1)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C4A35A)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C4A35A' }}>Founders Series</span>
          </div>
          <h1 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1 }}>
            The Torch Index
          </h1>
          <p className="font-mono text-sm mb-2" style={{ color: 'rgba(196,163,90,0.7)' }}>History in Every Cup. Collect before they're gone.</p>
          <p className="font-mono text-xs max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Every product in the Torch Republic catalog has a permanent identity number. Some are CORE — always available. Others retire to the Archive forever.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-0 z-20 px-6 md:px-12 py-4" style={{ background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid rgba(196,163,90,0.08)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1280px] mx-auto flex items-center gap-3 flex-wrap">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-2 transition-all"
              style={{
                color: activeFilter === f ? '#000' : 'rgba(255,255,255,0.4)',
                background: activeFilter === f ? '#C4A35A' : 'transparent',
                border: activeFilter === f ? '1px solid #C4A35A' : '1px solid rgba(255,255,255,0.1)',
              }}>
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] text-gray-600">{filtered.length} products</span>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((p, i) => <ProductCard key={p.code} p={p} index={i} />)}
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-16 px-6 md:px-12 text-center" style={{ borderTop: '1px solid rgba(196,163,90,0.08)' }}>
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: '#C4A35A' }}>Bundle & Save</p>
        <h2 className="font-serif text-white mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700 }}>Build Your Collection</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center px-8 py-3.5 font-mono text-xs tracking-[0.2em] uppercase"
            style={{ background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C4A35A 100%)', color: '#fff' }}>
            See All Bundles
          </Link>
          <Link to="/TheTorchBox" className="inline-flex items-center justify-center px-8 py-3.5 font-mono text-xs tracking-[0.2em] uppercase"
            style={{ border: '1px solid rgba(196,163,90,0.4)', color: '#C4A35A' }}>
            Join Torch Box →
          </Link>
        </div>
      </section>
    </div>
  );
}