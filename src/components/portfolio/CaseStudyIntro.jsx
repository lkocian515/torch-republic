import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, SubHeading, BodyText, Pill } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS, LIVE_STORE } from './portfolioTheme';
import { ArrowUpRight } from 'lucide-react';

const ROLE = [
  'Product strategy', 'Business requirements', 'E-commerce architecture decisions', 'AI-assisted development',
  'Prompt iteration', 'Content architecture', 'Customer-experience design', 'Product taxonomy',
  'QA testing', 'Mobile QA', 'Output validation', 'Troubleshooting', 'Analytics interpretation',
  'Conversion optimization', 'Iterative redesign',
];

const SKILLS_DEMONSTRATED = [
  'AI-assisted development',
  'QA testing',
  'E-commerce architecture',
  'React / application troubleshooting',
  'User journey testing',
  'Accessibility review',
  'SEO QA',
  'Metadata QA',
  'Content QA',
  'Analytics implementation',
  'Prompt iteration',
  'Conversion analysis',
  'Documentation',
];

export default function CaseStudyIntro() {
  return (
    <SectionWrap id="case-study">
      <Eyebrow>Flagship Case Study</Eyebrow>
      <SectionHeading>Building &amp; Iterating an AI-Assisted E-Commerce System</SectionHeading>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: P.ink, background: P.accentSoft, border: `1px solid ${P.accent}33`, borderRadius: '4px', padding: '0.3rem 0.7rem' }}>
          Project — Torch Republic Coffee Company
        </span>
        <a href={LIVE_STORE} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 600, color: P.accent, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          View live site <ArrowUpRight size={14} />
        </a>
      </div>

      {/* 1. The Challenge */}
      <div className="mt-10">
        <SubHeading>1. The Challenge</SubHeading>
        <BodyText>
          Build and refine a differentiated digital commerce experience from the ground up using AI-assisted tools —
          then turn generated output into an accurate, consistent, conversion-minded storefront. The work was not
          &ldquo;generate a site.&rdquo; It was continuously evaluating output against business requirements, catching defects,
          validating fixes, and improving the experience across product, content, navigation and mobile.
        </BodyText>
      </div>

      {/* 2. My Role */}
      <div className="mt-9">
        <SubHeading>2. My Role</SubHeading>
        <BodyText>
          I owned the project end-to-end — strategy, requirements, architecture decisions, AI-assisted build, prompt
          iteration, QA, and iteration. AI accelerated execution; human judgment directed requirements, testing,
          validation, iteration and business decisions.
        </BodyText>
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5" style={{ maxWidth: '70ch' }}>
          {ROLE.map((r, i) => (
            <span key={r} style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', color: P.secondary, display: 'inline-flex', alignItems: 'baseline' }}>
              {r}{i < ROLE.length - 1 && <span style={{ color: P.muted, marginLeft: '0.75rem' }} aria-hidden="true">&middot;</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Skills Demonstrated */}
      <div className="mt-9">
        <SubHeading>Skills Demonstrated</SubHeading>
        <div className="mt-4 flex flex-wrap gap-2">
          {SKILLS_DEMONSTRATED.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}