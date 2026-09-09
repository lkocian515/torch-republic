/**
 * SHOPIFY CHECKOUT — frontend wrapper.
 *
 * ALL Shopify commerce goes through Base44 backend functions using the
 * Storefront Cart API. Cart permalinks have been removed as the primary
 * checkout architecture.
 *
 * Gated by COMMERCE_ENABLED (lib/commerceConfig.js).
 * While false, all functions return null and the /restocking fallback
 * page is shown for checkout attempts.
 *
 * SECURITY:
 *   - The private Storefront token NEVER appears in frontend code.
 *   - All API calls go through base44.functions.invoke().
 *   - Variant IDs and selling plan IDs are resolved server-side.
 *   - No redirect occurs until a valid Shopify checkoutUrl is returned.
 */

import { COMMERCE_ENABLED } from './commerceConfig';

// ── Error normalization ──
// Customer-safe messages with diagnostic codes for admins.
function normalizeError(error) {
  if (!error) return null;
  const code = error.code || error.field?.join('.') || 'UNKNOWN';
  const originalMessage = error.message || String(error);
  let customerMessage = 'Something went wrong. Please try again.';

  if (originalMessage.includes('not available') || originalMessage.includes('sold out') || originalMessage.includes('unavailable')) {
    customerMessage = 'This product is currently unavailable.';
  } else if (originalMessage.includes('cart') || originalMessage.includes('Cart')) {
    customerMessage = 'Your cart could not be updated. Please try again.';
  } else if (originalMessage.includes('token') || originalMessage.includes('auth') || originalMessage.includes('401')) {
    customerMessage = 'We are experiencing a temporary issue. Please try again later.';
  } else if (originalMessage.includes('expired')) {
    customerMessage = 'Your cart has expired. Please start a new order.';
  }

  return { customerMessage, code, originalMessage };
}

async function invokeCart(payload) {
  if (!COMMERCE_ENABLED) return null;
  try {
    const { base44 } = await import('@/api/base44Client');
    const response = await base44.functions.invoke('createShopifyCheckout', payload);
    const data = response.data;
    if (data?.error) {
      return { error: { customerMessage: 'Something went wrong. Please try again.', code: 'SHOPIFY_ERROR', originalMessage: data.error } };
    }
    return data;
  } catch (err) {
    return { error: normalizeError(err) };
  }
}

// ── Primary methods ──

/**
 * Create a new Shopify cart (empty or with lines).
 * @param {Array<{slug: string, quantity: number, isSubscription?: boolean}>} [lines]
 * @returns {Promise<object|null>} Sanitized cart data or null.
 */
export async function createShopifyCart(lines) {
  if (!COMMERCE_ENABLED) return null;
  const data = await invokeCart({ action: 'create', lines: lines || [] });
  if (data?.error) return data;
  return data?.cart || null;
}

/**
 * Retrieve a Shopify cart by ID (for page-refresh reconciliation).
 * @param {string} cartId
 */
export async function getShopifyCart(cartId) {
  if (!COMMERCE_ENABLED || !cartId) return null;
  const data = await invokeCart({ action: 'get', cartId });
  return data?.cart || null;
}

/**
 * Add a single line to a Shopify cart.
 * @param {string} cartId
 * @param {{slug: string, quantity: number, isSubscription?: boolean}} line
 */
export async function addShopifyCartLine(cartId, line) {
  if (!COMMERCE_ENABLED || !cartId) return null;
  const data = await invokeCart({ action: 'add', cartId, lines: [line] });
  return data?.cart || null;
}

/**
 * Update a single cart line's quantity.
 * @param {string} cartId
 * @param {string} lineId
 * @param {number} quantity
 */
export async function updateShopifyCartLine(cartId, lineId, quantity) {
  if (!COMMERCE_ENABLED || !cartId) return null;
  const data = await invokeCart({ action: 'update', cartId, lines: [{ lineId, quantity }] });
  return data?.cart || null;
}

/**
 * Remove a single cart line.
 * @param {string} cartId
 * @param {string} lineId
 */
export async function removeShopifyCartLine(cartId, lineId) {
  if (!COMMERCE_ENABLED || !cartId) return null;
  const data = await invokeCart({ action: 'remove', cartId, lineIds: [lineId] });
  return data?.cart || null;
}

/**
 * Get the Shopify-hosted checkout URL for an existing cart.
 * Does NOT redirect — the caller decides.
 * Does NOT create a Base44 Order.
 * @param {string} cartId
 * @returns {Promise<string|null>} checkoutUrl or null.
 */
export async function getShopifyCheckoutUrl(cartId) {
  if (!COMMERCE_ENABLED || !cartId) return null;
  const data = await invokeCart({ action: 'checkout', cartId });
  return data?.checkoutUrl || null;
}

// ── Subscription checkout via real selling plans ──
/**
 * Create a subscription cart with real Shopify selling plans.
 * @param {Record<string, number>} blendQty — { 'instant-classic-coffee': 1, ... }
 * @returns {Promise<string|null>} checkoutUrl or null.
 */
export async function getSubscriptionCheckoutUrl(blendQty) {
  if (!COMMERCE_ENABLED) return null;
  try {
    const { base44 } = await import('@/api/base44Client');
    const response = await base44.functions.invoke('createSubscriptionCheckout', { blendQty });
    return response.data?.checkoutUrl || null;
  } catch {
    return null;
  }
}

// ── Coffee Duo (VERIFIED ACTIVE 2026-09-09) ──
export const DUO_ENABLED = true;

// ── Deprecated wrappers (backward compatibility) ──
// These return null while COMMERCE_ENABLED = false.
// When commerce is enabled, callers should migrate to the new methods above.

export const SHOPIFY_CART_URL = COMMERCE_ENABLED ? 'https://libertees-for-all.myshopify.com/cart' : null;
export const SHOPIFY_VARIANT_IDS = COMMERCE_ENABLED
  ? {
      'instant-classic-coffee': 'gid://shopify/ProductVariant/51245709623548',
      'instant-mushroom-coffee': 'gid://shopify/ProductVariant/51245706608892',
    }
  : {};
export const DUO_VARIANT_ID = 'gid://shopify/ProductVariant/51245930217724';

export function getShopifyCartUrl() { return null; }
export function getShopifyBundleUrl() { return null; }
export function getCoffeeDuoBundleUrl() { return null; }
export function getFullBundleUrl() { return null; }
export function getAllClassicBundleUrl() { return null; }