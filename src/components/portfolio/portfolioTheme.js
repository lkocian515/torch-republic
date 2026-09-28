// Professional portfolio design system for Lisa Marie Kocian.
// Editorial, restrained, technology-consultancy aesthetic.
// Soft ivory background, charcoal text, one controlled blue accent.

export const P = {
  paper: '#F7F7F5',       // soft ivory / warm white
  surface: '#FFFFFF',
  ink: '#111827',          // charcoal — primary text
  secondary: '#475569',    // slate — secondary text
  muted: '#94A3B8',         // light slate — tertiary / labels
  rule: '#E2E8F0',          // soft border
  accent: '#2563EB',        // controlled blue accent
  accentInk: '#1E40AF',    // darker blue — emphasis text
  accentSoft: 'rgba(37,99,235,0.08)',
  accentHover: '#1D4ED8',
};

export const FONT_SERIF = 'var(--font-serif)';  // Cormorant Garamond — display headings
export const FONT_SANS = 'var(--font-heading)'; // Inter — body text
export const FONT_MONO = 'var(--font-mono)';     // JetBrains Mono — labels

export const SECTION = {
  paddingTop: 'clamp(3rem, 6vw, 5rem)',
  paddingBottom: 'clamp(3rem, 6vw, 5rem)',
};

export const LIVE_STORE = 'https://torchrepublic.com';
export const LINKEDIN = 'https://www.linkedin.com/in/lisamariekocian';
export const CONTACT_EMAIL = 'lisakocian@outlook.com';

// ── Portfolio SEO (lisakocian.com global identity) ──
export const PORTFOLIO_TITLE = 'Lisa Kocian | AI Quality Assurance & Content Evaluation';
export const PORTFOLIO_DESC = 'Portfolio of Lisa Marie Kocian, an AI quality assurance and content evaluation specialist focused on output validation, document quality, workflow testing, defect documentation, and e-commerce QA.';
export const PORTFOLIO_CANON = 'https://lisakocian.com/';
export const PORTFOLIO_OG_TITLE = 'Lisa Marie Kocian | AI Quality Assurance & Content Evaluation';
export const PORTFOLIO_OG_DESC = 'Selected work in AI output evaluation, content QA, digital workflow testing, defect investigation, and applied e-commerce quality assurance.';
export const PORTFOLIO_OG_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8e8524676_generated_image.png';

// ── Case study SEO ──
export const CASE_STUDY_TITLE = 'Torch Republic Case Study | Lisa Marie Kocian';
export const CASE_STUDY_DESC = 'Case study of the Torch Republic commerce application: AI-assisted development with Base44 and React, Shopify integration, QA challenges, testing approach, and demonstrated capabilities.';
export const CASE_STUDY_CANON = 'https://lisakocian.com/case-study';

// ── Path helpers for cross-domain routing ──
// lisakocian.com serves the portfolio at root; storefront serves at /portfolio.
export function portfolioBase() {
  if (typeof window !== 'undefined' && /lisakocian\.com$/.test(window.location.hostname)) {
    return '';
  }
  return '/portfolio';
}

export function caseStudyUrl() {
  return `${portfolioBase() || ''}/case-study`;
}

export function portfolioHomeUrl() {
  return portfolioBase() || '/';
}