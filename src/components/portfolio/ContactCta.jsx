import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { P, FONT_MONO, FONT_SANS, LINKEDIN, CONTACT_EMAIL } from './portfolioTheme';
import { usePortfolioMotion } from './usePortfolioMotion';

export default function ContactCta() {
  const scope = usePortfolioMotion((gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.contact-section', start: 'top 75%' },
      defaults: { ease: 'power3.out' },
    });
    tl
      .from('.contact-eyebrow', { opacity: 0, y: 10, duration: 0.4 }, 0)
      .from('.contact-heading', { opacity: 0, y: 24, duration: 0.6 }, 0.1)
      .from('.contact-body', { opacity: 0, y: 15, duration: 0.5 }, 0.35)
      .from('.contact-cta', { opacity: 0, y: 12, duration: 0.4, stagger: 0.08 }, 0.55)
      .from('.contact-shape', { opacity: 0, scale: 0.95, duration: 0.8, ease: 'power2.out' }, 0);
  });

  return (
    <section
      id="contact"
      ref={scope}
      className="contact-section"
      style={{ background: P.ink, color: '#FFFFFF', scrollMarginTop: '72px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle background geometry */}
      <div
        className="contact-shape"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-10%',
          top: '-20%',
          width: '60%',
          height: '140%',
          background: `radial-gradient(ellipse at center, ${P.accent}11 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        className="contact-shape"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-5%',
          bottom: '-10%',
          width: '30%',
          height: '60%',
          background: `radial-gradient(ellipse at center, ${P.accent}08 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div className="mx-auto max-w-[860px] px-6 md:px-10 py-16 md:py-24 text-center md:text-left" style={{ position: 'relative', zIndex: 1 }}>
        <p className="contact-eyebrow" style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#93C5FD', margin: 0 }}>
          Contact
        </p>
        <h2 className="contact-heading" style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 'clamp(1.7rem, 3.4vw, 2.4rem)', lineHeight: 1.2, letterSpacing: '-0.01em', color: '#FFFFFF', margin: '0.85rem 0 0', textWrap: 'balance' }}>
          Looking for someone who catches issues before they reach users?
        </h2>
        <p className="contact-body mx-auto md:mx-0" style={{ fontFamily: FONT_SANS, fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.78)', margin: '1.25rem 0 0', maxWidth: '56ch' }}>
          I am interested in roles involving AI quality assurance, AI content evaluation,
          prompt testing, e-commerce QA, AI implementation, and digital product quality.
          Let&rsquo;s talk about how I can help your team ship better output.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center sm:items-center">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="contact-cta group inline-flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.01]"
            style={{ minHeight: 48, padding: '0.7rem 1.6rem', borderRadius: '6px', background: '#FFFFFF', color: P.ink, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
          >
            <Mail size={16} /> {CONTACT_EMAIL}
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-cta group inline-flex items-center justify-center gap-2"
            style={{ minHeight: 48, padding: '0.7rem 1.6rem', borderRadius: '6px', background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
          >
            <Linkedin size={16} /> Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}