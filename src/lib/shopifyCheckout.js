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
  'mooncap-restore':    'REPLACE_WITH_VARIANT_ID',
  'glowmind-clarity':   'REPLACE_WITH_VARIANT_ID',
  'suncap-rise':        'REPLACE_WITH_VARIANT_ID',
  'the-oracle':         'REPLACE_WITH_VARIANT_ID',
  'mystic-bloom':       'REPLACE_WITH_VARIANT_ID',
  'dreamcap-blend':     'REPLACE_WITH_VARIANT_ID',
};

// ── Cart page (no specific product) ──────────────────────────────────────────
export const SHOPIFY_CART_URL = `${SHOPIFY_DOMAIN}/cart`;

// ── Build a single-product cart permalink ────────────────────────────────────
export function getShopifyCartUrl(productSlug, qty = 1) {
  const variantId = SHOPIFY_VARIANT_IDS[productSlug];
  if (!variantId || variantId === 'REPLACE_WITH_VARIANT_ID') {
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
      if (!variantId || variantId === 'REPLACE_WITH_VARIANT_ID') return null;
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

// ── Build subscription checkout from blend selection ─────────────────────────
// blendQty: { [slug]: qty } map from the subscription builder
export function getSubscriptionCheckoutUrl(blendQty) {
  const items = Object.entries(blendQty)
    .filter(([, qty]) => qty > 0)
    .map(([slug, qty]) => ({ slug, qty }));
  return getShopifyBundleUrl(items);
}