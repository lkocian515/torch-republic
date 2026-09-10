import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { useDriftMotion, isMobile } from './useDriftMotion';

const GRANULE_IMAGES = {
  'instant-classic-coffee': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9b4c52b8d_generated_image.png',
  'instant-mushroom-coffee': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7ba9edc88_generated_image.png',
};

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
  { label: 'Best For', classic: 'Classic coffee and everyday ritual', mushroom: 'Focused thinking and daily clarity' },
  { label: 'Flavor', classic: 'Bold, smooth, premium Arabica', mushroom: 'Smooth coffee, cocoa, balanced finish' },
  { label: 'Caffeine', classic: 'Higher caffeine', mushroom: 'Medium caffeine' },
  { label: 'What\u2019s Inside', classic: 'Single-origin Arabica', mushroom: 'Lion\u2019s Mane + Cordyceps + Reishi' },
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
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    const mobile = isMobile();

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

    // ── Image clip reveals (fromTo for fail-safety: if selector misses, image stays visible) ──
    const imgTl = gsap.timeline({
      scrollTrigger: { trigger: mobile ? '.cmp-m-columns' : '.cmp-d-columns', start: 'top 82%' },
    });

    if (mobile) {
      imgTl
        .fromTo('.cmp-m-img-classic', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'power3.out' })
        .fromTo('.cmp-m-img-inner-classic', { scale: 1.04 }, { scale: 1, duration: 1.0, ease: 'power3.out' }, 0)
        .fromTo('.cmp-m-img-mushroom', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'power3.out' }, 0.15)
        .fromTo('.cmp-m-img-inner-mushroom', { scale: 1.04 }, { scale: 1, duration: 1.0, ease: 'power3.out' }, 0.15);
    } else {
      imgTl
        .fromTo('.cmp-d-img-classic', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.out' })
        .fromTo('.cmp-d-img-inner-classic', { scale: 1.04 }, { scale: 1, duration: 1.1, ease: 'power3.out' }, 0)
        .fromTo('.cmp-d-img-mushroom', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.out' }, 0.1)
        .fromTo('.cmp-d-img-inner-mushroom', { scale: 1.04 }, { scale: 1, duration: 1.1, ease: 'power3.out' }, 0.1);
    }

    // ── Labels + names ──
    const labelSel = mobile ? '.cmp-m-label' : '.cmp-d-label';
    gsap.from(labelSel, {
      opacity: 0, y: 14, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: mobile ? '.cmp-m-columns' : '.cmp-d-columns', start: 'top 65%' },
      delay: 0.3,
    });

    const nameSel = mobile ? '.cmp-m-name' : '.cmp-d-name';
    gsap.from(nameSel, {
      opacity: 0, y: 14, duration: 0.5, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: mobile ? '.cmp-m-columns' : '.cmp-d-columns', start: 'top 65%' },
      delay: 0.4,
    });

    // ── Comparison rows ──
    gsap.utils.toArray('.cmp-row').forEach((row) => {
      gsap.from(row, {
        opacity: 0, y: 10, duration: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 88%' },
      });
    });

    // ── Desktop hover + mouse depth ──
    if (!mobile) {
      el.querySelectorAll('.cmp-d-img-wrap').forEach((wrap) => {
        const inner = wrap.querySelector('.cmp-d-img-inner');
        wrap.addEventListener('mouseenter', () => gsap.to(inner, { scale: 1.025, duration: 0.5, ease: 'power2.out' }));
        wrap.addEventListener('mouseleave', () => gsap.to(inner, { scale: 1, duration: 0.5, ease: 'power2.out' }));
      });

      const xToClassic = gsap.quickTo('.cmp-d-img-inner-classic', 'x', { duration: 0.9, ease: 'power3' });
      const yToClassic = gsap.quickTo('.cmp-d-img-inner-classic', 'y', { duration: 0.9, ease: 'power3' });
      const xToMushroom = gsap.quickTo('.cmp-d-img-inner-mushroom', 'x', { duration: 0.9, ease: 'power3' });
      const yToMushroom = gsap.quickTo('.cmp-d-img-inner-mushroom', 'y', { duration: 0.9, ease: 'power3' });

      const onMove = (e) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        xToClassic(px * 3);
        yToClassic(py * 3);
        xToMushroom(px * 3);
        yToMushroom(py * 3);
      };

      el.addEventListener('mousemove', onMove);
      return () => el.removeEventListener('mousemove', onMove);
    }
  });

  return (
    <section id="comparison" ref={scope} style={{ background: D.cream, scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-[1080px] px-6 py-16 md:py-24">
        {/* ═══ Header ═══ */}
        <div className="text-center mb-12 md:mb-16">
          <p className="cmp-eyebrow" style={{ ...labelStyle, fontSize: '0.7rem', letterSpacing: '0.28em', margin: '0 0 1rem' }}>
            Which One&rsquo;s Your Morning?
          </p>
          <h2 className="cmp-heading" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>
            Same simplicity.<br />Different ritual.
          </h2>
        </div>

        {/* ═══ Desktop layout ═══ */}
        <div className="hidden md:block">
          {/* Product columns */}
          <div className="cmp-d-columns grid grid-cols-2 gap-8 lg:gap-12 mb-12">
            {PRODUCTS.map((p) => (
              <div key={p.id}>
                <div className="cmp-d-img-wrap" style={{ overflow: 'hidden', borderRadius: '10px', aspectRatio: '5 / 4', position: 'relative', background: D.surface }}>
                  <div className={`cmp-d-img-inner cmp-d-img-inner-${p.ritualKey}`} style={{ width: '100%', height: '100%', willChange: 'transform' }}>
                    <img className={`cmp-d-img cmp-d-img-${p.ritualKey}`} src={GRANULE_IMAGES[p.id]} alt={`Macro photography of ${p.name} granules`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                </div>
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
          <div className="grid grid-cols-2 gap-8 lg:gap-12 mt-8 pt-2">
            {PRODUCTS.map((p) => (
              <div key={p.id}>
                <ProductLink product={p} />
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Mobile layout ═══ */}
        <div className="md:hidden">
          <div className="cmp-m-columns flex flex-col gap-12">
            {PRODUCTS.map((p) => (
              <div key={p.id}>
                {/* Image */}
                <div className="cmp-m-img-wrap" style={{ overflow: 'hidden', borderRadius: '10px', aspectRatio: '5 / 4', position: 'relative', background: D.surface }}>
                  <div className={`cmp-m-img-inner cmp-m-img-inner-${p.ritualKey}`} style={{ width: '100%', height: '100%', willChange: 'transform' }}>
                    <img className={`cmp-m-img cmp-m-img-${p.ritualKey}`} src={GRANULE_IMAGES[p.id]} alt={`Macro photography of ${p.name} granules`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                </div>

                {/* Label + name */}
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