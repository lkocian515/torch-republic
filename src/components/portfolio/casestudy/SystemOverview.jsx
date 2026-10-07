import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';

const STEPS = [
  { num: '1', title: 'Customer', body: 'The end user browsing and purchasing' },
  { num: '2', title: 'Storefront / UX', body: 'Mobile and desktop browsing experience' },
  { num: '3', title: 'Product & Content System', body: 'Custom interface, content, customer interactions, and application state' },
  { num: '4', title: 'Commerce workflows', body: 'Cart and checkout integration' },
  { num: '5', title: 'Customer / loyalty / subscription', body: 'Post-purchase experience and recurring commerce' },
  { num: '6', title: 'Analytics & feedback', body: 'Measurement, interpretation, and reporting' },
  { num: '7', title: 'QA + iteration', body: 'Testing, defect resolution, and continuous improvement' },
];

export default function SystemOverview() {
  return (
    <section
      id="system"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <SectionHeading eyebrow="System overview" heading="How the application is structured" />
        <div className="grid gap-4 md:grid-cols-4" style={{ alignItems: 'stretch' }}>
          {STEPS.map((step) => (
            <div
              key={step.num}
              style={{
                padding: '1.25rem',
                border: `1px solid ${P.rule}`,
                borderRadius: '6px',
                background: P.surface,
              }}
            >
              <p style={{ fontFamily: FONT_MONO, fontSize: '0.72rem', fontWeight: 700, color: P.accent, margin: '0 0 0.6rem', letterSpacing: '0.08em' }}>
                {step.num}
              </p>
              <h3 style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: '1rem', color: P.ink, margin: '0 0 0.4rem', lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', lineHeight: 1.55, color: P.secondary, margin: 0 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', color: P.muted, margin: '1.5rem 0 0', fontStyle: 'italic', lineHeight: 1.6 }}>
          The custom application does not collect or store payment-card information. Shopify handles
          all payment processing through its secure checkout.
        </p>
      </div>
    </section>
  );
}