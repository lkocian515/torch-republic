import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

// Compact defect-thinking card — authentic issue from the project.
// Cart failure: traced the complete cart flow from button click through
// Shopify Storefront API to identify the root cause and fix.
const DEFECT = {
  issue: 'Homepage Add to Cart button failed silently — clicking a product did not add it to the cart, show a confirmation, or update the cart count.',
  impact: 'Customers could not purchase products from the homepage. The cart count stayed at zero and no error or confirmation appeared, making the button appear non-functional.',
  priority: 'Critical / Conversion',
  rootCause: 'The cart confirmation and cart-count update were gated behind a successful Shopify Storefront API response. When the browser-side SDK call to the backend function failed or returned an error, the optimistic cart update was rolled back and no confirmation was shown — the user saw nothing happen.',
  action: 'Restructured the cart flow to show the confirmation card and update cart state immediately (optimistic), then sync to Shopify in the background. If the sync succeeds, local items are enriched with Shopify-confirmed pricing and line IDs. If it fails, the item stays in the local cart and checkout creates a fresh Shopify cart from local state — no data is lost.',
  validation: 'Regression tested Add to Cart from homepage, shop page, and product detail page. Verified cart count updates from 0 to 1 on first click, confirmation card appears, cart drawer opens, quantity controls work, item removal works, and checkout handoff creates a correct Shopify cart with matching product, quantity, and price.',
  outcome: 'Add to Cart now works reliably from every entry point. The user always sees immediate feedback, and the cart remains functional even during transient Shopify API issues.',
};

const ROWS = ['issue', 'impact', 'priority', 'rootCause', 'action', 'validation', 'outcome'];

export default function DefectCard() {
  return (
    <SectionWrap id="defect-thinking">
      <Eyebrow>Defect Thinking</Eyebrow>
      <SectionHeading>How a single issue gets framed</SectionHeading>
      <Lead>QA is more than &ldquo;something looks off.&rdquo; It is defining the issue, the impact, the priority, the action and how the fix is verified.</Lead>

      <div className="mt-8" style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '8px', padding: '1.75rem', maxWidth: 720 }}>
        <dl className="m-0 flex flex-col gap-3">
          {ROWS.map((key) => (
            <div key={key} style={{ display: 'flex', gap: '1rem' }}>
              <dt style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, flexShrink: 0, width: '5.5rem', paddingTop: '0.12rem' }}>
                {key}
              </dt>
              <dd style={{ margin: 0, fontFamily: FONT_SANS, fontSize: '0.925rem', lineHeight: 1.6, color: key === 'priority' ? P.accentInk : P.ink, fontWeight: key === 'priority' ? 600 : 400 }}>
                {DEFECT[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionWrap>
  );
}