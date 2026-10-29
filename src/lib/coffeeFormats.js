// Torch Republic - the three ways our coffee is sold.
//
// Single source of truth for the format quick options shown in the storefront
// menu and in search. Each one opens the shop filtered to that format.

export const COFFEE_FORMATS = [
  {
    key: 'instant',
    label: 'Instant',
    blurb: 'Instant coffee, just add water. No brewing equipment needed.',
    path: '/shop?format=instant',
  },
  {
    key: 'ground',
    label: 'Ground',
    blurb: 'Ground coffee, ready for your brewer.',
    path: '/shop?format=ground',
  },
  {
    key: 'whole-bean',
    label: 'Whole Bean',
    blurb: 'Whole bean coffee, ground fresh when you brew.',
    path: '/shop?format=whole-bean',
  },
];

export const getCoffeeFormat = (key) => COFFEE_FORMATS.find((f) => f.key === key) || null;

// ── The lineup rule, stated the same way everywhere ─────────────────────────
// The two everyday coffees (Instant Classic and Instant Mushroom) are instant
// and nothing else. Special editions are brewed coffee and may be sold
// ground, whole bean, or in both formats, depending on the release. These
// strings keep that distinction clear wherever a product appears.
export const INSTANT_LINEUP = {
  label: 'Instant only',
  note: 'Just add water. No grinder, no brewer, no pods.',
};

export const GROUND_EDITION = {
  label: 'Ground',
  note: 'Brewed, not instant. A brewer is required.',
};