// Torch Republic — canonical two-product storefront (the "lineup").
//
// This is the SINGLE source of truth for the customer-facing assortment.
// Only these two products exist publicly: Instant Classic Coffee and
// Instant Mushroom Coffee. Matcha has been fully retired.
//
// Product imagery: real 3oz bag photography. Each product carries an explicit
// `image`; getProductImage resolves to the same bag photos via
// productImageHelpers. Image containers are neutral white so the product-shot
// backgrounds blend cleanly.
//
// Public product identifiers use plain, generic names and routes — no former
// blend names, subtitles, or retired SKUs appear in any customer-facing field.

import { FINAL_PRODUCT_IMAGE_URLS } from './mushroomProducts';
import { PRICES } from './pricingConfig';

// ── Brand color system: one accent per ritual ──────────────────────────────
export const RITUAL_COLORS = {
  classic: {
    key: 'classic',
    name: 'Classic Coffee',
    accent: '#C06A38', // warm burnt orange / terracotta
    soft: '#F2E2D2',
    deep: '#9A5126',
  },
  mushroom: {
    key: 'mushroom',
    name: 'Mushroom Coffee',
    accent: '#566047', // muted olive
    soft: '#E0DDD3',
    deep: '#3D4633',
  },
  pumpkin_spice: {
    key: 'pumpkin_spice',
    name: 'Seasonal Coffee',
    accent: '#A93E26', // terracotta / burnt orange
    soft: '#F7EEDD',   // cream label background
    deep: '#5D2F20',   // dark brown frame
  },
  duo: {
    key: 'duo',
    name: 'Coffee Duo',
    accent: '#7D5E3F', // warm brown — blend of classic + mushroom
    soft: '#F0E6D9',
    deep: '#5C3D1F',
  },
};

const build = (p) => {
  const image = p.image || FINAL_PRODUCT_IMAGE_URLS[p.slug];
  return {
    ...p,
    image,
    imageUrl: image,
    image_url: image,
    thumbnail: image,
    alt: p.alt || `${p.name} by Torch Republic`,
    gallery: [image],
    ritual: RITUAL_COLORS[p.ritualKey],
  };
};

// ── The two core products (verified data only — no invented claims) ────────
export const CORE_PRODUCTS = [
  build({
    id: 'instant-classic-coffee',
    name: 'Instant Classic Coffee',
    slug: 'instant-classic-coffee',
    shopifyHandle: 'instant-coffee-1',
    ritualKey: 'classic',
    category: 'classic-coffee',
    categoryLabel: 'Classic Coffee',
    price: PRICES['classic-coffee'],
    servings: 27,
    weight: '3 oz',
    caffeineLevel: 'high',
    caffeineLabel: 'High',
    positioning: 'Bold, smooth Arabica with a clean finish.',
    description:
      'Premium Arabica instant coffee with a bold, rounded flavor and a clean finish. One scoop of hot water is all it takes, hot or iced, with no machine to clean.',
    flavorNotes: ['Bold', 'Smooth', 'Premium Arabica'],
    flavorLabel: 'Bold, smooth, premium Arabica',
    bestFor: 'Classic coffee and everyday ritual',
    origin: null,
    mushrooms: null,
    functionalLabel: null,
    prep: 'Hot or iced',
    cta: 'Shop Coffee',
    path: '/products/instant-classic-coffee',
    collectionPath: '/products/instant-classic-coffee',
    alt: 'Instant Classic Coffee — matte black 3 oz stand-up pouch with the cream Torch Republic classic label.',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/d17b24779_torch-republic-classic-coffee-1600-2.png',
  }),
  build({
    id: 'instant-mushroom-coffee',
    name: 'Instant Mushroom Coffee',
    slug: 'instant-mushroom-coffee',
    shopifyHandle: 'instant-coffee-with-mushroom',
    ritualKey: 'mushroom',
    category: 'mushroom-coffee',
    categoryLabel: 'Mushroom Coffee',
    price: PRICES['mushroom-coffee'],
    servings: 27,
    weight: '3 oz',
    caffeineLevel: 'medium',
    caffeineLabel: 'Medium',
    positioning: "Smooth coffee with Lion's Mane, Cordyceps and Reishi.",
    description:
      'Premium instant coffee blended with Lion\u2019s Mane, Cordyceps and Reishi mushroom extracts. Smooth and cocoa-forward, with a balanced finish that holds up black or with milk.',
    flavorNotes: ['Smooth Coffee', 'Cocoa', 'Balanced Finish'],
    flavorLabel: 'Smooth coffee, cocoa, balanced finish',
    bestFor: 'Focused thinking and daily clarity',
    mushrooms: "Lion's Mane, Cordyceps & Reishi",
    functionalLabel: "Lion's Mane, Cordyceps & Reishi mushroom extracts",
    prep: 'Hot or iced',
    cta: 'Shop Mushroom Coffee',
    path: '/products/instant-mushroom-coffee',
    collectionPath: '/products/instant-mushroom-coffee',
    alt: 'Instant Mushroom Coffee — matte black 3 oz stand-up pouch with the navy Torch Republic mushroom label.',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/35ac29b4a_torch-republic-mushroom-coffee-1600-1.png',
  }),
];

// ── Seasonal / limited-edition products ────────────────────────────────────
// Separate from CORE_PRODUCTS so the homepage product discovery (which uses
// CORE_PRODUCTS) stays focused on the two instant rituals. The Shop page and
// product lookup use ALL_PRODUCTS so seasonal items appear and resolve there.
export const SEASONAL_PRODUCTS = [
  build({
    id: 'pumpkin-spice-whole-bean-coffee',
    name: 'Pumpkin Spice Coffee',
    slug: 'pumpkin-spice-whole-bean-coffee',
    shopifyHandle: 'pumpkin-spice',
    ritualKey: 'pumpkin_spice',
    category: 'pumpkin-spice',
    categoryLabel: 'Halloween Special Edition',
    price: PRICES['pumpkin-spice'],
    servings: 24,
    weight: '12 oz (340g)',
    // Both grinds are live on Shopify, so the record names both. The grind is
    // chosen on the edition page and carried into the cart line by name.
    format: 'Ground or Whole Bean',
    caffeineLevel: 'medium',
    caffeineLabel: 'Medium',
    positioning: 'A seasonal departure from the instant ritual. A pumpkin spice roast in ground or whole bean, one limited fall release.',
    description:
      'Warm, spiced and made for crisp mornings. A limited-edition seasonal roast from Torch Republic, ground or whole bean. Here for spooky season only.',
    flavorNotes: ['Pumpkin', 'Cinnamon', 'Nutmeg', 'Cozy Spice'],
    flavorLabel: 'Pumpkin, cinnamon, nutmeg, and cozy autumn spice',
    bestFor: 'Crisp fall mornings',
    mushrooms: null,
    functionalLabel: null,
    prep: 'Ground or whole bean — brew your way',
    cta: 'Shop Pumpkin Spice',
    path: '/products/pumpkin-spice-whole-bean-coffee',
    collectionPath: '/products/pumpkin-spice-whole-bean-coffee',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8390f4ba6_file_00000000333081f6826a284f26569cc8.png',
    seasonal: true,
    limitedEdition: true,
  }),
];

// ── Bundle products ──────────────────────────────────────────────────────────
// The Coffee Duo bundles Classic + Mushroom in one purchase. Separate from
// CORE_PRODUCTS so it does not appear in homepage discovery grids; included
// in ALL_PRODUCTS so it resolves on /products/torch-republic-coffee-duo and
// in cart persistence (ACTIVE_CART_IDS).
export const BUNDLE_PRODUCTS = [
  build({
    id: 'torch-republic-coffee-duo',
    name: 'Torch Republic Coffee Duo',
    slug: 'torch-republic-coffee-duo',
    shopifyHandle: 'torch-republic-coffee-duo',
    sellingPlansHandle: 'torch-republic-coffee-duo-copy',
    ritualKey: 'duo',
    category: 'bundle',
    categoryLabel: 'Coffee Duo',
    price: PRICES['coffee-duo'],
    servings: 54,
    caffeineLevel: 'medium',
    caffeineLabel: 'Medium',
    positioning: 'Two coffees, one morning. Classic and Mushroom.',
    description:
      'The Instant Classic and Instant Mushroom coffees together in one bundle. One bold, everyday cup, and one smooth cup blended with functional mushroom extracts.',
    flavorNotes: ['Bold', 'Smooth', 'Functional Mushroom'],
    flavorLabel: 'Bold classic plus smooth mushroom focus',
    bestFor: 'Two-week supply of both rituals',
    mushrooms: null,
    functionalLabel: null,
    prep: 'Hot or iced',
    cta: 'Shop Duo',
    path: '/products/torch-republic-coffee-duo',
    collectionPath: '/products/torch-republic-coffee-duo',
    alt: 'Torch Republic Coffee Duo — the Instant Classic and Instant Mushroom pouches together on a kitchen counter.',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/04a98e90c_torch-republic-duo-lifestyle-1600.png',
    format: 'Instant',
  }),
];

// Combined array — use this for Shop page rendering and slug lookups.
export const ALL_PRODUCTS = [...CORE_PRODUCTS, ...SEASONAL_PRODUCTS, ...BUNDLE_PRODUCTS];

// ── Legacy slug → canonical slug redirect map ───────────────────────────────
// Former product URLs (and any stale internal references) resolve to the
// appropriate current product or /shop. Used by RitualProductPage for <Navigate>
// redirects so old inbound links land on the clean canonical route.
export const LEGACY_SLUG_REDIRECT = {
  // → Instant Classic Coffee
  torchbearer: 'instant-classic-coffee',
  'torchbearer™-single-origin-instant-coffee': 'instant-classic-coffee',
  'instant-coffee-1': 'instant-classic-coffee',
  'ember-reserve': 'instant-classic-coffee',
  'ember-rise': 'instant-classic-coffee',
  'ember-rise-instant-coffee': 'instant-classic-coffee',
  'torchbearer-instant-coffee': 'instant-classic-coffee',
  // → Instant Mushroom Coffee
  'glowmind-clarity': 'instant-mushroom-coffee',
  'glowmind-clarity-blend': 'instant-mushroom-coffee',
  'glowmind-clarity-instant-mushroom-coffee': 'instant-mushroom-coffee',
  'instant-coffee-with-mushroom': 'instant-mushroom-coffee',
  'suncap-rise': 'instant-mushroom-coffee',
  'suncap-rise-instant-mushroom-coffee': 'instant-mushroom-coffee',
  'mooncap-restore': 'instant-mushroom-coffee',
  'mooncap-restore-instant-mushroom-coffee': 'instant-mushroom-coffee',
  // → Retired matcha slugs redirect to /shop
  'ceremonial-matcha': 'shop',
  'the-alchemist': 'shop',
  'the-alchemist-matcha-blend': 'shop',
  'the-alchemist-matcha': 'shop',
  'the-monk': 'shop',
  'the-monk-matcha-blend': 'shop',
  'the-monk-matcha': 'shop',
};

export const getProductBySlug = (slug) => ALL_PRODUCTS.find((p) => p.slug === slug);
export const getProductByRitual = (key) => ALL_PRODUCTS.find((p) => p.ritualKey === key);
export const otherRituals = (key) => ALL_PRODUCTS.filter((p) => p.ritualKey !== key);