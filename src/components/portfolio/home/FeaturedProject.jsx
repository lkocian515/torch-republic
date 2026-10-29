import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { P, FONT_SANS, FONT_MONO, LIVE_STORE, caseStudyUrl } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

const PREVIEWS = [
  {
    label: 'Attribute hallucinations',
    body: 'AI-generated roast descriptions cited non-existent tasting notes and misattributed region elevations.',
    anchor: 'failure-attribute-hallucinations',
  },
  {
    label: 'Dynamic cart quantity bugs',
    body: 'Rapid incrementing on mobile desynced the cart drawer from Shopify’s checkout API, causing inventory lock errors.',
    anchor: 'failure-cart-quantity',
  },
  {
    label: 'PII leakage in analytics tags',
    body: 'Unvetted marketing scripts captured raw email strings in URL parameters during checkout redirects.',
    anchor: 'failure-pii-tags',
  },
];

export default function FeaturedProject() {
  return (
    <section
      id="work"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected work"
          heading="Torch Republic commerce application"
          intro="A functioning Base44/React application integrated with Shopify, built through AI-assisted implementation, manual review, troubleshooting, and QA."
        />

        <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
          {/* Metadata column */}
          <div
            style={{
              background: P.surface,
              border: `1px solid ${P.rule}`,
              borderRadius: '6px',
              padding: '1.5rem',
            }}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 0.4rem' }}>Role</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', color: P.ink, margin: 0, lineHeight: 1.5 }}>Product owner &middot; Requirements &middot; AI-assisted implementation review &middot; QA</p>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 0.4rem' }}>Systems</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', color: P.ink, margin: 0, lineHeight: 1.5 }}>Base44 &middot; React &middot; Shopify Storefront API &middot; GA4 &middot; Google Search Console</p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 0.4rem' }}>Scope</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', color: P.ink, margin: 0, lineHeight: 1.55 }}>
                Requirements definition, AI-assisted implementation, review and validation, troubleshooting, defect investigation, and hands-on QA.
              </p>
            </div>
          </div>

          {/* Summary column */}
          <div>
            <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.5rem' }}>
              Torch Republic is a direct-to-consumer storefront built with Base44 and React and connected
              to Shopify&rsquo;s commerce infrastructure. My role covered translating business requirements
              into testable instructions, reviewing AI-assisted implementations, validating customer
              workflows, troubleshooting defects, and documenting issues across product data, cart
              behavior, responsive layouts, content, and metadata.
            </p>

            {/* Three QA previews */}
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 0.75rem' }}>
              QA focus areas
            </p>
            <div className="flex flex-col gap-3 mb-5">
              {PREVIEWS.map((p) => (
                <a
                  key={p.anchor}
                  href={`${caseStudyUrl()}#${p.anchor}`}
                  style={{
                    display: 'block',
                    padding: '1rem 1.25rem',
                    border: `1px solid ${P.rule}`,
                    borderLeft: `3px solid ${P.accent}`,
                    borderRadius: '4px',
                    background: P.surface,
                    textDecoration: 'none',
                  }}
                >
                  <p style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9rem', color: P.ink, margin: '0 0 0.25rem' }}>
                    {p.label}
                  </p>
                  <p style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', lineHeight: 1.55, color: P.secondary, margin: 0 }}>
                    {p.body}
                  </p>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={caseStudyUrl()}
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: P.onAccent,
                  background: P.accent,
                  padding: '0.6rem 1.25rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                View full case study <ArrowRight size={14} />
              </a>
              <a
                href={LIVE_STORE}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: P.ink,
                  border: `1px solid ${P.rule}`,
                  padding: '0.6rem 1.25rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <ExternalLink size={14} /> Live application
              </a>
            </div>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.82rem',
                color: P.muted,
                margin: '1rem 0 0',
                lineHeight: 1.55,
                fontStyle: 'italic',
                maxWidth: '500px',
              }}
            >
              Shopify provides product, cart, and secure checkout infrastructure. The custom application
              does not collect or store payment-card information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}