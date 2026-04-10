import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

const BREW_METHODS = [
  { name: 'Drip', icon: '☕', tip: '1–2 tbsp per 6oz · Medium grind' },
  { name: 'French Press', icon: '⬛', tip: 'Coarse grind · 4 min steep' },
  { name: 'Pour Over', icon: '◈', tip: 'Medium grind · Slow bloom' },
];

function Divider({ accent }) {
  return (
    <div className="w-12 h-px my-16 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
  );
}

export default function FounderProductPage({ data }) {
  const {
    title, subline, code, seriesNum, rarity, roast, notes, price,
    shopifyHandle, hook, founderStory, theMoment, tastingNotes,
    roastProfile, brewGuide, whoFor, histFacts, quote, completePair,
    accent, heroImage,
  } = data;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>

      {/* ── 1. HERO / TOP SECTION ─────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden"
            style={{ background: '#111111', aspectRatio: '1/1' }}
          >
            <img
              src={heroImage}
              alt={title}
              className="w-full h-full object-cover"
              style={{ opacity: 0.85 }}
            />
            {/* Code stamp */}
            <div className="absolute top-4 left-4">
              <span className="font-mono text-xs font-black tracking-widest px-3 py-1.5" style={{ background: accent, color: '#0B0B0B' }}>
                {code}
              </span>
            </div>
            {rarity === "FOUNDER'S EDITION" && (
              <div className="absolute bottom-4 right-4">
                <span className="font-mono text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5" style={{ background: '#C9A24A', color: '#0B0B0B' }}>
                  Founder's Edition
                </span>
              </div>
            )}
          </motion.div>

          {/* Right: info + cart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6 pt-2 md:pt-8"
          >
            {/* Series label */}
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.5)' }}>
              {seriesNum} · {roast}
            </p>

            {/* Title */}
            <h1 className="font-serif leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.01em' }}>
              {title}
            </h1>

            {/* Hook */}
            <p style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.45)', lineHeight: 1.8, fontWeight: 300 }}>
              Crafted for thinkers, builders, and patriots.
            </p>

            {/* Tasting notes inline */}
            <p className="font-mono text-xs tracking-widest" style={{ color: 'rgba(201,162,74,0.6)' }}>
              {tastingNotes.join(' · ')}
            </p>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: 'rgba(201,162,74,0.1)' }} />

            {/* ── 2. ADD TO CART ── */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono font-black text-3xl" style={{ color: accent }}>{price}</span>
                <span className="font-mono text-sm line-through" style={{ color: 'rgba(240,235,225,0.2)' }}>$21.99</span>
                <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-1" style={{ background: 'rgba(201,162,74,0.12)', color: accent, border: '1px solid rgba(201,162,74,0.2)' }}>
                  Small-Batch
                </span>
              </div>

              <AddToCartButton shopifyHandle={shopifyHandle} accent={accent} />

              <p className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.2)' }}>
                Free shipping over $50 · Roasted to order
              </p>
            </div>

            {/* Bundle nudge */}
            <div className="p-5" style={{ background: '#111111', border: '1px solid rgba(201,162,74,0.12)' }}>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: 'rgba(201,162,74,0.5)' }}>Complete Your Set</p>
              <p className="text-sm font-bold mb-3" style={{ color: '#F0EBE1' }}>Add 2 more blends for $49.99</p>
              <a
                href="https://torch-republic.com/products/founders-starter-pack"
                className="font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-70"
                style={{ color: accent, borderBottom: `1px solid ${accent}40`, paddingBottom: '2px' }}
              >
                Shop the Bundle →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. STORY SECTION ─────────────────────────────── */}
      <section className="max-w-[720px] mx-auto px-6 md:px-12 py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10" style={{ color: 'rgba(201,162,74,0.45)' }}>
            The Founder
          </p>
          <div className="space-y-5">
            {founderStory.map((p, i) => (
              <p key={i} style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.9, fontWeight: 300 }}>{p}</p>
            ))}
          </div>

          {quote && (
            <div className="mt-14 pt-10" style={{ borderTop: '1px solid rgba(201,162,74,0.1)' }}>
              <blockquote className="font-serif" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: 'rgba(240,235,225,0.7)', fontStyle: 'italic', lineHeight: 1.5 }}>
                "{quote.text}"
              </blockquote>
              <p className="font-mono text-[10px] tracking-widest uppercase mt-4" style={{ color: 'rgba(201,162,74,0.45)' }}>
                — {quote.author}
              </p>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── 4. FLAVOR PROFILE ─────────────────────────────── */}
      <section style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-24">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-14 text-center" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Flavor Profile
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tasting Notes */}
            <div className="flex flex-col gap-5">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: accent }}>Tasting Notes</p>
              <div className="space-y-3">
                {tastingNotes.map(n => (
                  <div key={n} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                    <span style={{ color: 'rgba(240,235,225,0.65)', fontSize: '0.95rem' }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Roast Profile */}
            <div className="flex flex-col gap-5">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: accent }}>Roast Profile</p>
              <div className="space-y-3">
                {roastProfile.map(r => (
                  <div key={r} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(201,162,74,0.4)' }} />
                    <span style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem' }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It's For */}
            <div className="flex flex-col gap-5">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: accent }}>Built For</p>
              <div className="flex flex-wrap gap-2">
                {whoFor.map(w => (
                  <span key={w} className="font-mono text-[10px] px-3 py-1.5" style={{ border: '1px solid rgba(201,162,74,0.18)', color: 'rgba(240,235,225,0.4)' }}>
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BREW GUIDE ─────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-24">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-14 text-center" style={{ color: 'rgba(201,162,74,0.45)' }}>
          Brew Guide
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BREW_METHODS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-7 flex flex-col gap-4"
              style={{ background: '#111111', border: '1px solid rgba(201,162,74,0.08)' }}
            >
              <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: accent }}>{m.name}</p>
              <p className="font-mono text-xs" style={{ color: 'rgba(240,235,225,0.35)', lineHeight: 1.7 }}>{m.tip}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6. COLLECTIBILITY ─────────────────────────────── */}
      <section style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-px h-12 mx-auto mb-12" style={{ background: `linear-gradient(to bottom, transparent, ${accent})` }} />
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Part of the Founders Collection
            </p>
            <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#F0EBE1', fontWeight: 700, lineHeight: 1.2 }}>
              Each blend retires. Forever.
            </h2>
            <p style={{ color: 'rgba(240,235,225,0.4)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              The Founders Series assigns every product a permanent identity number. CORE blends stay. Founder's Edition blends retire to the Archive. Once they're gone, they're gone.
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap mb-12">
              <div className="text-center">
                <p className="font-mono text-2xl font-black" style={{ color: accent }}>{code}</p>
                <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,225,0.25)' }}>Your Blend</p>
              </div>
              <div className="h-8 w-px" style={{ background: 'rgba(201,162,74,0.15)' }} />
              <div className="text-center">
                <p className="font-mono text-2xl font-black" style={{ color: rarity === "FOUNDER'S EDITION" ? '#C9A24A' : '#6B7280' }}>
                  {rarity}
                </p>
                <p className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,225,0.25)' }}>Status</p>
              </div>
            </div>
            <Link
              to="/CoffeeCollection"
              className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-60"
              style={{ color: 'rgba(201,162,74,0.6)', borderBottom: '1px solid rgba(201,162,74,0.25)', paddingBottom: '3px' }}
            >
              View Full Torch Index
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 7. TRUST / REVIEWS ─────────────────────────────── */}
      {histFacts && histFacts.length > 0 && (
        <section className="max-w-[800px] mx-auto px-6 md:px-12 py-24">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-12" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Historical Notes
          </p>
          <div className="space-y-4">
            {histFacts.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-6 p-6"
                style={{ background: '#111111', border: '1px solid rgba(201,162,74,0.06)' }}
              >
                <span className="font-mono text-xs font-black flex-shrink-0" style={{ color: 'rgba(201,162,74,0.3)' }}>0{i + 1}</span>
                <p style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}>{f}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── COMPLETE YOUR COLLECTION ─────────────────────────── */}
      {completePair && completePair.length > 0 && (
        <section style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10 text-center" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Complete Your Collection
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {completePair.map(p => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="flex items-center justify-between p-6 group transition-all duration-300"
                  style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.1)' }}
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