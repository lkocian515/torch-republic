/**
 * SHOPIFY CHECKOUT — gated by COMMERCE_ENABLED (lib/commerceConfig.js).
 *
 * Verified against Shopify Admin API on 2026-09-09.
 *
 * Variant IDs below are the ACTIVE, PUBLISHED products:
 *   - Instant Classic Coffee (handle: instant-coffee-1, SKU: C-INSTANTCOFFEE-ST-3OZ-BL)
 *   - Instant Coffee with Mushrooms (handle: instant-coffee-with-mushroom, SKU: C-INSTANTCOFFEEWITHMUSHROOM-ST-3OZ-BL)
 *
 * The Coffee Duo is a Shopify fixed-bundle product. It is currently in DRAFT
 * status and must NOT be purchasable until Shopify reports it as Active and
 * published. Its variant ID is stored for reference but gated behind
 * DUO_ENABLED = false.
 *
 * BLOCKER: The Shopify Storefront API returns 401 UNAUTHORIZED with the
 * current SHOPIFY_STOREFRONT_TOKEN. Cart permalinks (/cart/variant:qty)
 * work without API auth and are used as the fallback checkout method.
 * When the Storefront API token is fixed, the createShopifyCheckout backend
 * function can be used for full cartCreate/cartLines management.
 *
 * BLOCKER: No Shopify selling plan groups exist. Subscription checkout
 * currently applies a one-time discount code (SUBSCRIBE10) as a fallback.
 * True recurring subscriptions require Shopify Subscriptions app configuration.
 */
import { COMMERCE_ENABLED } from './commerceConfig';

const SHOPIFY_DOMAIN = 'https://libertees-for-all.myshopify.com';

// ── Verified Shopify ProductVariant IDs (from Admin API 2026-09-09) ───────
export const SHOPIFY_VARIANT_IDS = COMMERCE_ENABLED
  ? {
      // Instant Classic Coffee — Product 9455872606460, Variant 51245709623548
      'instant-classic-coffee': '51245709623548',
      // Instant Coffee with Mushrooms — Product 9455870869756, Variant 51245706608892
      'instant-mushroom-coffee': '51245706608892',
    }
  : {};

// ── Coffee Duo — Shopify fixed-bundle product ───────────────────────────────
// Product 9455988474108, handle: torch-republic-coffee-duo, variant: 51245930217724
// STATUS: draft (not published). Do NOT enable until Shopify confirms Active.
export const DUO_VARIANT_ID = '51245930217724';
export const DUO_ENABLED = false; // Flip to true only when Shopify reports Active + published

export const SHOPIFY_CART_URL = COMMERCE_ENABLED ? `${SHOPIFY_DOMAIN}/cart` : null;

// Build a single-product cart permalink.
export function getShopifyCartUrl(productSlug, qty = 1) {
  if (!COMMERCE_ENABLED) return null;
  const variantId = SHOPIFY_VARIANT_IDS[productSlug];
  if (!variantId) return null;
  return `${SHOPIFY_DOMAIN}/cart/${variantId}:${qty}`;
}

// Build a multi-product cart permalink. Pass an array of { slug, qty }.
export function getShopifyBundleUrl(items) {
  if (!COMMERCE_ENABLED) return null;
  const parts = items
    .map(({ slug, qty = 1 }) => {
      const variantId = SHOPIFY_VARIANT_IDS[slug];
      return variantId ? `${variantId}:${qty}` : null;
    })
    .filter(Boolean);
  if (parts.length === 0) return null;
  return `${SHOPIFY_DOMAIN}/cart/${parts.join(',')}`;
}

// Coffee Duo: uses the Shopify fixed-bundle product variant directly.
// Disabled while the bundle is in Draft status.
export function getCoffeeDuoBundleUrl() {
  if (!COMMERCE_ENABLED || !DUO_ENABLED) return null;
  return `${SHOPIFY_DOMAIN}/cart/${DUO_VARIANT_ID}:1`;
}

// All-current-products bundle (one of each individual product).
export function getFullBundleUrl() {
  if (!COMMERCE_ENABLED) return null;
  return getShopifyBundleUrl(Object.keys(SHOPIFY_VARIANT_IDS).map((slug) => ({ slug, qty: 1 })));
}

// Classic coffee bundle (current instant classic coffee).
export function getAllClassicBundleUrl() {
  if (!COMMERCE_ENABLED) return null;
  return getShopifyBundleUrl([{ slug: 'instant-classic-coffee', qty: 1 }]);
}

// Build subscription checkout from blend selection.
// NOTE: No Shopify selling plans exist yet. This applies a one-time 10%
// discount code as a fallback. True recurring subscriptions require
// Shopify Subscriptions app configuration.
export async function getSubscriptionCheckoutUrl(_blendQty) {
  if (!COMMERCE_ENABLED) return null;
  try {
    const { base44 } = await import('@/api/base44Client');
    const response = await base44.functions.invoke('createSubscriptionCheckout', {
      blendQty: _blendQty,
    });
    if (response.data?.checkoutUrl) return response.data.checkoutUrl;
  } catch {
    return null;
  }
  return null;
}