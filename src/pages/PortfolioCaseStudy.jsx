import React from 'react';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import CaseStudyOverview from '@/components/portfolio/casestudy/CaseStudyOverview';
import WhatItDoes from '@/components/portfolio/casestudy/WhatItDoes';
import SystemOverview from '@/components/portfolio/casestudy/SystemOverview';
import CaseStudyRole from '@/components/portfolio/casestudy/CaseStudyRole';
import QaChallenges from '@/components/portfolio/casestudy/QaChallenges';
import Architecture from '@/components/portfolio/casestudy/Architecture';
import CaseStudyOutcome from '@/components/portfolio/casestudy/CaseStudyOutcome';
import InterfaceGallery from '@/components/portfolio/casestudy/InterfaceGallery';
import usePortfolioMetadata from '@/components/portfolio/usePortfolioMetadata';
import {
  P, PORTFOLIO_CANON,
  CASE_STUDY_TITLE, CASE_STUDY_DESC, CASE_STUDY_CANON,
} from '@/components/portfolio/portfolioTheme';

const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: CASE_STUDY_TITLE,
    description: CASE_STUDY_DESC,
    url: CASE_STUDY_CANON,
    isPartOf: { '@type': 'WebSite', name: 'Lisa Marie Kocian', url: PORTFOLIO_CANON },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Lisa Marie Kocian', item: PORTFOLIO_CANON },
      { '@type': 'ListItem', position: 2, name: 'Torch Republic Case Study', item: CASE_STUDY_CANON },
    ],
  },
];

export default function PortfolioCaseStudy() {
  usePortfolioMetadata({
    title: CASE_STUDY_TITLE,
    description: CASE_STUDY_DESC,
    canonical: CASE_STUDY_CANON,
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
        <CaseStudyOverview />
        <InterfaceGallery />
        <WhatItDoes />
        <SystemOverview />
        <CaseStudyRole />
        <QaChallenges />
        <Architecture />
        <CaseStudyOutcome />
      </main>
      <PortfolioFooter />
    </div>
  );
}