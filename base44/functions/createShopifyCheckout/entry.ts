/**
 * SHOPIFY CART MANAGEMENT — sole authoritative backend interface.
 *
 * Actions: create | get | add | update | remove | checkout
 *
 * SECURITY:
 *   - Token stays server-side via base44:runtime secrets (shared module).
 *   - Uses Shopify-Storefront-Private-Token header (shared module).
 *   - Returns ONLY sanitized cart data — never the token.
 *   - Never calculates totals locally — Shopify is authoritative.
 *   - Does NOT create a Base44 Order when checkout is clicked.
 *
 * VERIFIED VARIANTS (2026-09-09):
 *   Classic:  gid://shopify/ProductVariant/51245709623548  ($22.99)
 *   Mushroom: gid://shopify/ProductVariant/51245706608892  ($25.99)
 *   Duo:      gid://shopify/ProductVariant/67779008692476  (ACTIVE — one-time bundle)
 *
 * VERIFIED SELLING PLANS:
 *   Classic:  gid://shopify/SellingPlan/5911216380  ($20.69, every 4 weeks)
 *   Mushroom: gid://shopify/SellingPlan/5701107964  ($23.39, every 4 weeks)
 */

import {
  storefrontQuery,
  resolveCartLine,
  sanitizeCart,
  VARIANT_IDS,
  SELLING_PLAN_IDS,
  DUO_VARIANT_ID,
  DUO_ENABLED,
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_GET_QUERY,
} from "../../shared/shopifyStorefront.ts";
import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { loadApprovedEditionVariantIds } from "../../shared/specialEditions.ts";

// ── Explicitly rejected slugs (Matcha + retired products) ──
const REJECTED_SLUG_PATTERNS = [
  "matcha", "alchemist", "monk", "ascendant",
  "ceremonial", "the-alchemist", "the-monk",
];

function isRejectedSlug(slug) {
  if (!slug) return false;
  const lower = String(slug).toLowerCase();
  return REJECTED_SLUG_PATTERNS.some((p) => lower.includes(p));
}

// ── Quantity validation: positive safe integer, 1–999 ──
function validateQuantity(qty) {
  const n = Number(qty);
  if (!Number.isInteger(n) || n < 1 || n > 999) return null;
  return n;
}

export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action;
    const base44 = createClientFromRequest(req);

    // ── CREATE ──
    if (action === "create") {
      const editionVariantIds = await loadApprovedEditionVariantIds(base44);
      const inputLines = Array.isArray(body.lines) ? body.lines : [];
      const cartLines = [];
      const rejectedLines = [];

      for (const line of inputLines) {
        const slug = line.slug || line.handle;

        if (isRejectedSlug(slug)) {
          rejectedLines.push({ slug, reason: "Matcha and retired products are not available" });
          continue;
        }

        // Coffee Duo — supports both one-time and subscription (selling plan)
        if (slug === "coffee-duo" || slug === "torch-republic-coffee-duo") {
          if (!DUO_ENABLED) {
            rejectedLines.push({ slug, reason: "Coffee Duo is not yet available for purchase" });
            continue;
          }
          const qty = validateQuantity(line.quantity);
          if (!qty) { rejectedLines.push({ slug, reason: "Invalid quantity" }); continue; }
          const cartLine = { merchandiseId: DUO_VARIANT_ID, quantity: qty };
          // Attach selling plan only for subscription lines
          if (line.isSubscription) {
            const planId = line.sellingPlanId || SELLING_PLAN_IDS[slug];
            if (!planId) {
              rejectedLines.push({ slug, reason: "No selling plan configured for this product" });
              continue;
            }
            cartLine.sellingPlanId = planId;
          }
          cartLines.push(cartLine);
          continue;
        }

        const variantId = line.variantId || VARIANT_IDS[slug];
        if (!variantId) {
          rejectedLines.push({ slug, reason: "Unknown product — not in verified catalog" });
          continue;
        }

        // Reject raw variant IDs that are neither in the verified catalog nor an
        // approved + mapped special-edition variant.
        if (
          line.variantId &&
          !Object.values(VARIANT_IDS).includes(line.variantId) &&
          line.variantId !== DUO_VARIANT_ID &&
          !editionVariantIds.has(line.variantId)
        ) {
          rejectedLines.push({ slug, reason: "Unverified variant ID rejected" });
          continue;
        }

        const qty = validateQuantity(line.quantity);
        if (!qty) { rejectedLines.push({ slug, reason: "Invalid quantity" }); continue; }

        const cartLine = { merchandiseId: variantId, quantity: qty };

        // Attach selling plan only for subscription lines
        if (line.isSubscription) {
          const planId = line.sellingPlanId || SELLING_PLAN_IDS[slug];
          if (!planId) {
            rejectedLines.push({ slug, reason: "No selling plan configured for this product" });
            continue;
          }
          cartLine.sellingPlanId = planId;
        }

        cartLines.push(cartLine);
      }

      // Allow empty cart creation
      const input = {};
      if (cartLines.length > 0) input.lines = cartLines;

      // Pass cart note and custom attributes (e.g., free gift selection)
      if (typeof body.note === "string" && body.note.trim()) {
        input.note = body.note.trim();
      }
      if (Array.isArray(body.attributes)) {
        input.attributes = body.attributes
          .filter((a) => a && typeof a.key === "string" && typeof a.value === "string")
          .map((a) => ({ key: a.key, value: a.value }));
      }

      const result = await storefrontQuery(CART_CREATE_MUTATION, { input });
      if (!result.ok) {
        return Response.json({
          error: "Cart creation failed",
          httpStatus: result.status,
          shopifyRequestId: result.requestId,
          details: result.error,
          rejectedLines,
        }, { status: 500 });
      }

      const cartCreate = result.json?.data?.cartCreate;
      const rawUserErrors = cartCreate?.userErrors || [];
      return Response.json({
        action: "create",
        cart: sanitizeCart(cartCreate?.cart, rawUserErrors),
        userErrors: rawUserErrors.map(e => ({ field: e.field, message: e.message, code: e.code })),
        rejectedLines,
      });
    }

    // ── GET ──
    if (action === "get") {
      const { cartId } = body;
      if (!cartId) return Response.json({ error: "Missing cartId" }, { status: 400 });

      const result = await storefrontQuery(CART_GET_QUERY, { cartId });
      if (!result.ok) {
        return Response.json({ error: "Cart retrieval failed", httpStatus: result.status, details: result.error }, { status: 500 });
      }
      const cart = result.json?.data?.cart;
      if (!cart) {
        return Response.json({ error: "Cart not found or expired", cartId }, { status: 404 });
      }
      return Response.json({ action: "get", cart: sanitizeCart(cart, []) });
    }

    // ── ADD ──
    if (action === "add") {
      const { cartId } = body;
      if (!cartId) return Response.json({ error: "Missing cartId" }, { status: 400 });

      const editionVariantIds = await loadApprovedEditionVariantIds(base44);
      const inputLines = Array.isArray(body.lines) ? body.lines : [];
      const cartLines = [];
      const rejectedLines = [];

      for (const line of inputLines) {
        const slug = line.slug || line.handle;

        if (isRejectedSlug(slug)) {
          rejectedLines.push({ slug, reason: "Matcha and retired products are not available" });
          continue;
        }

        if (slug === "coffee-duo" || slug === "torch-republic-coffee-duo") {
          if (!DUO_ENABLED) {
            rejectedLines.push({ slug, reason: "Coffee Duo is not yet available" });
            continue;
          }
          const qty = validateQuantity(line.quantity);
          if (!qty) { rejectedLines.push({ slug, reason: "Invalid quantity" }); continue; }
          const cartLine = { merchandiseId: DUO_VARIANT_ID, quantity: qty };
          // Attach selling plan only for subscription lines
          if (line.isSubscription) {
            const planId = line.sellingPlanId || SELLING_PLAN_IDS[slug];
            if (!planId) {
              rejectedLines.push({ slug, reason: "No selling plan configured for this product" });
              continue;
            }
            cartLine.sellingPlanId = planId;
          }
          cartLines.push(cartLine);
          continue;
        }

        const resolved = resolveCartLine(line);
        if (!resolved) {
          rejectedLines.push({ slug, reason: "Unknown product or unverified variant" });
          continue;
        }

        if (
          line.variantId &&
          !Object.values(VARIANT_IDS).includes(line.variantId) &&
          !editionVariantIds.has(line.variantId)
        ) {
          rejectedLines.push({ slug, reason: "Unverified variant ID rejected" });
          continue;
        }

        const qty = validateQuantity(line.quantity);
        if (!qty) { rejectedLines.push({ slug, reason: "Invalid quantity" }); continue; }
        resolved.quantity = qty;
        cartLines.push(resolved);
      }

      if (cartLines.length === 0) {
        return Response.json({ error: "No valid lines to add", rejectedLines }, { status: 400 });
      }

      const result = await storefrontQuery(CART_LINES_ADD_MUTATION, { cartId, lines: cartLines });
      if (!result.ok) {
        return Response.json({ error: "cartLinesAdd failed", httpStatus: result.status, details: result.error }, { status: 500 });
      }
      const res = result.json?.data?.cartLinesAdd;
      return Response.json({ action: "add", cart: sanitizeCart(res?.cart, res?.userErrors), rejectedLines });
    }

    // ── UPDATE ──
    if (action === "update") {
      const { cartId, lines } = body;
      if (!cartId || !Array.isArray(lines)) {
        return Response.json({ error: "Missing cartId or lines" }, { status: 400 });
      }

      const updateLines = [];
      for (const l of lines) {
        if (!l.lineId) continue;
        const qty = validateQuantity(l.quantity);
        if (!qty) continue;
        const entry = { id: l.lineId, quantity: qty };
        if (l.sellingPlanId) entry.sellingPlanId = l.sellingPlanId;
        updateLines.push(entry);
      }

      if (updateLines.length === 0) {
        return Response.json({ error: "No valid lines to update" }, { status: 400 });
      }

      const result = await storefrontQuery(CART_LINES_UPDATE_MUTATION, { cartId, lines: updateLines });
      if (!result.ok) {
        return Response.json({ error: "cartLinesUpdate failed", httpStatus: result.status, details: result.error }, { status: 500 });
      }
      const res = result.json?.data?.cartLinesUpdate;
      return Response.json({ action: "update", cart: sanitizeCart(res?.cart, res?.userErrors) });
    }

    // ── REMOVE ──
    if (action === "remove") {
      const { cartId, lineIds } = body;
      if (!cartId || !Array.isArray(lineIds) || lineIds.length === 0) {
        return Response.json({ error: "Missing cartId or lineIds" }, { status: 400 });
      }

      const result = await storefrontQuery(CART_LINES_REMOVE_MUTATION, { cartId, lineIds });
      if (!result.ok) {
        return Response.json({ error: "cartLinesRemove failed", httpStatus: result.status, details: result.error }, { status: 500 });
      }
      const res = result.json?.data?.cartLinesRemove;
      return Response.json({ action: "remove", cart: sanitizeCart(res?.cart, res?.userErrors) });
    }

    // ── CHECKOUT ──
    // Returns the Shopify-hosted checkoutUrl. Does NOT create a Base44 Order.
    if (action === "checkout") {
      const { cartId } = body;
      if (!cartId) return Response.json({ error: "Missing cartId" }, { status: 400 });

      const result = await storefrontQuery(CART_GET_QUERY, { cartId });
      if (!result.ok) {
        return Response.json({ error: "Cart retrieval failed", httpStatus: result.status, details: result.error }, { status: 500 });
      }
      const cart = result.json?.data?.cart;
      if (!cart) {
        return Response.json({ error: "Cart not found or expired", cartId }, { status: 404 });
      }
      if (!cart.checkoutUrl) {
        return Response.json({ error: "No checkout URL available — cart may be empty" }, { status: 400 });
      }
      return Response.json({
        action: "checkout",
        checkoutUrl: cart.checkoutUrl,
        cart: sanitizeCart(cart, []),
      });
    }

    return Response.json({ error: `Unknown action: ${action}. Supported: create, get, add, update, remove, checkout` }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}