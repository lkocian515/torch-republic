/**
 * TORCH REPUBLIC — CANONICAL PRICING CONFIGURATION
 * Single source of truth for all product prices, subscription discounts, and bundle pricing.
 * All components must import prices from here — never hardcode prices inline.
 *
 * Verified against Shopify Admin API on 2026-09-09.
 * Shopify product handles and variant IDs are the ACTIVE, PUBLISHED products.
 *
 * Subscription: 10% off, delivered every 4 weeks.
 * NOTE: No Shopify selling plan groups exist yet. When configured, the
 * selling-plan IDs must be queried and wired into the checkout flow.
 *
 * Updated: 2026-09-09
 */

// ── One-time purchase prices (per bag) ────────────────────────────────────
export const PRICES = {
  'classic-coffee': 22.99,
  'mushroom-coffee': 25.99,
};

// ── Per-product canonical prices ────────────────────────────────────────────
export const PRICE_CLASSIC_COFFEE = PRICES['classic-coffee'];     // $22.99
export const PRICE_MUSHROOM_COFFEE = PRICES['mushroom-coffee'];   // $25.99

// ── Bundle pricing ───────────────────────────────────────────────────────────
// Coffee Duo: Shopify fixed-bundle product. 1 Classic + 1 Mushroom.
// Shopify variant price must be $43.99 (currently $49.99 in Shopify — flagged).
export const BUNDLE_PRICE_DUO = 43.99;
export const DUO_COMPARE_AT = 48.98;

// ── Subscription discount ────────────────────────────────────────────────────
// Subscribe & Save = 10% off individual one-time price, delivered every 4 weeks
export const SUBSCRIPTION_DISCOUNT = 0.10;
export const SUBSCRIPTION_FREQUENCY = 'Every 4 weeks';
export const SUBSCRIPTION_FREQUENCY_DAYS = 28;

export const SUBSCRIPTION_PRICES = {
  'classic-coffee': parseFloat((PRICES['classic-coffee'] * (1 - SUBSCRIPTION_DISCOUNT)).toFixed(2)),   // $20.69
  'mushroom-coffee': parseFloat((PRICES['mushroom-coffee'] * (1 - SUBSCRIPTION_DISCOUNT)).toFixed(2)), // $23.39
};

// ── Welcome discount ─────────────────────────────────────────────────────────
// Update values in lib/siteConfig.js — this file mirrors them for price calculations.
export const WELCOME_DISCOUNT_CODE = 'WELCOME10';
export const WELCOME_DISCOUNT = 0.10;

export const WELCOME_PRICES = {
  'classic-coffee': parseFloat((PRICES['classic-coffee'] * (1 - WELCOME_DISCOUNT)).toFixed(2)),
  'mushroom-coffee': parseFloat((PRICES['mushroom-coffee'] * (1 - WELCOME_DISCOUNT)).toFixed(2)),
};

/**
 * Get the one-time price for a product by category key.
 * Falls back to mushroom-coffee price if category is unknown.
 */
export function getPriceByCategory(category) {
  return PRICES[category] || PRICES['mushroom-coffee'];
}

/**
 * Get the subscription price for a product by category key.
 */
export function getSubscriptionPriceByCategory(category) {
  return SUBSCRIPTION_PRICES[category] || SUBSCRIPTION_PRICES['mushroom-coffee'];
}

/**
 * Format a price number as USD currency string: "$22.99"
 */
export function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

/**
 * Compute total retail value of selected products at one-time prices.
 */
export function computeRetailTotal(selectedProducts) {
  return selectedProducts.reduce((sum, p) => sum + (getPriceByCategory(p.category)), 0);
}