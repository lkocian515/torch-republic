import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS, LIVE_STORE } from './portfolioTheme';
import { ArrowUpRight, Check } from 'lucide-react';

const ROLE = [
  'Product strategy', 'Business requirements', 'E-commerce architecture decisions', 'AI-assisted development',
  'Prompt iteration', 'Content architecture', 'Customer-experience design', 'Product taxonomy',
  'QA testing', 'Mobile QA', 'Output validation', 'Troubleshooting', 'Analytics interpretation',
  'Conversion optimization', 'Iterative redesign',
];

export default function CaseStudyIntro() {
  return (
    <SectionWrap id="case-study">
      <Eyebrow>Flagship Case Study</Eyebrow>
      <SectionHeading>Building &amp; Iterating an AI-Assisted E-Commerce System</SectionHeading>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span style={{ fontFamily: FONT_MONO, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: P.ink, background: P.accentSoft, border: `1px solid ${P.accent}33`, borderRadius: '999px', padding: '0.35rem 0.75rem' }}>
          Project — Torch Republic Coffee Company
        </span>
        <a href={LIVE_STORE} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 600, color: P.accent, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          View live site <ArrowUpRight size={14} />
        </a>
      </div>

      {/* 1. The Challenge */}
      <div className="mt-10">
        <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.15rem', color: P.ink, margin: 0 }}>1. The Challenge</h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: '1rem', lineHeight: 1.7, color: P.secondary, marginTop: '0.6rem', maxWidth: '70ch' }}>
          Build and refine a differentiated digital commerce experience from the ground up using AI-assisted tools —
          then turn generated output into an accurate, consistent, conversion-minded storefront. The work was not
          “generate a site.” It was continuously evaluating output against business requirements, catching defects,
          validating fixes, and improving the experience across product, content, navigation and mobile.
        </p>
      </div>

      {/* 2. My Role */}
      <div className="mt-10">
        <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.15rem', color: P.ink, margin: 0 }}>2. My Role</h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: '1rem', lineHeight: 1.7, color: P.secondary, marginTop: '0.6rem', maxWidth: '70ch' }}>
          I owned the project end-to-end — strategy, requirements, architecture decisions, AI-assisted build, prompt
          iteration, QA, and iteration. AI accelerated execution; human judgment directed requirements, testing,
          validation, iteration and business decisions.
        </p>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ROLE.map((r) => (
            <span key={r} style={{ fontFamily: FONT_SANS, fontSize: '0.8rem', color: P.ink, background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '8px', padding: '0.4rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={13} style={{ color: P.accent, flexShrink: 0 }} aria-hidden="true" /> {r}
            </span>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}