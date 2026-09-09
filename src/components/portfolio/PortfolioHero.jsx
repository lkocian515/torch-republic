import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO, FONT_SANS, LINKEDIN } from './portfolioTheme';

export default function PortfolioHero() {
  return (
    <section
      id="top"
      style={{ background: P.paper, borderBottom: `1px solid ${P.rule}`, scrollMarginTop: '72px' }}
    >
      <div className="mx-auto max-w-[920px] px-6 md:px-10 py-16 md:py-20">
        <p style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: P.accent, margin: 0 }}>
          AI Quality Assurance &middot; AI Commerce &middot; Content Evaluation
        </p>

        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: P.ink,
            margin: '0.85rem 0 0.5rem',
            textWrap: 'balance',
          }}
        >
          Lisa Marie Kocian
        </h1>

        <p style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)', color: P.accentInk, margin: '0 0 1.25rem', lineHeight: 1.3 }}>
          AI Quality Assurance + AI Commerce
        </p>

        <p style={{ fontFamily: FONT_SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.75rem', maxWidth: '58ch' }}>
          I test AI output, validate content quality, iterate on prompts, and QA e-commerce
          experiences &mdash; catching accuracy issues, inconsistencies, and broken workflows
          before they reach users. My work combines AI output evaluation, document quality
          review, and hands-on digital product implementation.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <a
            href="#case-study"
            className="inline-flex items-center justify-center gap-2"
            style={{ minHeight: 48, padding: '0.7rem 1.6rem', borderRadius: '6px', background: P.accent, color: '#FFFFFF', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
          >
            View My Work <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2"
            style={{ minHeight: 48, padding: '0.7rem 1.6rem', borderRadius: '6px', background: 'transparent', color: P.ink, border: `1px solid ${P.rule}`, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
          >
            Contact Me <ArrowUpRight size={16} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2"
            style={{ minHeight: 48, padding: '0.7rem 1rem', color: P.accent, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}