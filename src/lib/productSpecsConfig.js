/**
 * TORCH REPUBLIC — DROPSHIPPER PRODUCT SPECIFICATIONS GATE
 *
 * This file is the single source of truth for product specs that must be
 * verified against the dropshipper's spec sheet before appearing publicly.
 *
 * HOW IT WORKS:
 * - Each spec starts as null (unverified). `verified` starts as false.
 * - When you receive the dropshipper's spec sheet, fill in the verified value
 *   and change `verified` to true.
 * - Components call getSpec(slug, field) — it returns null until verified.
 * - Unverified specs are hidden from all public-facing pages.
 *
 * DO NOT GUESS. Only fill in what the dropshipper has confirmed in writing.
 */

export const PRODUCT_SPECS = {
  'instant-classic-coffee': {
    verified: false,
    ingredients: null,            // Full ingredient list from label
    caffeine_mg: null,           // Exact mg per serving
    coffee_origin: null,         // Country/region — only if confirmed
    is_single_origin: null,      // true/false
    is_freeze_dried: null,       // true/false
    net_weight: null,            // e.g. "3 oz (85g)"
    servings: null,              // Verified serving count
    allergen_statement: null,   // Allergen and cross-contact statement
    supplier_name: null,         // Public supplier name (if permitted)
    testing_performed: null,     // Lab tests performed
    testing_lab: null,           // Lab name
    testing_frequency: null,    // Batch/lot frequency
    certificate_url: null,       // Customer-facing certificate URL
    certifications: null,        // Active certifications (array)
  },
  'instant-mushroom-coffee': {
    verified: false,
    ingredients: null,
    caffeine_mg: null,
    coffee_origin: null,
    is_single_origin: null,
    is_freeze_dried: null,
    net_weight: null,
    servings: null,
    mushroom_species: null,           // Specific species from label
    mushroom_extract_type: null,     // 'fruiting body' | 'mycelium' | 'powder' | 'extract'
    mushroom_amount_per_serving: null, // e.g. "500mg"
    mushroom_extract_ratio: null,     // e.g. "8:1" — if applicable
    allergen_statement: null,
    supplier_name: null,
    testing_performed: null,
    testing_lab: null,
    testing_frequency: null,
    certificate_url: null,
    certifications: null,
  },
  'pumpkin-spice-whole-bean-coffee': {
    verified: false,
    ingredients: null,
    caffeine_mg: null,
    coffee_origin: null,
    is_single_origin: null,
    net_weight: null,
    servings: null,
    allergen_statement: null,
    supplier_name: null,
    testing_performed: null,
    testing_lab: null,
    testing_frequency: null,
    certificate_url: null,
    certifications: null,
  },
};

// Commerce / policy specs — fulfillment, offers, and Shopify configuration
export const COMMERCE_SPECS = {
  verified: false,
  processing_time: null,         // e.g. "1-3 business days"
  delivery_window: null,         // e.g. "3-7 business days transit"
  markets_served: null,          // e.g. "United States only"
  international_available: null, // true/false
  free_shipping_threshold: 50,   // matches siteConfig — $50 qualifies for free shipping
  free_shipping_active: null,    // true/false — is the Shopify rule live?
  welcome10_active: null,       // true/false — is the code live in Shopify?
  welcome10_exclusions: null,    // What it excludes (string)
  morningduo_active: null,       // true/false
  morningduo_type: null,         // 'discount_code' | 'automatic_discount'
  morningduo_price: null,        // Verified final price (number)
  pumpkin_spice_active: true,     // Live on Shopify — handle: pumpkin-spice
  pumpkin_spice_variant_id: 'gid://shopify/ProductVariant/51377445372156',
  pumpkin_spice_inventory: null,  // Stock count or 'unlimited'
  verified_reviews_exist: null,  // true/false
  rewards_economics: null,       // Points per dollar, redemption, tiers
  subscription_active: null,     // true/false
  subscription_cadence: null,    // e.g. "Every 4 weeks"
  subscription_discount: null,   // Verified % (number)
  return_method: null,           // Actual refund method under First Cup Guarantee
};

/** Returns true if a product's specs have been verified against the dropshipper sheet. */
export function isSpecVerified(productSlug) {
  const spec = PRODUCT_SPECS[productSlug];
  return spec?.verified === true;
}

/** Returns a verified spec value, or null if unverified. */
export function getSpec(productSlug, field) {
  const spec = PRODUCT_SPECS[productSlug];
  if (!spec || !spec.verified) return null;
  return spec[field] ?? null;
}

/** Returns a verified commerce spec value, or null if unverified. */
export function getCommerceSpec(field) {
  if (!COMMERCE_SPECS.verified) return null;
  return COMMERCE_SPECS[field] ?? null;
}