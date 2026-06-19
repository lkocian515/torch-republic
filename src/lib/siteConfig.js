/**
 * TORCH REPUBLIC — CENTRAL SITE CONFIGURATION
 * Single source of truth for all customer-facing offer, shipping and policy values.
 *
 * IMPORTANT: Update values HERE only. Never hardcode these in components.
 * All components import from this file so changes propagate automatically.
 *
 * Last verified: 2026-06-19
 */

// ── Welcome Offer ─────────────────────────────────────────────────────────────
export const WELCOME_DISCOUNT_CODE = 'WELCOME15';
export const WELCOME_DISCOUNT_PERCENT = 15;        // integer, e.g. 15 for display "15% off"
export const WELCOME_DISCOUNT_RATE = 0.15;          // decimal for price calculations

// ── Subscribe & Save ──────────────────────────────────────────────────────────
export const SUBSCRIBE_SAVE_PERCENT = 20;           // integer, e.g. 20 for display "Save 20%"
export const SUBSCRIBE_SAVE_RATE = 0.20;            // decimal for price calculations

// ── Free Shipping ─────────────────────────────────────────────────────────────
export const FREE_SHIPPING_THRESHOLD = 75;          // USD, integer for comparisons
export const FREE_SHIPPING_THRESHOLD_DISPLAY = '$75+';
export const FREE_SHIPPING_LABEL = `Free Shipping ${75}+`;

// ── Satisfaction Guarantee ────────────────────────────────────────────────────
export const GUARANTEE_DAYS = 30;
export const GUARANTEE_DISPLAY = '30-Day Guarantee';
export const GUARANTEE_DESCRIPTION = 'If it\'s not right, we make it right';

// ── Shipping Estimate ─────────────────────────────────────────────────────────
export const SHIP_TIME = '1–2 business days';
export const SHIP_TIME_DISPLAY = 'Ships in 1–2 business days';
export const SHIP_NOTE = 'Most orders ship in 1–2 days';

// ── Support ───────────────────────────────────────────────────────────────────
export const SUPPORT_EMAIL = 'admin@torchrepublic.com';

// ── Convenience helpers ───────────────────────────────────────────────────────

/** Short trust strip text array used in HeroSection and product pages */
export const TRUST_PILLS = [
  'No Pods',
  'No Machine',
  '25–27 Servings Per Tube',
  `Subscribe & Save ${SUBSCRIBE_SAVE_PERCENT}%`,
  `Free Shipping ${FREE_SHIPPING_THRESHOLD_DISPLAY}`,
  `${GUARANTEE_DAYS}-Day Guarantee`,
];