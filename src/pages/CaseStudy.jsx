import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import PortfolioNotFound from '@/pages/PortfolioNotFound';
import CaseStudyBackBar from '@/components/portfolio/casestudies/CaseStudyBackBar';
import CaseStudyHeader from '@/components/portfolio/casestudies/CaseStudyHeader';
import CaseStudyProblem from '@/components/portfolio/casestudies/CaseStudyProblem';
import CaseStudyMethod from '@/components/portfolio/casestudies/CaseStudyMethod';
import CaseStudyFailures from '@/components/portfolio/casestudies/CaseStudyFailures';
import CaseStudyInterventions from '@/components/portfolio/casestudies/CaseStudyInterventions';
import CaseStudyResults from '@/components/portfolio/casestudies/CaseStudyResults';
import { getCaseStudy } from '@/components/portfolio/casestudies/caseStudyData';
import usePortfolioMetadata from '@/components/portfolio/usePortfolioMetadata';
import {
  P, PORTFOLIO_CANON, PORTFOLIO_DESC, portfolioHomeUrl,
} from '@/components/portfolio/portfolioTheme';

// One dynamic route serves every case study: /case-studies/:slug
export default function CaseStudy() {
  const { slug } = useParams();
  const data = getCaseStudy(slug);

  const canonical = data ? `${PORTFOLIO_CANON}case-studies/${data.slug}` : PORTFOLIO_CANON;
  const title = data ? data.seoTitle : 'Page not found | Lisa Marie Kocian';
  const description = data ? data.seoDescription : PORTFOLIO_DESC;

  const schemas = useMemo(() => {
    if (!data) return [];
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: canonical,
        isPartOf: { '@type': 'WebSite', name: 'Lisa Marie Kocian', url: PORTFOLIO_CANON },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Lisa Marie Kocian', item: PORTFOLIO_CANON },
          { '@type': 'ListItem', position: 2, name: 'Portfolio', item: PORTFOLIO_CANON },
          { '@type': 'ListItem', position: 3, name: `${data.title} Case Study`, item: canonical },
        ],
      },
    ];
  }, [data, title, description, canonical]);

  usePortfolioMetadata({
    title,
    description,
    canonical,
    ogType: data ? 'article' : 'website',
    robots: data ? 'index, follow' : 'noindex, follow',
    schemas,
  });

  // An unknown slug is a real 404, carrying the portfolio's own not-found page.
  if (!data) return <PortfolioNotFound />;

  return (
    <div
      className="portfolio-scope"
      style={{ background: P.paper, color: P.ink, minHeight: '100vh', colorScheme: 'dark' }}
    >
      <style>{`
        .portfolio-scope a:focus-visible,
        .portfolio-scope button:focus-visible,
        .portfolio-scope [role="button"]:focus-visible,
        .portfolio-scope [tabindex]:focus-visible {
          outline: 2px solid ${P.accentInk};
          outline-offset: 3px;
          border-radius: 4px;
        }
        .portfolio-scope section[id] { scroll-margin-top: 118px; }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-scope * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      <PortfolioNav />
      <CaseStudyBackBar href={portfolioHomeUrl()} label="Back to Projects" />

      <main>
        <CaseStudyHeader data={data} />
        <CaseStudyProblem data={data.problem} />
        <CaseStudyMethod data={data.method} />
        <CaseStudyFailures data={data.failures} />
        <CaseStudyInterventions data={data.interventions} />
        <CaseStudyResults data={data.results} />
      </main>

      <PortfolioFooter />
    </div>
  );
}