import React from 'react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { useDriftMotion } from './useDriftMotion';

const RITUAL_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/976716136_generated_image.png';

const STEPS = [
  { num: '01', label: 'Scoop' },
  { num: '02', label: 'Add Water' },
  { num: '03', label: 'Stir + Enjoy' },
];

export default function DriftRitual() {
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 65%' },
    });
    tl.from('.ritual-word', { opacity: 0, y: 25, duration: 0.5, stagger: 0.12, ease: 'power3.out' })
      .from('.ritual-img', { scale: 1.05, duration: 1.2, ease: 'power2.out' }, 0)
      .from('.ritual-step', { opacity: 0, x: -15, duration: 0.4, stagger: 0.1, ease: 'power3.out' }, 0.4)
      .from('.ritual-note', { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.8);
  });

  return (
    <section ref={scope} className="ritual-section" style={{ background: D.paper }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-[45fr_55fr] gap-10 md:gap-14 items-center">
          {/* Image */}
          <div className="order-2 md:order-1 overflow-hidden rounded-lg" style={{ boxShadow: D.shadowMedium, border: D.borderHairline }}>
            <img className="ritual-img w-full" src={RITUAL_IMAGE} alt="Instant coffee being stirred into a ceramic cup" loading="lazy" style={{ aspectRatio: '4 / 5', objectFit: 'cover' }} />
          </div>
          {/* Copy */}
          <div className="order-1 md:order-2">
            <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1.25rem' }}>
              The Ritual
            </p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.05, color: D.ink, margin: '0 0 1rem' }}>
              <span className="ritual-word" style={{ display: 'inline-block' }}>Scoop.</span>{' '}
              <span className="ritual-word" style={{ display: 'inline-block' }}>Stir.</span>{' '}
              <span className="ritual-word" style={{ display: 'inline-block' }}>Sip.</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2.5rem', maxWidth: '40ch' }}>
              A premium cup in seconds.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {STEPS.map((s) => (
                <div key={s.num} className="ritual-step flex items-center gap-4">
                  <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', color: D.terracotta, minWidth: '2.5rem' }}>{s.num}</span>
                  <span style={{ fontFamily: MONO, fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: D.ink }}>{s.label}</span>
                </div>
              ))}
            </div>
            <p className="ritual-note" style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', color: D.secondary, margin: 0, lineHeight: 1.8 }}>
              NO MACHINE. NO PODS. NO MORNING PRODUCTION.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}