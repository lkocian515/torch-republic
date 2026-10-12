import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { useDriftMotion } from './useDriftMotion';

export default function DriftSubscription() {
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    gsap.fromTo(el,
      { backgroundColor: D.espresso },
      { backgroundColor: D.terracottaDeep, duration: 1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 70%', end: 'center 40%', scrub: 1 } });

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
    <section ref={scope} className="sub-section" style={{ background: D.espresso, borderTop: '1px solid rgba(184,115,77,0.10)' }}>
      <div className="mx-auto max-w-[900px] px-6 py-16 md:py-20 text-center">
        <p className="sub-eyebrow" style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
          Your coffee, your schedule
        </p>
        <h2 className="sub-heading" style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.cream, margin: '0 0 1.25rem', textWrap: 'balance' }}>
          Make your next morning easy.
        </h2>
        <p className="sub-body" style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(250,247,241,0.75)', margin: '0 0 2rem', maxWidth: '46ch', marginLeft: 'auto', marginRight: 'auto' }}>
          Buy once, or choose recurring delivery where offered on the product page. Review the current price and delivery schedule before adding a subscription to your cart.
        </p>
        <div className="sub-cta flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="group tr-btn-lift inline-flex items-center justify-center gap-2" style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: D.terracotta, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(183,91,50,0.25)' }}>
            Shop Coffee <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a href="#newsletter" className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-80" style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: 'transparent', color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', border: `1px solid ${D.terracotta}` }}>
            Get Coffee Updates
          </a>
        </div>
        <p className="sub-note" style={{ fontFamily: SANS, fontSize: '0.8125rem', color: 'rgba(250,247,241,0.8)', margin: '2rem 0 0' }}>
          Subscriptions renew automatically until cancelled. One-time purchases are always a separate choice.
        </p>
      </div>
    </section>
  );
}