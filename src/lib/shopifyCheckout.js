/**
 * SHOPIFY CHECKOUT — gated by COMMERCE_ENABLED (lib/commerceConfig.js).
 *
 * While COMMERCE_ENABLED is false, every function here returns null WITHOUT
 * making any network request and WITHOUT logging an error. This eliminates
 * the HTTP 402 Shopify requests, the failed collection merges, and the
 * "Missing variant ID for torchbearer-instant-coffee" console noise reported
 * in the audit. The app's cart/checkout UI is responsible for reading
 * COMMERCE_ENABLED and showing an availability notice instead of navigating
 * to a null URL.
 *
 * When commerce is re-enabled, set COMMERCE_ENABLED = true and these helpers
 * resume building Shopify cart permalinks unchanged.
 */
import { COMMERCE_ENABLED } from './commerceConfig';

// Use the canonical customer domain for all cart/checkout links.
const SHOPIFY_DOMAIN = 'https://libertees-for-all.myshopify.com';

// Per-product Shopify variant IDs. Only the three current canonical handles are
// kept active; retired-only variants (SunCap, MoonCap, Ember, The Monk) are
// removed so they can never be looked up or sent to Shopify.
export const SHOPIFY_VARIANT_IDS = COMMERCE_ENABLED
  ? {
      'instant-classic-coffee': '49166825160956',
      'instant-mushroom-coffee': '50910406050044',
      // Legacy handle aliases (for historical cart line items)
      'torchbearer™-single-origin-instant-coffee': '49166825160956',
      'glowmind-clarity-instant-mushroom-coffee': '50910406050044',
    }
  : {};

export const SHOPIFY_CART_URL = COMMERCE_ENABLED ? `${SHOPIFY_DOMAIN}/cart` : null;

// Build a single-product cart permalink.
export function getShopifyCartUrl(productSlug, qty = 1) {
  if (!COMMERCE_ENABLED) return null;
  const variantId = SHOPIFY_VARIANT_IDS[productSlug];
  if (!variantId) return null; // no console noise — caller handles null
  return `${SHOPIFY_DOMAIN}/cart/${variantId}:${qty}`;
}

// Build a multi-product bundle cart permalink. Pass an array of { slug, qty }.
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

// Coffee Duo: 1 Classic + 1 Mushroom
export function getCoffeeDuoBundleUrl() {
  if (!COMMERCE_ENABLED) return null;
  return getShopifyBundleUrl([
    { slug: 'instant-classic-coffee', qty: 1 },
    { slug: 'instant-mushroom-coffee', qty: 1 },
  ]);
}

// All-current-products bundle (one of each product).
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
export async function getSubscriptionCheckoutUrl(_blendQty) {
  // Commerce disabled — do not call the backend function (it is inaccessible
  // without Builder+ and would 402/404). Caller shows the availability notice.
  if (!COMMERCE_ENABLED) return null;
  try {
    const response = await fetch('https://torchrepublic.base44.app/functions/createSubscriptionCheckout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blendQty: _blendQty }),
    });
    const data = await response.json();
    if (data.checkoutUrl) return data.checkoutUrl;
  } catch {
    return null;
  }
  return null;
}