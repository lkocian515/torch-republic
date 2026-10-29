// Professional portfolio design system for Lisa Marie Kocian.
// Editorial, restrained, technology-forward.
// Deep charcoal canvas, crisp off-white text, one controlled indigo accent,
// restrained orbital linework. Two type families only: serif display + sans.

export const P = {
  paper: '#0A0A0C',        // deep charcoal — page canvas
  surface: '#121218',      // raised panel
  surfaceAlt: '#0E0E13',   // sunken panel
  ink: '#F8FAFC',          // primary text
  secondary: '#A3AEC0',    // secondary text
  muted: '#7C8AA0',        // tertiary text / small labels
  rule: '#1E293B',         // hairline dividers
  accent: '#4F46E5',       // electric indigo — fills, linework, signal points
  accentInk: '#A5B4FC',    // indigo text that stays readable on charcoal
  accentSoft: 'rgba(79,70,229,0.16)',
  accentHover: '#6366F1',
  onAccent: '#FFFFFF',     // text placed on an accent fill
  glow: 'rgba(99,102,241,0.40)',
};

export const FONT_SERIF = 'var(--font-serif)';  // Cormorant Garamond — display headings
export const FONT_SANS = 'var(--font-heading)'; // Inter — body text and labels
// Labels share the sans family: the portfolio uses two families, never three.
export const FONT_MONO = FONT_SANS;

export const SECTION = {
  paddingTop: 'clamp(3rem, 6vw, 5rem)',
  paddingBottom: 'clamp(3rem, 6vw, 5rem)',
};

export const LIVE_STORE = 'https://torchrepublic.com';
export const LINKEDIN = 'https://www.linkedin.com/in/lisamariekocian';
export const CONTACT_EMAIL = 'lisakocian@outlook.com';
// The résumé is shared by email on request, as stated in the contact section.
export const RESUME_URL = `mailto:${CONTACT_EMAIL}?subject=R%C3%A9sum%C3%A9%20request`;

// Brand assets for the project visuals. Real marks and real captures only.
export const TORCH_LOGO = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1e723899d_logo.png';

// Real mobile captures of the live Torch Republic storefront. Only captures
// verified against the current store belong here. The September 2026 hero and
// product-card captures were retired: Ceremonial Matcha has since left the
// lineup, the hero was redesigned, and both coffee prices changed.
export const TORCH_SHOTS = {
  ritual: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/b07e1fa30_IMG_20260905_225532.jpg',
  ingredients: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e85725ddd_IMG_20260905_225523.jpg',
};

// Torch Republic's own product photography: the Instant Classic Coffee and
// Instant Coffee with Mushrooms pouches. Used to present the project itself,
// as distinct from the application captures above.
export const TORCH_PRODUCT_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a3b1aca53_torch-republic-duo-lifestyle-1600.png';

// Luke's Light's own published artwork, copied into this app's media library
// so the portfolio does not depend on another app's storage.
export const LUKES_LIGHT_IMAGE = 'https://base44.app/api/apps/69afc77e4c80e5e88ca6e3ec/files/mp/public/69afc77e4c80e5e88ca6e3ec/6b6586cbc_lukes-light-lighthouse.png';
export const LUKES_LIGHT_MARK = 'https://base44.app/api/apps/69afc77e4c80e5e88ca6e3ec/files/mp/public/69afc77e4c80e5e88ca6e3ec/35ff4b7a2_lukes-light-brand.png';

// Torch Republic storefront palette, taken from the live brand.
export const TORCH_BRAND = {
  paper: '#FBF8F3',
  surface: '#F1ECE5',
  ink: '#382B24',
  muted: '#6B5D54',
  accent: '#B66443',
  rule: '#E5E7EB',
};

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
export const CASE_STUDY_CANON = 'https://lisakocian.com/case-studies/torch-republic';

// ── Luke's Light case study SEO ──
export const LUKES_LIGHT_URL = 'https://lukeslight.org';
export const LUKES_LIGHT_TITLE = "Luke's Light Case Study | Lisa Marie Kocian";
export const LUKES_LIGHT_DESC = "Case study of Luke's Light, an educational youth safety resource: content quality review, AI-assisted development, usability evaluation, and careful communication of platform limitations.";
export const LUKES_LIGHT_CANON = 'https://lisakocian.com/case-studies/lukes-light';

// ── Path helpers for cross-domain routing ──
// lisakocian.com serves the portfolio at root; storefront serves at /portfolio.
export function portfolioBase() {
  if (typeof window !== 'undefined' && /lisakocian\.com$/.test(window.location.hostname)) {
    return '';
  }
  return '/portfolio';
}

export function caseStudyUrl() {
  return `${portfolioBase() || ''}/case-studies/torch-republic`;
}

export function lukesLightCaseStudyUrl() {
  return `${portfolioBase() || ''}/case-studies/lukes-light`;
}

export function portfolioHomeUrl() {
  return portfolioBase() || '/';
}