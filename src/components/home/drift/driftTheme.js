// Torch Republic — refined editorial design tokens.
// Warm, tactile, cinematic — Escape Coffee sophistication with fire-inspired identity.
// All colors are warm; true white is used sparingly.

export const D = {
  // ── Backgrounds ──
  paper: '#F4EFE7',        // warm parchment — primary light background
  cream: '#FAF7F1',        // warm ivory — lighter sections
  surface: '#F8F3EB',     // card / container surface
  espresso: '#2E2218',    // rich espresso brown — text and dark sections
  espressoDeep: '#1F1610', // near-black charcoal — high-impact moments
  charcoal: '#3A2E22',     // warm dark brown — secondary dark surface

  // ── Text ──
  ink: '#2E2218',          // primary text — espresso
  secondary: '#6B5D50',    // secondary text — warm taupe
  muted: '#9B8E7E',        // tertiary text / labels — muted clay

  // ── Accents ──
  terracotta: '#C0552E',   // ember orange — signature accent
  terracottaDeep: '#9A4220', // deeper ember — hover / emphasis
  terracottaSoft: '#E8C9B5', // soft ember — backgrounds
  copper: '#B07845',       // warm copper — small premium details
  gold: '#C9A268',         // warm metallic gold — fine details
  clay: '#B98C6F',         // muted clay — atmospheric support
  sand: '#D4C4AE',         // sand — atmospheric support
  sunrise: '#E8A87C',     // sunrise tone — atmospheric warmth

  // ── Functional ──
  rule: '#E0D6C8',         // borders
  ruleSoft: '#EBE3D5',     // softer borders
  accentSoft: '#F2E6DA',   // soft accent background
  success: '#5C7A4E',      // muted green — success states
  error: '#B23A2E',        // warm red — error states

  // ── Shadows ──
  shadowCard: '0 1px 2px rgba(46,34,24,0.04), 0 8px 24px rgba(46,34,24,0.06)',
  shadowCardHover: '0 4px 12px rgba(46,34,24,0.08), 0 16px 40px rgba(46,34,24,0.10)',
  shadowHero: '0 24px 60px rgba(46,34,24,0.12)',
};

export const SERIF = 'var(--font-serif)';
export const SANS = 'var(--font-heading)';
export const MONO = 'var(--font-mono)';

// ── Animation tokens ──
export const MOTION = {
  duration: {
    fast: 0.2,
    base: 0.35,
    slow: 0.5,
    cinematic: 0.8,
    hero: 1.4,
  },
  ease: {
    out: [0.22, 1, 0.36, 1],      // power3.out equivalent
    smooth: [0.4, 0, 0.2, 1],      // material standard
    cinematic: [0.16, 1, 0.3, 1], // dramatic but calm
  },
};

// ── Framer Motion presets ──
export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: MOTION.duration.slow, ease: MOTION.ease.out },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: MOTION.duration.slow, ease: MOTION.ease.out },
};

// ── Section spacing ──
export const sectionPad = {
  paddingTop: 'clamp(3.5rem, 8vw, 6rem)',
  paddingBottom: 'clamp(3.5rem, 8vw, 6rem)',
};

// ── Container widths ──
export const CONTAINER = {
  narrow: '720px',
  base: '1100px',
  wide: '1280px',
  full: '100%',
};