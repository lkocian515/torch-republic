import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { useDriftMotion, isMobile } from './useDriftMotion';

const PRODUCTS = [
  {
    id: 'instant-classic-coffee',
    ritualKey: 'classic',
    index: '01',
    label: 'CLASSIC',
    name: 'Instant Classic Coffee',
    descriptor: 'Bold \u00b7 Smooth \u00b7 Straightforward',
    path: '/products/instant-classic-coffee',
  },
  {
    id: 'instant-mushroom-coffee',
    ritualKey: 'mushroom',
    index: '02',
    label: 'MUSHROOM',
    name: 'Instant Mushroom Coffee',
    descriptor: 'Smooth \u00b7 Cocoa \u00b7 Balanced',
    path: '/products/instant-mushroom-coffee',
  },
];

const ROWS = [
  { label: 'Format', classic: 'Instant only, just add water', mushroom: 'Instant only, just add water' },
  { label: 'Best For', classic: 'Classic coffee and everyday ritual', mushroom: 'Daily ritual with functional mushrooms' },
  { label: 'Flavor', classic: 'Bold, smooth, premium Arabica', mushroom: 'Smooth coffee, cocoa, balanced finish' },
  { label: 'Caffeine', classic: 'Full-strength coffee caffeine', mushroom: 'Moderate coffee caffeine' },
  { label: 'What\u2019s Inside', classic: 'Premium Arabica', mushroom: 'Functional mushroom extracts' },
  { label: 'Preparation', classic: 'Hot or iced', mushroom: 'Hot or iced' },
];

const labelStyle = {
  fontFamily: MONO,
  fontSize: '0.625rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: D.terracotta,
  margin: 0,
};

const valueStyle = {
  fontFamily: SANS,
  fontSize: '0.9375rem',
  lineHeight: 1.5,
  color: D.ink,
  margin: 0,
};

function ProductLink({ product }) {
  return (
    <Link
      to={product.path}
      className="group inline-flex items-center gap-2"
      style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: D.espresso, textDecoration: 'none' }}
    >
      View {product.label}
      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" style={{ strokeWidth: 1.75 }} />
    </Link>
  );
}

export default function DriftComparison() {
  // Track viewport to set aria-hidden on the inactive duplicate layout.
  // display:none already removes it from the a11y tree, but aria-hidden
  // makes the intent explicit for assistive technologies.
  const [mobile, setMobile] = useState(typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    const mobileLayout = isMobile();

    // ── Entrance: eyebrow + heading ──
    gsap.from('.cmp-eyebrow', {
      opacity: 0, y: 12, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 78%' },
    });

    gsap.from('.cmp-heading', {
      opacity: 0, y: 28, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 78%' },
      delay: 0.1,
    });

    // ── Labels + names ──
    const labelSel = mobileLayout ? '.cmp-m-label' : '.cmp-d-label';
    gsap.from(labelSel, {
      opacity: 0, y: 14, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: mobileLayout ? '.cmp-m-columns' : '.cmp-d-columns', start: 'top 65%' },
      delay: 0.3,
    });

    const nameSel = mobileLayout ? '.cmp-m-name' : '.cmp-d-name';
    gsap.from(nameSel, {
      opacity: 0, y: 14, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: mobileLayout ? '.cmp-m-columns' : '.cmp-d-columns', start: 'top 65%' },
      delay: 0.4,
    });

    // ── Comparison rows ──
    gsap.utils.toArray('.cmp-row').forEach((row) => {
      gsap.from(row, {
        opacity: 0, y: 10, duration: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 88%' },
      });
    });


  });

  return (
    <section id="comparison" ref={scope} style={{ background: D.cream, scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-24">
        {/* ═══ Header ═══ */}
        <div className="mb-12 md:mb-16">
          <p className="cmp-eyebrow" style={{ ...labelStyle, fontSize: '0.7rem', letterSpacing: '0.28em', margin: '0 0 1rem' }}>
            Side by Side
          </p>
          <h2 className="cmp-heading" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>
            What actually differs between them
          </h2>
        </div>

        {/* ═══ Desktop layout ═══ */}
        <div className="hidden md:block" aria-hidden={mobile}>
          {/* Product columns */}
          <div className="cmp-d-columns grid grid-cols-[120px_1fr_1fr] gap-8 mb-8">
            <div aria-hidden="true" />
            {PRODUCTS.map((p) => (
              <div key={p.id}>
                <p className={`cmp-d-label cmp-d-label-${p.id}`} style={{ ...labelStyle, margin: '1.25rem 0 0.5rem' }}>{p.index} / {p.label}</p>
                <h3 className={`cmp-d-name cmp-d-name-${p.id}`} style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.35rem', color: D.ink, margin: '0 0 0.375rem' }}>{p.name}</h3>
                <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: D.secondary, margin: 0 }}>{p.descriptor}</p>
              </div>
            ))}
          </div>

          {/* Comparison rows */}
          <div>
            {ROWS.map((row) => (
              <div
                key={row.label}
                className="cmp-row grid grid-cols-[120px_1fr_1fr] gap-8 py-5"
                style={{ borderTop: `1px solid ${D.rule}` }}
              >
                <p style={labelStyle}>{row.label}</p>
                <p style={valueStyle}>{row.classic}</p>
                <p style={valueStyle}>{row.mushroom}</p>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="grid grid-cols-[120px_1fr_1fr] gap-8 mt-8 pt-2">
            <div aria-hidden="true" />
            {PRODUCTS.map((p) => (
              <div key={p.id}>
                <ProductLink product={p} />
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Mobile layout ═══ */}
        <div className="md:hidden" aria-hidden={!mobile}>
          <div className="cmp-m-columns flex flex-col gap-12">
            {PRODUCTS.map((p) => (
              <div key={p.id}>
                <p className={`cmp-m-label cmp-m-label-${p.id}`} style={{ ...labelStyle, margin: '1rem 0 0.5rem' }}>{p.index} / {p.label}</p>
                <h3 className={`cmp-m-name cmp-m-name-${p.id}`} style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.25rem', color: D.ink, margin: '0 0 0.375rem' }}>{p.name}</h3>
                <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: D.secondary, margin: '0 0 1.5rem' }}>{p.descriptor}</p>

                {/* Comparison info inline */}
                <div>
                  {ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="cmp-row py-4"
                      style={{ borderTop: `1px solid ${D.rule}` }}
                    >
                      <p style={{ ...labelStyle, margin: '0 0 0.375rem' }}>{row.label}</p>
                      <p style={valueStyle}>{p.id === 'instant-classic-coffee' ? row.classic : row.mushroom}</p>
                    </div>
                  ))}
                </div>

                {/* Link */}
                <div className="mt-5">
                  <ProductLink product={p} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}