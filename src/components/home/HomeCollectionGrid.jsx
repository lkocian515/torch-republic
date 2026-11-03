import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    title: 'Founders Series',
    description: 'Heritage-crafted small-batch coffee. Collectible by design.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/193fcf090_file_00000000d614822fbac1ab269ae9f60a.png',
    route: '/CoffeeCollection',
    accent: '#E6AC45',
    comingSoon: false,
  },
  {
    title: 'Liberty Icons',
    description: 'Bold blends named for the symbols of American freedom.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/193fcf090_file_00000000d614822fbac1ab269ae9f60a.png',
    route: '/LibertyIcons',
    accent: '#8B6D47',
    comingSoon: false,
  },
  {
    title: 'Commanders Series',
    description: 'Military precision. Battlefield resolve.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
    route: '/CommandersSeries',
    accent: '#7A9E7E',
    comingSoon: true,
  },
  {
    title: 'Women of the Republic',
    description: 'Honoring the women who shaped a nation.',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800&q=80',
    route: '/WomenOfTheRepublic',
    accent: '#C87070',
    comingSoon: true,
  },
  {
    title: 'Visionaries',
    description: 'For those who thought beyond their time.',
    image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=800&q=80',
    route: '/Visionaries',
    accent: '#9BB8CC',
    comingSoon: true,
  },
  {
    title: 'Patriots',
    description: 'Every sip a salute to those who served.',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    route: '/Patriots',
    accent: '#B87AC8',
    comingSoon: true,
  },
];

function CollectionCard({ col, index }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group relative overflow-hidden flex flex-col justify-end"
      style={{ aspectRatio: '3/4', background: '#0A0A0A', border: '1px solid rgba(196,163,90,0.1)', cursor: col.comingSoon ? 'default' : 'pointer' }}
    >
      <img
        src={col.image}
        alt={col.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
        style={{ opacity: col.comingSoon ? 0.2 : 0.5, transform: 'scale(1)', transition: 'transform 0.7s ease, opacity 0.3s ease' }}
      />
      <div className="absolute inset-0 group-hover:[&~*]:opacity-100"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${col.accent}50, transparent)` }} />

      {col.comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1" style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(196,163,90,0.6)', border: '1px solid rgba(196,163,90,0.2)' }}>
            Coming Soon
          </span>
        </div>
      )}

      <div className="relative z-10 p-6 flex flex-col gap-2">
        <h3 className="font-serif font-bold" style={{ fontSize: '1.4rem', color: col.accent, lineHeight: 1.15 }}>{col.title}</h3>
        <p className="font-mono text-[10px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.45)' }}>{col.description}</p>
        {!col.comingSoon && (
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase mt-2 transition-opacity group-hover:opacity-100 opacity-0"
            style={{ color: col.accent }}>
            Explore →
          </span>
        )}
      </div>
    </motion.div>
  );

  return col.comingSoon ? <div key={col.title}>{inner}</div> : <Link key={col.title} to={col.route}>{inner}</Link>;
}

export default function HomeCollectionGrid() {
  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#050508', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(196,163,90,0.45)' }}>The Collections</p>
          <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.015em' }}>
            Every Flame Has a Name
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {COLLECTIONS.map((col, i) => (
            <CollectionCard key={col.title} col={col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}