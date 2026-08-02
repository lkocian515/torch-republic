/**
 * TORCH REPUBLIC — CANONICAL PRICING CONFIGURATION
 * Single source of truth for all product prices, subscription discounts, and bundle pricing.
 * All components must import prices from here — never hardcode prices inline.
 * 
 * Updated: 2026-06-14
 */

// ── One-time purchase prices (per tube) ────────────────────────────────────
export const PRICES = {
  'classic-coffee': 19.99,
  'mushroom-coffee': 22.99,
  'matcha': 24.99,
};

// ── Per-product canonical prices ────────────────────────────────────────────
// Classic Coffee
export const PRICE_TORCHBEARER = 19.99;
export const PRICE_EMBER_RESERVE = 19.99;
// Mushroom Coffee
export const PRICE_MOONCAP_RESTORE = 22.99;
export const PRICE_GLOWMIND_CLARITY = 22.99;
export const PRICE_SUNCAP_RISE = 22.99;
// Matcha
export const PRICE_THE_ALCHEMIST = 24.99;
export const PRICE_THE_MONK = 24.99;

// ── Bundle pricing ───────────────────────────────────────────────────────────
// Every 3-tube bundle is always exactly $49.99, regardless of which products are selected.
export const BUNDLE_PRICE_3 = 49.99;

// ── Subscription discount ────────────────────────────────────────────────────
// Subscribe & Save = 20% off individual one-time price
export const SUBSCRIPTION_DISCOUNT = 0.20;

export const SUBSCRIPTION_PRICES = {
  'classic-coffee': parseFloat((PRICES['classic-coffee'] * (1 - SUBSCRIPTION_DISCOUNT)).toFixed(2)),   // $15.99
  'mushroom-coffee': parseFloat((PRICES['mushroom-coffee'] * (1 - SUBSCRIPTION_DISCOUNT)).toFixed(2)), // $18.39
  'matcha': parseFloat((PRICES['matcha'] * (1 - SUBSCRIPTION_DISCOUNT)).toFixed(2)),                   // $19.99
};

// ── Welcome discount ─────────────────────────────────────────────────────────
// Update values in lib/siteConfig.js — this file mirrors them for price calculations.
export const WELCOME_DISCOUNT_CODE = 'WELCOME15';
export const WELCOME_DISCOUNT = 0.15;

export const WELCOME_PRICES = {
  'classic-coffee': parseFloat((PRICES['classic-coffee'] * (1 - WELCOME_DISCOUNT)).toFixed(2)),
  'mushroom-coffee': parseFloat((PRICES['mushroom-coffee'] * (1 - WELCOME_DISCOUNT)).toFixed(2)),
  'matcha': parseFloat((PRICES['matcha'] * (1 - WELCOME_DISCOUNT)).toFixed(2)),
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
 * Compute total retail value of N products selected for a bundle.
 * Used to calculate the actual savings dynamically.
 */
export function computeRetailTotal(selectedProducts) {
  return selectedProducts.reduce((sum, p) => sum + (getPriceByCategory(p.category)), 0);
}