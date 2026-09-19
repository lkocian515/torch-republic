import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead, Card } from './PortfolioPrimitives';
import { P, FONT_SANS, FONT_MONO } from './portfolioTheme';
import { ShoppingCart, Layers, Smartphone, BarChart3 } from 'lucide-react';

const CARDS = [
  {
    icon: ShoppingCart,
    title: 'Live Commerce Integration',
    body: 'Connected the custom storefront to Shopify commerce infrastructure so products, pricing, cart actions, and checkout operate as part of a real purchasing flow.',
  },
  {
    icon: Layers,
    title: 'Application State and Cart Behavior',
    body: 'Implemented and tested customer-facing states including add-to-cart feedback, item quantities, cart persistence, removal, accurate cart counts, loading states, and error recovery.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Product Experience',
    body: 'Designed and validated the application across mobile and desktop, including navigation, product presentation, modal behavior, interactive elements, image handling, and checkout transitions.',
  },
  {
    icon: BarChart3,
    title: 'Analytics and Discoverability',
    body: 'Configured GA4, Google Search Console, metadata, and SEO foundations to support measurable traffic, search visibility, behavioral analysis, and future optimization.',
  },
];

export default function MoreThanStorefront() {
  return (
    <SectionWrap id="more-than-storefront" alt>
      <Eyebrow>Not Just a Website</Eyebrow>
      <SectionHeading>More than a storefront</SectionHeading>
      <Lead>
        Torch Republic was developed as a working commerce application with interconnected customer,
        product, cart, analytics, and checkout workflows. I was responsible for shaping the brand
        experience while also validating how the application behaved across devices, sessions,
        integrations, and real shopping scenarios.
      </Lead>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {CARDS.map(({ icon: Icon, title, body }) => (
          <Card key={title} pad="1.5rem">
            <div
              aria-hidden="true"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: 8,
                background: P.accentSoft, color: P.accent, marginBottom: '0.9rem',
              }}
            >
              <Icon size={20} strokeWidth={1.75} />
            </div>
            <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.02rem', color: P.ink, margin: '0 0 0.55rem', lineHeight: 1.3 }}>
              {title}
            </h3>
            <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, margin: 0 }}>
              {body}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrap>
  );
}