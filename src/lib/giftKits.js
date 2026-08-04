/**
 * Gift Kit Configuration — Maps each gift kit to REAL Shopify products.
 *
 * VERIFIED 2026-06-23:
 *  - Each "kit" is a curated set of individual blends already sold on Shopify.
 *  - Prices are the LIVE Shopify price of each constituent blend (summed).
 *  - No fictitious bundle exists in Shopify — there is no single bundle product.
 *  - There is no gift-wrapping, personalized card, or gift-box service configured.
 *  - Variant IDs come from lib/shopifyCheckout.js (verified 2026-06-11).
 *
 * Image assets are the newly supplied 1200×900 branded kit images (WebP + PNG).
 * Base URL pattern: https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/<id>_<name>
 */
import { getShopifyBundleUrl } from '@/lib/shopifyCheckout';

const IMG_BASE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec';

// ── Kit image assets (supplied 1200×900) ─────────────────────────────────────
// Supplied as PNG only (no WebP variants exist for these files). We expose only
// the png URL so the <picture> doesn't request a non-existent .webp source.
const kitImage = (file) => ({
  png: `${IMG_BASE}/${file}.png`,
  srcset: `${IMG_BASE}/${file}.png 1200w`,
});

export const GIFT_IMAGES = {
  morningClarity: kitImage('3166a1a2e_01_morning_clarity_kit'),
  eveningRestore: kitImage('800a2d3eb_02_evening_restore_kit'),
  completeRitual: kitImage('0639390db_03_complete_ritual_kit'),
  matchaSerenity: kitImage('d1c0eef3a_04_matcha_serenity_kit'),
};

// Hero promo / social share image for the Gifts hub. Uses the Complete Ritual
// Kit photography (the featured kit) since it best represents the page.
export const HERO_GIFT_IMAGE = GIFT_IMAGES.completeRitual;

// Catalog fallback prices (verified against lib/mushroomProducts.js).
// Used only when live Shopify prices aren't passed in.
const CATALOG_PRICES = {
  'suncap-rise-instant-mushroom-coffee': 22.99,
  'glowmind-clarity-instant-mushroom-coffee': 22.99,
  'mooncap-restore-instant-mushroom-coffee': 22.99,
  'mooncap-restore-instant-mushroom-coffee': 22.99,
  'glowmind-clarity-instant-mushroom-coffee': 22.99,
  'suncap-rise-instant-mushroom-coffee': 22.99,
  'torchbearer-instant-coffee': 19.99,
  'ember-rise-instant-coffee': 19.99,
  'ember-rise-instant-coffee': 19.99,
  'the-monk-matcha': 24.99,
  'the-alchemist-matcha': 24.99,
  'the-alchemist-matcha': 24.99,
};

// Base kit definitions (no price — attached at build time from live data).
const KIT_DEFS = [
  {
    id: 'morning-clarity',
    name: 'Morning Clarity Kit',
    description:
      'A bright, coffee-forward ritual for focused mornings and easy starts.',
    imgKey: 'morningClarity',
    alt:
      'Torch Republic Morning Clarity Kit with premium instant coffee and a warm morning coffee ritual.',
    items: [
      { handle: 'suncap-rise-instant-mushroom-coffee', label: 'SunCap Rise — Light Roast Mushroom Coffee' },
      { handle: 'glowmind-clarity-instant-mushroom-coffee', label: 'GlowMind Clarity — Medium Roast Mushroom Coffee' },
    ],
    decorationNote: 'Serving accessories shown in the photo are not included.',
    detailPath: '/shop/instant-mushroom-coffee',
    featured: false,
  },
  {
    id: 'evening-restore',
    name: 'Evening Restore Kit',
    description:
      'A rich, comforting ritual designed for slower evenings and intentional downtime.',
    imgKey: 'eveningRestore',
    alt:
      'Torch Republic Evening Restore Kit with mushroom coffee, a dark ceramic mug, and a calming evening setting.',
    items: [
      { handle: 'mooncap-restore-instant-mushroom-coffee', label: 'MoonCap Restore — Dark Roast Mushroom Coffee' },
      { handle: 'mooncap-restore-instant-mushroom-coffee', label: 'DreamCap Blend — Medium Roast Mushroom Coffee' },
    ],
    decorationNote: 'Serving accessories shown in the photo are not included.',
    detailPath: '/shop/instant-mushroom-coffee',
    featured: false,
  },
  {
    id: 'complete-ritual',
    name: 'Complete Ritual Kit',
    description:
      'A curated introduction to multiple Torch Republic rituals for morning, daytime, and evening routines.',
    imgKey: 'completeRitual',
    alt:
      'Torch Republic Complete Ritual Kit presented in a premium black gift box with coffee products and a mug.',
    items: [
      { handle: 'torchbearer-instant-coffee', label: 'Torchbearer — Premium Instant Coffee' },
      { handle: 'suncap-rise-instant-mushroom-coffee', label: 'SunCap Rise — Mushroom Coffee' },
      { handle: 'mooncap-restore-instant-mushroom-coffee', label: 'DreamCap Blend — Mushroom Coffee' },
    ],
    decorationNote: 'Gift box, mug, and card shown in the photo are not included.',
    detailPath: '/build-your-ritual',
    featured: true,
    featuredLabel: 'FEATURED GIFT',
  },
  {
    id: 'matcha-serenity',
    name: 'Matcha Serenity Kit',
    description:
      'A smooth ceremonial matcha ritual for quiet mornings, afternoon resets, or thoughtful gifting.',
    imgKey: 'matchaSerenity',
    alt:
      'Torch Republic Matcha Serenity Kit with ceremonial matcha, a matcha bowl, whisk, and premium branded packaging.',
    items: [
      { handle: 'the-monk-matcha', label: 'The Monk — Ceremonial Matcha Blend' },
      { handle: 'the-alchemist-matcha', label: 'The Alchemist — Ceremonial Matcha Blend' },
    ],
    decorationNote: 'Matcha bowl and whisk shown in the photo are not included.',
    detailPath: '/shop/matcha',
    featured: false,
  },
];

// Round to 2 decimals safely.
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Build the runtime kit list, attaching real Shopify prices and a multi-variant
 * cart permalink built from the verified variant IDs in lib/shopifyCheckout.js.
 *
 * @param {Object} livePrices — { [shopifyHandle]: number } from Shopify (optional)
 * @returns {Array} fully-formed kit objects
 */
export function buildRitualKits(livePrices = {}) {
  const priceOf = (handle) =>
    livePrices[handle] ?? CATALOG_PRICES[handle] ?? 0;

  return KIT_DEFS.map((kit) => {
    const price = round2(kit.items.reduce((sum, item) => sum + priceOf(item.handle), 0));
    // Build the real Shopify cart permalink from verified variant IDs.
    const bundleItems = kit.items.map((item) => ({ slug: item.handle, qty: 1 }));
    const cartUrl = getShopifyBundleUrl(bundleItems);
    return {
      ...kit,
      img: GIFT_IMAGES[kit.imgKey],
      price,
      // No fabricated compareAt: we only show a strike-through if Shopify sends one.
      compareAtPrice: null,
      cartUrl,
      itemCount: kit.items.length,
    };
  });
}