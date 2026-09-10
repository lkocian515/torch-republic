import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead, Card } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

// Real examples from the project. Outcomes are qualitative only — no
// invented metrics, conversion lifts, user counts or revenue.
const EXAMPLES = [
  {
    title: 'Broken product imagery across the store',
    problem: 'Product image components pointed at hardcoded Shopify placeholder URLs that no longer resolved.',
    evidence: 'Image onError handlers fired on live pages, leaving broken-image icons where product photos should be.',
    hypothesis: 'The hardcoded URLs were stale and never validated against the live image source.',
    change: 'Removed the hardcoded URLs and standardized image handling on a verified, reachable fallback plus valid image sources.',
    validation: 'Re-checked affected product, collection and gallery views across pages.',
    outcome: 'Consistent product imagery sitewide with no broken-image states.',
  },
  {
    title: 'Legacy product names at checkout',
    problem: 'The cart showed retired product names (for example &ldquo;SunCap Rise&rdquo;) instead of the current catalog names.',
    evidence: 'Adding items from collection pages passed legacy catalog data into the cart.',
    hypothesis: 'The collection grids still fed the retired catalog into the cart instead of the current two-product catalog.',
    change: 'Simplified collection grids to the two core products and redirected legacy product links to the current product pages.',
    validation: 'Re-added items from collection pages and confirmed the cart names matched the public catalog.',
    outcome: 'Cart and checkout naming aligned with the storefront&rsquo;s current product model.',
  },
  {
    title: 'Discontinued category routes',
    problem: 'Legacy apparel and category URLs led to dead or stale pages.',
    evidence: 'Those routes returned 404s or outdated content instead of a clean destination.',
    hypothesis: 'Categories had been retired without redirect handling, leaving orphaned routes.',
    change: 'Added 301 redirects to the closest relevant pages and 410 &ldquo;gone&rdquo; responses for truly discontinued categories.',
    validation: 'Re-tested the legacy URLs to confirm each resolves to a correct, intentional destination.',
    outcome: 'Clean handling for both users and search engines on retired routes.',
  },
];

const ROWS = [
  ['Problem', 'problem'],
  ['Evidence', 'evidence'],
  ['Hypothesis', 'hypothesis'],
  ['Change', 'change'],
  ['Validation', 'validation'],
  ['Outcome', 'outcome'],
];

export default function QaEvidence() {
  return (
    <SectionWrap id="evidence" alt>
      <Eyebrow>QA Evidence</Eyebrow>
      <SectionHeading>From Observation to Improvement</SectionHeading>
      <Lead>Real examples from the project, walked through the way I actually work — observe, hypothesize, change, validate. No invented metrics; outcomes are described qualitatively.</Lead>

      <div className="mt-9 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {EXAMPLES.map((ex) => (
          <Card key={ex.title} pad="1.5rem">
            <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.05rem', color: P.ink, margin: '0 0 1.1rem', lineHeight: 1.3 }}>{ex.title}</h3>
            <dl className="m-0 flex flex-col gap-2.5">
              {ROWS.map(([label, key]) => (
                <div key={label} style={{ display: 'flex', gap: '0.85rem' }}>
                  <dt style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, flexShrink: 0, width: '4.8rem', paddingTop: '0.1rem' }}>
                    {label}
                  </dt>
                  <dd style={{ margin: 0, fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.55, color: P.secondary }}>
                    {ex[key]}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>
    </SectionWrap>
  );
}