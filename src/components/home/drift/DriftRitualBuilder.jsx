import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { useDriftMotion, prefersReducedMotion } from './useDriftMotion';

const RITUALS = {
  classic: {
    hot: [
      { step: '01', title: 'Scoop', detail: 'Add 1 teaspoon (about 3g) of Instant Classic Coffee to your favorite mug.' },
      { step: '02', title: 'Pour', detail: 'Add 8oz of hot water, just off the boil (about 200\u00b0F).' },
      { step: '03', title: 'Stir', detail: 'Stir thoroughly for 10\u201315 seconds until fully dissolved.' },
      { step: '04', title: 'Sip', detail: 'Enjoy your bold, smooth cup of single-origin coffee.' },
    ],
    iced: [
      { step: '01', title: 'Scoop', detail: 'Add 1 teaspoon (about 3g) of Instant Classic Coffee to a glass.' },
      { step: '02', title: 'Dissolve', detail: 'Pour in 2oz of hot water and stir until fully dissolved.' },
      { step: '03', title: 'Build Over Ice', detail: 'Add 6oz of cold water over a cup of ice.' },
      { step: '04', title: 'Sip', detail: 'Enjoy a bold, refreshing iced coffee.' },
    ],
  },
  mushroom: {
    hot: [
      { step: '01', title: 'Scoop', detail: 'Add 1 teaspoon (about 3g) of Instant Mushroom Coffee to your mug.' },
      { step: '02', title: 'Pour', detail: 'Add 8oz of hot water, just off the boil (about 200\u00b0F).' },
      { step: '03', title: 'Stir', detail: 'Stir well for 15 seconds \u2014 mushroom extracts need a moment to fully dissolve.' },
      { step: '04', title: 'Sip', detail: 'Sip slowly and settle into your focus.' },
    ],
    iced: [
      { step: '01', title: 'Scoop', detail: 'Add 1 teaspoon (about 3g) of Instant Mushroom Coffee to a glass.' },
      { step: '02', title: 'Dissolve', detail: 'Pour in 2oz of hot water and stir until fully dissolved.' },
      { step: '03', title: 'Build Over Ice', detail: 'Add 6oz of cold water over a cup of ice.' },
      { step: '04', title: 'Sip', detail: 'Enjoy a smooth, focused iced coffee.' },
    ],
  },
};

const PREP_METHODS = [
  { key: 'hot', label: 'Hot' },
  { key: 'iced', label: 'Iced' },
];

export default function DriftRitualBuilder() {
  const [selectedBlend, setSelectedBlend] = useState('classic');
  const [prepMethod, setPrepMethod] = useState('hot');
  const guideRef = useRef(null);
  const hasMounted = useRef(false);

  const product = CORE_PRODUCTS.find((p) => p.ritualKey === selectedBlend);
  const steps = RITUALS[selectedBlend][prepMethod];
  const accent = product.ritual.accent;

  // ── Scroll entrance ──
  const scope = useDriftMotion((gsap, ScrollTrigger) => {
    gsap.from('.br-eyebrow', { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.br-section', start: 'top 70%' } });
    gsap.from('.br-heading', { opacity: 0, y: 25, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.br-section', start: 'top 70%' } });
    gsap.from('.br-sub', { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.br-section', start: 'top 65%' } });
    gsap.from('.br-blend-card', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.br-blend-row', start: 'top 75%' } });
    gsap.from('.br-guide', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.br-guide', start: 'top 80%' } });
  }, []);

  // ── Blend/method switch micro-transition ──
  useLayoutEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (prefersReducedMotion() || !guideRef.current) return;
    gsap.fromTo(guideRef.current,
      { opacity: 0.3, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
    );
  }, [selectedBlend, prepMethod]);

  return (
    <section ref={scope} className="br-section" style={{ background: D.cream }}>
      <div className="mx-auto max-w-[900px] px-6 py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="br-eyebrow" style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
            Build Your Ritual
          </p>
          <h2 className="br-heading" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: '0 0 0.75rem', textWrap: 'balance' }}>
            Your morning, your way.
          </h2>
          <p className="br-sub" style={{ fontFamily: SANS, fontSize: '1rem', lineHeight: 1.6, color: D.secondary, margin: 0, maxWidth: '44ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Pick your blend, choose your method, and follow a simple guide.
          </p>
        </div>

        {/* Blend selector cards */}
        <div className="br-blend-row grid grid-cols-2 gap-3 md:gap-4 mb-8">
          {CORE_PRODUCTS.map((p) => {
            const isSelected = p.ritualKey === selectedBlend;
            return (
              <button
                key={p.ritualKey}
                onClick={() => setSelectedBlend(p.ritualKey)}
                className="br-blend-card group text-left transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]"
                style={{
                  borderRadius: '8px',
                  padding: '1.25rem',
                  background: isSelected ? p.ritual.soft : D.surface,
                  border: `2px solid ${isSelected ? p.ritual.accent : D.rule}`,
                  cursor: 'pointer',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={p.image} alt={p.alt} style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }} />
                  <div className="min-w-0">
                    <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: '0.8125rem', color: D.ink, lineHeight: 1.3, margin: 0 }}>{p.name}</p>
                    <p style={{ fontFamily: MONO, fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: D.secondary, margin: '2px 0 0' }}>{p.caffeineLabel} Caffeine</p>
                  </div>
                </div>
                <p style={{ fontFamily: SANS, fontSize: '0.75rem', color: D.secondary, lineHeight: 1.4, margin: 0 }}>{p.flavorLabel}</p>
              </button>
            );
          })}
        </div>

        {/* Guide card */}
        <div ref={guideRef} className="br-guide" style={{ borderRadius: '12px', overflow: 'hidden', background: D.paper, border: `1px solid ${D.rule}` }}>
          {/* Product image banner */}
          <div className="flex items-center justify-center py-8" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${product.ritual.soft} 0%, ${D.paper} 70%)` }}>
            <img src={product.image} alt={product.alt} style={{ width: '28%', maxWidth: 120, objectFit: 'contain' }} />
          </div>

          <div className="p-6 md:p-8">
            {/* Prep method tabs */}
            <div className="flex gap-2 mb-8">
              {PREP_METHODS.map((m) => {
                const isActive = prepMethod === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setPrepMethod(m.key)}
                    className="transition-all duration-200"
                    style={{
                      fontFamily: SANS,
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '999px',
                      background: isActive ? accent : 'transparent',
                      color: isActive ? '#FAF7F1' : D.secondary,
                      border: `1px solid ${isActive ? accent : D.rule}`,
                      cursor: 'pointer',
                    }}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Step-by-step guide */}
            <div className="flex flex-col gap-5">
              {steps.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', color: accent, minWidth: '2.5rem', lineHeight: 1.2 }}>{s.step}</span>
                  <div>
                    <p style={{ fontFamily: MONO, fontSize: '0.6875rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: D.ink, margin: '0 0 0.3rem' }}>{s.title}</p>
                    <p style={{ fontFamily: SANS, fontSize: '0.875rem', lineHeight: 1.6, color: D.secondary, margin: 0 }}>{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to={product.path}
              className="group inline-flex items-center gap-2 mt-8 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]"
              style={{
                minHeight: 48,
                padding: '0 1.75rem',
                borderRadius: '6px',
                background: accent,
                color: '#FAF7F1',
                fontFamily: SANS,
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
              }}
            >
              Shop This Blend <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}