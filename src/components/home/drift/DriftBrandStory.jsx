import React from 'react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { useDriftMotion, isMobile } from './useDriftMotion';

const STORY_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e56a2a991_IMG_20260923_102242.png';

const PRINCIPLES = [
  { label: 'Intentionally Simple', body: 'Two signature instant coffees, plus seasonal releases.' },
  { label: 'Real, Clean Ingredients', body: 'Single-origin coffee and clearly listed ingredients.' },
  { label: 'Made for Daily Life', body: 'Premium quality built around everyday routines.' },
];

export default function DriftBrandStory() {
  const scope = useDriftMotion((gsap, ScrollTrigger) => {
    // ── Image clip-path reveal ──
    gsap.fromTo('.brand-img-wrap',
      { clipPath: 'inset(8% 0 8% 0)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.brand-img-wrap', start: 'top 80%' } });
    gsap.fromTo('.brand-img',
      { scale: 1.08 },
      { scale: 1, duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: '.brand-img-wrap', start: 'top 80%' } });

    // ── Scroll-linked line reveals ──
    gsap.utils.toArray('.brand-line').forEach((line) => {
      gsap.fromTo(line,
        { opacity: 0.2, y: 15 },
        { opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: line, start: 'top 80%', end: 'center 45%', scrub: 1 } });
    });

    // ── Principles stagger ──
    gsap.from('.brand-principle', {
      opacity: 0, y: 20, duration: 0.5, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.brand-principles', start: 'top 75%' },
    });
  });

  return (
    <section ref={scope} style={{ background: D.cream }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-[55fr_45fr] gap-10 md:gap-14 items-center">
          {/* Image */}
          <div className="brand-img-wrap order-2 md:order-1 overflow-hidden rounded-lg" style={{ boxShadow: D.shadowMedium, border: D.borderHairline }}>
            <img className="brand-img w-full" src={STORY_IMAGE} alt="Warm morning kitchen scene with ceramic cups and coffee" loading="lazy" style={{ aspectRatio: '4 / 3', objectFit: 'cover' }} />
          </div>
          {/* Copy */}
          <div className="order-1 md:order-2">
            <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
              Why Torch Republic
            </p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', lineHeight: 1.12, color: D.ink, margin: '0 0 1.5rem' }}>
              <span className="brand-line" style={{ display: 'block' }}>Good mornings</span>
              <span className="brand-line" style={{ display: 'block' }}>don&rsquo;t need to be</span>
              <span className="brand-line" style={{ display: 'block' }}>complicated.</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2.25rem', maxWidth: '44ch' }}>
              Torch Republic makes two signature instant coffees &mdash; designed to be easy to love and easy to trust. Seasonal releases join the lineup throughout the year.
            </p>
            <div className="brand-principles flex flex-col gap-5">
              {PRINCIPLES.map((p) => (
                <div className="brand-principle" key={p.label}>
                  <p style={{ fontFamily: MONO, fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: D.ink, margin: '0 0 0.35rem' }}>{p.label}</p>
                  <p style={{ fontFamily: SANS, fontSize: '0.9375rem', lineHeight: 1.6, color: D.secondary, margin: 0 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}