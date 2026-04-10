import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

export default function FounderProductPage({ data }) {
  const {
    title, subline, code, seriesNum, rarity, roast, notes, price,
    shopifyHandle, hook, founderStory, theMoment, tastingNotes,
    roastProfile, brewGuide, whoFor, histFacts, quote, completePair,
    accent, heroImage,
  } = data;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* ABOVE THE FOLD */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroImage} alt={title} className="w-full h-full object-cover" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.97) 50%, rgba(0,0,0,0.5) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)' }} />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 py-24 w-full">
          <div className="max-w-[600px]">
            {/* Identity bar */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="font-mono text-[10px] font-bold tracking-wider px-2.5 py-1" style={{ color: accent, border: `1px solid ${accent}40`, background: `${accent}10` }}>{code}</span>
              <span className="font-mono text-[9px] text-gray-600">|</span>
              <span className="font-mono text-[9px] text-gray-500">{seriesNum}</span>
              <span className="font-mono text-[9px] text-gray-600">|</span>
              <span className="font-mono text-[9px] font-bold" style={{ color: accent }}>{rarity}</span>
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-serif text-white leading-none mb-2" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800 }}>
              {title}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="font-mono text-sm mb-6" style={{ color: `${accent}99` }}>
              {subline}
            </motion.p>

            {/* Quick details */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="font-mono text-xs text-gray-500">{roast}</span>
              <span className="text-gray-700">·</span>
              <span className="font-mono text-xs text-gray-500">{notes}</span>
            </motion.div>

            {/* Price + CTA */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span className="font-mono font-bold text-2xl" style={{ color: accent }}>{price}</span>
                <span className="font-mono text-sm text-gray-600 line-through">$21.99</span>
              </div>
              <AddToCartButton shopifyHandle={shopifyHandle} accent={accent} />
            </motion.div>
            <p className="font-mono text-[10px] text-gray-600 tracking-wider">Part of the Founders Series — Collect them all.</p>

            {/* Bundle upsell */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-4 p-4 flex items-center justify-between gap-4 flex-wrap"
              style={{ background: `${accent}08`, border: `1px solid ${accent}25` }}>
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: accent }}>Complete Your Set</p>
                <p className="text-white text-sm font-heading font-bold">Add 2 more blends for $29.99</p>
                <p className="font-mono text-[10px] text-gray-600">$37.98 value → save $7.99</p>
              </div>
              <a href="https://torch-republic.com/products/founders-starter-pack"
                className="px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ border: `1px solid ${accent}50`, color: accent }}>
                Add Bundle →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOOK */}
      <section className="py-16 px-6 md:px-12 max-w-[800px] mx-auto text-center">
        <div className="h-px w-16 mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
        {hook.map((line, i) => (
          <p key={i} className="font-serif text-white mb-1" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>{line}</p>
        ))}
      </section>

      {/* THE FOUNDER */}
      <section className="py-16 px-6 md:px-12" style={{ borderTop: '1px solid rgba(200,164,77,0.08)' }}>
        <div className="max-w-[800px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: accent }}>The Founder</p>
          {founderStory.map((p, i) => (
            <p key={i} className="text-gray-300 leading-relaxed mb-3" style={{ fontSize: '1.05rem' }}>{p}</p>
          ))}
        </div>
      </section>

      {/* THE MOMENT */}
      <section className="py-28 px-6" style={{
        background: '#0A0E1A',
        borderTop: '1px solid rgba(196,163,90,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grain texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          opacity: 0.04,
        }} />
        <div className="max-w-[640px] mx-auto text-center relative z-10">
          {/* Top rule */}
          <div className="w-24 h-px mx-auto mb-12" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-12" style={{ color: `${accent}55` }}>The Moment</p>
          {theMoment.map((line, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="font-serif mb-5" style={{ fontSize: 'clamp(1.35rem, 2.8vw, 2rem)', color: accent, fontStyle: 'italic', letterSpacing: '0.04em', lineHeight: 2.0 }}>
              {line}
            </motion.p>
          ))}
          {/* Bottom rule */}
          <div className="w-24 h-px mx-auto mt-12" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
        </div>
      </section>

      {/* TASTING + ROAST PROFILE + BREW GUIDE */}
      <section className="py-20 px-6 md:px-12" style={{ borderTop: '1px solid rgba(200,164,77,0.08)' }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tasting Notes */}
          <div className="p-7" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(200,164,77,0.1)' }}>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: accent }}>Tasting Notes</p>
            <div className="space-y-2">
              {tastingNotes.map(n => (
                <div key={n} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
                  <span className="font-mono text-sm text-gray-300">{n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Roast Profile */}
          <div className="p-7" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(200,164,77,0.1)' }}>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: accent }}>Roast Profile</p>
            <div className="space-y-2">
              {roastProfile.map(r => (
                <div key={r} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
                  <span className="font-mono text-sm text-gray-300">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brew Guide */}
          <div className="p-7" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(200,164,77,0.1)' }}>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: accent }}>Brew Guide</p>
            <div className="space-y-2">
              {brewGuide.map(b => (
                <div key={b} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
                  <span className="font-mono text-xs text-gray-400">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-16 px-6 md:px-12" style={{ borderTop: '1px solid rgba(200,164,77,0.06)' }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6 text-center" style={{ color: accent }}>Built For</p>
          <div className="flex flex-wrap justify-center gap-3">
            {whoFor.map(w => (
              <span key={w} className="font-mono text-xs px-4 py-2" style={{ border: `1px solid ${accent}28`, color: 'rgba(232,223,175,0.6)' }}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORICAL COFFEE FACTS */}
      <section className="py-16 px-6 md:px-12" style={{ background: '#030303', borderTop: '1px solid rgba(200,164,77,0.06)' }}>
        <div className="max-w-[800px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: accent }}>Historical Coffee Facts</p>
          <div className="space-y-3">
            {histFacts.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-4" style={{ background: 'rgba(200,164,77,0.03)', border: '1px solid rgba(200,164,77,0.08)' }}>
                <span className="font-mono text-xs font-bold shrink-0" style={{ color: accent }}>0{i + 1}</span>
                <span className="text-gray-400 text-sm leading-relaxed">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-20 px-6" style={{ borderTop: '1px solid rgba(200,164,77,0.06)' }}>
        <div className="max-w-[700px] mx-auto text-center">
          <div className="h-px w-12 mx-auto mb-10" style={{ background: accent }} />
          <blockquote className="font-serif text-white mb-4" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.4 }}>
            "{quote.text}"
          </blockquote>
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: `${accent}80` }}>— {quote.author}</p>
          <div className="h-px w-12 mx-auto mt-10" style={{ background: accent }} />
        </div>
      </section>

      {/* PART OF THE FOUNDERS SERIES */}
      <section className="py-16 px-6 md:px-12 text-center" style={{ background: '#030303', borderTop: '1px solid rgba(200,164,77,0.08)' }}>
        <div className="max-w-[600px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: accent }}>Part of the Founders Series</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">A growing collection of blends inspired by the individuals who shaped history.</p>
          <p className="text-gray-500 text-sm mb-1">Each one crafted to reflect a different kind of strength.</p>
          <p className="text-gray-500 text-sm mb-8">For those who carry the flame.</p>
          <p className="font-mono text-xs font-bold mb-8" style={{ color: accent }}>Collect them all.</p>
          <a href="https://torch-republic.com/collections/coffee"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-mono text-xs tracking-[0.25em] uppercase"
            style={{ border: `1px solid ${accent}40`, color: accent }}>
            Shop All Coffee →
          </a>
        </div>
      </section>

      {/* COMPLETE YOUR COLLECTION */}
      <section className="py-16 px-6 md:px-12" style={{ borderTop: '1px solid rgba(200,164,77,0.08)' }}>
        <div className="max-w-[1000px] mx-auto">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8 text-center" style={{ color: accent }}>Complete Your Collection</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completePair.map(p => (
              <Link key={p.to} to={p.to}
                className="flex items-center justify-between p-5 group transition-all"
                style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(200,164,77,0.1)' }}>
                <div>
                  <p className="font-serif text-white text-lg font-bold group-hover:text-primary transition-colors">{p.name}</p>
                  <p className="font-mono text-xs text-gray-600">{p.roast}</p>
                </div>
                <span className="font-mono text-xs" style={{ color: accent }}>→</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://torch-republic.com/products/founders-starter-pack"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-heading font-black text-sm tracking-[0.15em] uppercase"
              style={{ background: `linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, ${accent} 100%)`, color: '#fff' }}>
              Build Your Founders Series
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}