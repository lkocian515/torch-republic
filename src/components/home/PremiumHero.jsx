import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 'founders',
    eyebrow: 'Founders Series · Small-Batch Coffee',
    headline: 'Founders-Inspired Coffee\nfor the Everyday Table.',
    sub: 'Roasted in small batches for patriots, thinkers, believers, and freedom lovers who still believe the table matters.',
    cta1: { label: 'Shop Founders Coffee', to: '/CoffeeCollection' },
    cta2: { label: 'Meet the Founders', to: '/CoffeeCollection' },
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/29ced6b7f_1001704061.jpg',
    overlay: 'rgba(0,0,0,0.58)',
  },
  {
    id: 'apparel',
    eyebrow: 'Heritage Apparel · Wear What You Stand For',
    headline: 'Wear What\nYou Stand For.',
    sub: 'Premium American-heritage apparel crafted with the same conviction as our blends — bold, timeless, and built to last.',
    cta1: { label: 'Shop Apparel', to: '/Shop' },
    cta2: { label: 'Explore Collections', to: '/Shop' },
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1800&q=85',
    overlay: 'rgba(0,0,0,0.62)',
  },
  {
    id: 'torchbox',
    eyebrow: 'The Torch Box · Monthly Subscription',
    headline: 'Never Run Out\nof the Flame.',
    sub: 'Fresh Founders Series coffee delivered monthly — roasted to order, shipped free, with early access to every new limited release.',
    cta1: { label: 'Become a Torchbearer', to: '/TheTorchBox' },
    cta2: { label: 'See What\'s Inside', to: '/TheTorchBox' },
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85',
    overlay: 'rgba(0,0,0,0.60)',
    badge: 'Save 15% Every Month',
  },
];

const INTERVAL = 5500;

export default function PremiumHero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(i => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(i => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#000' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image — fade between slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: slide.overlay }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.45) 0%, transparent 75%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: 'linear-gradient(to top, #050508, transparent)' }} />

      {/* Decorative side line */}
      <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, transparent, rgba(196,163,90,0.35))' }} />
        <span className="font-mono text-[8px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.35)', writingMode: 'vertical-rl' }}>
          Est. Legacy
        </span>
        <div className="w-px h-16" style={{ background: 'linear-gradient(to top, transparent, rgba(196,163,90,0.35))' }} />
      </div>

      {/* Slide content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ maxWidth: '700px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-content'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Optional badge */}
            {slide.badge && (
              <div className="mb-6 px-4 py-1.5 font-mono text-[9px] tracking-[0.4em] uppercase"
                style={{ background: 'rgba(201,162,74,0.15)', border: '1px solid rgba(201,162,74,0.3)', color: '#C9A24A' }}>
                ✦ {slide.badge}
              </div>
            )}

            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8" style={{ background: 'rgba(196,163,90,0.45)' }} />
              <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.6)' }}>
                {slide.eyebrow}
              </span>
              <div className="h-px w-8" style={{ background: 'rgba(196,163,90,0.45)' }} />
            </div>

            {/* Headline */}
            <h1
              className="font-serif text-white"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 700,
                lineHeight: 1.07,
                letterSpacing: '-0.015em',
                textShadow: '0 2px 40px rgba(0,0,0,0.9)',
                marginBottom: '1.4rem',
                whiteSpace: 'pre-line',
              }}
            >
              {slide.headline}
            </h1>

            {/* Tagline rule */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6" style={{ background: 'rgba(196,163,90,0.25)' }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: 'rgba(196,163,90,0.4)' }}>
                Live Free · Stay Ready
              </span>
              <div className="h-px w-6" style={{ background: 'rgba(196,163,90,0.25)' }} />
            </div>

            {/* Sub */}
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.9,
                color: 'rgba(255,255,255,0.48)',
                textShadow: '0 1px 12px rgba(0,0,0,0.9)',
                marginBottom: '3rem',
                maxWidth: '520px',
              }}
            >
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to={slide.cta1.to}
                className="inline-flex items-center justify-center font-mono font-black uppercase tracking-[0.3em] transition-all hover:opacity-85 btn-glow"
                style={{ fontSize: '11px', background: '#C9A24A', color: '#000', padding: '1.1rem 2.8rem' }}
              >
                {slide.cta1.label}
              </Link>
              <Link
                to={slide.cta2.to}
                className="inline-flex items-center justify-center font-mono uppercase tracking-[0.25em] transition-all hover:border-white/30 hover:text-white"
                style={{ fontSize: '11px', color: 'rgba(255,255,255,0.42)', padding: '1.1rem 2.25rem', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                {slide.cta2.label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all hover:text-white"
        style={{ width: 44, height: 44, color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all hover:text-white"
        style={{ width: 44, height: 44, color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicators + progress */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className="relative overflow-hidden transition-all"
            aria-label={`Go to slide ${i + 1}`}
            style={{
              height: '2px',
              width: i === current ? '40px' : '16px',
              background: 'rgba(255,255,255,0.2)',
              transition: 'width 0.3s ease',
            }}
          >
            {i === current && (
              <motion.div
                key={current + '-progress'}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                className="absolute inset-y-0 left-0"
                style={{ background: '#C9A24A' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-8 animate-bounce" style={{ background: 'linear-gradient(to bottom, rgba(196,163,90,0.4), transparent)' }} />
      </div>
    </div>
  );
}