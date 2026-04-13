import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    code: 'TR-001', seriesNum: 'Founders #01', rarity: "FOUNDER'S EDITION",
    name: 'Washington Blend', roast: 'Dark Roast', notes: 'Cocoa · Toasted Nut · Full Body',
    price: '$18.99', accent: '#C8A44D', color: '#160D04',
    route: '/WashingtonBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757',
  },
  {
    code: 'TR-002', seriesNum: 'Founders #02', rarity: "FOUNDER'S EDITION",
    name: 'Jefferson Blend', roast: 'Medium Roast', notes: 'Dark Chocolate · Almond · Toffee',
    price: '$18.99', accent: '#9BB8CC', color: '#080F14',
    route: '/JeffersonBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841',
  },
  {
    code: 'TR-003', seriesNum: 'Founders #03', rarity: "FOUNDER'S EDITION",
    name: 'Franklin Blend', roast: 'Light Roast', notes: 'Caramel · Lemon · Sweet Finish',
    price: '$18.99', accent: '#D4C97A', color: '#0E0E06',
    route: '/FranklinBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_4f650292-3215-4b0f-aed8-7ed4c1a02fb6.jpg?v=1775891986',
  },
  {
    code: 'TR-004', seriesNum: 'Founders #04', rarity: 'CORE',
    name: 'Adams Blend', roast: 'Medium Roast', notes: 'Toffee · Dark Chocolate · Citrus',
    price: '$18.99', accent: '#B87AC8', color: '#0E070E',
    route: '/AdamsBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_6f98a910-06fe-466c-b034-23133f53a324.jpg?v=1775892090',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-6_9c4a00ed-4e07-40bf-b93c-42f039931d2e.jpg?v=1775891504',
  },
  {
    code: 'LI-001', seriesNum: 'Liberty Icons #01', rarity: 'CORE',
    name: "Eagle's Flight Blend", roast: 'Dark Roast', notes: 'Praline · Roasted Peanuts · Dark Chocolate',
    price: '$20.00', accent: '#8B6D47', color: '#0F0A05',
    route: '/EaglesFlightBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383',
  },
  {
    code: 'LI-002', seriesNum: 'Liberty Icons #02', rarity: 'CORE',
    name: 'Liberty Torch Blend', roast: 'Medium Roast', notes: 'Sundried Citrus · Golden Honey · Clean Finish',
    price: '$20.00', accent: '#C4A35A', color: '#050D08',
    route: '/LibertyTorchBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701',
  },
  {
    code: 'LI-003', seriesNum: 'Liberty Icons #03', rarity: 'CORE',
    name: 'Old Glory House Blend', roast: 'Medium Roast', notes: 'Caramel · Sweet Cream · Subtle Spice',
    price: '$18.00', accent: '#B38B4D', color: '#0A0604',
    route: '/OldGloryHouseBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/j9ihuio.png?v=1776038315',
  },
  {
    code: 'LI-004', seriesNum: 'Liberty Icons #04', rarity: 'CORE',
    name: "Rosie's Grind", roast: 'Medium Dark Roast', notes: 'Praline · Roasted Peanuts · Smooth Finish',
    price: '$20.00', accent: '#A8893A', color: '#0A0805',
    route: '/RosiesGrind',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
  },
  {
    code: 'LI-005', seriesNum: 'Liberty Icons #05', rarity: 'CORE',
    name: "Uncle Sam's Bold Brew", roast: 'Dark Roast', notes: 'Bittersweet Chocolate · Smoke · Deep Roast',
    price: '$20.00', accent: '#9B7B4D', color: '#080603',
    route: '/UncleSamsBoldBrew',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585',
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
        border: '1px solid rgba(200,164,77,0.18)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.6)',
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
          <span className="font-mono text-[11px] font-bold tracking-wider px-2 py-0.5" style={{ color: p.accent, background: `${p.accent}15`, border: `1px solid ${p.accent}40` }}>{p.code}</span>
          <span className="font-mono text-[9px] text-gray-700">·</span>
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
          <p className="text-xs max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Every product in the Torch Republic catalog has a permanent identity number. Some are CORE — always available. Others retire to the Archive forever.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-[1280px] mx-auto">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/d877937a8_collection_all6png_preview.jpg"
            alt="Founders Collection"
            className="w-full h-auto rounded"
          />
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
            style={{ background: '#C4A35A', color: '#000' }}>
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