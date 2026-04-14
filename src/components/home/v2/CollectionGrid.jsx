import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const COLLECTIONS = [
  {
    title: 'Founders Series',
    description: 'Collectible small-batch blends named for the men who built America.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757',
    route: '/CoffeeCollection',
    comingSoon: false,
    accent: '#C8A44D',
  },
  {
    title: 'Liberty Icons',
    description: 'Bold blends inspired by the symbols of American freedom.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383',
    route: '/LibertyIcons',
    comingSoon: false,
    accent: '#9BB8CC',
  },
  {
    title: 'Commanders Series',
    description: 'The men who led when it mattered most.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    route: '/CommandersSeries',
    comingSoon: true,
    accent: '#C87070',
  },
  {
    title: 'Women of the Republic',
    description: 'Honoring the women who shaped a nation.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    route: '/WomenOfTheRepublic',
    comingSoon: true,
    accent: '#D4A5C9',
  },
  {
    title: 'Visionaries',
    description: 'For those who see further than the horizon.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    route: '/Visionaries',
    comingSoon: true,
    accent: '#A8C4A2',
  },
  {
    title: 'Patriots',
    description: 'Blended for those who stand and deliver.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    route: '/Patriots',
    comingSoon: true,
    accent: '#B8A4C8',
  },
];

function CollectionCard({ col, index }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="group relative overflow-hidden flex flex-col justify-end"
      style={{ aspectRatio: '3/4', background: '#0A0A0A', border: '1px solid rgba(196,163,90,0.1)', cursor: col.comingSoon ? 'default' : 'pointer' }}
    >
      <img
        src={col.image}
        alt={col.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
        style={{ opacity: col.comingSoon ? 0.25 : 0.45, transform: 'scale(1)', transition: 'transform 0.7s ease, opacity 0.4s ease' }}
        onMouseEnter={e => { if (!col.comingSoon) e.currentTarget.style.transform = 'scale(1.07)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${col.accent}50, transparent)` }} />

      {col.comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1.5"
            style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }}>
            Coming Soon
          </span>
        </div>
      )}

      <div className="relative z-10 p-7 flex flex-col gap-2">
        <h3 className="font-serif leading-tight" style={{ fontSize: '1.35rem', fontWeight: 700, color: col.accent }}>
          {col.title}
        </h3>
        <p className="font-mono text-[10px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.38)' }}>
          {col.description}
        </p>
        {!col.comingSoon && (
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase mt-2 transition-opacity group-hover:opacity-70"
            style={{ color: col.accent, borderBottom: `1px solid ${col.accent}40`, paddingBottom: '2px', width: 'fit-content' }}>
            Explore →
          </span>
        )}
      </div>
    </motion.div>
  );

  return col.comingSoon ? <div>{inner}</div> : <Link to={col.route}>{inner}</Link>;
}

export default function CollectionGrid() {
  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(196,163,90,0.45)' }}>Collections</p>
          <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.015em' }}>
            Every Legacy Has a Blend.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {COLLECTIONS.map((col, i) => (
            <CollectionCard key={col.title} col={col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}