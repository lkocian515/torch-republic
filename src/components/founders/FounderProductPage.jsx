import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { ChevronRight, Star, FlameKindling, Package, Coffee, Clock } from 'lucide-react';

// ── Flavor note icons map
const FLAVOR_ICONS = {
  'dark chocolate': '🍫',
  'chocolate': '🍫',
  'cocoa': '🍫',
  'smoke': '💨',
  'smoky': '💨',
  'citrus': '🍊',
  'lemon': '🍋',
  'orange': '🍊',
  'caramel': '🍯',
  'toffee': '🍯',
  'honey': '🍯',
  'almond': '🌰',
  'nut': '🌰',
  'toasted nut': '🌰',
  'praline': '🌰',
  'roasted peanuts': '🥜',
  'vanilla': '🤍',
  'cream': '🤍',
  'sweet cream': '🤍',
  'spice': '🌶️',
  'subtle spice': '🌶️',
  'berry': '🫐',
  'fruit': '🍑',
  'floral': '🌸',
  'earthy': '🌍',
  'full body': '⚫',
  'smooth': '✨',
  'clean finish': '✨',
  'smooth finish': '✨',
  'lingering finish': '✨',
  'deep roast': '🔥',
  'bittersweet chocolate': '🍫',
  'sundried citrus': '🍊',
  'golden honey': '🍯',
  'sweet finish': '✨',
};

function getFlavorIcon(note) {
  const key = note.toLowerCase();
  for (const [k, v] of Object.entries(FLAVOR_ICONS)) {
    if (key.includes(k)) return v;
  }
  return '◆';
}

const BREW_METHODS = [
  { name: 'Drip', emoji: '☕', tip: '1–2 tbsp per 6 oz · Medium grind · 200°F' },
  { name: 'French Press', emoji: '⬛', tip: 'Coarse grind · 4 min steep · Full immersion' },
  { name: 'Pour Over', emoji: '◈', tip: 'Medium grind · Slow bloom · 30s pre-infusion' },
];

const TRUST_STRIP = [
  { icon: FlameKindling, label: 'Small Batch Roasted', sub: 'Every bag, made to order' },
  { icon: Package, label: 'Premium Beans', sub: 'Sourced for quality, not cost' },
  { icon: Coffee, label: 'Built for Daily Ritual', sub: 'Not a trend. A practice.' },
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

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-12">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.25))' }} />
      <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(196,163,90,0.4)' }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.25), transparent)' }} />
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

  const ac = accent || '#C9A24A';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808', color: '#F0EBE1' }}>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-5">
        <nav className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>
          <Link to="/" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Home</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.15)' }} />
          <Link to="/CoffeeCollection" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Coffee</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.15)' }} />
          <span style={{ color: 'rgba(196,163,90,0.65)' }}>{title}</span>
        </nav>
      </div>

      {/* ════════════════════════════════════════
          SECTION 1 — CINEMATIC HERO IMAGE
      ════════════════════════════════════════ */}
      <section className="relative w-full mt-6 overflow-hidden" style={{ maxHeight: '70vh', minHeight: '420px' }}>
        <motion.img
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
          style={{ maxHeight: '70vh', minHeight: '420px', objectPosition: 'center 30%' }}
        />
        {/* Black fade edges */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #080808 0%, transparent 25%, transparent 75%, #080808 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, #080808 0%, transparent 40%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #080808 0%, transparent 25%)' }} />

        {/* Code badge */}
        <div className="absolute top-6 left-8">
          <span className="font-mono text-xs font-black tracking-widest px-3 py-1.5" style={{ background: ac, color: '#0B0B0B' }}>
            {code}
          </span>
        </div>
        {rarity === "FOUNDER'S EDITION" && (
          <div className="absolute bottom-8 right-8">
            <span className="font-mono text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5" style={{ background: '#C9A24A', color: '#0B0B0B' }}>
              Founder's Edition
            </span>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════
          SECTION 2 — TITLE + BUY
      ════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pt-10 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT: Title + Story */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6" style={{ background: ac }} />
              <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: `${ac}88` }}>
                {seriesNum} · {roast}
              </p>
            </div>

            {/* Title */}
            <h1 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.015em' }}>
              {title}
            </h1>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-8" style={{ color: `${ac}55` }}>
              {subline || 'Heritage-Crafted · Small-Batch Excellence'}
            </p>

            {/* ── STORY (3–4 lines, always visible) ── */}
            <div className="space-y-4 mb-8" style={{ borderLeft: `2px solid ${ac}25`, paddingLeft: '1.25rem' }}>
              {(founderStory || []).slice(0, 4).map((p, i) => (
                <p key={i} style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.52)', lineHeight: 1.9, fontWeight: 300 }}>{p}</p>
              ))}
            </div>

            {/* ── FLAVOR PROFILE ICONS ── */}
            {tastingNotes && tastingNotes.length > 0 && (
              <>
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: `${ac}60` }}>Flavor Profile</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {tastingNotes.map(note => (
                    <div key={note} className="flex items-center gap-2 px-3 py-2"
                      style={{ background: 'rgba(196,163,90,0.04)', border: '1px solid rgba(196,163,90,0.12)' }}>
                      <span style={{ fontSize: '1rem' }}>{getFlavorIcon(note)}</span>
                      <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.5)' }}>{note}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* RIGHT: Price + Buy + Trust */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6 lg:sticky lg:top-24"
          >
            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="font-mono font-black" style={{ fontSize: '2.2rem', color: ac }}>{price}</span>
              <span className="font-mono text-sm line-through" style={{ color: 'rgba(240,235,225,0.18)' }}>$21.99</span>
            </div>

            {/* Add to cart */}
            <AddToCartButton shopifyHandle={shopifyHandle} accent={ac} />
            <Link to="/TheTorchBox"
              className="flex items-center justify-center py-3.5 font-mono uppercase tracking-[0.25em] transition-all hover:opacity-70"
              style={{ fontSize: '10px', border: '1px solid rgba(196,163,90,0.2)', color: 'rgba(196,163,90,0.6)' }}>
              + Add to Torch Box Subscription
            </Link>

            {/* Shipping note */}
            <p className="font-mono text-[10px] text-center" style={{ color: 'rgba(240,235,225,0.18)' }}>
              Roasted to order · Ships within 2–3 business days
            </p>

            {/* ── TRUST STRIP ── */}
            <div className="mt-2" style={{ borderTop: '1px solid rgba(196,163,90,0.08)', paddingTop: '1.5rem' }}>
              <div className="space-y-3">
                {TRUST_STRIP.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-4 px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(196,163,90,0.07)' }}>
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: ac }} />
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(240,235,225,0.6)' }}>{label}</p>
                      <p className="font-mono text-[9px] mt-0.5" style={{ color: 'rgba(240,235,225,0.25)' }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <GoldDivider />
      </div>

      {/* ════════════════════════════════════════
          SECTION 3 — WHY IT EXISTS (historical)
      ════════════════════════════════════════ */}
      {histFacts && histFacts.length > 0 && (
        <section className="max-w-[800px] mx-auto px-5 md:px-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: `${ac}55` }}>Why It Exists</p>
            <div className="space-y-5">
              {histFacts.map((f, i) => (
                <div key={i} className="flex items-start gap-5 p-5"
                  style={{ background: '#111', border: '1px solid rgba(201,162,74,0.06)' }}>
                  <span className="font-mono text-xs font-black flex-shrink-0 mt-0.5" style={{ color: `${ac}35` }}>0{i + 1}</span>
                  <p style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300 }}>{f}</p>
                </div>
              ))}
            </div>
            {quote && (
              <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(201,162,74,0.08)' }}>
                <blockquote className="font-serif italic" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', color: 'rgba(240,235,225,0.65)', lineHeight: 1.6 }}>
                  "{quote.text}"
                </blockquote>
                <p className="font-mono text-[9px] tracking-widest uppercase mt-4" style={{ color: `${ac}50` }}>— {quote.author}</p>
              </div>
            )}
          </motion.div>
        </section>
      )}

      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <GoldDivider />
      </div>

      {/* ════════════════════════════════════════
          SECTION 4 — BREW GUIDE
      ════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${ac}55` }}>Brew Guide</p>
          <h2 className="font-serif mb-10" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, color: '#F0EBE1' }}>
            Your Method. Your Ritual.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BREW_METHODS.map((m) => (
              <div key={m.name} className="p-6 flex flex-col gap-4"
                style={{ background: '#0E0E0E', border: '1px solid rgba(201,162,74,0.08)' }}>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '1.6rem' }}>{m.emoji}</span>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: ac }}>{m.name}</p>
                </div>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(240,235,225,0.35)', lineHeight: 1.85 }}>{m.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <GoldDivider />
      </div>

      {/* ════════════════════════════════════════
          SECTION 5 — COLLECTIBILITY
      ════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[720px] mx-auto px-5 md:px-10 py-20 text-center">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: `${ac}45` }}>
            Part of the Founders Collection
          </p>
          <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#F0EBE1', fontWeight: 700, lineHeight: 1.2 }}>
            Each blend retires. Forever.
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.35)', lineHeight: 1.95, fontWeight: 300, fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 2.5rem' }}>
            Every Founders Series product carries a permanent identity number. Core blends endure. Founder's Edition blends retire to the Archive — once gone, they're gone.
          </p>
          <div className="flex items-center justify-center gap-10 flex-wrap mb-10">
            <div className="text-center">
              <p className="font-mono text-2xl font-black" style={{ color: ac }}>{code}</p>
              <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,225,0.2)' }}>Your Blend</p>
            </div>
            <div className="h-8 w-px" style={{ background: 'rgba(201,162,74,0.15)' }} />
            <div className="text-center">
              <p className="font-mono text-xl font-black" style={{ color: rarity === "FOUNDER'S EDITION" ? ac : 'rgba(255,255,255,0.35)' }}>
                {rarity}
              </p>
              <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,225,0.2)' }}>Status</p>
            </div>
          </div>
          <Link to="/CoffeeCollection"
            className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-55"
            style={{ color: `${ac}65`, borderBottom: `1px solid ${ac}25`, paddingBottom: '3px' }}>
            View Full Torch Index
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 6 — REVIEWS
      ════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${ac}45` }}>Verified Reviews</p>
            <div className="flex items-center gap-3">
              <Stars n={5} />
              <span className="font-serif text-white font-bold" style={{ fontSize: '1.4rem' }}>5.0</span>
              <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>from 200+ orders</span>
            </div>
          </div>
          <Link to="/Reviews"
            className="font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-55"
            style={{ color: `${ac}55`, borderBottom: `1px solid ${ac}22`, paddingBottom: '3px' }}>
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
              style={{ background: '#0E0E0E', border: '1px solid rgba(196,163,90,0.07)' }}
            >
              <Stars n={r.rating} />
              <p style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.52)', lineHeight: 1.85, fontStyle: 'italic', fontWeight: 300 }}>
                "{r.text}"
              </p>
              <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(196,163,90,0.07)' }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>{r.name}</span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.18)' }}>{r.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 7 — COMPLETE YOUR COLLECTION
      ════════════════════════════════════════ */}
      {completePair && completePair.length > 0 && (
        <section style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10 text-center" style={{ color: `${ac}45` }}>
              Complete Your Legacy
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {completePair.map(p => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="flex items-center justify-between p-6 group transition-all duration-300"
                  style={{ background: '#080808', border: '1px solid rgba(201,162,74,0.1)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.1)'}
                >
                  <div>
                    <p className="font-serif text-white font-bold" style={{ fontSize: '1.1rem' }}>{p.name}</p>
                    <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(240,235,225,0.28)' }}>{p.roast}</p>
                  </div>
                  <span className="font-mono text-sm transition-transform group-hover:translate-x-1" style={{ color: `${ac}55` }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}