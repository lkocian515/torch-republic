import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';

const ITEMS = [
  'Presents live coffee products and accurate pricing',
  'Provides reusable product and commerce components',
  'Adds products to a functioning cart',
  'Updates quantities and removes cart items',
  'Preserves cart state across relevant navigation or refresh behavior',
  'Routes customers into Shopify\u2019s secure checkout',
  'Handles loading, success, empty, and error states',
  'Supports responsive mobile and desktop experiences',
  'Integrates customer-facing promotional components',
  'Tracks meaningful customer interactions through analytics',
  'Provides optimized product content and search metadata',
];

export default function WhatItDoes() {
  return (
    <SectionWrap id="functionality" alt>
      <Eyebrow>Verified Functionality</Eyebrow>
      <SectionHeading>What the application does</SectionHeading>
      <Lead>
        Each item below reflects functionality present in the current codebase. No planned
        features are presented as completed work.
      </Lead>

      <ul className="mt-8 m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {ITEMS.map((item, i) => (
          <li key={i} style={{ fontFamily: FONT_SANS, fontSize: '0.92rem', lineHeight: 1.6, color: P.ink, display: 'flex', gap: '0.65rem' }}>
            <span style={{ color: P.accentInk, flexShrink: 0, fontWeight: 700 }} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '1.5rem', fontFamily: FONT_SANS, fontSize: '0.85rem', lineHeight: 1.6, color: P.secondary, maxWidth: '65ch' }}>
        A weighted promotional prize experience (Spin to Win) with email validation, persistence
        rules, accessible interaction states, and Shopify-compatible discount handling has been
        implemented in the codebase. It is pending discount-code configuration before production
        activation.
      </p>
    </SectionWrap>
  );
}