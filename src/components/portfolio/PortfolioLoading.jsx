import { P, FONT_SERIF, FONT_MONO } from './portfolioTheme';

// Route-level fallback for the portfolio pages.
// It paints the portfolio's own charcoal canvas and display type instead of the
// storefront's dark spinner, so the first paint already looks like the page and
// the Largest Contentful Paint lands on real text rather than a placeholder.
export default function PortfolioLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: '100dvh',
        background: P.paper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: 'clamp(1.4rem, 5vw, 2rem)',
          letterSpacing: '-0.01em',
          color: P.ink,
          margin: 0,
        }}
      >
        Lisa Marie Kocian
      </p>
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: '0.68rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: P.muted,
          margin: 0,
        }}
      >
        AI quality assurance &middot; Content evaluation
      </p>
      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}