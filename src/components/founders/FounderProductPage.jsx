import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Star, Flame, Coffee, Leaf, Zap } from 'lucide-react';

// ── Flavor note icon map ──────────────────────────────────────────────────────
const FLAVOR_ICONS = {
  'Dark Chocolate': '🍫',
  'Chocolate': '🍫',
  'Cocoa': '🍫',
  'Smoke': '🌫️',
  'Smoky': '🌫️',
  'Citrus': '🍋',
  'Lemon': '🍋',
  'Orange': '🍊',
  'Caramel': '🍮',
  'Toffee': '🍯',
  'Almond': '🌰',
  'Toasted Nut': '🌰',
  'Praline': '🌰',
  'Honey': '🍯',
  'Vanilla': '🤍',
  'Spice': '🌶️',
  'Berry': '🫐',
  'Floral': '🌸',
  'Full Body': '⚫',
  'Sweet Cream': '🥛',
  'Smooth, lingering finish': '✨',
  'Smooth Finish': '✨',
  'Clean Finish': '✨',
  'Sweet Finish': '✨',
  'Deep Roast': '🔥',
  'Bittersweet Chocolate': '🍫',
  'Roasted Peanuts': '🥜',
  'Sundried Citrus': '🍋',
  'Golden Honey': '🍯',
};

const BREW_METHODS = [
  { name: 'Drip', icon: '☕', tip: '1–2 tbsp per 6 oz · Medium grind · 200°F' },
  { name: 'French Press', icon: '⬛', tip: 'Coarse grind · 4 min steep · Full immersion' },
  { name: 'Pour Over', icon: '◈', tip: 'Medium grind · Slow bloom · 30s pre-infusion' },
];

const TRUST_STRIP = [
  { emoji: '🔥', label: 'Small Batch Roasted', sub: 'Every bag, made to order' },
  { emoji: '🌱', label: 'Premium Beans', sub: 'Sourced for character, not convenience' },
  { emoji: '☕', label: 'Built for Daily Ritual', sub: 'Your morning. Your legacy.' },
];

const SAMPLE_REVIEWS = [
  { name: 'Marcus T.', location: 'Nashville, TN', rating: 5, text: 'The most heritage-forward coffee I\'ve ever tasted. Rich, complex, and worthy of the name it carries.' },
  { name: 'Sarah K.', location: 'Charleston, SC', rating: 5, text: 'Absolutely extraordinary. Every morning feels like a deliberate act of legacy with this blend.' },
  { name: 'James R.', location: 'Austin, TX', rating: 5, text: 'Heritage-crafted in the truest sense. Uncompromising quality from first pour to last drop.' },
];

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-12">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.3))' }} />
      <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(196,163,90,0.4)' }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.3), transparent)' }} />
    </div>
  );
}

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
    title, subline, code, seriesNum, rarity, roast, price,
    shopifyHandle, founderStory, tastingNotes,
    roastProfile, whoFor, histFacts, quote, completePair,
    accent, heroImage,
  } = data;

  const [activeImg, setActiveImg] = useState(0);
  const images = data.images || [heroImage];
  const ac = accent || '#C9A24A';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808', color: '#F0EBE1' }}>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-5">
        <nav className="flex items-center gap-1.5 flex-wrap font-mono text-[10px]" style={{ letterSpacing: '0.08em' }}>
          <Link to="/" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Home</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <Link to="/CoffeeCollection" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Collection</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <span style={{ color: 'rgba(196,163,90,0.7)' }}>{title}</span>
        </nav>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO (full-width cinematic image)
      ═══════════════════════════════════════════════ */}
      <section className="relative w-full mt-6 overflow-hidden" style={{ height: 'clamp(400px, 60vh, 680px)' }}>
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.75 }}
        />
        {/* Cinematic edge fades */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #080808 0%, transparent 25%, transparent 75%, #080808 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, #080808 0%, transparent 40%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #080808 0%, transparent 25%)' }} />

        {/* Code badge */}
        <div className="absolute top-6 left-6 md:left-10">
          <span className="font-mono text-xs font-black tracking-widest px-3 py-1.5" style={{ background: ac, color: '#0B0B0B' }}>
            {code}
          </span>
        </div>

        {/* Rarity badge */}
        {rarity === "FOUNDER'S EDITION" && (
          <div className="absolute top-6 right-6 md:right-10">
            <span className="font-mono text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5" style={{ background: 'rgba(196,163,90,0.15)', color: ac, border: `1px solid ${ac}40` }}>
              Founder's Edition
            </span>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — TITLE + STORY + PURCHASE
      ═══════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pt-14 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Title + Story + Flavor + Why it exists */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6" style={{ background: 'rgba(196,163,90,0.4)' }} />
              <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
                {seriesNum} · {roast}
              </p>
            </div>

            {/* Title */}
            <h1 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.015em' }}>
              {title}
            </h1>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-8" style={{ color: `${ac}70` }}>
              {subline || 'Heritage-Crafted · Small-Batch Excellence'}
            </p>

            {/* Gold divider */}
            <div className="h-px w-full mb-8" style={{ background: `linear-gradient(90deg, ${ac}40, transparent)` }} />

            {/* Story — 3-4 lines */}
            <div className="mb-10 space-y-4">
              {(founderStory || []).slice(0, 3).map((p, i) => (
                <p key={i} style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.9, fontWeight: 300 }}>{p}</p>
              ))}
            </div>

            {/* Flavor Profile Icons */}
            {tastingNotes && tastingNotes.length > 0 && (
              <div className="mb-10">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: `${ac}70` }}>Flavor Profile</p>
                <div className="flex flex-wrap gap-3">
                  {tastingNotes.map(note => (
                    <div key={note} className="flex flex-col items-center gap-1.5 px-4 py-3 min-w-[72px]"
                      style={{ background: 'rgba(196,163,90,0.04)', border: '1px solid rgba(196,163,90,0.12)' }}>
                      <span style={{ fontSize: '1.3rem' }}>{FLAVOR_ICONS[note] || '☕'}</span>
                      <span className="font-mono text-[9px] text-center" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.3 }}>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why It Exists — historical tie-in */}
            {histFacts && histFacts.length > 0 && (
              <div className="mb-4">
                <div className="h-px w-full mb-8" style={{ background: 'rgba(196,163,90,0.08)' }} />
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: `${ac}70` }}>Why It Exists</p>
                <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.9, fontWeight: 300 }}>
                  {histFacts[0]}
                </p>
              </div>
            )}
          </motion.div>

          {/* Right: Image + Purchase — sticky */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6 lg:sticky lg:top-24"
          >
            {/* Image gallery */}
            <div className="relative overflow-hidden group" style={{ background: '#111', aspectRatio: '4/5' }}>
              <img
                src={images[activeImg]}
                alt={`${title}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ opacity: 0.9 }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #080808, transparent)' }} />
              {images.length > 1 && (
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[9px] tracking-wider px-2 py-1" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.5)' }}>
                    {activeImg + 1} / {images.length}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className="flex-1 overflow-hidden transition-all"
                    style={{ aspectRatio: '1/1', background: '#111', border: i === activeImg ? `1px solid ${ac}` : '1px solid rgba(196,163,90,0.1)', opacity: i === activeImg ? 1 : 0.5 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-mono font-black" style={{ fontSize: '2rem', color: ac }}>{price}</span>
              <span className="font-mono text-sm line-through" style={{ color: 'rgba(240,235,225,0.18)' }}>$21.99</span>
              <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1"
                style={{ background: 'rgba(201,162,74,0.1)', color: ac, border: '1px solid rgba(201,162,74,0.2)' }}>
                Small-Batch
              </span>
            </div>

            {/* Add to cart */}
            <div className="flex flex-col gap-3">
              <AddToCartButton shopifyHandle={shopifyHandle} accent={ac} />
              <Link to="/TheTorchBox"
                className="flex items-center justify-center py-3.5 font-mono uppercase tracking-[0.25em] transition-all hover:opacity-70"
                style={{ fontSize: '10px', border: '1px solid rgba(196,163,90,0.2)', color: 'rgba(196,163,90,0.6)' }}>
                + Add to Torch Box
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <GoldDivider />
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — BREW GUIDE
      ═══════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-16">
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-8 text-center" style={{ color: `${ac}70` }}>
          Brew Guide
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BREW_METHODS.map(m => (
            <div key={m.name} className="flex items-start gap-5 p-6"
              style={{ background: '#0F0F0F', border: '1px solid rgba(196,163,90,0.08)' }}>
              <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{m.icon}</span>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: ac }}>{m.name}</p>
                <p className="font-mono text-[11px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.35)' }}>{m.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <GoldDivider />
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — TRUST STRIP
      ═══════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRUST_STRIP.map(t => (
            <div key={t.label} className="flex items-center gap-5 p-6"
              style={{ background: '#0F0F0F', border: '1px solid rgba(196,163,90,0.07)' }}>
              <span style={{ fontSize: '1.5rem' }}>{t.emoji}</span>
              <div>
                <p className="font-heading font-bold text-sm mb-0.5" style={{ color: '#F0EBE1' }}>{t.label}</p>
                <p className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.3)' }}>{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — FOUNDER QUOTE
      ═══════════════════════════════════════════════ */}
      {quote && (
        <section style={{ backgroundColor: '#0C0C0C', borderTop: '1px solid rgba(196,163,90,0.06)', borderBottom: '1px solid rgba(196,163,90,0.06)' }}>
          <div className="max-w-[720px] mx-auto px-5 md:px-10 py-20 text-center">
            <blockquote className="font-serif italic mb-6"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: 'rgba(240,235,225,0.75)', lineHeight: 1.6 }}>
              "{quote.text}"
            </blockquote>
            <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: `${ac}60` }}>
              — {quote.author}
            </p>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          SECTION 6 — COLLECTIBILITY
      ═══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[720px] mx-auto px-5 md:px-10 py-20 text-center">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.45)' }}>
            The Torch Index
          </p>
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F0EBE1', fontWeight: 700 }}>
            Each blend retires. Forever.
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.35)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 2rem' }}>
            Core blends endure. Founder's Edition blends retire to the Archive — once gone, they're gone.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap mb-10">
            <div className="text-center">
              <p className="font-mono text-2xl font-black" style={{ color: ac }}>{code}</p>
              <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,225,0.2)' }}>Identity</p>
            </div>
            <div className="h-8 w-px" style={{ background: 'rgba(201,162,74,0.15)' }} />
            <div className="text-center">
              <p className="font-mono text-lg font-black" style={{ color: rarity === "FOUNDER'S EDITION" ? ac : 'rgba(255,255,255,0.35)' }}>
                {rarity}
              </p>
              <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,225,0.2)' }}>Status</p>
            </div>
          </div>
          <Link to="/CoffeeCollection"
            className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-55"
            style={{ color: `${ac}60`, borderBottom: '1px solid rgba(201,162,74,0.22)', paddingBottom: '3px' }}>
            View Full Torch Index
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7 — REVIEWS
      ═══════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.45)' }}>Verified Reviews</p>
            <div className="flex items-center gap-3">
              <Stars n={5} />
              <span className="font-serif text-white font-bold" style={{ fontSize: '1.4rem' }}>5.0</span>
              <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>from 200+ orders</span>
            </div>
          </div>
          <Link to="/Reviews" className="font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-55"
            style={{ color: `${ac}60`, borderBottom: '1px solid rgba(201,162,74,0.2)', paddingBottom: '3px' }}>
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_REVIEWS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="p-7 flex flex-col gap-4" style={{ background: '#0E0E0E', border: '1px solid rgba(196,163,90,0.08)' }}>
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

      {/* ═══════════════════════════════════════════════
          SECTION 8 — COMPLETE YOUR COLLECTION
      ═══════════════════════════════════════════════ */}
      {completePair && completePair.length > 0 && (
        <section style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10 text-center" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Complete Your Legacy
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {completePair.map(p => (
                <Link key={p.to} to={p.to}
                  className="flex items-center justify-between p-6 group transition-all duration-300"
                  style={{ background: '#080808', border: '1px solid rgba(201,162,74,0.1)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.1)'}>
                  <div>
                    <p className="font-serif text-white font-bold" style={{ fontSize: '1.1rem' }}>{p.name}</p>
                    <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(240,235,225,0.3)' }}>{p.roast}</p>
                  </div>
                  <span className="font-mono text-sm transition-all group-hover:translate-x-1" style={{ color: `${ac}70` }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}