import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const DEFECTS = [
  {
    id: 'defect-cart',
    title: 'Add to Cart failure and silent customer state',
    observation: 'The Add to Cart action failed without updating the cart count or providing customer confirmation. The interface appeared unresponsive.',
    action: 'Revised the cart flow to provide immediate visual confirmation and preserve local cart state while Shopify synchronization occurred in the background. If the Shopify sync fails, the item remains in the local cart and checkout creates a fresh cart from local state.',
    evidenceLabel: 'Implementation evidence',
    result: 'Code review confirms optimistic local updates, immediate confirmation display, background Shopify synchronization, and a checkout path that rebuilds the cart from local state when needed. This establishes what the implementation contains; it does not confirm that every live customer journey passed testing.',
  },
  {
    id: 'defect-pricing',
    title: 'Product-price consistency after selling-plan discounts',
    observation: 'Local product prices could differ from Shopify-returned prices after selling-plan discounts or price updates, causing customers to see one price in the cart and a different price at checkout.',
    action: 'Cart line items now display Shopify-confirmed unit prices and line totals when available. Local prices serve as fallback only. Subscription items are validated against their selling-plan allocations before checkout redirect.',
    evidenceLabel: 'Implementation evidence',
    result: 'Code review confirms Shopify price fields on cart items, subscription selling-plan validation in the checkout flow, and error handling for mismatched plans. This describes the code path; end-to-end checkout testing against live Shopify pricing was not documented as a verified outcome.',
  },
  {
    id: 'defect-metadata',
    title: 'Outdated portfolio metadata and structured data',
    observation: 'Metadata inspection identified stale coffee-brand references, discontinued terms, incorrect canonical URLs, and inappropriate structured-data types in the professional portfolio. The stale references likely originated during AI-assisted implementation, though the exact source was not definitively traced.',
    action: 'Updated titles, descriptions, social metadata, canonical URLs, and structured data to represent Lisa Marie Kocian as a professional individual. Removed coffee-company schema and replaced it with Person and WebPage schema.',
    evidenceLabel: 'Inspection finding',
    result: 'Metadata inspection of the rendered document head confirmed that coffee-company terminology and schema no longer appear in portfolio-wide metadata. This was a metadata inspection, not a confirmed social-media preview render.',
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

export default function QaChallenges() {
  return (
    <section
      id="defects"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected defects"
          heading="Three issues investigated and addressed"
          intro="Each entry shows the observation, the action taken, and the type of evidence reviewed. Code review establishes what the implementation contains; it does not by itself confirm that the live customer journey passed testing."
        />
        <div className="flex flex-col gap-5">
          {DEFECTS.map((d) => (
            <div
              key={d.id}
              id={d.id}
              style={{
                padding: '1.5rem',
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                background: P.surface,
                scrollMarginTop: 80,
              }}
            >
              <h3 style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: '1.1rem', color: P.ink, margin: '0 0 1rem', lineHeight: 1.3 }}>
                {d.title}
              </h3>
              <Field label="Observation">{d.observation}</Field>
              <Field label="Action">{d.action}</Field>
              <Field label={d.evidenceLabel}>{d.result}</Field>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}