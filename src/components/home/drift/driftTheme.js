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
};

export const SERIF = 'var(--font-serif)';
export const SANS = 'var(--font-heading)';
export const MONO = 'var(--font-mono)';

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