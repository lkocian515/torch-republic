/**
 * SHOPIFY CHECKOUT — Single Source of Truth
 * UPDATED: 2026-06-11 — All variant IDs verified from live Shopify catalog
 * 
 * Cart permalink format:
 *   https://libertees-for-all.myshopify.com/cart/VARIANT_ID:QTY
 *
 * Bundle format (multiple variants):
 *   https://libertees-for-all.myshopify.com/cart/VARIANT_ID_1:1,VARIANT_ID_2:1
 */

// Use the canonical customer domain for all cart/checkout links.
const SHOPIFY_DOMAIN = 'https://libertees-for-all.myshopify.com';

// ── Per-product Shopify variant IDs (VERIFIED 2026-06-11) ──────────────────────────────────────────
export const SHOPIFY_VARIANT_IDS = {
  // Classic Coffee (3 products)
  'torchbearer-instant-coffee': '49171204276476',
  'ember-rise-instant-coffee': '49171202375932',
  'midnight-watch-instant-coffee': '49148262809852',
  // Mushroom Coffee (6 products)
  'suncap-rise-instant-mushroom-coffee': '49148263465212',
  'glowmind-clarity-instant-mushroom-coffee': '49148263596284',
  'mooncap-restore-instant-mushroom-coffee': '49148263760124',
  'dreamcap-instant-mushroom-coffee': '49148263006460',
  'the-oracle-instant-mushroom-coffee': '49148263170300',
  'mystic-bloom-instant-mushroom-coffee': '49148261597436',
  // Matcha (3 products)
  'the-monk-matcha-blend': '49170574115068',
  'the-ascendant-matcha-blend': '49170644402428',
  'the-alchemist-matcha-blend': '49170572148988',
};

// ── Cart page (no specific product) ──────────────────────────────────────────
export const SHOPIFY_CART_URL = `${SHOPIFY_DOMAIN}/cart`;

// ── Build a single-product cart permalink ────────────────────────────────────
export function getShopifyCartUrl(productSlug, qty = 1) {
  const variantId = SHOPIFY_VARIANT_IDS[productSlug];
  if (!variantId) {
    console.error('[Shopify Cart] Variant ID not found for:', productSlug);
    return null;
  }
  return `${SHOPIFY_DOMAIN}/cart/${variantId}:${qty}`;
}

// ── Build a multi-product bundle cart permalink ───────────────────────────────
// Pass an array of { slug, qty } objects.
export function getShopifyBundleUrl(items) {
  const parts = items
    .map(({ slug, qty = 1 }) => {
      const variantId = SHOPIFY_VARIANT_IDS[slug];
      if (!variantId) {
        console.error('[Shopify Bundle] Variant ID not found for:', slug);
        return null;
      }
      return `${variantId}:${qty}`;
    })
    .filter(Boolean);

  if (parts.length === 0) {
    console.error('[Shopify Bundle] No valid variant IDs found');
    return null;
  }
  return `${SHOPIFY_DOMAIN}/cart/${parts.join(',')}`;
}

// ── Full 6-blend bundle convenience link ─────────────────────────────────────
export function getFullBundleUrl() {
  const allSlugs = Object.keys(SHOPIFY_VARIANT_IDS).map(slug => ({ slug, qty: 1 }));
  return getShopifyBundleUrl(allSlugs);
}

// ── New Bundle Options ───────────────────────────────────────────────────────
// One from each category (Classic + Mushroom + Matcha)
export function getOneFromEachBundleUrl() {
  const items = [
    { slug: 'torchbearer-instant-coffee', qty: 1 },
    { slug: 'glowmind-clarity-instant-mushroom-coffee', qty: 1 },
    { slug: 'the-monk-matcha-blend', qty: 1 },
  ];
  return getShopifyBundleUrl(items);
}

// All Matcha bundle (3 matcha products)
export function getAllMatchaBundleUrl() {
  const items = [
    { slug: 'the-monk-matcha-blend', qty: 1 },
    { slug: 'the-ascendant-matcha-blend', qty: 1 },
    { slug: 'the-alchemist-matcha-blend', qty: 1 },
  ];
  return getShopifyBundleUrl(items);
}

// All Classic Coffee bundle (3 classic products)
export function getAllClassicBundleUrl() {
  const items = [
    { slug: 'torchbearer-instant-coffee', qty: 1 },
    { slug: 'ember-rise-instant-coffee', qty: 1 },
    { slug: 'midnight-watch-instant-coffee', qty: 1 },
  ];
  return getShopifyBundleUrl(items);
}

// ── Build subscription checkout from blend selection ─────────────────────────
export async function getSubscriptionCheckoutUrl(blendQty) {
  try {
    const response = await fetch('https://69afc77e4c80e5e88ca6e3ec.base44.app/functions/createSubscriptionCheckout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blendQty }),
    });
    const data = await response.json();
    if (data.checkoutUrl) {
      return data.checkoutUrl;
    }
  } catch (error) {
    console.error('Subscription checkout failed, falling back to standard cart:', error);
  }
  // Fallback: map product slugs → shopify handles, then build bundle URL
  const SLUG_TO_HANDLE = {
    'suncap-rise': 'suncap-rise-instant-mushroom-coffee',
    'glowmind-clarity-blend': 'glowmind-clarity-instant-mushroom-coffee',
    'mooncap-restore': 'mooncap-restore-instant-mushroom-coffee',
    'dreamcap-blend': 'dreamcap-instant-mushroom-coffee',
    'the-oracle': 'the-oracle-instant-mushroom-coffee',
    'mystic-bloom': 'mystic-bloom-instant-mushroom-coffee',
    'torchbearer': 'torchbearer-instant-coffee',
    'ember-rise': 'ember-rise-instant-coffee',
    'midnight-watch': 'midnight-watch-instant-coffee',
    'the-monk-matcha-blend': 'the-monk-matcha-blend',
    'the-ascendant-matcha-blend': 'the-ascendant-matcha-blend',
    'the-alchemist-matcha-blend': 'the-alchemist-matcha-blend',
  };
  const items = Object.entries(blendQty)
    .filter(([, qty]) => qty > 0)
    .map(([slug, qty]) => ({ slug: SLUG_TO_HANDLE[slug] || slug, qty }));
  return getShopifyBundleUrl(items);
}