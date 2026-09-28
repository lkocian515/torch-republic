import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO, LIVE_STORE, caseStudyUrl } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

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
          eyebrow="Featured project"
          heading="Torch Republic commerce application"
          intro="A custom direct-to-consumer storefront built with Base44 and React and connected to Shopify's commerce infrastructure."
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
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', color: P.ink, margin: 0, lineHeight: 1.5 }}>Founder &middot; Product builder &middot; E-commerce QA</p>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 0.4rem' }}>Systems</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', color: P.ink, margin: 0, lineHeight: 1.5 }}>Base44 &middot; React &middot; Shopify Storefront API &middot; GA4 &middot; Google Search Console</p>
            </div>
            <div>
              <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 0.4rem' }}>Scope</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', color: P.ink, margin: 0, lineHeight: 1.55 }}>
                Product requirements, AI-assisted implementation, content systems, responsive testing, commerce QA, defect investigation, and iterative improvement.
              </p>
            </div>
          </div>

          {/* Summary column */}
          <div>
            <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.5rem' }}>
              I developed Torch Republic from an early brand concept into a functioning commerce application.
              The work required translating business requirements into testable instructions, reviewing
              AI-assisted implementations, validating customer workflows, and resolving defects across
              product data, cart behavior, checkout, responsive layouts, content, and metadata.
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              <a
                href={LIVE_STORE}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: P.surface,
                  background: P.accent,
                  padding: '0.6rem 1.25rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <ExternalLink size={14} /> View live application
              </a>
              <a
                href={caseStudyUrl()}
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
                Read full case study <ArrowRight size={14} />
              </a>
            </div>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.82rem',
                color: P.muted,
                margin: 0,
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

        {/* CURRENT SCREENSHOT REQUIRED — lead screenshot + 2-column gallery.
            Hidden until verified current screenshots are supplied.
            See InterfaceGallery.jsx (case study) for the full list of
            required screenshots and recommended dimensions. */}
      </div>
    </section>
  );
}