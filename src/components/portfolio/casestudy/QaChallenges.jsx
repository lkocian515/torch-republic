import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const CHALLENGES = [
  {
    title: 'Add to Cart failure and silent customer state',
    problem: 'The homepage Add to Cart action failed without updating the cart count or providing customer confirmation.',
    impact: 'Customers received no feedback and often assumed the button was non-functional, leading to abandoned attempts.',
    investigation: 'The cart update depended on a successful Shopify API response. When the request failed or was slow, the optimistic UI update was rolled back, leaving no visible feedback.',
    resolution: 'Revised the cart flow to provide immediate visual confirmation and preserve local cart state while Shopify synchronization occurred in the background.',
    verification: 'Retested Add to Cart from the homepage, shop page, and product-detail page, including cart count, quantity controls, item removal, and checkout handoff.',
  },
  {
    title: 'Cart-count or quantity inconsistency',
    problem: 'Cart count and line-item quantities could drift between the local display and the Shopify cart after page refresh or concurrent edits.',
    impact: 'Customers saw incorrect totals or stale quantities, creating confusion at checkout.',
    investigation: 'The local cart and the Shopify cart were not reconciled on page load, and optimistic updates could diverge from the server state.',
    resolution: 'Added a page-load reconciliation that retrieves the Shopify cart and updates local prices, quantities, and selling-plan selections. Expired cart IDs are cleared automatically.',
    verification: 'Tested cart persistence across page refreshes, multi-tab sessions, and quantity changes from both the cart page and product pages.',
  },
  {
    title: 'Product-price consistency',
    problem: 'Local product prices could differ from Shopify-returned prices after selling-plan discounts or price updates.',
    impact: 'Customers saw one price in the cart and a different price at Shopify checkout.',
    investigation: 'The cart subtotal was calculated from local prices rather than Shopify-confirmed line totals, and subscription selling-plan discounts were not always reflected.',
    resolution: 'When Shopify data is available, cart line items display Shopify-confirmed unit prices and line totals. Local prices serve as fallback only, and subscription items are validated against their selling-plan allocations before checkout.',
    verification: 'Tested subscription and one-time purchases, verified displayed totals match Shopify checkout, and confirmed selling-plan errors are caught before redirect.',
  },
  {
    title: 'Broken product imagery',
    problem: 'Product components referenced hardcoded image URLs that no longer resolved, producing broken-image states across the store.',
    impact: 'Product pages and collection grids showed broken-image icons, reducing credibility and usability.',
    investigation: 'Legacy image URLs from previous product photography and Shopify CDN paths had changed or been removed during catalog updates.',
    resolution: 'Removed obsolete URLs and standardized the affected components around verified image sources with fallback behavior for missing images.',
    verification: 'Retested affected product, collection, and gallery views across desktop and mobile breakpoints.',
  },
  {
    title: 'Outdated metadata and structured data',
    problem: 'AI-assisted output introduced stale coffee-brand references, discontinued terms, incorrect canonical URLs, and inappropriate structured-data types into the portfolio and storefront metadata.',
    impact: 'Search engines and social platforms displayed incorrect or inconsistent information about the site.',
    investigation: 'Reviewed document head tags, canonical links, Open Graph tags, Twitter card metadata, and JSON-LD structured data across multiple pages.',
    resolution: 'Updated titles, descriptions, social metadata, canonical URLs, and structured data to accurately represent each domain\u2019s purpose. Removed coffee-company schema from the portfolio domain and replaced it with Person and WebPage schema.',
    verification: 'Inspected rendered document head tags and confirmed obsolete terminology no longer appeared in global metadata.',
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
      id="challenges"
      style={{
        background: P.surface,
        borderTop: `1px solid ${P.rule}`,
        borderBottom: `1px solid ${P.rule}`,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected QA challenges"
          heading="Five issues investigated and resolved"
          intro="Each challenge shows the problem, its user or business impact, the investigation, the resolution, and how the result was verified."
        />
        <div className="flex flex-col gap-5">
          {CHALLENGES.map((c) => (
            <div
              key={c.title}
              style={{
                padding: '1.5rem',
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                background: P.paper,
              }}
            >
              <h3 style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: '1.1rem', color: P.ink, margin: '0 0 1rem', lineHeight: 1.3 }}>
                {c.title}
              </h3>
              <Field label="Problem">{c.problem}</Field>
              <Field label="User or business impact">{c.impact}</Field>
              <Field label="Investigation">{c.investigation}</Field>
              <Field label="Resolution">{c.resolution}</Field>
              <Field label="Verification">{c.verification}</Field>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}