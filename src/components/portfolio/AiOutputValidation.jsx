import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

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

      {/* Problem */}
      <div className="mt-9">
        <h3 style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: 0 }}>The Problem</h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, marginTop: '0.5rem', maxWidth: '68ch' }}>
          {CASE.problem}
        </p>
      </div>

      {/* What I Tested */}
      <div className="mt-7">
        <h3 style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: 0 }}>What I Tested</h3>
        <ul className="mt-3 m-0 p-0 list-none flex flex-col gap-2">
          {CASE.tested.map((t) => (
            <li key={t} style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.6, color: P.secondary, display: 'flex', gap: '0.6rem' }}>
              <span style={{ color: P.accent, flexShrink: 0 }} aria-hidden="true">—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What I Found */}
      <div className="mt-7">
        <h3 style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: 0 }}>What I Found</h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, marginTop: '0.5rem', maxWidth: '68ch' }}>
          {CASE.found}
        </p>
      </div>

      {/* What I Changed */}
      <div className="mt-7">
        <h3 style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: 0 }}>What I Changed</h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, marginTop: '0.5rem', maxWidth: '68ch' }}>
          {CASE.changed}
        </p>
      </div>

      {/* Verification */}
      <div className="mt-7">
        <h3 style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: 0 }}>Verification</h3>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, marginTop: '0.5rem', maxWidth: '68ch' }}>
          {CASE.verification}
        </p>
      </div>

      {/* Skills Demonstrated */}
      <div className="mt-7">
        <h3 style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: 0 }}>Skills Demonstrated</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {CASE.skills.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.82rem',
                fontWeight: 500,
                color: P.ink,
                background: P.surface,
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                padding: '0.4rem 0.75rem',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}