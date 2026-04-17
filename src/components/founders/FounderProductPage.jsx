import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import ProductImage from '../products/ProductImage';
import { ChevronRight, Flame, Star, Check, Coffee, Leaf, ShieldCheck } from 'lucide-react';
import FoundersStarterPack from '../bundles/FoundersStarterPack';
import ReviewsSection from '../reviews/ReviewsSection';
import { GoldStars } from '../reviews/ReviewCard';
import BrewGuide from './BrewGuide';

const FLAVOR_ICONS = {
  'Dark Chocolate': '🍫', 'Chocolate': '🍫', 'Cocoa': '🍫',
  'Smoke': '🌫️', 'Smoky': '🌫️',
  'Citrus': '🍋', 'Lemon': '🍋', 'Orange': '🍊',
  'Caramel': '🍮', 'Toffee': '🍯',
  'Almond': '🌰', 'Toasted Nut': '🌰', 'Praline': '🌰',
  'Honey': '🍯', 'Golden Honey': '🍯',
  'Vanilla': '🤍', 'Spice': '🌶️',
  'Berry': '🫐', 'Floral': '🌸',
  'Full Body': '⚫', 'Sweet Cream': '🥛',
  'Smooth, lingering finish': '✨', 'Smooth Finish': '✨',
  'Clean Finish': '✨', 'Sweet Finish': '✨',
  'Deep Roast': '🔥', 'Bittersweet Chocolate': '🍫',
  'Roasted Peanuts': '🥜', 'Sundried Citrus': '🍋',
};

const BREW_METHODS = [
  { name: 'Drip', icon: '☕', tip: '1–2 tbsp per 6 oz · Medium grind · 200°F' },
  { name: 'French Press', icon: '⬛', tip: 'Coarse grind · 4 min steep · Full immersion' },
  { name: 'Pour Over', icon: '◈', tip: 'Medium grind · Slow bloom · 30s pre-infusion' },
];

const WHY_YOULL_LOVE = [
  'Smooth, satisfying finish — no bitterness',
  'Bold, complex flavor that holds up to cream or black',
  'Small-batch roasted to order — never stale',
];

const TRUST_ITEMS = [
  { Icon: Flame, label: 'Fresh Roasted', sub: 'Every bag made to order' },
  { Icon: Leaf, label: 'Premium Beans', sub: 'Sourced for character' },
  { Icon: ShieldCheck, label: 'Satisfaction Guaranteed', sub: 'Love it or we make it right' },
];

const ROAST_LEVELS = ['Light', 'Medium-Light', 'Medium', 'Medium-Dark', 'Dark', 'Extra Dark'];

function RoastIndicator({ roast, accent }) {
  const idx = ROAST_LEVELS.findIndex(r => roast?.toLowerCase().includes(r.toLowerCase()));
  const active = idx >= 0 ? idx : 3;
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: `${accent}70` }}>Roast Level</p>
      <div className="flex items-center gap-1.5 mb-2">
        {ROAST_LEVELS.map((level, i) => (
          <div
            key={level}
            className="flex-1 h-2 rounded-sm"
            style={{
              background: i <= active
                ? `rgba(${201 - i * 8}, ${162 - i * 12}, 74, ${0.4 + i * 0.12})`
                : 'rgba(196,163,90,0.08)',
              border: i === active ? `1px solid ${accent}` : '1px solid transparent',
            }}
          />
        ))}
      </div>
      <p className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.45)' }}>{roast}</p>
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

const SAMPLE_REVIEWS = [
  { name: 'Marcus T.', location: 'Nashville, TN', rating: 5, text: 'The most heritage-forward coffee I\'ve ever tasted. Rich, complex, and worthy of the name it carries.' },
  { name: 'Sarah K.', location: 'Charleston, SC', rating: 5, text: 'Every morning feels like a deliberate act of legacy. I don\'t start my day without it.' },
  { name: 'James R.', location: 'Austin, TX', rating: 5, text: 'Heritage-crafted in the truest sense. Uncompromising quality from first pour to last drop.' },
];

export default function FounderProductPage({ data }) {
  const {
    title, subline, code, seriesNum, rarity, roast, price,
    shopifyHandle, founderStory, tastingNotes,
    histFacts, quote, completePair,
    accent, heroImage,
  } = data;

  const [activeImg, setActiveImg] = useState(0);
  const images = data.images || [heroImage];
  const ac = accent || '#C9A24A';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808', color: '#F0EBE1' }}>

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-5">
        <nav className="flex items-center gap-1.5 flex-wrap font-mono text-[10px]" style={{ letterSpacing: '0.08em' }}>
          <Link to="/" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Home</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <Link to="/CoffeeCollection" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Collection</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <span style={{ color: `${ac}70` }}>{title}</span>
        </nav>
      </div>

      {/* Cinematic hero image */}
      <section className="relative w-full mt-6 overflow-hidden" style={{ height: 'clamp(340px, 52vh, 580px)' }}>
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.7, filter: 'contrast(1.05)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #080808 0%, transparent 30%, transparent 70%, #080808 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, #080808 0%, transparent 40%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #080808 0%, transparent 25%)' }} />
        <div className="absolute top-5 left-5 md:left-10">
          <span className="font-mono text-xs font-black tracking-widest px-3 py-1.5" style={{ background: ac, color: '#0B0B0B' }}>{code}</span>
        </div>
        {rarity === "FOUNDER'S EDITION" && (
          <div className="absolute top-5 right-5 md:right-10">
            <span className="font-mono text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5"
              style={{ background: 'rgba(196,163,90,0.15)', color: ac, border: `1px solid ${ac}40` }}>
              Founder's Edition
            </span>
          </div>
        )}
      </section>

      {/* ── MAIN PRODUCT SECTION ── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pt-12 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — Product details */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>

            {/* 1. Title */}
            <div className="mb-2">
              <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: `${ac}60` }}>
                {seriesNum} · Founders Series
              </p>
              <h1 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {title}
              </h1>
            </div>

            {/* Trust booster — rating under title */}
            <a href="#reviews" className="flex items-center gap-2 mb-5 w-fit group">
              <GoldStars rating={5} />
              <span className="font-mono text-[10px]" style={{ color: '#C9A24A' }}>4.8</span>
              <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>(200+ reviews)</span>
            </a>

            {/* 2. Hook */}
            <p className="font-heading mb-7" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.85)', fontWeight: 400, lineHeight: 1.85 }}>
              {subline || 'Bold character. Smooth conviction. Every cup carries a legacy.'}
            </p>

            <div className="h-px w-full mb-8" style={{ background: `linear-gradient(90deg, ${ac}30, transparent)` }} />

            {/* 3. Flavor Notes */}
            {tastingNotes?.length > 0 && (
              <div className="mb-8">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: `${ac}65` }}>Flavor Notes</p>
                <div className="flex flex-wrap gap-2">
                  {tastingNotes.map(note => (
                    <div key={note} className="flex items-center gap-2 px-3 py-2"
                      style={{ background: 'rgba(196,163,90,0.05)', border: '1px solid rgba(196,163,90,0.14)' }}>
                      <span style={{ fontSize: '1rem' }}>{FLAVOR_ICONS[note] || '☕'}</span>
                      <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.65)' }}>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Roast Level */}
            {roast && (
              <div className="mb-8">
                <RoastIndicator roast={roast} accent={ac} />
              </div>
            )}

            {/* 5. Brew Methods */}
            <div className="mb-10">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: `${ac}65` }}>Best Brewed As</p>
              <div className="grid grid-cols-3 gap-2">
                {BREW_METHODS.map(m => (
                  <div key={m.name} className="flex flex-col items-center text-center gap-2 p-4"
                    style={{ background: '#0F0F0F', border: '1px solid rgba(196,163,90,0.09)' }}>
                    <span style={{ fontSize: '1.4rem' }}>{m.icon}</span>
                    <p className="font-mono text-[9px] tracking-widest uppercase font-bold" style={{ color: ac }}>{m.name}</p>
                    <p className="font-mono text-[8px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.3)' }}>{m.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Brew Guide */}
            <BrewGuide roast={roast} accent={ac} />

          </motion.div>

          {/* RIGHT — Image + Purchase (sticky) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="flex flex-col gap-5 lg:sticky lg:top-24"
          >
            {/* Image */}
            <div className="relative">
              <ProductImage src={images[activeImg]} alt={title} variant="clean" aspectRatio="4/5" hoverScale={true} />
              {images.length > 1 && (
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-[9px] px-2 py-1" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.6)' }}>
                    {activeImg + 1} / {images.length}
                  </span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className="flex-1 overflow-hidden transition-all"
                    style={{ border: i === activeImg ? `1px solid ${ac}` : '1px solid rgba(196,163,90,0.1)', opacity: i === activeImg ? 1 : 0.5 }}>
                    <ProductImage src={img} alt="" variant="clean" aspectRatio="1/1" hoverScale={false} />
                  </button>
                ))}
              </div>
            )}

            {/* 6. Add-to-Cart */}
            <div className="p-6" style={{ background: '#0F0F0F', border: '1px solid rgba(196,163,90,0.15)' }}>
              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono font-black" style={{ fontSize: '2.2rem', color: ac }}>{price}</span>
                <span className="font-mono text-sm line-through" style={{ color: 'rgba(255,255,255,0.18)' }}>$21.99</span>
                <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5"
                  style={{ background: `${ac}15`, color: ac, border: `1px solid ${ac}25` }}>
                  Small-Batch
                </span>
              </div>

              {/* Why buy bullets — scan-friendly */}
              <ul className="space-y-2 mb-6">
                {WHY_YOULL_LOVE.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: ac }} />
                    <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.75)', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <AddToCartButton shopifyHandle={shopifyHandle} accent={ac} />
              <Link to="/TheTorchBox"
                className="mt-3 flex items-center justify-center py-3.5 font-mono uppercase tracking-[0.25em] transition-all hover:opacity-70"
                style={{ fontSize: '10px', border: '1px solid rgba(196,163,90,0.18)', color: 'rgba(196,163,90,0.55)' }}>
                + Add to Torch Box
              </Link>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-2">
              {TRUST_ITEMS.map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 py-4 px-2"
                  style={{ background: '#0C0C0C', border: '1px solid rgba(196,163,90,0.08)' }}>
                  <Icon className="w-4 h-4" style={{ color: ac }} />
                  <p className="font-heading text-[11px] font-semibold leading-tight" style={{ color: '#F0EBE1' }}>{label}</p>
                  <p className="font-mono text-[8px] leading-tight" style={{ color: 'rgba(240,235,225,0.3)' }}>{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex items-center gap-4 my-14">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.25))' }} />
          <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(196,163,90,0.35)' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.25), transparent)' }} />
        </div>
      </div>

      {/* 7. STORY SECTION */}
      <section className="max-w-[800px] mx-auto px-5 md:px-10 pb-16">
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: `${ac}60` }}>The Story</p>
        <div className="space-y-5">
          {(founderStory || []).slice(0, 2).map((p, i) => (
            <p key={i} style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.7)', lineHeight: 2, fontWeight: 300 }}>{p}</p>
          ))}
          {histFacts?.length > 0 && (
            <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.45)', lineHeight: 1.95, fontWeight: 300, fontStyle: 'italic', borderLeft: `2px solid ${ac}30`, paddingLeft: '1.25rem' }}>
              {histFacts[0]}
            </p>
          )}
        </div>
      </section>

      {/* Founder Quote */}
      {quote && (
        <section style={{ backgroundColor: '#0C0C0C', borderTop: '1px solid rgba(196,163,90,0.06)', borderBottom: '1px solid rgba(196,163,90,0.06)' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-10 py-20 text-center">
            <blockquote className="font-serif italic mb-5"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', color: 'rgba(240,235,225,0.78)', lineHeight: 1.65 }}>
              "{quote.text}"
            </blockquote>
            <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: `${ac}55` }}>— {quote.author}</p>
          </div>
        </section>
      )}

      {/* Collectibility */}
      <section style={{ backgroundColor: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[680px] mx-auto px-5 md:px-10 py-20 text-center">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: `${ac}45` }}>The Torch Index</p>
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F0EBE1', fontWeight: 700 }}>
            Each blend retires. Forever.
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.35)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
            Once retired, a blend joins the Archive — never to be roasted again.
          </p>
          <Link to="/CoffeeCollection"
            className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-55"
            style={{ color: `${ac}60`, borderBottom: '1px solid rgba(201,162,74,0.22)', paddingBottom: '3px' }}>
            View Full Torch Index
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-20">
        <ReviewsSection productHandle={shopifyHandle} />
      </section>

      {/* Founders Starter Pack */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <FoundersStarterPack compact={true} />
      </div>

      {/* Complete Your Collection */}
      {completePair?.length > 0 && (
        <section style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-10 text-center" style={{ color: `${ac}45` }}>
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
                    <p className="font-serif text-white font-bold" style={{ fontSize: '1.05rem' }}>{p.name}</p>
                    <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(240,235,225,0.3)' }}>{p.roast}</p>
                  </div>
                  <span className="font-mono text-sm transition-all group-hover:translate-x-1" style={{ color: `${ac}65` }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}