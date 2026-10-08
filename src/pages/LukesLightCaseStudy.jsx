import React, { useEffect } from 'react';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import LukesLightOverview from '@/components/portfolio/lukeslight/LukesLightOverview';
import LukesLightChallenge from '@/components/portfolio/lukeslight/LukesLightChallenge';
import LukesLightContribution from '@/components/portfolio/lukeslight/LukesLightContribution';
import LukesLightDecisions from '@/components/portfolio/lukeslight/LukesLightDecisions';
import LukesLightReview from '@/components/portfolio/lukeslight/LukesLightReview';
import LukesLightDemonstrates from '@/components/portfolio/lukeslight/LukesLightDemonstrates';
import {
  P, PORTFOLIO_CANON,
  LUKES_LIGHT_TITLE, LUKES_LIGHT_DESC, LUKES_LIGHT_CANON, PORTFOLIO_OG_IMAGE,
} from '@/components/portfolio/portfolioTheme';

export default function LukesLightCaseStudy() {
  useEffect(() => {
    document.title = LUKES_LIGHT_TITLE;

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

    setOrCreate('meta[name="description"]', 'content', LUKES_LIGHT_DESC);
    setOrCreate('meta[name="robots"]', 'content', 'index, follow');

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', LUKES_LIGHT_CANON);

    setOrCreate('meta[property="og:title"]', 'content', LUKES_LIGHT_TITLE);
    setOrCreate('meta[property="og:description"]', 'content', LUKES_LIGHT_DESC);
    setOrCreate('meta[property="og:url"]', 'content', LUKES_LIGHT_CANON);
    setOrCreate('meta[property="og:type"]', 'content', 'article');
    setOrCreate('meta[property="og:site_name"]', 'content', 'Lisa Marie Kocian');
    setOrCreate('meta[property="og:image"]', 'content', PORTFOLIO_OG_IMAGE);
    setOrCreate('meta[property="og:locale"]', 'content', 'en_US');

    setOrCreate('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setOrCreate('meta[name="twitter:title"]', 'content', LUKES_LIGHT_TITLE);
    setOrCreate('meta[name="twitter:description"]', 'content', LUKES_LIGHT_DESC);
    setOrCreate('meta[name="twitter:image"]', 'content', PORTFOLIO_OG_IMAGE);

    const inject = (obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-lukeslight-seo', 'true');
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    };

    inject({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: LUKES_LIGHT_TITLE,
      description: LUKES_LIGHT_DESC,
      url: LUKES_LIGHT_CANON,
      isPartOf: { '@type': 'WebSite', name: 'Lisa Marie Kocian', url: PORTFOLIO_CANON },
    });
    inject({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Lisa Marie Kocian', item: PORTFOLIO_CANON },
        { '@type': 'ListItem', position: 2, name: "Luke's Light Case Study", item: LUKES_LIGHT_CANON },
      ],
    });

    return () => {
      document.querySelectorAll('script[data-lukeslight-seo="true"]').forEach((s) => s.remove());
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