/**
 * SPECIAL EDITIONS — public storefront catalog.
 *
 * Returns active special editions, their campaigns, and live Shopify price /
 * availability for every mapped variant. No user data is read or returned.
 *
 * Availability contract returned to the client:
 *   shopify: null            -> option is not mapped to Shopify yet
 *   shopify: { error: true } -> the Shopify call failed (render unavailable)
 *   shopify: { unavailable: true } -> the variant was not found on the sales channel
 *   shopify: { available, price, currency, ... } -> Shopify's own answer
 *
 * Purchasability is decided on the client from approval + mapping + Shopify,
 * so supplier approval is never conflated with stock status.
 */

import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { fetchEditionVariantData } from "../../shared/specialEditions.ts";

const safePage = (promise) =>
  promise.then((res) => (Array.isArray(res) ? res : res?.items || [])).catch(() => []);

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const [editions, campaigns] = await Promise.all([
      safePage(
        base44.entities.SpecialEdition.filter(
          { status: { $in: ["active", "coming_soon"] } },
          { sort: "display_order", limit: 100 },
        ),
      ),
      safePage(base44.entities.EditionCampaign.filter({ archived: false }, { sort: "display_order", limit: 50 })),
    ]);

    const variantIds = [];
    for (const edition of editions) {
      for (const option of edition.options || []) {
        if (option?.shopify_variant_id) variantIds.push(option.shopify_variant_id);
      }
    }

    const shopify = await fetchEditionVariantData(variantIds);

    const editionsOut = editions.map((edition) => ({
      ...edition,
      options: (edition.options || []).map((option) => {
        if (!option?.shopify_variant_id) return { ...option, shopify: null };
        if (!shopify.ok) return { ...option, shopify: { error: true } };
        const found = shopify.data[option.shopify_variant_id];
        return { ...option, shopify: found || { unavailable: true } };
      }),
    }));

    return Response.json({
      editions: editionsOut,
      campaigns,
      shopifyError: shopify.ok ? null : shopify.error,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}