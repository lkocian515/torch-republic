import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { useDriftMotion } from './useDriftMotion';

const PRODUCTS = [
  {
    id: 'instant-classic-coffee',
    index: '01',
    label: 'CLASSIC',
    name: 'Instant Classic Coffee',
    descriptor: 'Bold \u00b7 Smooth \u00b7 Straightforward',
    path: '/products/instant-classic-coffee',
  },
  {
    id: 'instant-mushroom-coffee',
    index: '02',
    label: 'MUSHROOM',
    name: 'Instant Mushroom Coffee',
    descriptor: 'Smooth \u00b7 Cocoa \u00b7 Balanced',
    path: '/products/instant-mushroom-coffee',
  },
];

/**
 * Only what the product cards above don't already state. Flavor, price, servings
 * and preparation are on every card, so repeating them here would lengthen the
 * page without helping anyone choose. What's left is the three things that
 * actually separate the two coffees.
 */
const ROWS = [
  {
    label: 'What\u2019s Inside',
    classic: 'Premium Arabica coffee',
    mushroom: 'Premium Arabica coffee with Lion\u2019s Mane, Cordyceps & Reishi',
  },
  {
    label: 'Caffeine',
    classic: 'Full-strength coffee caffeine',
    mushroom: 'Moderate coffee caffeine',
  },
  {
    label: 'Best For',
    classic: 'Everyday coffee, black or with milk',
    mushroom: 'A focused morning',
  },
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
  fontSize: '0.875rem',
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

/**
 * Side-by-side comparison.
 *
 * One responsive structure serves every breakpoint: the label column collapses
 * into a full-width heading above each pair of values on small screens, so the
 * table is never duplicated as a second hidden layout.
 */
export default function DriftComparison() {
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    gsap.from('.cmp-eyebrow', {
      opacity: 0, y: 12, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 78%' },
    });

    gsap.from('.cmp-heading', {
      opacity: 0, y: 28, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 78%' },
      delay: 0.1,
    });

    gsap.from('.cmp-label', {
      opacity: 0, y: 14, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.cmp-columns', start: 'top 65%' },
      delay: 0.3,
    });

    gsap.from('.cmp-name', {
      opacity: 0, y: 14, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.cmp-columns', start: 'top 65%' },
      delay: 0.4,
    });

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
        <div className="mb-10 md:mb-14">
          <p className="cmp-eyebrow" style={{ ...labelStyle, fontSize: '0.7rem', letterSpacing: '0.28em', margin: '0 0 1rem' }}>
            Side by Side
          </p>
          <h2 className="cmp-heading" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>
            What actually differs between them
          </h2>
          <p style={{ fontFamily: SANS, fontSize: '0.9375rem', lineHeight: 1.6, color: D.secondary, margin: '1rem 0 0', maxWidth: '52ch' }}>
            Both are instant, both work hot or iced, and both are ready in seconds.
          </p>
        </div>

        {/* ═══ Column headings ═══ */}
        <div className="cmp-columns grid grid-cols-2 gap-x-4 md:grid-cols-[120px_1fr_1fr] md:gap-8">
          <div className="hidden md:block" aria-hidden="true" />
          {PRODUCTS.map((p) => (
            <div key={p.id}>
              <p className="cmp-label" style={labelStyle}>{p.index} / {p.label}</p>
              <h3 className="cmp-name" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.0625rem, 3.5vw, 1.35rem)', color: D.ink, margin: '0.5rem 0 0.375rem' }}>{p.name}</h3>
              <p style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.secondary, margin: 0 }}>{p.descriptor}</p>
            </div>
          ))}
        </div>

        {/* ═══ Comparison rows ═══ */}
        <div className="mt-8">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="cmp-row grid grid-cols-2 gap-x-4 py-4 md:grid-cols-[120px_1fr_1fr] md:gap-8 md:py-5"
              style={{ borderTop: `1px solid ${D.rule}` }}
            >
              <p className="col-span-2 mb-2 md:col-span-1 md:mb-0" style={labelStyle}>{row.label}</p>
              <p style={valueStyle}>{row.classic}</p>
              <p style={valueStyle}>{row.mushroom}</p>
            </div>
          ))}
        </div>

        {/* ═══ Links ═══ */}
        <div className="mt-8 grid grid-cols-2 gap-x-4 md:grid-cols-[120px_1fr_1fr] md:gap-8">
          <div className="hidden md:block" aria-hidden="true" />
          {PRODUCTS.map((p) => (
            <div key={p.id}>
              <ProductLink product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}