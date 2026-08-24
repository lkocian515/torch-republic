import React from 'react';
import { ArrowRight, ArrowUpRight, Linkedin } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO, FONT_SANS, LINKEDIN } from './portfolioTheme';
import SystemNodes from './SystemNodes';

export default function PortfolioHero() {
  return (
    <section
      id="top"
      style={{ background: P.paper, borderBottom: `1px solid ${P.rule}`, scrollMarginTop: '72px' }}
    >
      <div className="mx-auto max-w-[1140px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: P.accent, margin: 0 }}>
              AI Quality • Implementation • Commerce
            </p>

            <h1
              style={{
                fontFamily: FONT_SERIF,
                fontWeight: 700,
                fontSize: 'clamp(2.6rem, 6vw, 4rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
                color: P.ink,
                margin: '0.85rem 0 0.5rem',
                textWrap: 'balance',
              }}
            >
              Lisa Marie Kocian
            </h1>

            <p style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)', color: P.accentInk, margin: '0 0 1.1rem', lineHeight: 1.3 }}>
              AI QA + E-Commerce Implementation Specialist
            </p>

            <p style={{ fontFamily: FONT_SANS, fontSize: '1.0625rem', lineHeight: 1.5, color: P.ink, margin: '0 0 1.25rem', fontWeight: 500, textWrap: 'balance' }}>
              Testing AI systems. Improving digital workflows. Building better commerce experiences.
            </p>

            <p style={{ fontFamily: FONT_SANS, fontSize: '1rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.75rem', maxWidth: '52ch' }}>
              I combine AI quality evaluation, prompt iteration, hands-on e-commerce development and business
              operations experience to identify problems, improve workflows and build more reliable digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <a
                href="#case-study"
                className="inline-flex items-center justify-center gap-2"
                style={{ minHeight: 48, padding: '0.7rem 1.5rem', borderRadius: '999px', background: P.accent, color: '#FFFFFF', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
              >
                Explore My Work <ArrowRight size={16} />
              </a>
              <a
                href="#case-study"
                className="inline-flex items-center justify-center gap-2"
                style={{ minHeight: 48, padding: '0.7rem 1.5rem', borderRadius: '999px', background: 'transparent', color: P.ink, border: `1px solid ${P.rule}`, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
              >
                View Torch Republic Case Study <ArrowUpRight size={16} />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
                style={{ minHeight: 48, padding: '0.7rem 1rem', color: P.accent, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '18px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', width: '100%', maxWidth: 520 }}>
              <SystemNodes />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}