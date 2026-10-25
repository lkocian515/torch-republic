import React, { useEffect } from 'react';
import '@/components/portfolio/home/portfolioHome.css';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import Hero from '@/components/portfolio/home/Hero';
import SelectedProjects from '@/components/portfolio/home/SelectedProjects';
import SelectedExpertise from '@/components/portfolio/home/SelectedExpertise';
import ProfessionalProcess from '@/components/portfolio/home/ProfessionalProcess';
import Background from '@/components/portfolio/home/Background';
import ContactSection from '@/components/portfolio/home/ContactSection';
import {
  P, LINKEDIN,
  PORTFOLIO_TITLE, PORTFOLIO_DESC, PORTFOLIO_CANON,
  PORTFOLIO_OG_TITLE, PORTFOLIO_OG_DESC, PORTFOLIO_OG_IMAGE,
} from '@/components/portfolio/portfolioTheme';

export default function PortfolioHome() {
  useEffect(() => {
    document.title = PORTFOLIO_TITLE;

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

    setOrCreate('meta[name="description"]', 'content', PORTFOLIO_DESC);
    setOrCreate('meta[name="robots"]', 'content', 'index, follow');
    setOrCreate('meta[name="theme-color"]', 'content', P.paper);

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', PORTFOLIO_CANON);

    setOrCreate('meta[property="og:title"]', 'content', PORTFOLIO_OG_TITLE);
    setOrCreate('meta[property="og:description"]', 'content', PORTFOLIO_OG_DESC);
    setOrCreate('meta[property="og:url"]', 'content', PORTFOLIO_CANON);
    setOrCreate('meta[property="og:type"]', 'content', 'website');
    setOrCreate('meta[property="og:site_name"]', 'content', 'Lisa Marie Kocian');
    setOrCreate('meta[property="og:image"]', 'content', PORTFOLIO_OG_IMAGE);
    setOrCreate('meta[property="og:locale"]', 'content', 'en_US');

    setOrCreate('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setOrCreate('meta[name="twitter:title"]', 'content', PORTFOLIO_OG_TITLE);
    setOrCreate('meta[name="twitter:description"]', 'content', PORTFOLIO_OG_DESC);
    setOrCreate('meta[name="twitter:image"]', 'content', PORTFOLIO_OG_IMAGE);

    const inject = (obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-portfolio-seo', 'true');
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    };

    inject({
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
    });
    inject({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Lisa Marie Kocian',
      url: PORTFOLIO_CANON,
    });
    inject({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: PORTFOLIO_TITLE,
      description: PORTFOLIO_DESC,
      url: PORTFOLIO_CANON,
    });

    return () => {
      document.querySelectorAll('script[data-portfolio-seo="true"]').forEach((s) => s.remove());
    };
  }, []);

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