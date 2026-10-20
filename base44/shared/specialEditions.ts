/**
 * SPECIAL EDITIONS — shared server-side helpers.
 *
 * Used by:
 *   - getSpecialEditions          (storefront catalog + Shopify availability)
 *   - createShopifyCheckout       (approval-gated variant allowlist)
 *
 * Shopify stays the source of truth for price, stock and purchasing
 * availability. Supplier approval lives on the SpecialEdition entity and is
 * deliberately kept separate from Shopify stock status: an option is
 * purchasable only when BOTH say yes.
 */

import { storefrontQuery } from "./shopifyStorefront.ts";

const VARIANT_GID = /^gid:\/\/shopify\/ProductVariant\/\d+$/;

export function isShopifyVariantGid(value) {
  return typeof value === "string" && VARIANT_GID.test(value);
}

/**
 * Resolve price / availability / imagery for a set of Shopify variant GIDs.
 * Returns { ok, data, error } — data is keyed by variant GID.
 * Never throws; a Shopify failure surfaces as ok:false so callers can render
 * an unavailable state instead of an enabled purchase button.
 */
export async function fetchEditionVariantData(variantIds) {
  const ids = [...new Set((variantIds || []).filter(isShopifyVariantGid))];
  if (ids.length === 0) return { ok: true, data: {}, error: null };

  const query = `query editionVariants($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on ProductVariant {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        image { url altText }
        product { id title handle availableForSale publishedAt }
      }
    }
  }`;

  const result = await storefrontQuery(query, { ids });
  if (!result.ok) return { ok: false, data: {}, error: result.error || "Shopify unavailable" };

  const data = {};
  for (const node of result.json?.data?.nodes || []) {
    if (!node || !node.id) continue;
    data[node.id] = {
      available:
        node.availableForSale === true &&
        node.product?.availableForSale === true &&
        !!node.product?.publishedAt,
      price: node.price?.amount || null,
      compareAtPrice: node.compareAtPrice?.amount || null,
      currency: node.price?.currencyCode || null,
      variantTitle: node.title || null,
      productTitle: node.product?.title || null,
      productHandle: node.product?.handle || null,
      image: node.image?.url || null,
      imageAlt: node.image?.altText || null,
    };
  }
  return { ok: true, data, error: null };
}

/**
 * Approved + mapped Shopify variant GIDs across all active special editions.
 * Only these may be added to a Shopify cart — an unmapped, unapproved or
 * placeholder variant is never purchasable.
 */
export async function loadApprovedEditionVariantIds(base44) {
  const approved = new Set();
  try {
    const res = await base44.entities.SpecialEdition.filter({ status: "active" }, { limit: 100 });
    const items = Array.isArray(res) ? res : res?.items || [];
    for (const edition of items) {
      for (const option of edition?.options || []) {
        if (option?.approved === true && isShopifyVariantGid(option.shopify_variant_id)) {
          approved.add(option.shopify_variant_id);
        }
      }
    }
  } catch {
    // No editions configured yet — nothing extra is purchasable.
  }
  return approved;
}