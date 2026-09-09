/**
 * SHOPIFY SUBSCRIPTION CHECKOUT — real Shopify selling plans.
 *
 * Creates a Shopify cart with verified selling plan IDs attached.
 * Uses Storefront Cart API (cartCreate) — NOT cart permalinks
 * and NOT discount codes.
 *
 * SECURITY:
 *   - Token stays server-side via base44:runtime secrets (shared module).
 *   - Returns only sanitized cart data — never the token.
 *
 * VERIFIED SELLING PLANS (2026-09-09):
 *   Classic:  SellingPlan/5911216380  ($20.69, every 4 weeks, 10% off)
 *   Mushroom: SellingPlan/5701107964  ($23.39, every 4 weeks, 10% off)
 *
 * REMOVED:
 *   - SUBSCRIBE10 discount code
 *   - 20%-off logic
 *   - Matcha selling plans
 *   - Any behavior that silently converts subscriptions into one-time purchases
 *
 * A subscription cart line MUST include both merchandiseId and sellingPlanId.
 * Before returning a checkout URL, we confirm Shopify returned a selling-plan
 * allocation on every cart line. If missing, we return a clear error.
 */

import {
  storefrontQuery,
  resolveCartLine,
  sanitizeCart,
  SELLING_PLAN_IDS,
  VARIANT_IDS,
  CART_CREATE_MUTATION,
} from "../../shared/shopifyStorefront.ts";

export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const blendQty = body.blendQty || {};

    // Build subscription cart lines from blend quantities
    const inputLines = [];
    const missingPlans = [];

    for (const [slug, rawQty] of Object.entries(blendQty)) {
      const qty = Number(rawQty);
      if (!Number.isInteger(qty) || qty < 1) continue;

      const variantId = VARIANT_IDS[slug];
      const sellingPlanId = SELLING_PLAN_IDS[slug];

      if (!variantId) {
        missingPlans.push({ slug, reason: "Unknown product slug" });
        continue;
      }

      if (!sellingPlanId) {
        missingPlans.push({ slug, reason: "No selling plan configured for this product" });
        continue;
      }

      inputLines.push({
        slug,
        quantity: qty,
        isSubscription: true,
        sellingPlanId,
        variantId,
      });
    }

    if (inputLines.length === 0) {
      return Response.json({
        error: "No valid subscription products in cart",
        missingPlans,
        subscriptionAvailable: false,
      }, { status: 400 });
    }

    // Resolve to Shopify cart line inputs
    const cartLines = [];
    for (const line of inputLines) {
      const cartLine = resolveCartLine(line);
      if (cartLine) {
        cartLines.push(cartLine);
      }
    }

    if (cartLines.length === 0) {
      return Response.json({
        error: "Failed to resolve cart lines",
        missingPlans,
        subscriptionAvailable: false,
      }, { status: 500 });
    }

    // Create Shopify cart with selling plan lines
    const result = await storefrontQuery(CART_CREATE_MUTATION, {
      input: { lines: cartLines },
    });

    if (!result.ok) {
      return Response.json({
        error: "Subscription cart creation failed",
        httpStatus: result.status,
        shopifyRequestId: result.requestId,
        details: result.error,
        missingPlans,
        subscriptionAvailable: false,
      }, { status: 500 });
    }

    const cartCreate = result.json?.data?.cartCreate;
    const sanitized = sanitizeCart(cartCreate?.cart, cartCreate?.userErrors);

    // ── CRITICAL: Verify selling-plan allocations on every line ──
    // If Shopify did not attach the selling plan, this is NOT a subscription.
    // Return a clear error and do NOT return a checkout URL.
    const linesWithoutAllocation = (sanitized?.lines || []).filter((l) => !l.sellingPlanId);

    if (linesWithoutAllocation.length > 0) {
      return Response.json({
        error: "Selling plan allocation missing on one or more cart lines",
        missingAllocations: linesWithoutAllocation.map((l) => ({
          lineId: l.lineId,
          productTitle: l.productTitle,
          variantId: l.variantId,
        })),
        subscriptionAvailable: false,
        checkoutUrl: null,
      }, { status: 500 });
    }

    return Response.json({
      action: "createSubscription",
      cart: sanitized,
      checkoutUrl: sanitized?.checkoutUrl || null,
      subscriptionAvailable: true,
      sellingPlansConfigured: Object.keys(SELLING_PLAN_IDS),
      missingPlans,
    });
  } catch (error) {
    return Response.json({
      error: error.message,
      subscriptionAvailable: false,
    }, { status: 500 });
  }
}