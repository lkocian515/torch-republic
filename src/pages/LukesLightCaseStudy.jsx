import React from 'react';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import LukesLightOverview from '@/components/portfolio/lukeslight/LukesLightOverview';
import LukesLightChallenge from '@/components/portfolio/lukeslight/LukesLightChallenge';
import LukesLightContribution from '@/components/portfolio/lukeslight/LukesLightContribution';
import LukesLightDecisions from '@/components/portfolio/lukeslight/LukesLightDecisions';
import LukesLightReview from '@/components/portfolio/lukeslight/LukesLightReview';
import LukesLightDemonstrates from '@/components/portfolio/lukeslight/LukesLightDemonstrates';
import usePortfolioMetadata from '@/components/portfolio/usePortfolioMetadata';
import {
  P, PORTFOLIO_CANON,
  LUKES_LIGHT_TITLE, LUKES_LIGHT_DESC, LUKES_LIGHT_CANON,
} from '@/components/portfolio/portfolioTheme';

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: LUKES_LIGHT_TITLE,
    description: LUKES_LIGHT_DESC,
    url: LUKES_LIGHT_CANON,
    isPartOf: { '@type': 'WebSite', name: 'Lisa Marie Kocian', url: PORTFOLIO_CANON },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Lisa Marie Kocian', item: PORTFOLIO_CANON },
      { '@type': 'ListItem', position: 2, name: "Luke's Light Case Study", item: LUKES_LIGHT_CANON },
    ],
  },
];

export default function LukesLightCaseStudy() {
  usePortfolioMetadata({
    title: LUKES_LIGHT_TITLE,
    description: LUKES_LIGHT_DESC,
    canonical: LUKES_LIGHT_CANON,
    ogType: 'article',
    schemas: SCHEMAS,
  });

  return (
    <div className="portfolio-scope" style={{ background: P.paper, color: P.ink, minHeight: '100vh', colorScheme: 'dark' }}>
      <style>{`
        .portfolio-scope a:focus-visible,
        .portfolio-scope button:focus-visible,
        .portfolio-scope summary:focus-visible,
        .portfolio-scope [role="button"]:focus-visible,
        .portfolio-scope [tabindex]:focus-visible {
          outline: 2px solid ${P.accentInk};
          outline-offset: 3px;
          border-radius: 4px;
        }
        .portfolio-scope section[id] { scroll-margin-top: 72px; }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-scope * { transition-duration: 0.01ms !important; }
        }
      `}</style>
      <PortfolioNav />
      <main>
        <LukesLightOverview />
        <LukesLightChallenge />
        <LukesLightContribution />
        <LukesLightDecisions />
        <LukesLightReview />
        <LukesLightDemonstrates />
      </main>
      <PortfolioFooter />
    </div>
  );
}