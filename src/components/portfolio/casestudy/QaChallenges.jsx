import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const DEFECTS = [
  {
    id: 'defect-imagery',
    title: 'Broken product imagery',
    observation: 'Stale hardcoded image URLs caused broken product image states across product, collection, and gallery views.',
    action: 'URLs were removed and standardized to verified-working asset sources. Product, collection, and gallery views were then rechecked.',
    evidenceLabel: 'Implementation evidence',
    result: 'Code review confirms image URLs were replaced with verified Base44 media and Shopify assets. Visual recheck of key views confirmed images render. This establishes what the code contains; it does not confirm every image across every route was verified.',
  },
  {
    id: 'defect-naming',
    title: 'Legacy product names at checkout',
    observation: 'Collection pages passed retired catalog data to the cart, causing legacy product names to appear at checkout instead of current names.',
    action: 'Grids and routes were simplified, retired catalog references were removed, and items were re-added to the cart to confirm current naming throughout the purchase flow.',
    evidenceLabel: 'Implementation evidence',
    result: 'Code review confirms a simplified product data flow from current catalog sources to cart line items. Cart re-add testing confirmed current names display. This describes the code path; exhaustive checkout testing across all products was not documented.',
  },
  {
    id: 'defect-routes',
    title: 'Discontinued category routes',
    observation: 'Retired category URLs produced 404 errors or served stale pages, creating poor user experience and crawl issues.',
    action: '301 redirects and 410 (Gone) responses were added for discontinued apparel, collectible, and category routes. Legacy URLs were then retested to confirm correct redirect behavior.',
    evidenceLabel: 'Implementation evidence',
    result: 'Code review confirms redirect and 410 routes are configured for discontinued paths. Retesting confirmed legacy URLs redirect or return 410 as intended. This verifies route configuration; search-engine reindexing was not confirmed.',
  },
  {
    id: 'defect-mobile',
    title: 'Mobile product hierarchy',
    observation: 'On mobile, the primary action and key product information risked being hard to identify due to layout hierarchy and spacing.',
    action: 'Hierarchy, spacing, and responsive behavior were adjusted across breakpoints. Mobile product pages were retested to confirm the primary action and key information are clearly visible.',
    evidenceLabel: 'Implementation evidence',
    result: 'Code review confirms adjusted responsive classes and layout hierarchy for mobile breakpoints. Retesting across mobile widths confirmed improved visibility. This describes the implementation; formal multi-device testing was not documented.',
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
          heading="Four issues investigated and addressed"
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