// Drift-inspired design tokens for the Torch Republic storefront homepage.
// Warm, tactile, editorial — photography and typography first.
export const D = {
  paper: '#F1ECE5',
  cream: '#FAF7F1',
  espresso: '#382B24',
  terracotta: '#B75B32',
  taupe: '#D5C7B8',
  ink: '#382B24',
  secondary: '#6B5D54',
  rule: '#E5DDD3',
  surface: '#F5F0E8',
  accentSoft: '#F2E2D2',
  terracottaDeep: '#9A4A28',

  // ── Cinematic tokens (derived from Halloween artwork palette) ──
  // Used selectively for depth, shadows, and controlled dark sections.
  // Ivory provides breathing room between darker surfaces.
  obsidian: '#101112',
  deepEspresso: '#241A16',
  warmIvory: '#F4EFE7',
  ember: '#F47735',
  copper: '#B8734D',
  copperDeep: '#8A5638',

  // ── Depth utilities ──
  shadowSoft: '0 2px 8px rgba(36,26,22,0.05), 0 6px 20px rgba(36,26,22,0.04)',
  shadowMedium: '0 4px 14px rgba(36,26,22,0.07), 0 14px 36px rgba(36,26,22,0.05)',
  shadowDeep: '0 8px 24px rgba(36,26,22,0.10), 0 24px 56px rgba(36,26,22,0.07)',
  shadowPackaging: '0 6px 16px rgba(36,26,22,0.08), 0 20px 40px rgba(36,26,22,0.06)',
  borderHairline: '1px solid rgba(184,115,77,0.10)',
  borderPrecise: '1px solid rgba(184,115,77,0.14)',
};

export const SERIF = 'var(--font-serif)';
export const SANS = 'var(--font-heading)';
export const MONO = 'var(--font-mono)';

// ── Type scale ─────────────────────────────────────────────────────────────
// One scale for the whole storefront. Every section used to carry its own
// sizes, tracking values and leading, which is what made the page read as a
// series of unrelated blocks: eight eyebrow labels at four different tracking
// values, section headings starting anywhere from 1.8rem to 2.2rem, and body
// copy at three sizes. These tokens are the single source for all of it, so a
// heading is the same heading everywhere and a paragraph the same paragraph.
//
// Tracking stays tight. Wide letter-spacing on uppercase labels is the fastest
// way to make a page look machine-assembled; a small, consistent value reads as
// a considered system instead.
//
// `textWrap: 'balance'` on the display sizes evens out the line breaks, so a
// headline never ends on a stranded single word.
export const TYPE = {
  // Small uppercase label above a heading or a card title.
  eyebrow: {
    fontFamily: MONO,
    fontSize: '0.6875rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    fontWeight: 600,
    lineHeight: 1.5,
  },

  // The homepage hero. The largest type on the site.
  hero: {
    fontFamily: SERIF,
    fontWeight: 700,
    fontSize: 'clamp(2.5rem, 5.6vw, 4.25rem)',
    lineHeight: 1.06,
    letterSpacing: '-0.018em',
    textWrap: 'balance',
  },

  // Section headline (h2). Every section shares this one size.
  heading: {
    fontFamily: SERIF,
    fontWeight: 700,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    lineHeight: 1.12,
    letterSpacing: '-0.014em',
    textWrap: 'balance',
  },

  // Card title (h3).
  title: {
    fontFamily: SERIF,
    fontWeight: 700,
    fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
    lineHeight: 1.18,
    letterSpacing: '-0.012em',
    textWrap: 'balance',
  },

  // Lead paragraph directly beneath a headline.
  lead: {
    fontFamily: SANS,
    fontSize: '1.0625rem',
    lineHeight: 1.65,
    letterSpacing: '0.002em',
    textWrap: 'pretty',
  },

  // Standard supporting paragraph.
  body: {
    fontFamily: SANS,
    fontSize: '0.9375rem',
    lineHeight: 1.65,
    letterSpacing: '0.002em',
    textWrap: 'pretty',
  },

  // Small uppercase meta line: format notes, step labels, chips.
  meta: {
    fontFamily: MONO,
    fontSize: '0.6875rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: 600,
    lineHeight: 1.5,
  },
};

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const sectionPad = {
  paddingTop: 'clamp(3.5rem, 8vw, 6rem)',
  paddingBottom: 'clamp(3.5rem, 8vw, 6rem)',
};