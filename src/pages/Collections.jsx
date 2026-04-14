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
        {/* Image */}
        <img
          src={col.image}
          alt={col.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.55 }}
        />

        {/* Edge fades */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 55%)' }} />

        {/* Gold hover overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(196,163,90,0.08) 0%, transparent 100%)' }} />

        {/* Coming Soon badge */}
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

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-serif font-bold mb-2 leading-tight"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#F0EBE1' }}>
            {col.name}
          </h3>
          <p className="font-mono text-[10px] leading-relaxed mb-4"
            style={{ color: 'rgba(240,235,225,0.5)' }}>
            {col.description}
          </p>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-200"
            style={{ color: col.live ? '#C9A24A' : 'rgba(196,163,90,0.45)' }}>
            {col.live ? 'Explore →' : 'Preview →'}
          </span>
        </div>

        {/* Gold bottom border on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.6), transparent)' }} />
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
            {/* Gold divider */}
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.4em] uppercase mb-10 text-center"
            style={{ color: 'rgba(196,163,90,0.4)' }}
          >
            Coffee Collections
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLLECTIONS.map((col, i) => (
              <CollectionCard key={col.name} col={col} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}