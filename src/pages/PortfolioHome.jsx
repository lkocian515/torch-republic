import React from 'react';
import '@/components/portfolio/home/portfolioHome.css';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import Hero from '@/components/portfolio/home/Hero';
import SelectedProjects from '@/components/portfolio/home/SelectedProjects';
import SelectedExpertise from '@/components/portfolio/home/SelectedExpertise';
import ProfessionalProcess from '@/components/portfolio/home/ProfessionalProcess';
import Background from '@/components/portfolio/home/Background';
import ContactSection from '@/components/portfolio/home/ContactSection';
import usePortfolioMetadata from '@/components/portfolio/usePortfolioMetadata';
import {
  P, LINKEDIN,
  PORTFOLIO_TITLE, PORTFOLIO_DESC, PORTFOLIO_CANON,
} from '@/components/portfolio/portfolioTheme';

// Route metadata is applied by the shared hook, which also removes the
// storefront's Torch Republic brand data from the head while this route is up.
const SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lisa Marie Kocian',
    jobTitle: 'AI Quality Assurance & Content Evaluation Specialist',
    url: PORTFOLIO_CANON,
    description: PORTFOLIO_DESC,
    sameAs: [LINKEDIN],
    knowsAbout: [
      'AI output evaluation', 'content quality assurance', 'document QA',
      'workflow testing', 'defect documentation', 'e-commerce QA',
      'prompt testing', 'source verification',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lisa Marie Kocian',
    url: PORTFOLIO_CANON,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PORTFOLIO_TITLE,
    description: PORTFOLIO_DESC,
    url: PORTFOLIO_CANON,
  },
];

export default function PortfolioHome() {
  usePortfolioMetadata({
    title: PORTFOLIO_TITLE,
    description: PORTFOLIO_DESC,
    canonical: PORTFOLIO_CANON,
    schemas: SCHEMAS,
  });

  return (
    <div
      className="portfolio-scope"
      style={{ background: P.paper, color: P.ink, minHeight: '100vh', colorScheme: 'dark' }}
    >
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
        <Hero />
        <SelectedProjects />
        <SelectedExpertise />
        <ProfessionalProcess />
        <Background />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}