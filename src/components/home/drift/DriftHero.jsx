import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { useDriftMotion, isMobile } from './useDriftMotion';

const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f0baca98f_file_00000000f01c822fa487ced70d607099.png';

// ── Reusable text block (shared between desktop and mobile layouts) ──
// isPrimary controls heading level: only the visible layout renders a real <h1>.
// The duplicate (hidden via display:none) renders an identical <p> so there is
// exactly one H1 in the DOM and accessibility tree at every breakpoint.
function HeroText({ isPrimary = true }) {
  const HeadingTag = isPrimary ? 'h1' : 'p';
  return (
    <>
      <p className="hero-eyebrow" style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1.5rem' }}>
        Premium Coffee &middot; Made for Mornings
      </p>
      <HeadingTag style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', lineHeight: 1.02, letterSpacing: '-0.02em', color: D.ink, margin: '0 0 1.25rem', textWrap: 'balance' }}>
        <span style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.18em', marginBottom: '-0.18em' }}>
        <span className="hero-line" style={{ display: 'block' }}>Better mornings,&nbsp;</span>
        </span>
        <span style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.18em', marginBottom: '-0.18em' }}>
          <span className="hero-line" style={{ display: 'block' }}>in an instant.</span>
        </span>
      </HeadingTag>
      <p className="hero-body" style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2rem', maxWidth: '40ch' }}>
        Premium coffee made for real mornings. Scoop. Stir. Sip.
      </p>
      <div className="hero-cta flex flex-col sm:flex-row gap-4 sm:items-center">
        <Link to="/shop" className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]" style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', letterSpacing: '0.04em' }}>
          SHOP COFFEE <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
        <a href="#comparison" className="group hidden md:inline-flex items-center gap-2" style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.espresso, textDecoration: 'none' }}>
          COMPARE THE TWO <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </>
  );
}

export default function DriftHero() {
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    const mobile = isMobile();

    // ═══════════════════════════════════════════════════
    // ENTRANCE — calm, cinematic, no bounce
    // ═══════════════════════════════════════════════════
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .set('.hero-photo', { scale: 1.035 })
      .to('.hero-photo', { scale: 1, duration: 1.4, ease: 'power3.out' }, 0)
      .from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.5 }, 0.15)
      .from('.hero-line', { opacity: 0, y: 35, duration: 0.8, stagger: 0.1 }, 0.30)
      .from('.hero-body', { opacity: 0, y: 15, duration: 0.6 }, 0.65)
      .from('.hero-cta', { opacity: 0, y: 15, duration: 0.5 }, 0.80);

    // ═══════════════════════════════════════════════════
    // AMBIENT — barely perceptible natural life
    // ═══════════════════════════════════════════════════
    // Warm light drifts across the photograph (extremely slow)
    gsap.to('.hero-light-overlay', {
      x: '+=12', y: '-=4',
      duration: 12, ease: 'sine.inOut',
      yoyo: true, repeat: -1,
    });

    // ═══════════════════════════════════════════════════
    // SCROLL PARALLAX — cinematic transition out of hero
    // ═══════════════════════════════════════════════════
    if (!mobile) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.timeline()
          .to('.hero-photo', { scale: 1.04, y: -12, ease: 'none' }, 0)
          .to('.hero-text', { y: -20, opacity: 0.55, ease: 'none' }, 0)
          .to('.hero-cta', { opacity: 0, ease: 'none' }, 0),
      });
    } else {
      // Mobile: very light, smooth, no sticky feel
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.timeline()
          .to('.hero-photo', { yPercent: 3, ease: 'none' }, 0)
          .to('.hero-text', { opacity: 0.7, ease: 'none' }, 0),
      });
    }

    // ═══════════════════════════════════════════════════
    // MOUSE PARALLAX — desktop only, extremely subtle
    // ═══════════════════════════════════════════════════
    if (!mobile) {
      const xTo = gsap.quickTo('.hero-photo-wrap', 'x', { duration: 0.8, ease: 'power3' });
      const yTo = gsap.quickTo('.hero-photo-wrap', 'y', { duration: 0.8, ease: 'power3' });

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        xTo(px * 4);
        yTo(py * 3);
      };
      const onLeave = () => { xTo(0); yTo(0); };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    }
  }, []);

  return (
    <section id="top" ref={scope} style={{ background: D.paper, scrollMarginTop: '72px', overflow: 'hidden' }}>
      {/* ════════════════════════════════════════════════
          DESKTOP — full-width cinematic hero, 78–88vh
          ════════════════════════════════════════════════ */}
      <div
        className="hidden md:block relative overflow-hidden"
        style={{ minHeight: 'max(78vh, 650px)', maxHeight: '900px' }}
      >
        {/* Mouse parallax wrapper */}
        <div className="hero-photo-wrap absolute inset-0" style={{ willChange: 'transform' }}>
          {/* Hero photograph — single layer, no duplicates */}
          <div
            className="hero-photo absolute inset-0"
            style={{
              backgroundColor: D.accentSoft,
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              willChange: 'transform',
            }}
          />
          {/* Extremely subtle warm light overlay — barely perceptible drift */}
          <div
            className="hero-light-overlay absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 40%, rgba(255,245,230,0.035) 0%, transparent 50%)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />

        </div>

        {/* Left-side cream gradient for text readability */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: '52%',
            background: 'linear-gradient(to right, rgba(241,236,229,0.92) 0%, rgba(241,236,229,0.75) 18%, rgba(241,236,229,0.35) 38%, rgba(241,236,229,0) 58%)',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />

        {/* Text overlay — positioned over the negative space on the left */}
        <div
          className="hero-text relative z-10 flex items-center"
          style={{ willChange: 'transform', minHeight: 'max(78vh, 650px)', maxHeight: '900px' }}
        >
          <div className="max-w-[480px] px-8 md:px-12 lg:px-16">
            <HeroText isPrimary={true} />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          MOBILE — text first, then hero photograph
          ════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Text content — aria-hidden so crawlers/AT don't see duplicate of the desktop H1 */}
        <div className="hero-text px-5 pt-12 pb-6" aria-hidden="true">
          <HeroText isPrimary={false} />
        </div>

        {/* Hero photograph — single layer, preserves both product bags */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
          <div
            className="hero-photo absolute inset-0"
            style={{
              backgroundColor: D.accentSoft,
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: '65% center',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Secondary compare link — below hero photograph, mobile only */}
        <div className="hero-compare-link px-5 py-10 text-center">
          <a href="#comparison" className="group inline-flex items-center gap-2" style={{ fontFamily: SANS, fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: D.secondary, textDecoration: 'none' }}>
            Compare the two
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" style={{ strokeWidth: 1.75 }} />
          </a>
        </div>
      </div>
    </section>
  );
}