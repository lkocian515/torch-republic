// Professional portfolio design system for Lisa Marie Kocian.
// Intentionally decoupled from the Torch Republic coffee theme — this reads
// "technology consultancy / editorial," not "coffee storefront."
// Blue-slate palette — clearly distinct from Torch Republic's warm earth tones.

export const P = {
  paper: '#F7F7F5',
  surface: '#FFFFFF',
  ink: '#111827',          // charcoal — primary text
  secondary: '#475569',    // slate — secondary text
  muted: '#94A3B8',         // light slate — tertiary / labels
  rule: '#E2E8F0',          // soft border
  accent: '#2563EB',        // controlled blue accent
  accentInk: '#1E40AF',    // darker blue — text on light backgrounds
  accentSoft: 'rgba(37,99,235,0.08)',
};

export const FONT_SERIF = 'var(--font-serif)';  // Cormorant Garamond — hero name
export const FONT_SANS = 'var(--font-heading)'; // Inter — everything else
export const FONT_MONO = 'var(--font-mono)';     // JetBrains Mono — labels

export const SECTION = {
  paddingTop: 'clamp(3.5rem, 7vw, 6rem)',
  paddingBottom: 'clamp(3.5rem, 7vw, 6rem)',
};

export const LIVE_STORE = 'https://torchrepublic.com';
export const LINKEDIN = 'https://www.linkedin.com/in/lisamariekocian';
export const CONTACT_EMAIL = 'lisakocian@outlook.com';
export const RESUME_URL = 'https://media.base44.com/files/public/69afc77e4c80e5e88ca6e3ec/cd717d693_LisaKocianResume2026.pdf';

// ── Portfolio SEO constants ──
// These are the canonical metadata for lisakocian.com — never inherited
// from Torch Republic. Coffee terminology may appear inside the case study
// body text but must NOT define the portfolio's global SEO identity.
export const PORTFOLIO_TITLE = 'Lisa Kocian | AI QA & E-Commerce Application Portfolio';
export const PORTFOLIO_DESC = 'AI QA specialist and content evaluator who built and tested a functional Base44 and React commerce application integrated with Shopify, analytics, responsive UX, and real customer workflows.';
export const PORTFOLIO_CANON = 'https://lisakocian.com';
export const PORTFOLIO_OG_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8e8524676_generated_image.png';