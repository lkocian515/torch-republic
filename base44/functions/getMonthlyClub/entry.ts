/**
 * MONTHLY SPECIAL EDITION CLUB — current edition, verified against Shopify.
 *
 * The storefront must never show a monthly price or a subscribe button that
 * isn't backed by a real Shopify product, variant and selling plan. This
 * function is the only place that decides whether the club is purchasable:
 * it reads the featured edition record, then asks Shopify directly whether
 * that exact product, variant and selling plan still exist and agree with
 * each other.
 *
 * RULES ENFORCED HERE (not in the UI):
 *   - A price is returned ONLY when it was read from Shopify. The price the
 *     admin typed on the record is never returned.
 *   - subscriptionReady requires: the record marked verified, the product
 *     found by handle, the configured variant found ON that product, a
 *     selling plan present on that variant, and the variant available.
 *   - oneTimeReady additionally requires the record to allow one-time sales.
 *   - Anything short of that returns a reason string, and the UI shows an
 *     unavailable state with no purchase control.
 *
 * SECURITY: uses the private Storefront token server-side only, never returns it.
 */

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { storefrontQuery } from "../../shared/shopifyStorefront.ts";

const EDITION_QUERY = `query clubEdition($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    handle
    variants(first: 50) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          price { amount currencyCode }
          sellingPlanAllocations(first: 10) {
            edges {
              node {
                sellingPlan { id name }
                priceAdjustments {
                  price { amount currencyCode }
                  perDeliveryPrice { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

// Only these statuses are allowed to reach the storefront.
const PUBLIC_STATUSES = ['scheduled', 'live', 'sold_out'];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const raw = await base44.asServiceRole.entities.MonthlyEdition.list();
    const all = Array.isArray(raw) ? raw : (raw?.items || []);
    const publicEditions = all.filter((e) => PUBLIC_STATUSES.includes(e.status));

    // The featured edition: explicitly flagged first, otherwise the next one due.
    const flagged = publicEditions.find((e) => e.is_current === true);
    const byMonth = [...publicEditions].sort((a, b) =>
      String(a.intended_month || '').localeCompare(String(b.intended_month || ''))
    );
    const edition = flagged || byMonth.find((e) => e.status === 'scheduled') || byMonth[0] || null;

    if (!edition) {
      return Response.json({ edition: null, subscriptionReady: false, oneTimeReady: false });
    }

    const publicEdition = {
      id: edition.id,
      name: edition.edition_name || '',
      flavor: edition.flavor || '',
      description: edition.short_description || '',
      imageUrl: edition.image_url || '',
      labelImageUrl: edition.label_image_url || '',
      month: edition.intended_month || '',
      status: edition.status,
      inventoryStatus: edition.inventory_status || 'unknown',
      launchDate: edition.launch_date || null,
      orderCutoffDate: edition.order_cutoff_date || null,
      expectedFulfillmentDate: edition.expected_fulfillment_date || null,
      fulfillmentProvider: edition.fulfillment_provider || '',
    };

    const fulfillment = {
      provider: edition.fulfillment_provider || '',
      sku: edition.fulfillment_sku || '',
      mapped: Boolean(edition.fulfillment_provider && edition.fulfillment_sku),
    };

    // ── Ask Shopify whether this edition is real ──────────────────────────
    let shopify = {
      checked: false,
      productOk: false,
      variantOk: false,
      planOk: false,
      available: false,
      price: null,
      subscriptionPrice: null,
      currency: null,
      sku: null,
      planName: null,
      productTitle: null,
      variantTitle: null,
      reason: 'No Shopify product handle is set for this edition.',
    };

    if (edition.shopify_product_handle) {
      const result = await storefrontQuery(EDITION_QUERY, { handle: edition.shopify_product_handle });
      shopify.checked = true;

      if (!result.ok) {
        shopify.reason = `Shopify could not be reached for this edition: ${result.error}`;
      } else {
        const product = result.json?.data?.productByHandle;
        if (!product) {
          shopify.reason = 'No Shopify product exists with this handle.';
        } else {
          shopify.productOk = true;
          shopify.productTitle = product.title;

          const variants = (product.variants?.edges || []).map((e) => e.node);
          const wantedId = edition.shopify_variant_id || null;
          const variant = wantedId
            ? variants.find((v) => v.id === wantedId)
            : null;

          if (!wantedId) {
            shopify.reason = 'No Shopify variant ID is set for this edition.';
          } else if (!variant) {
            shopify.reason = 'The configured variant does not belong to this Shopify product.';
          } else {
            shopify.variantOk = true;
            shopify.variantTitle = variant.title;
            shopify.sku = variant.sku || null;
            shopify.available = Boolean(variant.availableForSale);
            shopify.price = variant.price?.amount || null;
            shopify.currency = variant.price?.currencyCode || null;

            const allocations = (variant.sellingPlanAllocations?.edges || []).map((e) => e.node);
            const wantedPlan = edition.shopify_selling_plan_id || null;
            const allocation = wantedPlan
              ? allocations.find((a) => a.sellingPlan?.id === wantedPlan)
              : null;

            if (!wantedPlan) {
              shopify.reason = 'No Shopify selling plan is set for this edition.';
            } else if (!allocation) {
              shopify.reason = 'The configured selling plan is not attached to this variant.';
            } else {
              shopify.planOk = true;
              shopify.planName = allocation.sellingPlan?.name || 'Monthly';
              shopify.subscriptionPrice =
                allocation.priceAdjustments?.[0]?.price?.amount ||
                allocation.priceAdjustments?.[0]?.perDeliveryPrice?.amount ||
                null;

              if (!shopify.available) {
                shopify.reason = 'This edition is not currently available for sale in Shopify.';
              } else {
                shopify.reason = null;
              }
            }
          }
        }
      }
    }

    const shopifyAgrees =
      shopify.productOk && shopify.variantOk && shopify.planOk && shopify.available;

    // Both the admin's confirmation AND Shopify's live state must agree.
    const subscriptionReady = Boolean(edition.verified) && shopifyAgrees;
    const oneTimeReady =
      Boolean(edition.verified) && Boolean(edition.one_time_available) &&
      shopify.productOk && shopify.variantOk && shopify.available;

    return Response.json({
      edition: publicEdition,
      shopify,
      fulfillment,
      subscriptionReady,
      oneTimeReady,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}