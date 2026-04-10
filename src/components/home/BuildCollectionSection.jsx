import React from 'react';
import { motion } from 'framer-motion';

const BUNDLES = [
  {
    tag: 'BEST SELLER',
    name: 'Founders Starter Pack',
    tagline: 'The perfect introduction to the Founders Series.',
    desc: 'Three blends. Three mindsets. One starting point.',
    blends: ['Washington Blend — Dark Roast', 'Jefferson Blend — Medium Roast', 'Franklin Blend — Light Roast'],
    was: '$56.97',
    price: '$49.99',
    savings: 'Save $6.98',
    accent: '#C8A44D',
    handle: 'founders-starter-pack',
    featured: true,
  },
  {
    tag: 'BUILD YOUR OWN',
    name: 'Any 3 Blends',
    tagline: 'Choose your set.',
    desc: 'Pick any three from the Founders Series. Mix roasts. Build your profile.',
    blends: ['Choose Dark, Medium, or Light', 'Any combination from the series', 'Ships together at a discount'],
    was: '$56.97',
    price: '$49.99',
    savings: 'Save $6.98',
    accent: '#9BB8CC',
    handle: 'build-your-own-3-pack',
    featured: false,
  },
  {
    tag: 'COLLECTOR\'S CHOICE',
    name: 'The Complete Founders Collection',
    tagline: 'All six blends. Every profile. The full system.',
    desc: 'For the serious collector. Perfect for gifting. The complete set.',
    blends: ['All 6 Founders Series blends', 'Washington · Jefferson · Franklin', 'Adams · Lincoln · Roosevelt'],
    was: '$113.94',
    price: '$89.99',
    savings: 'Save $23.95',
    accent: '#D4C97A',
    handle: 'complete-founders-collection',
    featured: false,
  },
];

function BundleCard({ b, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="relative flex flex-col"
      style={{
        background: b.featured ? 'linear-gradient(160deg, #0E0A02 0%, #050505 100%)' : '#050505',
        border: b.featured ? `1px solid ${b.accent}40` : '1px solid rgba(200,164,77,0.1)',
        boxShadow: b.featured ? `0 0 40px ${b.accent}12` : 'none',
      }}
    >
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${b.accent}99, transparent)` }} />

      {/* Tag */}
      <div className="px-7 pt-6">
        <span className="font-mono text-[9px] font-bold tracking-[0.4em] uppercase px-2.5 py-1" style={{ color: b.accent, border: `1px solid ${b.accent}35`, background: `${b.accent}10` }}>
          {b.tag}
        </span>
      </div>

      <div className="p-7 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="font-serif text-white mb-1" style={{ fontSize: '1.45rem', fontWeight: 700 }}>{b.name}</h3>
          <p className="font-mono text-[10px]" style={{ color: `${b.accent}88` }}>{b.tagline}</p>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>

        <div className="space-y-2">
          {b.blends.map(bl => (
            <div key={bl} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: b.accent }} />
              <span className="font-mono text-[10px] text-gray-500">{bl}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-3 mt-auto pt-2">
          <span className="font-mono font-bold text-2xl" style={{ color: b.accent }}>{b.price}</span>
          <span className="font-mono text-sm text-gray-600 line-through">{b.was}</span>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5" style={{ color: '#000', background: b.accent }}>{b.savings}</span>
        </div>

        <a
          href={`https://torch-republic.com/products/${b.handle}`}
          className="py-3.5 text-center font-heading font-black text-xs tracking-[0.2em] uppercase transition-all"
          style={b.featured
            ? { background: '#C4A35A', color: '#000', boxShadow: '0 4px 20px rgba(196,163,90,0.25)' }
            : { border: `1px solid ${b.accent}40`, color: b.accent, background: `${b.accent}08` }
          }
        >
          {b.featured ? 'Get The Starter Set →' : 'Shop This Set →'}
        </a>
      </div>
    </motion.div>
  );
}

export default function BuildCollectionSection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: '#030303', borderTop: '1px solid rgba(200,164,77,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>Start Your Collection</span>
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
          </div>
          <h2 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700 }}>
            Build Your Founders Collection
          </h2>
          <p className="text-gray-500 font-mono text-sm max-w-md mx-auto">
            Start your set. Choose any 3 blends — or go all in.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BUNDLES.map((b, i) => <BundleCard key={b.name} b={b} i={i} />)}
        </div>

        {/* Single price note */}
        <p className="text-center font-mono text-[10px] text-gray-700 mt-8 tracking-wider uppercase">
          Single bags always $18.99 — bundles are the smart move.
        </p>
      </div>
    </section>
  );
}