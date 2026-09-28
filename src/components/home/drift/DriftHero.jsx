import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { D, SERIF, SANS, MONO, MOTION } from './driftTheme';
import { useDriftMotion, isMobile } from './useDriftMotion';

const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f0baca98f_file_00000000f01c822fa487ced70d607099.png';

export default function DriftHero() {
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    const mobile = isMobile();

    // ═══ Cinematic entrance — calm, no bounce ═══
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .set('.hero-photo', { scale: 1.04 })
      .to('.hero-photo', { scale: 1, duration: MOTION.duration.hero, ease: 'power3.out' }, 0)
      .from('.hero-eyebrow', { opacity: 0, y: 14, duration: MOTION.duration.slow }, 0.15)
      .from('.hero-line', { opacity: 0, y: 40, duration: MOTION.duration.cinematic, stagger: 0.08 }, 0.30)
      .from('.hero-body', { opacity: 0, y: 15, duration: MOTION.duration.slow }, 0.75)
      .from('.hero-cta', { opacity: 0, y: 15, duration: MOTION.duration.base }, 0.90)
      .from('.hero-scroll-cue', { opacity: 0, duration: MOTION.duration.slow }, 1.2);

    // ═══ Ambient — barely perceptible product float (desktop only) ═══
    if (!mobile) {
      gsap.to('.hero-photo', {
        y: '-=10', duration: 5, ease: 'sine.inOut',
        yoyo: true, repeat: -1,
      });

      // ═══ Scroll parallax ═══
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.timeline()
          .to('.hero-photo', { scale: 1.06, y: -20, ease: 'none' }, 0)
          .to('.hero-text', { y: -24, opacity: 0.5, ease: 'none' }, 0)
          .to('.hero-cta', { opacity: 0, ease: 'none' }, 0)
          .to('.hero-scroll-cue', { opacity: 0, ease: 'none' }, 0),
      });

      // ═══ Mouse parallax — extremely subtle ═══
      const xTo = gsap.quickTo('.hero-photo-wrap', 'x', { duration: 0.8, ease: 'power3' });
      const yTo = gsap.quickTo('.hero-photo-wrap', 'y', { duration: 0.8, ease: 'power3' });
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        xTo(px * 5);
        yTo(py * 3);
      };
      const onLeave = () => { xTo(0); yTo(0); };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    } else {
      // Mobile: gentle parallax only
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.timeline()
          .to('.hero-photo', { yPercent: 4, ease: 'none' }, 0)
          .to('.hero-text', { opacity: 0.7, ease: 'none' }, 0),
      });
    }
  }, []);

  return (
    <section
      id="top"
      ref={scope}
      style={{
        background: `linear-gradient(165deg, ${D.cream} 0%, ${D.paper} 35%, ${D.accentSoft} 100%)`,
        scrollMarginTop: '72px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Atmospheric warm glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '60%',
          height: '70%',
          background: `radial-gradient(ellipse at center, ${D.terracottaSoft} 0%, transparent 60%)`,
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] md:gap-8 lg:gap-12 md:items-center md:min-h-[max(82vh,600px)]">
          {/* ── Text ── */}
          <div className="hero-text relative z-10 pt-10 pb-2 md:pt-0 md:pb-0" style={{ willChange: 'transform' }}>
            <div className="max-w-[500px]">
              <p className="hero-eyebrow" style={{ fontFamily: MONO, fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1.5rem' }}>
                Instant Coffee, Reimagined
              </p>
              <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)', lineHeight: 1.02, letterSpacing: '-0.02em', color: D.ink, margin: '0 0 1.5rem', textWrap: 'balance' }}>
                <span style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.15em', marginBottom: '-0.15em' }}>
                  <span className="hero-line" style={{ display: 'block' }}>Coffee for people</span>
                </span>
                <span style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.15em', marginBottom: '-0.15em' }}>
                  <span className="hero-line" style={{ display: 'block' }}>building something.</span>
                </span>
              </h1>
              <p className="hero-body" style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2.25rem', maxWidth: '42ch' }}>
                Premium instant coffee created for better mornings, focused work
                and rituals worth keeping.
              </p>
              <div className="hero-cta flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link
                  to="/shop"
                  className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]"
                  style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', letterSpacing: '0.04em', boxShadow: D.shadowCard }}
                >
                  Shop the Coffee <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/quiz"
                  className="group inline-flex items-center gap-2 transition-opacity hover:opacity-70"
                  style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.espresso, textDecoration: 'none' }}
                >
                  Find Your Ritual <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Product imagery ── */}
          <div className="hero-photo-wrap relative flex items-center justify-center" style={{ willChange: 'transform', minHeight: '300px' }}>
            <div
              className="hero-photo"
              style={{
                backgroundImage: `url(${HERO_IMAGE})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                maxWidth: '520px',
                aspectRatio: '1 / 1',
                willChange: 'transform',
                filter: `drop-shadow(${D.shadowHero})`,
              }}
              role="img"
              aria-label="Torch Republic instant coffee bags — Classic and Mushroom"
            />
            {/* Warm atmospheric ring behind product */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                height: '70%',
                background: `radial-gradient(circle, ${D.sunrise}30 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="hero-scroll-cue hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1" style={{ opacity: 0.6 }}>
        <span style={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D.muted }}>Scroll</span>
        <ChevronDown size={14} style={{ color: D.muted }} />
      </div>
    </section>
  );
}