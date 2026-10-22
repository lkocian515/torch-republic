import React, { useState, useEffect } from 'react';
import ReserveDifferenceSection from '../components/reserve/ReserveDifferenceSection';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { getShopifyCartUrl } from '@/lib/shopifyCheckout';

const GOLD = '#C4A35A';
const RG = '#E6B7AD';

function getCartUrl(qty = 1) {
  return getShopifyCartUrl('torchbearer-premium-instant-coffee', qty);
}

const PRODUCT_IMAGES = [
  {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5e731e05f_file_00000000219c822f89492705850fcb90.png',
    alt: 'Torchbearer Instant Classic Coffee — 3oz black bag',
  },
];

const TASTING_NOTES = [
  {
    icon: '🌰',
    label: 'Toasted Almond',
    desc: 'Warm, smooth nuttiness with a refined finish.',
  },
  {
    icon: '🫐',
    label: 'Berry Brightness',
    desc: 'Subtle fruit acidity that adds complexity and liveliness.',
  },
  {
    icon: '🍬',
    label: 'Sweet Toffee',
    desc: 'Rich sweetness and balance throughout the cup.',
  },
];

const ORIGIN_CARDS = [
  { label: 'Elevation', value: '1,400–1,800 MASL' },
  { label: 'Process', value: 'Washed' },
  { label: 'Soil', value: 'Volcanic' },
  { label: 'Varietals', value: 'Typica, Bourbon, Arusha' },
];

const BENEFITS = [
  'Single-Origin Papua New Guinea',
  'Freeze-Dried For Maximum Flavor',
  '100% Arabica Coffee',
  'Medium Roast',
  '27 Servings Per Tube',
];

const SPECS = [
  { label: 'Origin', value: 'Papua New Guinea Highlands' },
  { label: 'Process', value: 'Washed' },
  { label: 'Roast', value: 'Medium' },
  { label: 'Elevation', value: '1,400–1,800 MASL' },
  { label: 'Varietals', value: 'Typica · Bourbon · Arusha' },
  { label: 'Size', value: '54g Tube · ~27 Servings' },
  { label: 'Preparation', value: 'Freeze-Dried Instant' },
];

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Torchbearer() {
  const [qty, setQty] = useState(1);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useSEO({
    title: 'Torchbearer Instant Coffee | Torch Republic Reserve Collection',
    description: 'Torchbearer Reserve is a premium single-origin instant coffee from Papua New Guinea. Medium roast with notes of toasted almond, berry brightness, and sweet toffee. 27 servings. No machine needed.',
    url: '/torchbearer',
    type: 'product',
    product: {
      name: 'Torchbearer™ Reserve',
      description: 'Single-origin Papua New Guinea instant coffee. Medium roast. 27 servings per tube. No machine needed.',
      price: 24.99,
      sku: 'torchbearer-premium-instant-coffee',
    },
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F5EF' }}>

      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: '#F8F5EF',
          borderBottom: `1px solid ${GOLD}20`,
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(196,163,90,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Gold top line */}
        <div style={{ height: '2px', background: `linear-gradient(90deg, transparent 0%, ${GOLD} 40%, ${RG} 70%, transparent 100%)` }} />

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: Image Gallery */}
            <FadeIn>
              <div className="relative">
                {/* Main image */}
                <div
                  className="relative overflow-hidden rounded-sm flex items-center justify-center"
                  style={{
                    background: '#FBF8F1',
                    border: `1px solid ${GOLD}40`,
                    minHeight: '420px',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${GOLD}22 0%, transparent 70%)` }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      src={PRODUCT_IMAGES[activeImg].src}
                      alt={PRODUCT_IMAGES[activeImg].alt}
                      className="w-full object-contain relative z-10"
                      style={{ maxHeight: '460px', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.85))' }}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Prev / Next arrows */}
                  <button
                    onClick={() => setActiveImg((activeImg - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-sm transition-opacity hover:opacity-70"
                    style={{ background: 'rgba(255,255,255,0.9)', border: `1px solid ${GOLD}25` }}
                  >
                    <ChevronLeft className="w-4 h-4" style={{ color: '#9A7A24' }} />
                  </button>
                  <button
                    onClick={() => setActiveImg((activeImg + 1) % PRODUCT_IMAGES.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 rounded-sm transition-opacity hover:opacity-70"
                    style={{ background: 'rgba(255,255,255,0.9)', border: `1px solid ${GOLD}25` }}
                  >
                    <ChevronRight className="w-4 h-4" style={{ color: '#9A7A24' }} />
                  </button>
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2 mt-3">
                  {PRODUCT_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className="flex-1 overflow-hidden rounded-sm transition-all"
                      style={{
                        border: i === activeImg ? `2px solid ${GOLD}` : `1px solid ${GOLD}20`,
                        background: '#FBF8F1',
                        opacity: i === activeImg ? 1 : 0.55,
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full object-cover"
                        style={{ height: '64px', objectPosition: 'center' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right: Product Info */}
            <FadeIn delay={0.1}>
              <div>
                {/* Premium collection badge */}
                <div
                  className="inline-flex items-center gap-2 mb-5 px-3 py-1.5"
                  style={{ background: `${GOLD}0D`, border: `1px solid ${GOLD}30`, borderRadius: '2px' }}
                >
                  <span className="font-mono text-[7px] tracking-[0.45em] uppercase" style={{ color: '#9A7A24' }}>
                    Torchbearer Reserve · Pure Instant Coffee · No Mushrooms
                  </span>
                </div>

                <h1
                  className="font-serif font-bold mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    color: '#3F3027',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                  }}
                >
                  Torchbearer™ Reserve
                </h1>
                <p
                  className="font-mono tracking-[0.3em] uppercase mb-2"
                  style={{ fontSize: '0.75rem', color: '#9A7A24', fontWeight: 500 }}
                >
                  Premium Single-Origin Instant Coffee · 27 Servings
                </p>
                {/* Premium divider */}
                <div className="mb-6" style={{ height: '1px', background: `linear-gradient(90deg, ${GOLD}50 0%, transparent 60%)`, maxWidth: '220px' }} />

                {/* Stars */}
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#9A7A24' }} />
                  ))}
                  <span className="font-mono text-[8px] tracking-[0.15em] uppercase ml-2" style={{ color: '#9A7A24' }}>
                    Premium Blend
                  </span>
                </div>

                <p
                  className="font-heading mb-8"
                  style={{ fontSize: '0.95rem', color: '#6A5A4A', lineHeight: 1.8, maxWidth: '380px' }}
                >
                  Single-Origin Papua New Guinea · Medium Roast · 27 Servings
                </p>

                {/* Tasting notes preview */}
                <div className="flex gap-6 mb-8 pb-8" style={{ borderBottom: `1px solid ${GOLD}40` }}>
                  {TASTING_NOTES.map((n) => (
                    <div key={n.label} className="text-center">
                      <div className="text-2xl mb-1">{n.icon}</div>
                      <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: `#9A7A24` }}>
                        {n.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-serif font-bold text-3xl" style={{ color: '#3F3027' }}>$24.99</span>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: '#9A8A7A' }}>
                    54g · 27 servings
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: '#6A5A4A' }}>Qty</span>
                  <div
                    className="flex items-center"
                    style={{ border: `1px solid ${GOLD}30`, borderRadius: '2px' }}
                  >
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 flex items-center justify-center font-mono text-lg transition-colors hover:opacity-70"
                      style={{ color: '#9A7A24' }}
                    >
                      −
                    </button>
                    <span
                      className="w-10 h-10 flex items-center justify-center font-mono text-sm font-bold"
                      style={{ color: '#3F3027', borderLeft: `1px solid ${GOLD}20`, borderRight: `1px solid ${GOLD}20` }}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 flex items-center justify-center font-mono text-lg transition-colors hover:opacity-70"
                      style={{ color: '#9A7A24' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a
                    href={getCartUrl(qty)}
                    className="flex-1 text-center font-mono text-[10px] tracking-[0.3em] uppercase py-4 px-6 transition-all hover:opacity-90"
                    style={{ background: GOLD, color: '#0A0806', fontWeight: 700, borderRadius: '2px' }}
                  >
                    Add To Cart
                  </a>
                  <a
                    href={getCartUrl(qty)}
                    className="flex-1 text-center font-mono text-[10px] tracking-[0.3em] uppercase py-4 px-6 transition-all hover:opacity-80"
                    style={{
                      background: 'transparent',
                      color: '#9A7A24',
                      fontWeight: 600,
                      borderRadius: '2px',
                      border: `1px solid ${GOLD}50`,
                    }}
                  >
                    Subscribe & Save
                  </a>
                </div>

                {/* Trust line */}
                <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: '#9A8A7A' }}>
                  Free shipping $50+ · 30-day guarantee
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Description Section ── */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#FBF8F1', borderBottom: `1px solid ${GOLD}30` }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4 text-center" style={{ color: `#9A7A24` }}>
              About Torchbearer
            </p>
            <p
              className="font-heading text-center leading-loose"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#6A5A4A', lineHeight: 1.9 }}
            >
              Torchbearer is a premium single-origin instant coffee crafted from high-altitude Arabica beans sourced from the volcanic highlands of Papua New Guinea. Smooth, balanced, and exceptionally drinkable, this medium roast delivers notes of toasted almond, berry brightness, and sweet toffee in every cup.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              className="font-heading text-center mt-6"
              style={{ fontSize: '0.95rem', color: '#6A5A4A', lineHeight: 1.9 }}
            >
              Torchbearer is the no-frills option for those who want great coffee, quickly. Specialty-quality beans, freeze-dried for maximum convenience. Dissolves in seconds. Works with hot water, hot milk, or cold brew.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Tasting Notes ── */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#F8F5EF' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4 text-center" style={{ color: `#9A7A24` }}>
              Tasting Profile
            </p>
            <h2
              className="font-serif font-bold text-center mb-14"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#3F3027', letterSpacing: '-0.02em' }}
            >
              Toasted. Bright. Balanced.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TASTING_NOTES.map((note, i) => (
              <FadeIn key={note.label} delay={i * 0.1}>
                <div
                  className="text-center p-8"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${GOLD}40`,
                    borderRadius: '2px',
                  }}
                >
                  <div className="text-4xl mb-5">{note.icon}</div>
                  <h3
                    className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3 font-bold"
                    style={{ color: '#9A7A24' }}
                  >
                    {note.label}
                  </h3>
                  <p className="font-heading text-sm" style={{ color: '#6A5A4A', lineHeight: 1.7 }}>
                    {note.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Origin Section ── */}
      <section
        className="py-20 px-6 md:px-10 relative overflow-hidden"
        style={{ background: '#FBF8F1', borderTop: `1px solid ${GOLD}30` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(196,163,90,0.04) 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn className="text-center mb-14">
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4" style={{ color: `#9A7A24` }}>
              Origin
            </p>
            <h2
              className="font-serif font-bold mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#3F3027', letterSpacing: '-0.02em' }}
            >
              Sourced From the Highlands<br className="hidden md:block" /> of Papua New Guinea
            </h2>
            <p
              className="font-heading mx-auto"
              style={{ fontSize: '0.92rem', color: '#6A5A4A', lineHeight: 1.8, maxWidth: '560px' }}
            >
              Single-origin Arabica sourced from elevations of 1,400–1,800 meters above sea level in Papua New Guinea's volcanic highlands. Carefully processed and freeze-dried to preserve the character, clarity, and complexity of the original beans.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ORIGIN_CARDS.map((card, i) => (
              <FadeIn key={card.label} delay={i * 0.08}>
                <div
                  className="text-center p-6"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${GOLD}40`,
                    borderRadius: '2px',
                  }}
                >
                  <p className="font-mono text-[7px] tracking-[0.3em] uppercase mb-2" style={{ color: `#9A7A24` }}>
                    {card.label}
                  </p>
                  <p className="font-heading font-semibold text-sm" style={{ color: '#3F3027' }}>
                    {card.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Torchbearer ── */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#FBF8F1', borderTop: `1px solid ${GOLD}30` }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4" style={{ color: `#9A7A24` }}>
              About This Coffee
            </p>
            <h2
              className="font-serif font-bold mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#3F3027', letterSpacing: '-0.02em' }}
            >
              Premium instant coffee, pure and simple.
            </h2>
            <p
              className="font-heading mb-6"
              style={{ fontSize: '1rem', color: '#6A5A4A', lineHeight: 1.9 }}
            >
              Torchbearer is our classic instant coffee — no mushroom extracts, no added ingredients. Just a premium single-origin Arabica roasted to a smooth medium profile and freeze-dried to preserve natural flavor.
            </p>
            <p
              className="font-heading"
              style={{ fontSize: '1rem', color: '#6A5A4A', lineHeight: 1.9 }}
            >
              Ready in seconds. No equipment needed. A great cup of coffee, wherever you are.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 px-6 md:px-10" style={{ background: '#F8F5EF', borderTop: `1px solid ${GOLD}30` }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4 text-center" style={{ color: `#9A7A24` }}>
              What You Get
            </p>
            <h2
              className="font-serif font-bold text-center mb-12"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#3F3027' }}
            >
              Product Benefits
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BENEFITS.map((benefit, i) => (
              <FadeIn key={benefit} delay={i * 0.07}>
                <div
                  className="flex items-center gap-4 p-5"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${GOLD}40`,
                    borderRadius: '2px',
                  }}
                >
                  <span style={{ color: GOLD, fontWeight: 700, fontSize: '1rem' }}>✓</span>
                  <span className="font-heading text-sm" style={{ color: '#3F3027' }}>
                    {benefit}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specs Accordion ── */}
      <section className="py-12 px-6 md:px-10" style={{ background: '#FBF8F1', borderTop: `1px solid ${GOLD}30` }}>
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSpecsOpen(!specsOpen)}
            className="w-full flex items-center justify-between py-4 transition-opacity hover:opacity-70"
          >
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: '#9A7A24' }}>
              Product Specifications
            </span>
            {specsOpen ? (
              <ChevronUp className="w-4 h-4" style={{ color: '#9A7A24' }} />
            ) : (
              <ChevronDown className="w-4 h-4" style={{ color: '#9A7A24' }} />
            )}
          </button>
          <div style={{ height: '1px', background: `${GOLD}20` }} />
          {specsOpen && (
            <div className="mt-4 space-y-3">
              {SPECS.map((spec) => (
                <div key={spec.label} className="flex justify-between py-2" style={{ borderBottom: `1px solid ${GOLD}22` }}>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: `#9A7A24` }}>
                    {spec.label}
                  </span>
                  <span className="font-heading text-sm" style={{ color: '#3F3027' }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Republic Reserve Difference ── */}
      <ReserveDifferenceSection />

      {/* ── Mushroom Coffee Cross-sell ── */}
      <section
        className="py-16 px-6 md:px-10"
        style={{
          background: '#FBF8F1',
          borderTop: `1px solid rgba(230,183,173,0.22)`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4" style={{ color: '#E6B7AD' }}>
              Explore The Full Collection
            </p>
            <h3
              className="font-serif font-bold mb-4"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#3F3027' }}
            >
              Also Try Our Mushroom Coffee Blends
            </h3>
            <p
              className="font-heading mb-8"
              style={{ fontSize: '0.9rem', color: '#6A5A4A', lineHeight: 1.8 }}
            >
              GlowMind Clarity, SunCap Rise, MoonCap Restore, and more — five functional mushroom coffee blends with Lion's Mane, Cordyceps and Reishi, crafted for focus, energy, calm, and daily wellness.
            </p>
            <Link
              to="/blends"
              className="inline-block font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-4 transition-all hover:opacity-90"
              style={{ background: '#B86543', color: '#FBF8F1', fontWeight: 700, borderRadius: '2px' }}
            >
              Explore Mushroom Blends
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}