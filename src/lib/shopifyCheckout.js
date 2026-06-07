/**
 * SHOPIFY CHECKOUT — Single Source of Truth
 *
 * To connect a product, replace REPLACE_WITH_VARIANT_ID with the real
 * Shopify numeric variant ID (found in Shopify Admin → Products → [product] → Variants).
 *
 * Cart permalink format:
 *   https://libertees-for-all.myshopify.com/cart/VARIANT_ID:QTY
 *
 * Bundle format (multiple variants):
 *   https://libertees-for-all.myshopify.com/cart/VARIANT_ID_1:1,VARIANT_ID_2:1
 */

const SHOPIFY_DOMAIN = 'https://libertees-for-all.myshopify.com';

// ── Per-product Shopify variant IDs ──────────────────────────────────────────
// Replace each REPLACE_WITH_VARIANT_ID with the real numeric variant ID from Shopify Admin.
export const SHOPIFY_VARIANT_IDS = {
  // Classic Coffee (3 products)
  'torchbearer': '49171204276476', // Torchbearer Classic Instant Coffee
  'ember-rise': '49171202375932', // Ember Rise Classic Instant Coffee
  'midnight-watch': '49148262809852', // Midnight Watch Classic Instant Coffee
  // Mushroom Coffee (6 products)
  'suncap-rise': '49148263465212', // Suncap Rise — Light Roast
  'glowmind-clarity-blend': '49148263596284', // GlowMind Clarity — Medium Roast
  'mooncap-restore': '49148263760124', // Mooncap Restore — Dark Roast
  'dreamcap-blend': '49148261597436', // DreamCap Blend — Medium Roast
  'the-oracle-blend': '49148263170300', // The Oracle Blend — Medium Roast
  'mystic-bloom-blend': '49148263006460', // Mystic Bloom Blend — Medium Roast
  // Matcha (3 products)
  'the-monk-matcha-blend': '49170574115068', // The Monk Matcha Blend
  'the-ascendant-matcha-blend': '49170644402428', // The Ascendant Matcha Blend
  'the-alchemist-matcha-blend': '49170572148988', // The Alchemist Matcha Blend
};

// ── Cart page (no specific product) ──────────────────────────────────────────
export const SHOPIFY_CART_URL = `${SHOPIFY_DOMAIN}/cart`;

// ── Build a single-product cart permalink ────────────────────────────────────
export function getShopifyCartUrl(productSlug, qty = 1) {
  const variantId = SHOPIFY_VARIANT_IDS[productSlug];
  if (!variantId) {
    return null; // caller handles the null case
  }
  return `${SHOPIFY_DOMAIN}/cart/${variantId}:${qty}`;
}

// ── Build a multi-product bundle cart permalink ───────────────────────────────
// Pass an array of { slug, qty } objects.
export function getShopifyBundleUrl(items) {
  const parts = items
    .map(({ slug, qty = 1 }) => {
      const variantId = SHOPIFY_VARIANT_IDS[slug];
      if (!variantId) return null;
      return `${variantId}:${qty}`;
    })
    .filter(Boolean);

  if (parts.length === 0) return null;
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
    { slug: 'torchbearer', qty: 1 }, // Classic
    { slug: 'glowmind-clarity-blend', qty: 1 }, // Mushroom
    { slug: 'the-monk-matcha-blend', qty: 1 }, // Matcha
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
    { slug: 'torchbearer', qty: 1 },
    { slug: 'ember-rise', qty: 1 },
    { slug: 'midnight-watch', qty: 1 },
  ];
  return getShopifyBundleUrl(items);
}

// ── Build subscription checkout from blend selection ─────────────────────────
// blendQty: { [slug]: qty } map from the subscription builder
// This now calls the backend function to apply 20% subscription discount
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
  // Fallback to standard bundle URL if backend fails
  const items = Object.entries(blendQty)
    .filter(([, qty]) => qty > 0)
    .map(([slug, qty]) => ({ slug, qty }));
  return getShopifyBundleUrl(items);
}