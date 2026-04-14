import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    name: 'Founders Series',
    description: 'The origin of the flame. Built on legacy, leadership, and first principles.',
    route: '/CoffeeCollection',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757',
    live: true,
  },
  {
    name: 'Liberty Icons',
    description: 'Symbols of freedom, reimagined through bold, modern blends.',
    route: '/LibertyIcons',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701',
    live: true,
  },
  {
    name: 'Commanders Series',
    description: 'Leadership under pressure. Built for those who take command.',
    route: '/CommandersSeries',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841',
    live: false,
  },
  {
    name: 'Women of the Republic',
    description: 'Strength, influence, and legacy—honoring the women who shaped history.',
    route: '/WomenOfTheRepublic',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_4f650292-3215-4b0f-aed8-7ed4c1a02fb6.jpg?v=1775891986',
    live: false,
  },
  {
    name: 'Visionaries',
    description: 'Ideas that changed the world. Coffee for those who think ahead.',
    route: '/Visionaries',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_6f98a910-06fe-466c-b034-23133f53a324.jpg?v=1775892090',
    live: false,
  },
  {
    name: 'Patriots',
    description: 'For those who stand firm. Everyday courage, brewed strong.',
    route: '/Patriots',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383',
    live: false,
  },
];

const ROAST_FILTERS = [
  { label: 'Light Roast', icon: '🌤', description: 'Bright & nuanced', route: '/CoffeeCollection' },
  { label: 'Medium Roast', icon: '☕', description: 'Balanced & smooth', route: '/CoffeeCollection' },
  { label: 'Dark Roast', icon: '🔥', description: 'Bold & full-bodied', route: '/CoffeeCollection' },
  { label: 'Espresso / Bold', icon: '⚡', description: 'Intense & concentrated', route: '/CoffeeCollection' },
  { label: 'Single Origin', icon: '🌍', description: 'Traceable & distinct', route: '/CoffeeCollection' },
  { label: 'Blends', icon: '🏺', description: 'Crafted for complexity', route: '/CoffeeCollection' },
];

const GOODS = [
  { label: 'Apparel', icon: '👕', route: '/Shop' },
  { label: 'Mugs & Drinkware', icon: '☕', route: '/Shop' },
  { label: 'Hats', icon: '🧢', route: '/Shop' },
  { label: 'Accessories', icon: '🎖', route: '/Shop' },
];

function SectionDivider({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-5 mb-10"
    >
      <div className="flex-1 h-px" style={{ background: 'rgba(196,163,90,0.1)' }} />
      <p className="font-mono text-[9px] tracking-[0.5em] uppercase flex-shrink-0"
        style={{ color: 'rgba(196,163,90,0.4)' }}>
        {label}
      </p>
      <div className="flex-1 h-px" style={{ background: 'rgba(196,163,90,0.1)' }} />
    </motion.div>
  );
}

function CollectionCard({ col, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative overflow-hidden"
      style={{ aspectRatio: '3/4', backgroundColor: '#0A0A0A' }}
    >
      <Link to={col.route} className="block w-full h-full relative">
        <img
          src={col.image}
          alt={col.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.55 }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(196,163,90,0.08) 0%, transparent 100%)' }} />

        {!col.live && (
          <div className="absolute top-4 right-4">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5"
              style={{
                background: 'rgba(0,0,0,0.75)',
                border: '1px solid rgba(196,163,90,0.4)',
                color: '#C9A24A',
                backdropFilter: 'blur(8px)',
              }}>
              Coming Soon
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-serif font-bold mb-2 leading-tight"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#F0EBE1' }}>
            {col.name}
          </h3>
          <p className="font-mono text-[10px] leading-relaxed mb-4"
            style={{ color: 'rgba(240,235,225,0.5)' }}>
            {col.description}
          </p>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: col.live ? '#C9A24A' : 'rgba(196,163,90,0.45)' }}>
            {col.live ? 'Explore →' : 'Preview →'}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.6), transparent)' }} />
      </Link>
    </motion.div>
  );
}

function RoastCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group"
    >
      <Link
        to={item.route}
        className="flex items-center gap-4 px-5 py-4 transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(196,163,90,0.1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(196,163,90,0.35)';
          e.currentTarget.style.background = 'rgba(196,163,90,0.04)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(196,163,90,0.1)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        }}
      >
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{item.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs font-bold tracking-wide" style={{ color: '#C9A24A' }}>
            {item.label}
          </p>
          <p className="font-mono text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {item.description}
          </p>
        </div>
        <span className="font-mono text-[10px] opacity-0 group-hover:opacity-60 transition-opacity"
          style={{ color: '#C9A24A', flexShrink: 0 }}>→</span>
      </Link>
    </motion.div>
  );
}

function GoodsCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group"
    >
      <Link
        to={item.route}
        className="flex flex-col items-center justify-center gap-2 py-6 px-4 text-center transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid rgba(196,163,90,0.07)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(196,163,90,0.25)';
          e.currentTarget.style.background = 'rgba(196,163,90,0.03)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(196,163,90,0.07)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(240,235,225,0.4)' }}>
          {item.label}
        </p>
      </Link>
    </motion.div>
  );
}

export default function Collections() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>

      {/* ── HERO ── */}
      <section className="pt-24 pb-16 px-6 text-center" style={{ borderBottom: '1px solid rgba(196,163,90,0.08)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-6"
              style={{ color: 'rgba(196,163,90,0.55)' }}>
              Torch Republic
            </p>
            <h1 className="font-serif font-bold mb-5 leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#F0EBE1', letterSpacing: '-0.02em' }}>
              Shop the Flame
            </h1>
            <p className="font-heading text-sm leading-relaxed mb-8 max-w-xl mx-auto"
              style={{ color: 'rgba(240,235,225,0.5)' }}>
              Signature coffee collections and premium goods for those who carry it forward.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.5))' }} />
              <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(196,163,90,0.5)' }} />
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.5), transparent)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ── */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-[1280px] mx-auto">
          <SectionDivider label="Coffee Collections" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLLECTIONS.map((col, i) => (
              <CollectionCard key={col.name} col={col} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP BY ROAST ── */}
      <section className="py-12 px-6 md:px-10" style={{ borderTop: '1px solid rgba(196,163,90,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <SectionDivider label="Shop by Roast" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ROAST_FILTERS.map((item, i) => (
              <RoastCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GOODS ── */}
      <section className="py-12 px-6 md:px-10 pb-24" style={{ borderTop: '1px solid rgba(196,163,90,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <SectionDivider label="Premium Goods" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GOODS.map((item, i) => (
              <GoodsCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}