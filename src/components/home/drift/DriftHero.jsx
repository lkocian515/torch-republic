import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { useDriftMotion, isMobile } from './useDriftMotion';

export default function DriftHero() {
  const [classic, mushroom] = CORE_PRODUCTS;
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    // ── Cinematic entrance timeline ──
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-eyebrow', { opacity: 0, y: 10, duration: 0.5 })
      .from('.hero-line', { opacity: 0, y: 35, duration: 0.8, stagger: 0.1 }, '-=0.15')
      .from('.hero-body', { opacity: 0, y: 15, duration: 0.6 }, '-=0.3')
      .from('.hero-cta', { opacity: 0, y: 15, duration: 0.5 }, '-=0.25')
      .from('.hero-product', { opacity: 0, scale: 1.06, y: 25, duration: 1.3, ease: 'power2.out' }, 0.3);

    // ── Scroll parallax (desktop only) ──
    if (!isMobile()) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.timeline()
          .to('.hero-bg', { y: () => window.innerHeight * 0.05, ease: 'none' }, 0)
          .to('.hero-product', { y: () => window.innerHeight * 0.12, ease: 'none' }, 0)
          .to('.hero-text', { y: () => window.innerHeight * -0.08, ease: 'none' }, 0),
      });
    }
  });

  return (
    <section id="top" ref={scope} style={{ background: D.paper, scrollMarginTop: '72px' }}>
      <div className="grid md:grid-cols-[45fr_55fr] min-h-[85vh] md:min-h-[90vh]">
        {/* Left: copy */}
        <div className="hero-text flex items-center px-6 md:px-12 lg:px-16 py-14 md:py-0 order-1">
          <div className="max-w-[460px]">
            <p className="hero-eyebrow" style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1.5rem' }}>
              Premium Coffee &middot; Zero Equipment
            </p>
            <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', lineHeight: 1.02, letterSpacing: '-0.02em', color: D.ink, margin: '0 0 1.25rem', textWrap: 'balance' }}>
              <span style={{ overflow: 'hidden', display: 'block' }}>
                <span className="hero-line">Better mornings,</span>
              </span>
              <span style={{ overflow: 'hidden', display: 'block' }}>
                <span className="hero-line">in an instant.</span>
              </span>
            </h1>
            <p className="hero-body" style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2rem', maxWidth: '40ch' }}>
              Premium coffee made for real mornings. Scoop. Stir. Sip.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link to="/shop" className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]" style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
                Shop Coffee <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a href="#comparison" className="group inline-flex items-center gap-2" style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.espresso, textDecoration: 'none' }}>
                Compare the two <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
        {/* Right: product imagery */}
        <div className="hero-bg relative flex items-center justify-center overflow-hidden order-2" style={{ background: `radial-gradient(ellipse 90% 70% at 50% 45%, ${D.accentSoft} 0%, ${D.cream} 55%, ${D.paper} 100%)` }}>
          <div className="hero-product flex items-center justify-center gap-4 md:gap-6 w-full px-8 py-10">
            <img src={classic.image} alt={classic.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} className="w-[42%] max-w-[280px] transition-transform duration-500 hover:scale-[1.025]" />
            <img src={mushroom.image} alt={mushroom.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} className="w-[42%] max-w-[280px] transition-transform duration-500 hover:scale-[1.025]" />
          </div>
        </div>
      </div>
    </section>
  );
}