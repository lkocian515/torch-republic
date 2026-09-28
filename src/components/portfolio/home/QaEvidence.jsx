import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

const CARDS = [
  {
    title: 'Restored Add to Cart behavior across the storefront',
    problem: 'The homepage Add to Cart action failed without updating the cart count or giving the customer confirmation.',
    investigation: 'The customer-facing update depended on a successful Shopify response. When the request failed, the action rolled back and the interface appeared unresponsive.',
    resolution: 'The cart flow was revised to provide immediate feedback and preserve local cart state while Shopify synchronization occurred in the background.',
    verification: 'Retested Add to Cart from the homepage, shop page, and product-detail page, including cart count, quantity controls, removal, and checkout handoff.',
    skills: 'Functional QA \u00b7 Root-cause analysis \u00b7 Regression testing',
  },
  {
    title: 'Corrected outdated portfolio metadata',
    problem: 'AI-assisted output introduced stale coffee-brand references, discontinued terms, incorrect canonical URLs, and inappropriate structured-data types into the professional portfolio.',
    resolution: 'Updated titles, descriptions, social metadata, canonical URLs, and structured data to represent Lisa Marie Kocian as a professional individual rather than a coffee organization.',
    verification: 'Inspected the rendered document head and confirmed that obsolete coffee terminology no longer appeared in global portfolio metadata.',
    skills: 'AI output validation \u00b7 Metadata QA \u00b7 Source-to-output verification',
  },
  {
    title: 'Resolved broken product imagery',
    problem: 'Product components referenced hardcoded image URLs that no longer resolved, producing broken-image states across the store.',
    resolution: 'Removed obsolete URLs and standardized the affected components around verified image sources and fallback behavior.',
    verification: 'Retested the affected product, collection, and gallery views.',
    skills: 'Defect investigation \u00b7 Content systems \u00b7 Cross-page validation',
  },
];

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      <p style={{ fontFamily: FONT_MONO, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 0.3rem' }}>
        {label}
      </p>
      <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.6, color: P.secondary, margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

export default function QaEvidence() {
  return (
    <section
      id="evidence"
      style={{
        background: P.surface,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected QA evidence"
          heading="From observation to verified improvement"
          intro="Representative examples showing how I define a problem, investigate its cause, implement or specify a correction, and verify the result."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              style={{
                background: P.paper,
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  fontFamily: FONT_SERIF,
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  color: P.ink,
                  margin: '0 0 1rem',
                  lineHeight: 1.3,
                }}
              >
                {c.title}
              </h3>
              <Field label="Problem">{c.problem}</Field>
              {c.investigation && <Field label="Investigation">{c.investigation}</Field>}
              <Field label="Resolution">{c.resolution}</Field>
              <Field label="Verification">{c.verification}</Field>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.62rem',
                  letterSpacing: '0.06em',
                  color: P.accentInk,
                  margin: 'auto 0 0',
                  paddingTop: '0.85rem',
                  borderTop: `1px solid ${P.rule}`,
                  lineHeight: 1.5,
                }}
              >
                {c.skills}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}