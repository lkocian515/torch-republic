/**
 * FETCH PRODUCT SELLING PLANS — Shopify Storefront API.
 *
 * Queries a product by handle and returns variant data with selling plan
 * allocations (including price adjustments). Used by the product page to
 * render Buy Once vs Subscribe options.
 *
 * SECURITY:
 *   - Uses SHOPIFY_STOREFRONT_TOKEN (server-side only).
 *   - Returns only sanitized product data — never the token.
 *   - Reports missing scopes explicitly.
 */

import {
  storefrontQuery,
  PRODUCT_SELLING_PLANS_QUERY,
  sanitizeSellingPlans,
} from "../../shared/shopifyStorefront.ts";

export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { handle } = body;

    if (!handle) {
      return Response.json({ error: "Missing product handle" }, { status: 400 });
    }

    const result = await storefrontQuery(PRODUCT_SELLING_PLANS_QUERY, { handle });

    if (!result.ok) {
      return Response.json({
        error: "Failed to fetch selling plans",
        httpStatus: result.status,
        shopifyRequestId: result.requestId,
        details: result.error,
      }, { status: 500 });
    }

    // Check for GraphQL errors that may indicate missing scopes
    if (result.json?.errors) {
      const errorMsg = result.json.errors[0]?.message || "Unknown GraphQL error";
      const missingScope = errorMsg.includes("unauthenticated_read_selling_plans")
        ? "unauthenticated_read_selling_plans"
        : null;
      return Response.json({
        error: "GraphQL query failed",
        details: errorMsg,
        missingScope,
      }, { status: 500 });
    }

    const productData = result.json?.data?.productByHandle;

    if (!productData) {
      return Response.json({
        error: "Product not found",
        handle,
      }, { status: 404 });
    }

    return Response.json({
      product: sanitizeSellingPlans(productData),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}