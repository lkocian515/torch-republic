import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Star, Flame } from 'lucide-react';

const BREW_METHODS = [
  { name: 'Drip', icon: '☕', tip: '1–2 tbsp per 6 oz · Medium grind · 200°F' },
  { name: 'French Press', icon: '⬛', tip: 'Coarse grind · 4 min steep · Full immersion' },
  { name: 'Pour Over', icon: '◈', tip: 'Medium grind · Slow bloom · 30 s pre-infusion' },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: RotateCcw, label: '30-Day Guarantee' },
  { icon: Flame, label: 'Flame Guarantee' },
  { icon: Truck, label: 'Free Shipping $150+' },
];

const SAMPLE_REVIEWS = [
  { name: 'Marcus T.', location: 'Nashville, TN', rating: 5, text: 'The most heritage-forward coffee I\'ve ever tasted. Rich, complex, and worthy of the name it carries.' },
  { name: 'Sarah K.', location: 'Charleston, SC', rating: 5, text: 'Absolutely extraordinary. Every morning feels like a deliberate act of legacy with this blend.' },
  { name: 'James R.', location: 'Austin, TX', rating: 5, text: 'Heritage-crafted in the truest sense. Uncompromising quality from first pour to last drop.' },
];

function Stars({ n = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#C9A24A' }} />
      ))}
    </div>
  );
}

export default function FounderProductPage({ data }) {
  const {
    title, subline, code, seriesNum, rarity, roast, notes, price,
    shopifyHandle, founderStory, tastingNotes,
    roastProfile, brewGuide, whoFor, histFacts, quote, completePair,
    accent, heroImage,
  } = data;

  const [activeTab, setActiveTab] = useState('story');
  const [activeImg, setActiveImg] = useState(0);
  const images = data.images || [heroImage, heroImage, heroImage];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808', color: '#F0EBE1' }}>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-5 pb-0">
        <nav className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: '10px', fontFamily: 'var(--font-heading)', letterSpacing: '0.08em' }}>
          <Link to="/" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Home</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <Link to="/CoffeeCollection" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Founders Series</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <span style={{ color: 'rgba(196,163,90,0.7)' }}>{title} Blend</span>
        </nav>
      </div>

      {/* ── HERO TWO-COLUMN ── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pt-8 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-start">

          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-3"
          >
            {/* Main image */}
            <div className="relative overflow-hidden group" style={{ background: '#111', aspectRatio: '4/5' }}>
              <img
                src={images[activeImg]}
                alt={`${title} Blend`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ opacity: 0.9 }}
              />
              {/* Code badge */}
              <div className="absolute top-4 left-4">
                <span className="font-mono text-xs font-black tracking-widest px-3 py-1.5" style={{ background: accent || '#C9A24A', color: '#0B0B0B' }}>
                  {code}
                </span>
              </div>
              {/* Founder's Edition badge */}
              {rarity === "FOUNDER'S EDITION" && (
                <div className="absolute bottom-4 right-4">
                  <span className="font-mono text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5" style={{ background: '#C9A24A', color: '#0B0B0B' }}>
                    Founder's Edition
                  </span>
                </div>
              )}
              {/* Gradient bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />
              {/* Image counter */}
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.5)', padding: '3px 8px' }}>
                  {activeImg + 1} / {images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="flex-1 overflow-hidden transition-all duration-200"
                  style={{
                    aspectRatio: '1/1',
                    background: '#111',
                    border: i === activeImg ? `1px solid ${accent || '#C9A24A'}` : '1px solid rgba(196,163,90,0.1)',
                    opacity: i === activeImg ? 1 : 0.55,
                  }}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`${title} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info — sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-7 lg:sticky lg:top-24 py-8 lg:py-0"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="h-px w-6" style={{ background: 'rgba(196,163,90,0.4)' }} />
              <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
                {seriesNum} · Founders Series · {roast}
              </p>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-serif leading-none mb-2" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.015em' }}>
                {title}
              </h1>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>
                {subline || 'Heritage-Crafted · Small-Batch Excellence'}
              </p>
            </div>

            {/* Tasting notes quick */}
            <div className="flex flex-wrap gap-2">
              {(tastingNotes || []).map(n => (
                <span key={n} className="font-mono text-[10px] px-3 py-1.5"
                  style={{ border: '1px solid rgba(196,163,90,0.15)', color: 'rgba(240,235,225,0.45)', background: 'rgba(196,163,90,0.04)' }}>
                  {n}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: 'rgba(201,162,74,0.08)' }} />

            {/* Price + Badges */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-mono font-black" style={{ fontSize: '2rem', color: accent || '#C9A24A' }}>{price}</span>
              <span className="font-mono text-sm line-through" style={{ color: 'rgba(240,235,225,0.18)' }}>$21.99</span>
              <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1"
                style={{ background: 'rgba(201,162,74,0.1)', color: accent || '#C9A24A', border: '1px solid rgba(201,162,74,0.2)' }}>
                Limited · Small-Batch
              </span>
            </div>

            {/* Add to cart */}
            <div className="flex flex-col gap-3">
              <AddToCartButton shopifyHandle={shopifyHandle} accent={accent} />
              <Link to="/TheTorchBox"
                className="flex items-center justify-center py-3.5 font-mono uppercase tracking-[0.25em] transition-all hover:opacity-70"
                style={{ fontSize: '10px', border: '1px solid rgba(196,163,90,0.2)', color: 'rgba(196,163,90,0.6)' }}>
                + Add to Torch Box Subscription
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2.5">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 px-3 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(196,163,90,0.07)' }}>
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(196,163,90,0.5)' }} />
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(240,235,225,0.35)' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Free shipping note */}
            <p className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.2)' }}>
              Roasted to order · Ships within 2–3 business days
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TABS: STORY / FLAVOR / BREW ── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 mt-20">
        {/* Tab nav */}
        <div className="flex items-center gap-0 border-b" style={{ borderColor: 'rgba(196,163,90,0.1)' }}>
          {['story', 'flavor', 'brew'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-mono text-[10px] uppercase tracking-[0.3em] px-6 py-4 transition-all"
              style={{
                color: activeTab === tab ? (accent || '#C9A24A') : 'rgba(255,255,255,0.28)',
                borderBottom: activeTab === tab ? `1px solid ${accent || '#C9A24A'}` : '1px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {tab === 'story' ? 'The Founder' : tab === 'flavor' ? 'Flavor Profile' : 'Brew Guide'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-16">
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-[680px]"
            >
              <div className="space-y-5 mb-14">
                {(founderStory || []).map((p, i) => (
                  <p key={i} style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.58)', lineHeight: 1.95, fontWeight: 300 }}>{p}</p>
                ))}
              </div>
              {quote && (
                <div className="pt-10" style={{ borderTop: '1px solid rgba(201,162,74,0.1)' }}>
                  <blockquote className="font-serif" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', color: 'rgba(240,235,225,0.72)', fontStyle: 'italic', lineHeight: 1.55 }}>
                    "{quote.text}"
                  </blockquote>
                  <p className="font-mono text-[10px] tracking-widest uppercase mt-4" style={{ color: 'rgba(201,162,74,0.45)' }}>
                    — {quote.author}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'flavor' && (
            <motion.div
              key="flavor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            >
              <div className="flex flex-col gap-5">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: accent || '#C9A24A' }}>Tasting Notes</p>
                <div className="space-y-3">
                  {(tastingNotes || []).map(n => (
                    <div key={n} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent || '#C9A24A' }} />
                      <span style={{ color: 'rgba(240,235,225,0.65)', fontSize: '0.95rem' }}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: accent || '#C9A24A' }}>Roast Profile</p>
                <div className="space-y-3">
                  {(roastProfile || []).map(r => (
                    <div key={r} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(201,162,74,0.4)' }} />
                      <span style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem' }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: accent || '#C9A24A' }}>Built For</p>
                <div className="flex flex-wrap gap-2">
                  {(whoFor || []).map(w => (
                    <span key={w} className="font-mono text-[10px] px-3 py-1.5"
                      style={{ border: '1px solid rgba(201,162,74,0.18)', color: 'rgba(240,235,225,0.4)' }}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'brew' && (
            <motion.div
              key="brew"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {BREW_METHODS.map((m, i) => (
                <div key={m.name} className="p-7 flex flex-col gap-4"
                  style={{ background: '#111', border: '1px solid rgba(201,162,74,0.08)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: accent || '#C9A24A' }}>{m.name}</p>
                  <p className="font-mono text-xs" style={{ color: 'rgba(240,235,225,0.35)', lineHeight: 1.8 }}>{m.tip}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── HISTORICAL NOTES ── */}
      {histFacts && histFacts.length > 0 && (
        <section className="max-w-[800px] mx-auto px-5 md:px-10 pb-24">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Historical Notes
          </p>
          <div className="space-y-3">
            {histFacts.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-6 p-6"
                style={{ background: '#111', border: '1px solid rgba(201,162,74,0.06)' }}
              >
                <span className="font-mono text-xs font-black flex-shrink-0" style={{ color: 'rgba(201,162,74,0.3)' }}>0{i + 1}</span>
                <p style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}>{f}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── COLLECTIBILITY ── */}
      <section style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[720px] mx-auto px-5 md:px-10 py-20 text-center">
          <div className="w-px h-10 mx-auto mb-10" style={{ background: `linear-gradient(to bottom, transparent, ${accent || '#C9A24A'})` }} />
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Part of the Founders Collection
          </p>
          <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#F0EBE1', fontWeight: 700, lineHeight: 1.2 }}>
            Each blend retires. Forever.
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.38)', lineHeight: 1.95, fontWeight: 300, fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
            Every Founders Series product carries a permanent identity number. Core blends endure. Founder's Edition blends retire to the Archive — once gone, they're gone.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap mb-10">
            <div className="text-center">
              <p className="font-mono text-2xl font-black" style={{ color: accent || '#C9A24A' }}>{code}</p>
              <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,225,0.22)' }}>Your Blend</p>
            </div>
            <div className="h-8 w-px" style={{ background: 'rgba(201,162,74,0.15)' }} />
            <div className="text-center">
              <p className="font-mono text-xl font-black" style={{ color: rarity === "FOUNDER'S EDITION" ? '#C9A24A' : 'rgba(255,255,255,0.4)' }}>
                {rarity}
              </p>
              <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,225,0.22)' }}>Status</p>
            </div>
          </div>
          <Link to="/CoffeeCollection"
            className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-55"
            style={{ color: 'rgba(201,162,74,0.6)', borderBottom: '1px solid rgba(201,162,74,0.22)', paddingBottom: '3px' }}>
            View Full Torch Index
          </Link>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Verified Reviews
            </p>
            <div className="flex items-center gap-3">
              <Stars n={5} />
              <span className="font-serif text-white font-bold" style={{ fontSize: '1.4rem' }}>5.0</span>
              <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>from 200+ orders</span>
            </div>
          </div>
          <Link to="/Reviews"
            className="font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-55"
            style={{ color: 'rgba(201,162,74,0.5)', borderBottom: '1px solid rgba(201,162,74,0.2)', paddingBottom: '3px' }}>
            View All Reviews →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-7 flex flex-col gap-4"
              style={{ background: '#0E0E0E', border: '1px solid rgba(196,163,90,0.08)' }}
            >
              <Stars n={r.rating} />
              <p style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.85, fontStyle: 'italic', fontWeight: 300 }}>
                "{r.text}"
              </p>
              <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(196,163,90,0.07)' }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.45)' }}>{r.name}</span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{r.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── COMPLETE YOUR COLLECTION ── */}
      {completePair && completePair.length > 0 && (
        <section style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10 text-center" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Complete Your Legacy
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {completePair.map(p => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="flex items-center justify-between p-6 group transition-all duration-300"
                  style={{ background: '#080808', border: '1px solid rgba(201,162,74,0.1)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.1)'}
                >
                  <div>
                    <p className="font-serif text-white font-bold" style={{ fontSize: '1.1rem' }}>{p.name}</p>
                    <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(240,235,225,0.3)' }}>{p.roast}</p>
                  </div>
                  <span className="font-mono text-sm transition-all group-hover:translate-x-1" style={{ color: 'rgba(201,162,74,0.5)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}