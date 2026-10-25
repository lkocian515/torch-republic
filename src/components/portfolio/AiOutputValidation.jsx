import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead, SubLabel, BodyText, Pill } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';

// Second, smaller case study demonstrating that the QA methodology transfers
// beyond a single website. Derived from verified work performed during the
// Torch Republic build — metadata correction and discontinued-product-term
// cleanup are documented, real examples of AI output validation.
const CASE = {
  problem: 'AI-assisted output had introduced incorrect brand metadata, discontinued product names, and stale SEO terms into page titles, social previews, and structured data across the site.',
  tested: [
    'Factual accuracy of metadata against the current product catalog',
    'Instruction adherence — did the output match the requested brand identity',
    'Internal consistency across page titles, meta descriptions, and Open Graph tags',
    'Unsupported claims and discontinued product references in global metadata',
    'Structured data (JSON-LD) schema type correctness',
    'Social sharing preview accuracy on LinkedIn, Facebook, and Slack',
  ],
  found: 'Page titles, meta descriptions, and social card images still referenced a coffee company identity and discontinued product keywords. Structured data identified the site as a coffee organization rather than a professional portfolio. Canonical URLs pointed to the wrong domain. Twitter card metadata referenced a discontinued social handle.',
  changed: 'Corrected all metadata to reflect the intended professional identity. Removed discontinued product terminology from global metadata. Replaced the social card image with a portfolio-specific card. Updated structured data from Organization (coffee company) to Person + WebSite + WebPage schema. Corrected canonical URLs and Open Graph tags.',
  verification: 'Independently inspected the rendered DOM source after correction — not just the React component output, but the actual meta tags in document.head. Verified that no coffee-related terms remained in global title, description, OG tags, or Twitter card fields. Confirmed social preview would display the correct professional branding.',
  skills: [
    'AI output validation',
    'Metadata QA',
    'SEO QA',
    'Structured data validation',
    'Consistency checking',
    'Hallucination detection',
    'Source-to-output verification',
    'Social preview QA',
  ],
};

const SECTIONS = [
  { label: 'The Problem', body: CASE.problem },
  { label: 'What I Found', body: CASE.found },
  { label: 'What I Changed', body: CASE.changed },
  { label: 'Verification', body: CASE.verification },
];

export default function AiOutputValidation() {
  return (
    <SectionWrap id="second-case-study">
      <Eyebrow>Additional Case Study</Eyebrow>
      <SectionHeading>AI Output Validation &amp; Content QA</SectionHeading>
      <Lead>
        The same methodology — accuracy, consistency, testing — applies whether I am
        evaluating an AI-generated product page or auditing metadata for an entire site.
        This example shows how I caught and corrected AI-introduced errors in global SEO identity.
      </Lead>

      {/* What I Tested — list format */}
      <div className="mt-9" style={{ borderLeft: `2px solid ${P.accent}`, paddingLeft: '1.25rem' }}>
        <SubLabel>What I Tested</SubLabel>
        <ul className="mt-2.5 m-0 p-0 list-none flex flex-col gap-1.5">
          {CASE.tested.map((t) => (
            <li key={t} style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.6, color: P.secondary, display: 'flex', gap: '0.6rem' }}>
              <span style={{ color: P.accentInk, flexShrink: 0 }} aria-hidden="true">&mdash;</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Narrative sections with consistent left-border structure */}
      {SECTIONS.map((sec) => (
        <div key={sec.label} className="mt-7" style={{ borderLeft: `2px solid ${P.rule}`, paddingLeft: '1.25rem' }}>
          <SubLabel>{sec.label}</SubLabel>
          <BodyText>{sec.body}</BodyText>
        </div>
      ))}

      {/* Skills Demonstrated */}
      <div className="mt-7" style={{ borderLeft: `2px solid ${P.rule}`, paddingLeft: '1.25rem' }}>
        <SubLabel>Skills Demonstrated</SubLabel>
        <div className="mt-3 flex flex-wrap gap-2">
          {CASE.skills.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}