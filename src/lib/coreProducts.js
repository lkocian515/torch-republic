// Torch Republic — canonical three-product storefront (the "lineup").
//
// This is the SINGLE source of truth for the customer-facing assortment.
// Only these three products exist publicly. Legacy 7-product data in
// mushroomProducts.js is retained solely for historical/admin integrity and
// is NOT rendered to customers.
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
  matcha: {
    key: 'matcha',
    name: 'Ceremonial Matcha',
    accent: '#5E7A3E', // rich botanical green
    soft: '#E3EAD6',
    deep: '#43612A',
  },
  mushroom: {
    key: 'mushroom',
    name: 'Mushroom Coffee',
    accent: '#2F4A73', // deep cobalt / royal blue
    soft: '#DCE4EF',
    deep: '#1E3260',
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
    alt: `${p.name} by Torch Republic`,
    gallery: [image],
    ritual: RITUAL_COLORS[p.ritualKey],
  };
};

// ── The three core products (verified data only — no invented claims) ───────
export const CORE_PRODUCTS = [
  build({
    id: 'instant-classic-coffee',
    name: 'Instant Classic Coffee',
    slug: 'instant-classic-coffee',
    shopifyHandle: 'torchbearer™-single-origin-instant-coffee',
    ritualKey: 'classic',
    category: 'classic-coffee',
    categoryLabel: 'Classic Coffee',
    price: PRICES['classic-coffee'],
    servings: 27,
    caffeineLevel: 'high',
    caffeineLabel: 'High',
    positioning: 'Bold, smooth, and ready in seconds.',
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
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8d91192b7_tcr_coffee_blank_final_latestdd3.jpeg',
  }),
  build({
    id: 'instant-mushroom-coffee',
    name: 'Instant Mushroom Coffee',
    slug: 'instant-mushroom-coffee',
    shopifyHandle: 'glowmind-clarity-instant-mushroom-coffee',
    ritualKey: 'mushroom',
    category: 'mushroom-coffee',
    categoryLabel: 'Mushroom Coffee',
    price: PRICES['mushroom-coffee'],
    servings: 27,
    caffeineLevel: 'medium',
    caffeineLabel: 'Medium',
    positioning: 'Coffee comfort with functional mushrooms built in.',
    description:
      'A focused instant mushroom coffee made for worktables, notebooks, and routines that deserve your attention. Blended with premium instant coffee, Lion's Mane, and Chaga.',
    flavorNotes: ['Smooth Coffee', 'Cocoa', 'Balanced Finish'],
    flavorLabel: 'Smooth coffee, cocoa, balanced finish',
    bestFor: 'Focused thinking and daily clarity',
    mushrooms: 'Lion's Mane + Chaga',
    functionalLabel: 'Lion's Mane + Chaga',
    prep: 'Hot or iced',
    cta: 'Shop Mushroom Coffee',
    path: '/products/instant-mushroom-coffee',
    collectionPath: '/products/instant-mushroom-coffee',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4262eaf1c_tcr_coffee_blank_final_latest3r.jpeg',
  }),
  build({
    id: 'ceremonial-matcha',
    name: 'Ceremonial Matcha',
    slug: 'ceremonial-matcha',
    shopifyHandle: 'the-alchemist-matcha',
    ritualKey: 'matcha',
    category: 'matcha',
    categoryLabel: 'Ceremonial Matcha',
    price: PRICES['matcha'],
    servings: 25,
    caffeineLevel: 'medium',
    caffeineLabel: 'Medium',
    positioning: 'Clean energy for a slower kind of morning.',
    description:
      'A ceremonial matcha made for lattes, iced drinks, and everyday exploration. Whisk it with water or make the ritual your own.',
    flavorNotes: ['Ceremonial Matcha', 'Bright', 'Versatile'],
    flavorLabel: 'Bright ceremonial matcha',
    bestFor: 'Matcha lattes, iced drinks, and creative rituals',
    mushrooms: null,
    functionalLabel: null,
    prep: 'Hot or iced',
    cta: 'Shop Matcha',
    path: '/products/ceremonial-matcha',
    collectionPath: '/products/ceremonial-matcha',
    image:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9268e0f1e_tcr_coffee_blank_final_latest3f.jpeg',
  }),
];

// ── Legacy slug → canonical slug redirect map ───────────────────────────────
// Former product URLs (and any stale internal references) resolve to the
// appropriate current product. Used by RitualProductPage for <Navigate>
// redirects so old inbound links land on the clean canonical route.
export const LEGACY_SLUG_REDIRECT = {
  // → Instant Classic Coffee
  torchbearer: 'instant-classic-coffee',
  'torchbearer™-single-origin-instant-coffee': 'instant-classic-coffee',
  'ember-reserve': 'instant-classic-coffee',
  'ember-rise': 'instant-classic-coffee',
  'ember-rise-instant-coffee': 'instant-classic-coffee',
  'torchbearer-instant-coffee': 'instant-classic-coffee',
  // → Instant Mushroom Coffee
  'glowmind-clarity': 'instant-mushroom-coffee',
  'glowmind-clarity-blend': 'instant-mushroom-coffee',
  'glowmind-clarity-instant-mushroom-coffee': 'instant-mushroom-coffee',
  'suncap-rise': 'instant-mushroom-coffee',
  'suncap-rise-instant-mushroom-coffee': 'instant-mushroom-coffee',
  'mooncap-restore': 'instant-mushroom-coffee',
  'mooncap-restore-instant-mushroom-coffee': 'instant-mushroom-coffee',
  // → Ceremonial Matcha
  'the-alchemist': 'ceremonial-matcha',
  'the-alchemist-matcha-blend': 'ceremonial-matcha',
  'the-alchemist-matcha': 'ceremonial-matcha',
  'the-monk': 'ceremonial-matcha',
  'the-monk-matcha-blend': 'ceremonial-matcha',
  'the-monk-matcha': 'ceremonial-matcha',
};

export const getProductBySlug = (slug) => CORE_PRODUCTS.find((p) => p.slug === slug);
export const getProductByRitual = (key) => CORE_PRODUCTS.find((p) => p.ritualKey === key);
export const otherRituals = (key) => CORE_PRODUCTS.filter((p) => p.ritualKey !== key);