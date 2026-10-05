import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

export default function CaseStudyOverview() {
  return (
    <section
      id="overview"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Project and role"
          heading="Torch Republic commerce application"
        />
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.975rem', lineHeight: 1.7, color: P.secondary, margin: '0 0 1.5rem' }}>
          A direct-to-consumer coffee storefront built with Base44 and React, connected to Shopify
          for live product information, cart creation, and secure checkout. The application was
          built and refined through iterative review and QA.
        </p>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', color: P.accentInk, fontWeight: 600, margin: '0 0 1.5rem' }}>
          Role: Founder &middot; Product builder &middot; E-commerce QA
        </p>

        <div style={{ padding: '1.25rem 1.5rem', border: `1px solid ${P.rule}`, borderRadius: '6px', background: P.surface }}>
          <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.muted, margin: '0 0 0.5rem' }}>
            Business and product requirements
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, margin: 0 }}>
            Present a focused product line with clear pricing and product information. Enable online
            purchasing through Shopify-hosted cart and secure checkout. Support both one-time and
            subscription purchases. Provide a responsive customer experience across mobile and desktop.
            Maintain accurate metadata and structured data for search visibility.
          </p>
        </div>
      </div>
    </section>
  );
}