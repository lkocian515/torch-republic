import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';

export default function BusinessLens() {
  return (
    <SectionWrap id="business-lens" alt>
      <Eyebrow>Business Context</Eyebrow>
      <SectionHeading>Technology Through a Business Lens</SectionHeading>
      <Lead>My background spans business operations, e-commerce, quality review and customer experience. That means I don’t evaluate technology in isolation — I look at whether it solves the intended problem, works for the customer and supports the business behind it.</Lead>
      <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.7, color: P.secondary, marginTop: '0.85rem', maxWidth: '64ch' }}>
        This is what differentiates implementation work that actually ships value from work that merely looks complete.
      </p>
    </SectionWrap>
  );
}