/**
 * CART LINE RESOLUTION — shared by cart creation and the cart preview endpoint.
 *
 * Turns slug-based cart lines into verified Shopify cart lines. Anything that
 * cannot be sold is returned as a rejected line with a reason the customer can
 * read, so a cart never quietly drops an item.
 */

import {
  VARIANT_IDS,
  SELLING_PLAN_IDS,
  DUO_VARIANT_ID,
  DUO_ENABLED,
} from "./shopifyStorefront.ts";

// ── Explicitly rejected slugs (Matcha + retired products) ──
const REJECTED_SLUG_PATTERNS = [
  "matcha", "alchemist", "monk", "ascendant",
  "ceremonial", "the-alchemist", "the-monk",
];

export function isRejectedSlug(slug) {
  if (!slug) return false;
  const lower = String(slug).toLowerCase();
  return REJECTED_SLUG_PATTERNS.some((p) => lower.includes(p));
}

// ── Quantity validation: positive safe integer, 1–999 ──
export function validateQuantity(qty) {
  const n = Number(qty);
  if (!Number.isInteger(n) || n < 1 || n > 999) return null;
  return n;
}

/**
 * @param inputLines  [{ slug | handle, quantity, variantId?, sellingPlanId?, isSubscription? }]
 * @param editionVariantIds  Set of approved + mapped special-edition variant GIDs
 * @returns { cartLines, accepted, rejectedLines }
 *   cartLines  — Shopify CartLineInput objects, ready for the Storefront API
 *   accepted   — the same lines with their slug, for a readable response
 *   rejectedLines — [{ slug, reason }] in the customer's words
 */
export function buildCartLines(inputLines, editionVariantIds) {
  const cartLines = [];
  const accepted = [];
  const rejectedLines = [];

  for (const line of Array.isArray(inputLines) ? inputLines : []) {
    const slug = line?.slug || line?.handle;

    if (isRejectedSlug(slug)) {
      rejectedLines.push({ slug, reason: "Matcha and retired products are not available" });
      continue;
    }

    // Coffee Duo — supports both one-time and subscription (selling plan)
    if (slug === "coffee-duo" || slug === "torch-republic-coffee-duo") {
      if (!DUO_ENABLED) {
        rejectedLines.push({ slug, reason: "Coffee Duo is not yet available" });
        continue;
      }
      const qty = validateQuantity(line.quantity);
      if (!qty) { rejectedLines.push({ slug, reason: "Invalid quantity" }); continue; }
      const cartLine = { merchandiseId: DUO_VARIANT_ID, quantity: qty };
      if (line.isSubscription) {
        const planId = line.sellingPlanId || SELLING_PLAN_IDS[slug];
        if (!planId) {
          rejectedLines.push({ slug, reason: "No selling plan configured for this product" });
          continue;
        }
        cartLine.sellingPlanId = planId;
      }
      cartLines.push(cartLine);
      accepted.push({ ...cartLine, slug, quantity: qty });
      continue;
    }

    const variantId = line?.variantId || VARIANT_IDS[slug];
    if (!variantId) {
      rejectedLines.push({ slug, reason: "Unknown product or unverified variant" });
      continue;
    }

    // Reject raw variant IDs that are neither in the verified catalog nor an
    // approved + mapped special-edition variant.
    if (
      line.variantId &&
      !Object.values(VARIANT_IDS).includes(line.variantId) &&
      line.variantId !== DUO_VARIANT_ID &&
      !editionVariantIds?.has(line.variantId)
    ) {
      rejectedLines.push({ slug, reason: "Unverified variant ID rejected" });
      continue;
    }

    const qty = validateQuantity(line.quantity);
    if (!qty) { rejectedLines.push({ slug, reason: "Invalid quantity" }); continue; }

    const cartLine = { merchandiseId: variantId, quantity: qty };
    if (line.isSubscription) {
      const planId = line.sellingPlanId || SELLING_PLAN_IDS[slug];
      if (!planId) {
        rejectedLines.push({ slug, reason: "No selling plan configured for this product" });
        continue;
      }
      cartLine.sellingPlanId = planId;
    }

    cartLines.push(cartLine);
    accepted.push({ ...cartLine, slug, quantity: qty });
  }

  return { cartLines, accepted, rejectedLines };
}