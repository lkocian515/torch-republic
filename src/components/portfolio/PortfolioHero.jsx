import React from 'react';
import { ArrowRight, ArrowUpRight, Check, AlertTriangle, BadgeCheck, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO, FONT_SANS, LINKEDIN } from './portfolioTheme';
import { usePortfolioMotion, isMobile } from './usePortfolioMotion';

const QA_MODULES = [
  { label: 'OUTPUT VALIDATION', status: 'pass', text: 'Product naming consistent' },
  { label: 'METADATA QA', status: 'warn', text: 'Legacy terminology detected' },
  { label: 'CONTENT QA', status: 'pass', text: 'Instructions followed' },
  { label: 'CHECKOUT FLOW', status: 'pass', text: 'Route verified' },
  { label: 'PROMPT TEST', status: 'info', text: 'Revised instruction' },
];

const STATUS_STYLES = {
  pass: { color: '#059669', icon: Check },
  warn: { color: '#D97706', icon: AlertTriangle },
  info: { color: P.accent, icon: ArrowRightIcon },
};

function QaPanel() {
  return (
    <div className="qa-panel" style={{ position: 'relative' }}>
      {/* Background layer */}
      <div className="qa-panel-bg" style={{
        background: P.surface,
        border: `1px solid ${P.rule}`,
        borderRadius: '14px',
        padding: '1.5rem',
        willChange: 'transform',
        boxShadow: '0 1px 3px rgba(17,24,39,0.04), 0 12px 32px rgba(17,24,39,0.06)',
      }}>
        {/* Header */}
        <div className="qa-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '1rem',
          marginBottom: '1rem',
          borderBottom: `1px solid ${P.rule}`,
          willChange: 'transform',
        }}>
          <div className="flex items-center gap-2">
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#059669',
              display: 'inline-block',
              boxShadow: '0 0 0 3px rgba(5,150,105,0.15)',
            }} aria-hidden="true" />
            <span style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: P.ink }}>
              QA Inspection
            </span>
          </div>
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: P.muted }}>
            Live
          </span>
        </div>

        {/* Modules */}
        <div className="qa-modules" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {QA_MODULES.map((m, i) => {
            const s = STATUS_STYLES[m.status];
            const Icon = s.icon;
            return (
              <div key={m.label} className={`qa-module qa-module-${i}`} style={{
                background: P.paper,
                border: `1px solid ${P.rule}`,
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                willChange: 'transform',
              }}>
                <p style={{ fontFamily: FONT_MONO, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: P.muted, margin: '0 0 0.4rem' }}>
                  {m.label}
                </p>
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: s.color, flexShrink: 0 }} strokeWidth={2} />
                  <span style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 500, color: P.ink }}>
                    {m.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioHero() {
  const scope = usePortfolioMotion((gsap, ScrollTrigger, el) => {
    const mobile = isMobile();

    // ── Entrance timeline ──
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .from('.hero-eyebrow', { opacity: 0, y: 10, duration: 0.5 }, 0)
      .from('.hero-name-line', { opacity: 0, y: 30, duration: 0.7, stagger: 0.1 }, 0.15)
      .from('.hero-subtitle', { opacity: 0, y: 15, duration: 0.5 }, 0.55)
      .from('.hero-body', { opacity: 0, y: 15, duration: 0.5 }, 0.7)
      .from('.hero-credential', { opacity: 0, y: 10, duration: 0.4 }, 0.8)
      .from('.hero-cta', { opacity: 0, y: 12, duration: 0.4, stagger: 0.08 }, 0.9);

    // ── QA modules stagger ──
    if (!mobile) {
      tl.from('.qa-header', { opacity: 0, y: 12, duration: 0.4 }, 0.5)
        .from('.qa-module', { opacity: 0, y: 14, duration: 0.4, stagger: 0.1 }, 0.65);

      // ── Pointer depth (desktop only) ──
      const xBg = gsap.quickTo('.qa-panel-bg', 'x', { duration: 1.0, ease: 'power3' });
      const yBg = gsap.quickTo('.qa-panel-bg', 'y', { duration: 1.0, ease: 'power3' });
      const xHdr = gsap.quickTo('.qa-header', 'x', { duration: 1.2, ease: 'power3' });
      const yHdr = gsap.quickTo('.qa-header', 'y', { duration: 1.2, ease: 'power3' });

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        xBg(px * 3);
        yBg(py * 2);
        xHdr(px * 6);
        yHdr(py * 4);
      };
      el.addEventListener('mousemove', onMove);
      return () => el.removeEventListener('mousemove', onMove);
    } else {
      tl.from('.qa-panel-bg', { opacity: 0, y: 20, duration: 0.5 }, 0.8);
    }
  });

  return (
    <section
      id="top"
      ref={scope}
      style={{ background: P.paper, borderBottom: `1px solid ${P.rule}`, scrollMarginTop: '72px', overflow: 'hidden' }}
    >
      <div className="mx-auto max-w-[1140px] px-6 md:px-10 py-14 md:py-20">
        <div className="grid md:grid-cols-[52fr_48fr] gap-10 md:gap-12 items-center">
          {/* LEFT */}
          <div className="text-center md:text-left">
            <p className="hero-eyebrow" style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: P.accent, margin: 0 }}>
              AI Quality Assurance &middot; AI Commerce &middot; Content Evaluation
            </p>

            <h1 style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.015em', color: P.ink, margin: '0.85rem 0 0.5rem', textWrap: 'balance' }}>
              <span style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
                <span className="hero-name-line" style={{ display: 'block' }}>Lisa Marie</span>
              </span>
              <span style={{ overflow: 'hidden', display: 'block', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
                <span className="hero-name-line" style={{ display: 'block' }}>Kocian</span>
              </span>
            </h1>

            <p className="hero-subtitle" style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)', color: P.accentInk, margin: '0 0 1.25rem', lineHeight: 1.3 }}>
              AI Quality Assurance + AI Commerce
            </p>

            <p className="hero-body mx-auto md:mx-0" style={{ fontFamily: FONT_SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.75rem', maxWidth: '52ch' }}>
              I test AI output, validate content quality, iterate on prompts, and QA e-commerce
              applications &mdash; catching accuracy issues, inconsistencies, and broken workflows
              before they reach users. My work combines AI output evaluation, document quality
              review, and hands-on digital product implementation, including a Shopify-integrated
              commerce application built with Base44 and React. I am currently part of the Alignerr
              network by Labelbox, a global community of experts who actively research and shape
              the future of AI.
            </p>

            <a
              href="https://labelbox.com/alignerr"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-credential group inline-flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
              style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', borderRadius: '8px', background: P.accentSoft, border: `1px solid ${P.accent}30`, textDecoration: 'none' }}
            >
              <BadgeCheck size={16} style={{ color: P.accent, flexShrink: 0 }} strokeWidth={2} />
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.8125rem', fontWeight: 600, color: P.accentInk }}>Alignerr Network</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: '0.6rem', color: P.muted, letterSpacing: '0.08em' }}>&middot;</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.8125rem', fontWeight: 500, color: P.secondary }}>Labelbox</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-center">
              <a href="#case-study" className="hero-cta group inline-flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.01]" style={{ minHeight: 48, padding: '0.7rem 1.6rem', borderRadius: '6px', background: P.accent, color: '#FFFFFF', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
                View My Work <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="hero-cta group inline-flex items-center justify-center gap-2 transition-colors duration-200" style={{ minHeight: 48, padding: '0.7rem 1.6rem', borderRadius: '6px', background: 'transparent', color: P.ink, border: `1px solid ${P.rule}`, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
                Contact Me <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hero-cta group inline-flex items-center justify-center gap-2" style={{ minHeight: 48, padding: '0.7rem 1rem', color: P.accent, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
                LinkedIn <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* RIGHT — QA Inspection Panel */}
          <div className="hero-qa">
            <QaPanel />
          </div>
        </div>
      </div>
    </section>
  );
}