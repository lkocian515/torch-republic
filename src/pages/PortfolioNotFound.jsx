import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import usePortfolioMetadata from '@/components/portfolio/usePortfolioMetadata';
import {
  P, FONT_SERIF, FONT_SANS, FONT_MONO,
  CONTACT_EMAIL, PORTFOLIO_DESC, PORTFOLIO_CANON, portfolioBase,
} from '@/components/portfolio/portfolioTheme';

// Portfolio-branded not-found page. Unknown portfolio paths land here rather
// than being silently redirected to the homepage.
export default function PortfolioNotFound() {
  usePortfolioMetadata({
    title: 'Page not found | Lisa Marie Kocian',
    description: PORTFOLIO_DESC,
    canonical: PORTFOLIO_CANON,
    robots: 'noindex, follow',
  });

  const home = portfolioBase() || '/';

  return (
    <div className="portfolio-scope" style={{ background: P.paper, color: P.ink, minHeight: '100vh', colorScheme: 'dark' }}>
      <style>{`
        .portfolio-scope a:focus-visible,
        .portfolio-scope button:focus-visible,
        .portfolio-scope [role="button"]:focus-visible,
        .portfolio-scope [tabindex]:focus-visible {
          outline: 2px solid ${P.accentInk};
          outline-offset: 3px;
          border-radius: 4px;
        }
      `}</style>
      <PortfolioNav />
      <main className="mx-auto max-w-[760px] px-6 md:px-10" style={{ paddingTop: 'clamp(3.5rem, 9vw, 7rem)', paddingBottom: 'clamp(3.5rem, 9vw, 7rem)' }}>
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.68rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: P.accentInk,
            margin: '0 0 1rem',
          }}
        >
          404 &middot; Page not found
        </p>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: 'clamp(1.9rem, 5.4vw, 2.8rem)',
            lineHeight: 1.12,
            color: P.ink,
            margin: '0 0 1.1rem',
            letterSpacing: '-0.02em',
          }}
        >
          That page isn&rsquo;t here.
        </h1>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '1rem',
            lineHeight: 1.7,
            color: P.secondary,
            margin: '0 0 2.25rem',
            maxWidth: '52ch',
          }}
        >
          The link may be out of date. The portfolio home page has the selected work, skills, and experience.
        </p>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            to={home}
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.9rem',
              color: P.onAccent,
              background: P.accent,
              padding: '0.7rem 1.5rem',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              minHeight: 46,
            }}
          >
            <ArrowLeft size={15} /> Back to the portfolio
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.9rem',
              color: P.ink,
              border: `1px solid ${P.rule}`,
              padding: '0.7rem 1.5rem',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              minHeight: 46,
            }}
          >
            <Mail size={15} /> Email me
          </a>
        </div>
      </main>
      <PortfolioFooter />
    </div>
  );
}