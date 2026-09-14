import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { useDriftMotion } from './useDriftMotion';

export default function DriftSubscription() {
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    // ── Background color transition ──
    gsap.fromTo(el,
      { backgroundColor: D.espresso },
      { backgroundColor: D.terracottaDeep, duration: 1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 70%', end: 'center 40%', scrub: 1 } });

    // ── Staggered content reveal ──
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 60%' },
    });
    tl.from('.sub-eyebrow', { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' })
      .from('.sub-heading', { opacity: 0, y: 25, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .from('.sub-body', { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.sub-cta', { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.sub-note', { opacity: 0, y: 15, duration: 0.4, ease: 'power3.out' }, '-=0.2');
  });

  return (
    <section ref={scope} className="sub-section" style={{ background: D.espresso }}>
      <div className="mx-auto max-w-[900px] px-6 py-16 md:py-20 text-center">
        <p className="sub-eyebrow" style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
          Make It a Routine
        </p>
        <h2 className="sub-heading" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.cream, margin: '0 0 1.25rem', textWrap: 'balance' }}>
          Subscriptions are coming soon.
        </h2>
        <p className="sub-body" style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(250,247,241,0.75)', margin: '0 0 2rem', maxWidth: '46ch', marginLeft: 'auto', marginRight: 'auto' }}>
          Join the list for launch updates and be the first to know when recurring coffee delivery becomes available.
        </p>
        <div className="sub-cta flex items-center justify-center">
          <a href="#newsletter" className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]" style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: D.terracotta, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
            Join the Update List <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
        <p className="sub-note" style={{ fontFamily: SANS, fontSize: '0.8125rem', color: 'rgba(250,247,241,0.5)', margin: '2rem 0 0' }}>
          No subscription purchase is available yet. We will email you when it launches.
        </p>
      </div>
    </section>
  );
}