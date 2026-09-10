import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { useDriftMotion, isMobile } from './useDriftMotion';

const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f0baca98f_file_00000000f01c822fa487ced70d607099.png';

// ── Reusable text block (shared between desktop and mobile layouts) ──
function HeroText() {
  return (
    <>
      <p className="hero-eyebrow" style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1.5rem' }}>
        Premium Coffee &middot; Zero Equipment
      </p>
      <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', lineHeight: 1.02, letterSpacing: '-0.02em', color: D.ink, margin: '0 0 1.25rem', textWrap: 'balance' }}>
        <span style={{ overflow: 'hidden', display: 'block' }}>
          <span className="hero-line" style={{ display: 'block' }}>Better mornings,</span>
        </span>
        <span style={{ overflow: 'hidden', display: 'block' }}>
          <span className="hero-line" style={{ display: 'block' }}>in an instant.</span>
        </span>
      </h1>
      <p className="hero-body" style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2rem', maxWidth: '40ch' }}>
        Premium coffee made for real mornings. Scoop. Stir. Sip.
      </p>
      <div className="hero-cta flex flex-col sm:flex-row gap-4 sm:items-center">
        <Link to="/shop" className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]" style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', letterSpacing: '0.04em' }}>
          SHOP COFFEE <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
        <a href="#comparison" className="group inline-flex items-center gap-2" style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.espresso, textDecoration: 'none' }}>
          COMPARE THE TWO <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </>
  );
}

export default function DriftHero() {
  const [classic, mushroom] = CORE_PRODUCTS;

  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    const mobile = isMobile();

    // ═══════════════════════════════════════════════════════
    // ENTRANCE TIMELINE — cinematic, calm, no bounce
    // ═══════════════════════════════════════════════════════
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .set('.hero-photo', { scale: 1.04 })
      .from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.5 }, 0.15)
      .from('.hero-line', { opacity: 0, y: 35, duration: 0.8, stagger: 0.1 }, 0.30)
      .from('.hero-body', { opacity: 0, y: 15, duration: 0.6 }, 0.65)
      .from('.hero-cta', { opacity: 0, y: 15, duration: 0.5 }, 0.80)
      .to('.hero-photo', { scale: 1, duration: 0.95, ease: 'power2.out' }, 0.35)
      .from('.hero-product-layer', { opacity: 0, y: 15, duration: 0.9, ease: 'power2.out' }, 0.35);

    // ═══════════════════════════════════════════════════════
    // AMBIENT MOTION — very subtle, continuous life
    // ═══════════════════════════════════════════════════════
    gsap.to('.float-mushroom', { y: '+=4', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('.float-classic', { y: '+=5', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('.hero-light-overlay', { x: '+=15', y: '-=5', duration: 10, ease: 'sine.inOut', yoyo: true, repeat: -1 });

    // ═══════════════════════════════════════════════════════
    // STEAM — faint wisps rising from the cup area
    // ═══════════════════════════════════════════════════════
    gsap.utils.toArray('.hero-steam-wisp').forEach((wisp, i) => {
      gsap.timeline({ repeat: -1, delay: i * 2 })
        .set(wisp, { y: 0, opacity: 0, scale: 0.8 })
        .to(wisp, { y: -15, opacity: 0.12, scale: 1, duration: 1.5, ease: 'sine.out' })
        .to(wisp, { y: -35, opacity: 0, scale: 1.2, duration: 2.5, ease: 'sine.in' });
    });

    // ═══════════════════════════════════════════════════════
    // SCROLL PARALLAX — cinematic transition into the page
    // ═══════════════════════════════════════════════════════
    if (!mobile) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.timeline()
          .to('.hero-photo', { scale: 1.05, ease: 'none' }, 0)
          .to('.hero-product-mushroom', { yPercent: -7, ease: 'none' }, 0)
          .to('.hero-product-classic', { yPercent: -9, ease: 'none' }, 0)
          .to('.hero-text', { y: -25, opacity: 0.5, ease: 'none' }, 0)
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
          .to('.hero-photo', { yPercent: 5, ease: 'none' }, 0)
          .to('.hero-text', { opacity: 0.7, ease: 'none' }, 0),
      });
    }

    // ═══════════════════════════════════════════════════════
    // MOUSE PARALLAX — desktop only, heavy smoothing
    // ═══════════════════════════════════════════════════════
    if (!mobile) {
      const layers = [
        { sel: '.hero-photo', mx: 3, my: 3, dur: 0.6 },
        { sel: '.depth-mushroom', mx: 5, my: 5, dur: 0.8 },
        { sel: '.depth-classic', mx: 8, my: 8, dur: 1.0 },
      ];
      const quicks = layers.map((l) => ({
        xTo: gsap.quickTo(l.sel, 'x', { duration: l.dur, ease: 'power3' }),
        yTo: gsap.quickTo(l.sel, 'y', { duration: l.dur, ease: 'power3' }),
        mx: l.mx,
        my: l.my,
      }));

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        quicks.forEach((q) => { q.xTo(px * q.mx); q.yTo(py * q.my); });
      };
      const onLeave = () => quicks.forEach((q) => { q.xTo(0); q.yTo(0); });

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
      {/* ═══════════════════════════════════════════════════
          DESKTOP — split editorial, 90vh
          ═══════════════════════════════════════════════════ */}
      <div className="hidden md:grid md:grid-cols-[45fr_55fr]" style={{ minHeight: '90vh' }}>
        {/* Left: text content */}
        <div className="hero-text relative z-10 flex items-center px-8 md:px-12 lg:px-16" style={{ willChange: 'transform' }}>
          <div className="max-w-[460px]">
            <HeroText />
          </div>
        </div>

        {/* Right: layered visual */}
        <div className="relative overflow-hidden">
          {/* Layer 1: hero photograph (background, slowest) */}
          <div
            className="hero-photo absolute inset-0"
            style={{
              backgroundColor: D.accentSoft,
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'transform',
              zIndex: 1,
            }}
          />

          {/* Layer 2: Mushroom bag (rear product) */}
          <div
            className="hero-product-layer hero-product-mushroom"
            style={{ position: 'absolute', right: '6%', bottom: '12%', width: '26%', maxWidth: 190, zIndex: 2 }}
          >
            <div className="depth-mushroom" style={{ position: 'relative', willChange: 'transform' }}>
              <div className="float-mushroom" style={{ position: 'relative', willChange: 'transform' }}>
                <img
                  src={mushroom.image}
                  alt={mushroom.alt}
                  style={{ width: '100%', mixBlendMode: 'multiply', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Layer 3: Classic bag (front product) */}
          <div
            className="hero-product-layer hero-product-classic"
            style={{ position: 'absolute', left: '10%', bottom: '8%', width: '30%', maxWidth: 220, zIndex: 3 }}
          >
            <div className="depth-classic" style={{ position: 'relative', willChange: 'transform' }}>
              <div className="float-classic" style={{ position: 'relative', willChange: 'transform' }}>
                <img
                  src={classic.image}
                  alt={classic.alt}
                  style={{ width: '100%', mixBlendMode: 'multiply', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Layer 4: warm light overlay (ambient shift) */}
          <div
            className="hero-light-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 35% 45%, rgba(255,245,230,0.06) 0%, transparent 50%)',
              pointerEvents: 'none',
              willChange: 'transform',
              zIndex: 4,
            }}
          />

          {/* Layer 5: steam wisps (near cup area) */}
          <div style={{ position: 'absolute', left: '22%', bottom: '42%', pointerEvents: 'none', zIndex: 5 }}>
            <div
              className="hero-steam-wisp"
              style={{
                position: 'absolute',
                width: 20,
                height: 60,
                background: 'linear-gradient(to top, rgba(255,255,255,0.1), transparent)',
                borderRadius: '50%',
                filter: 'blur(6px)',
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            />
            <div
              className="hero-steam-wisp"
              style={{
                position: 'absolute',
                left: 12,
                width: 16,
                height: 50,
                background: 'linear-gradient(to top, rgba(255,255,255,0.08), transparent)',
                borderRadius: '50%',
                filter: 'blur(5px)',
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            />
          </div>

          {/* Left edge gradient — blends visual into text area */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: 80,
              background: `linear-gradient(to right, ${D.paper} 0%, transparent 100%)`,
              pointerEvents: 'none',
              zIndex: 6,
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MOBILE — text first, then hero visual
          ═══════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Text */}
        <div className="hero-text px-5 pt-12 pb-6">
          <HeroText />
        </div>

        {/* Hero visual */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
          {/* Background: hero photograph */}
          <div
            className="hero-photo absolute inset-0"
            style={{
              backgroundColor: D.accentSoft,
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'transform',
              zIndex: 1,
            }}
          />

          {/* Mushroom bag */}
          <div
            className="hero-product-layer hero-product-mushroom"
            style={{ position: 'absolute', right: '5%', bottom: '8%', width: '34%', maxWidth: 140, zIndex: 2 }}
          >
            <div className="depth-mushroom" style={{ position: 'relative' }}>
              <div className="float-mushroom" style={{ position: 'relative' }}>
                <img
                  src={mushroom.image}
                  alt={mushroom.alt}
                  style={{ width: '100%', mixBlendMode: 'multiply', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Classic bag */}
          <div
            className="hero-product-layer hero-product-classic"
            style={{ position: 'absolute', left: '5%', bottom: '5%', width: '38%', maxWidth: 160, zIndex: 3 }}
          >
            <div className="depth-classic" style={{ position: 'relative' }}>
              <div className="float-classic" style={{ position: 'relative' }}>
                <img
                  src={classic.image}
                  alt={classic.alt}
                  style={{ width: '100%', mixBlendMode: 'multiply', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Light overlay */}
          <div
            className="hero-light-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 35% 45%, rgba(255,245,230,0.06) 0%, transparent 50%)',
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />
        </div>
      </div>
    </section>
  );
}