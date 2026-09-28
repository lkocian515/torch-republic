import React, { useEffect } from 'react';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import CaseStudyOverview from '@/components/portfolio/casestudy/CaseStudyOverview';
import CaseStudyRole from '@/components/portfolio/casestudy/CaseStudyRole';
import SystemOverview from '@/components/portfolio/casestudy/SystemOverview';
import QaChallenges from '@/components/portfolio/casestudy/QaChallenges';
import InterfaceGallery from '@/components/portfolio/casestudy/InterfaceGallery';
import TestingApproach from '@/components/portfolio/casestudy/TestingApproach';
import CaseStudyOutcome from '@/components/portfolio/casestudy/CaseStudyOutcome';
import {
  P, PORTFOLIO_CANON,
  CASE_STUDY_TITLE, CASE_STUDY_DESC, CASE_STUDY_CANON, PORTFOLIO_OG_IMAGE,
} from '@/components/portfolio/portfolioTheme';

export default function PortfolioCaseStudy() {
  useEffect(() => {
    document.title = CASE_STUDY_TITLE;

    const setOrCreate = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const match = selector.match(/\[([^=]+)="([^"]+)"\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setOrCreate('meta[name="description"]', 'content', CASE_STUDY_DESC);
    setOrCreate('meta[name="robots"]', 'content', 'index, follow');

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', CASE_STUDY_CANON);

    setOrCreate('meta[property="og:title"]', 'content', CASE_STUDY_TITLE);
    setOrCreate('meta[property="og:description"]', 'content', CASE_STUDY_DESC);
    setOrCreate('meta[property="og:url"]', 'content', CASE_STUDY_CANON);
    setOrCreate('meta[property="og:type"]', 'content', 'article');
    setOrCreate('meta[property="og:site_name"]', 'content', 'Lisa Marie Kocian');
    setOrCreate('meta[property="og:image"]', 'content', PORTFOLIO_OG_IMAGE);
    setOrCreate('meta[property="og:locale"]', 'content', 'en_US');

    setOrCreate('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setOrCreate('meta[name="twitter:title"]', 'content', CASE_STUDY_TITLE);
    setOrCreate('meta[name="twitter:description"]', 'content', CASE_STUDY_DESC);
    setOrCreate('meta[name="twitter:image"]', 'content', PORTFOLIO_OG_IMAGE);

    const inject = (obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-casestudy-seo', 'true');
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    };

    inject({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: CASE_STUDY_TITLE,
      description: CASE_STUDY_DESC,
      url: CASE_STUDY_CANON,
      isPartOf: { '@type': 'WebSite', name: 'Lisa Marie Kocian', url: PORTFOLIO_CANON },
    });
    inject({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Lisa Marie Kocian', item: PORTFOLIO_CANON },
        { '@type': 'ListItem', position: 2, name: 'Torch Republic Case Study', item: CASE_STUDY_CANON },
      ],
    });

    return () => {
      document.querySelectorAll('script[data-casestudy-seo="true"]').forEach((s) => s.remove());
    };
  }, []);

  return (
    <div className="portfolio-scope" style={{ background: P.paper, color: P.ink, minHeight: '100vh' }}>
      <style>{`
        .portfolio-scope a:focus-visible,
        .portfolio-scope button:focus-visible,
        .portfolio-scope [role="button"]:focus-visible,
        .portfolio-scope [tabindex]:focus-visible {
          outline: 2px solid ${P.accent};
          outline-offset: 2px;
          border-radius: 4px;
        }
        .portfolio-scope section[id] { scroll-margin-top: 70px; }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-scope * { transition-duration: 0.01ms !important; }
        }
      `}</style>
      <PortfolioNav />
      <main>
        <CaseStudyOverview />
        <CaseStudyRole />
        <SystemOverview />
        <QaChallenges />
        <InterfaceGallery />
        <TestingApproach />
        <CaseStudyOutcome />
      </main>
      <PortfolioFooter />
    </div>
  );
}