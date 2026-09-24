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
    caffeineLevel: 'high',
    caffeineLabel: 'High',
    positioning: 'Bold, straightforward premium coffee - no brewing equipment needed.',
    description:
      'A classic instant coffee made with single-origin coffee from Papua New Guinea. A straightforward cup with origin character and everyday convenience.',
    flavorNotes: ['Bold', 'Smooth', 'Premium Arabica'],
    flavorLabel: 'Bold, smooth, premium Arabica',
    bestFor: 'Classic coffee and everyday ritual',
    mushrooms: null,
    functionalLabel: null,
    prep: 'Hot or iced',
    cta: 'Shop Coffee',
    path: '/products/instant-classic-coffee',
    collectionPath: '/products/instant-classic-coffee',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5e731e05f_file_00000000219c822f89492705850fcb90.png',
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
    caffeineLevel: 'medium',
    caffeineLabel: 'Medium',
    positioning: 'Smooth coffee made with functional mushroom extracts.',
    description:
      'A focused instant mushroom coffee made for worktables, notebooks, and routines that deserve your attention. Blended with premium instant coffee and functional mushroom extracts.',
    flavorNotes: ['Smooth Coffee', 'Cocoa', 'Balanced Finish'],
    flavorLabel: 'Smooth coffee, cocoa, balanced finish',
    bestFor: 'Focused thinking and daily clarity',
    mushrooms: 'Functional mushroom extracts',
    functionalLabel: 'Functional mushroom extracts',
    prep: 'Hot or iced',
    cta: 'Shop Mushroom Coffee',
    path: '/products/instant-mushroom-coffee',
    collectionPath: '/products/instant-mushroom-coffee',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/193fcf090_file_00000000d614822fbac1ab269ae9f60a.png',
  }),
];

// ── Seasonal / limited-edition products ────────────────────────────────────
// Separate from CORE_PRODUCTS so the homepage product discovery (which uses
// CORE_PRODUCTS) stays focused on the two instant rituals. The Shop page and
// product lookup use ALL_PRODUCTS so seasonal items appear and resolve there.
export const SEASONAL_PRODUCTS = [
  build({
    id: 'pumpkin-spice-whole-bean-coffee',
    name: 'Pumpkin Spice Whole Bean Coffee',
    slug: 'pumpkin-spice-whole-bean-coffee',
    shopifyHandle: 'pumpkin-spice-whole-bean-coffee',
    ritualKey: 'pumpkin_spice',
    category: 'pumpkin-spice',
    categoryLabel: 'Halloween Special Edition',
    price: PRICES['pumpkin-spice'],
    servings: 24,
    weight: '12 oz (340g)',
    format: 'Whole Bean',
    caffeineLevel: 'medium',
    caffeineLabel: 'Medium',
    positioning: 'A seasonal departure from the instant ritual. Fresh whole beans, pumpkin spice flavor, one limited fall release.',
    description:
      'Warm, spiced and made for crisp mornings. A limited-edition seasonal whole bean roast from Torch Republic. Here for spooky season only.',
    flavorNotes: ['Pumpkin', 'Cinnamon', 'Nutmeg', 'Cozy Spice'],
    flavorLabel: 'Pumpkin, cinnamon, nutmeg, and cozy autumn spice',
    bestFor: 'Crisp fall mornings',
    mushrooms: null,
    functionalLabel: null,
    prep: 'Whole bean — grind and brew',
    cta: 'Shop Pumpkin Spice',
    path: '/products/pumpkin-spice-whole-bean-coffee',
    collectionPath: '/products/pumpkin-spice-whole-bean-coffee',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/81a11c090_tcr_coffee_blank_final_latest4.jpeg',
    seasonal: true,
    limitedEdition: true,
  }),
];

// Combined array — use this for Shop page rendering and slug lookups.
export const ALL_PRODUCTS = [...CORE_PRODUCTS, ...SEASONAL_PRODUCTS];

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