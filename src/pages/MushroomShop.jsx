import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package } from 'lucide-react';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';

const RG = '#E6B7AD';

const BUNDLE_PRODUCT = {
  name: 'The Full Ritual Set',
  mood: 'Complete · All Six Blends · Best Value',
  tagline: 'Every blend. Every ritual. One complete mushroom coffee collection.',
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/ChatGPT_Image_May_31_2026_01_37_31_PM.png?v=1780252673',
  alt: 'Torch Republic Full Ritual Set — all six mushroom coffee tubes',
  price: 129.99,
  accent: '#E6B7AD',
};

function BundleCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="flex flex-col h-full"
      style={{ background: 'linear-gradient(160deg, #13100F 0%, #110E0D 100%)', border: '1px solid rgba(230,183,173,0.25)', boxShadow: '0 0 40px rgba(230,183,173,0.06)' }}
    >
      <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: '1/1', background: '#0C0B0A' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(230,183,173,0.1) 0%, transparent 70%)' }} />
        <img src={BUNDLE_PRODUCT.image} alt={BUNDLE_PRODUCT.alt} className="w-full h-full object-contain" style={{ padding: '16px' }} />
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1"
            style={{ background: 'rgba(230,183,173,0.18)', color: RG, border: '1px solid rgba(230,183,173,0.35)' }}>
            Bundle · Best Value
          </span>
        </div>
      </div>
      <div className="px-5 pt-5 pb-3 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.05rem' }}>{BUNDLE_PRODUCT.name}</h3>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.7)' }}>All Six Blends · 162 Servings</p>
        </div>
        <p className="font-heading text-xs leading-relaxed flex-1" style={{ color: 'rgba(240,235,225,0.5)' }}>{BUNDLE_PRODUCT.tagline}</p>
        <div className="flex flex-wrap gap-1.5 text-[8px] font-mono uppercase tracking-wide">
          {['Lion\'s Mane + Chaga', 'Instant Coffee', '162 servings'].map(t => (
            <span key={t} className="px-2 py-0.5" style={{ background: 'rgba(230,183,173,0.07)', color: 'rgba(230,183,173,0.5)', border: '1px solid rgba(230,183,173,0.12)' }}>{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
          <span className="font-mono font-bold" style={{ color: RG, fontSize: '1rem' }}>${BUNDLE_PRODUCT.price.toFixed(2)}</span>
          <span className="font-mono text-[9px] uppercase tracking-wide" style={{ color: 'rgba(230,183,173,0.4)' }}>6 tubes included</span>
        </div>
      </div>
      <div className="px-5 pb-5 pt-0 flex flex-col gap-2">
        <Link to="/bundle"
          className="w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 py-3"
          style={{ background: RG, color: '#080808' }}>
          <ShoppingBag className="w-3.5 h-3.5" /> Shop the Bundle →
        </Link>
        <Link to="/bundle"
          className="w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-70 py-2.5"
          style={{ border: '1px solid rgba(230,183,173,0.25)', color: 'rgba(230,183,173,0.6)' }}>
          View Bundle →
        </Link>
      </div>
    </motion.div>
  );
}

function SubscriptionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="sm:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-stretch"
      style={{ background: 'linear-gradient(135deg, #0E0C0B 0%, #110D0C 100%)', border: '1px solid rgba(230,183,173,0.2)', boxShadow: '0 0 60px rgba(230,183,173,0.04)' }}
    >
      {/* Left: copy */}
      <div className="flex-1 px-8 py-10 flex flex-col justify-center gap-5">
        <div>
          <p className="font-mono text-[8px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Monthly · Customizable · No Commitment
          </p>
          <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', lineHeight: 1.2 }}>
            Build Your Monthly Ritual
          </h3>
          <p className="font-heading" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.9rem', maxWidth: '420px' }}>
            Choose 1–6 instant mushroom coffee tubes and select the blends you want delivered each month.
          </p>
        </div>
        <ul className="space-y-2">
          {['Pick your tube count (1–6)', 'Choose your blends each month', 'Delivered monthly', 'Change your ritual anytime'].map(b => (
            <li key={b} className="flex items-center gap-3 font-mono text-[9px] tracking-[0.18em] uppercase"
              style={{ color: 'rgba(230,183,173,0.65)' }}>
              <span style={{ color: RG }}>✦</span> {b}
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link to="/subscription"
            className="inline-flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
            style={{ background: RG, color: '#080808' }}>
            <Package className="w-3.5 h-3.5" /> Build Subscription
          </Link>
          <Link to="/shop"
            className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-6"
            style={{ border: '1px solid rgba(230,183,173,0.25)', color: 'rgba(230,183,173,0.6)' }}>
            Shop One-Time →
          </Link>
        </div>
      </div>
      {/* Right: price hint */}
      <div className="flex items-center justify-center px-10 py-10 flex-shrink-0"
        style={{ borderLeft: '1px solid rgba(230,183,173,0.07)' }}>
        <div className="text-center">
          <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.35)' }}>Starting at</p>
          <p className="font-serif font-bold" style={{ color: RG, fontSize: '2.4rem', lineHeight: 1 }}>$24.99</p>
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase mt-1" style={{ color: 'rgba(230,183,173,0.35)' }}>/tube per month</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MushroomShop() {
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    document.title = 'Shop Instant Mushroom Coffee | Torch Republic Coffee Company';
  }, []);

  const filtered = activeFilter === 'All'
    ? MUSHROOM_PRODUCTS
    : MUSHROOM_PRODUCTS.filter(p => p.roast === activeFilter);

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Torch Republic Coffee Company
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Shop Instant Mushroom Coffee
          </h1>
          <p className="font-heading max-w-xl mx-auto mb-8"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Explore six premium instant mushroom coffee blends crafted with Lion's Mane + Chaga for focus, flow, and daily ritual.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link to="/subscription"
              className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
              style={{ background: RG, color: '#080808' }}>
              Build Your Monthly Subscription
            </Link>
            <a href="#blends"
              className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-8"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
              Shop All Blends ↓
            </a>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mb-10">
            {['100% Instant Coffee', "Lion's Mane + Chaga", '27 Servings Per Tube', 'No Coffee Maker Needed'].map(t => (
              <span key={t} className="font-mono text-[8px] tracking-[0.25em] uppercase"
                style={{ color: 'rgba(230,183,173,0.45)' }}>✦ {t}</span>
            ))}
          </div>

          {/* Roast filters */}
          <div className="flex flex-wrap items-center justify-center gap-2" id="blends">
            {['All', 'Light Roast', 'Medium Roast', 'Dark Roast'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 transition-all"
                style={{
                  background: activeFilter === f ? RG : 'transparent',
                  color: activeFilter === f ? '#080808' : 'rgba(230,183,173,0.6)',
                  border: `1px solid ${activeFilter === f ? RG : 'rgba(230,183,173,0.25)'}`,
                  fontWeight: activeFilter === f ? 700 : 400,
                }}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <h2 className="font-serif font-bold text-white mb-2" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Choose Your Ritual</h2>
            <p className="font-heading" style={{ color: 'rgba(247,241,232,0.4)', fontWeight: 300, fontSize: '0.9rem' }}>
              Pick one blend, try the full set, or build a monthly subscription around your routine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product, i) => (
              <MushroomProductCard key={product.id} product={product} index={i} />
            ))}
            {activeFilter === 'All' && <BundleCard />}
          </div>

          {filtered.length === 0 && (
            <p className="text-center font-mono text-[10px] tracking-[0.3em] uppercase py-20"
              style={{ color: 'rgba(230,183,173,0.35)' }}>No blends match that filter.</p>
          )}

          {/* Subscription card — full width below the grid */}
          {activeFilter === 'All' && (
            <div className="mt-5">
              <SubscriptionCard />
            </div>
          )}
        </div>
      </section>

      {/* ── FIND YOUR BLEND GUIDE ── */}
      <section className="px-6 md:px-10 py-20"
        style={{ background: '#060606', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[900px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>Not Sure Where to Start?</p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.015em' }}>Find Your Ritual</h2>
            <p className="font-heading mt-3 max-w-md mx-auto" style={{ color: 'rgba(247,241,232,0.4)', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.8 }}>
              Each blend is made for a specific moment in your day. Pick yours.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MUSHROOM_PRODUCTS.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link to={`/products/${p.slug}`}
                  className="flex items-start gap-4 p-4 group"
                  style={{ background: '#0F0E0D', border: `1px solid ${p.accent}15`, textDecoration: 'none', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${p.accent}35`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${p.accent}15`}>
                  <div className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5" style={{ background: p.accent }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-white text-sm">{p.name}</p>
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5" style={{ color: `${p.accent}70` }}>{p.roast}</p>
                    <p className="font-heading text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>{p.mood}</p>
                  </div>
                  <span className="font-mono text-[9px] group-hover:translate-x-1 transition-transform flex-shrink-0" style={{ color: `${p.accent}50` }}>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGAL ── */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}