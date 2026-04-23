import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TorchBoxCollectionBanner from '../components/collections/TorchBoxCollectionBanner';
import FirstTimeCTA from '../components/collections/FirstTimeCTA';
import { PRODUCT_CATALOG } from '../lib/productCatalog';

// Derive display-ready product list from the single source of truth
const PRODUCTS = PRODUCT_CATALOG
  .filter(p => p.format !== 'PODS BOX')
  .map(p => ({
    ...p,
    route: p.internalRoute,
    price: `$${p.price.toFixed(2)}`,
  }));

const FILTERS = ['ALL', 'CORE', "FOUNDER'S EDITION"];

function ProductCard({ p, index }) {
  const isFounder = p.rarity === "FOUNDER'S EDITION";
  const isFirstRecommended = p.name === 'Washington Blend';
  
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
        {isFirstRecommended && (
          <div className="absolute top-3 left-3 z-10 font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1.5 font-black rounded-sm"
            style={{ background: 'rgba(196,163,90,0.2)', color: '#E8D08A', border: '1px solid rgba(196,163,90,0.55)' }}>
            → Start Here
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          <span className="font-mono text-[8px] font-bold tracking-wider px-2 py-1"
            style={{
              color: isFounder ? '#E8D08A' : '#6B7280',
              background: isFounder ? 'rgba(196,163,90,0.15)' : 'rgba(0,0,0,0.6)',
              border: isFounder ? '1px solid rgba(232,208,138,0.35)' : '1px solid rgba(107,114,128,0.3)',
            }}>
            {p.rarity}
          </span>
          <span className="font-mono text-[7px] font-bold tracking-wider px-1.5 py-0.5"
            style={{ background: 'rgba(201,162,74,0.15)', color: 'rgba(201,162,74,0.8)', border: '1px solid rgba(201,162,74,0.2)' }}>
            In Torch Box
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[11px] font-bold tracking-wider px-2 py-0.5" style={{ color: p.accent, background: `${p.accent}15`, border: `1px solid ${p.accent}40` }}>{p.code}</span>
        <span className="font-mono text-[9px] text-gray-700">·</span>
        <span className="font-mono text-[9px] text-gray-500">{p.seriesNum}</span>
      </div>
      <div>
        <h3 className="font-serif text-white mb-0.5" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{p.name}</h3>
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {p.format === 'PODS BOX' ? 'Coffee Pods Box' : p.format === 'GROUND COFFEE BOX' ? 'Ground Coffee Box' : 'Whole Bean Coffee Box'}
        </p>
        <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: p.accent + '88' }}>{p.roast}</p>
      </div>
      {/* Format badge — unmissable at card level */}
      <span className="self-start font-mono text-[7px] tracking-[0.3em] uppercase px-2 py-1 font-black"
        style={{ background: 'rgba(196,163,90,0.1)', color: 'rgba(232,208,138,0.8)', border: '1px solid rgba(196,163,90,0.3)' }}>
        ▣ {p.format || 'WHOLE BEAN BOX'}
      </span>
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
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C4A35A' }}>Premium Coffee Collections</span>
          </div>
          <h1 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1 }}>
            Founders Series
          </h1>
          <p className="font-mono text-sm mb-2" style={{ color: 'rgba(196,163,90,0.7)' }}>Six Premium Small-Batch Roasts. Each Retires Forever.</p>
          <p className="text-xs max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
            The Founders Series is our flagship collection — six named roasts inspired by American patriots and founding figures. Each blend is small-batch roasted, collectible, and permanent. Once a roast retires, it moves to the Archive and is never roasted again. Build your complete set.
          </p>
          {/* Other collection quick-links */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: 'Liberty Icons', href: '/LibertyIcons' },
              { label: 'Commanders Series', href: '/CommandersSeries' },
              { label: 'All Coffee', href: '/CoffeeCollection' },
            ].map(c => (
              <Link key={c.label} to={c.href}
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 transition-all"
                style={{ border: '1px solid rgba(196,163,90,0.25)', color: 'rgba(196,163,90,0.65)' }}>
                {c.label}
              </Link>
            ))}
          </div>
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

      {/* First-Time Customer Guidance */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-10">
        <FirstTimeCTA />
      </div>

      {/* Torch Box Banner */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-4">
        <TorchBoxCollectionBanner />
      </div>

      {/* Grid */}
      <section className="py-8 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((p, i) => <ProductCard key={p.code} p={p} index={i} />)}
        </div>
      </section>

      {/* Matching Apparel Section */}
      <section className="py-20 px-6 md:px-12" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(196,163,90,0.08)', borderBottom: '1px solid rgba(196,163,90,0.08)' }}>
        <div className="max-w-[1280px] mx-auto text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#C4A35A' }}>Extend Your Collection</p>
          <h2 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700 }}>Founders Series Apparel</h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Historical apparel inspired by the Founders. Wear the legacy while you build your collection.
          </p>
        </div>
        <div className="text-center">
          <Link to="/Shop" className="inline-flex items-center justify-center px-8 py-3.5 font-mono text-xs tracking-[0.2em] uppercase"
            style={{ background: 'rgba(196,163,90,0.15)', color: '#C4A35A', border: '1px solid rgba(196,163,90,0.35)' }}>
            Explore Founders Apparel →
          </Link>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-16 px-6 md:px-12 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: '#C4A35A' }}>Premium Experience</p>
        <h2 className="font-serif text-white mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700 }}>Build Your Collection with Torch Box</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/TheTorchBox" className="inline-flex items-center justify-center px-8 py-3.5 font-mono text-xs tracking-[0.2em] uppercase"
            style={{ background: '#C4A35A', color: '#000' }}>
            Join Torch Box Subscription →
          </Link>
        </div>
      </section>
    </div>
  );
}