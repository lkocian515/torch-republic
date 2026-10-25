/**
 * Live product availability from the Shopify Storefront API.
 *
 * Uses the shared server-side Storefront client, which authenticates with the
 * private Storefront token (Shopify-Storefront-Private-Token) — the same client
 * the cart and the special-editions catalog use.
 *
 * Previously this function called the Storefront API with the PUBLIC access
 * token header (X-Shopify-Storefront-Access-Token) against API version 2024-01,
 * which is not authorized for product queries: every lookup came back
 * UNAUTHORIZED and was reported as "not found", so any surface that asked this
 * function for stock read the product as unavailable.
 */
import { storefrontQuery } from "../../shared/shopifyStorefront.ts";

const MAX_HANDLES = 20;

export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const requested = Array.isArray(body.handles)
      ? body.handles
      : body.handle
        ? [body.handle]
        : [];
    const handles = requested
      .filter((h) => typeof h === "string" && h.trim())
      .slice(0, MAX_HANDLES);

    if (handles.length === 0) {
      return Response.json({ error: "Missing handle or handles array" }, { status: 400 });
    }

    // One aliased productByHandle per handle, with the handle passed as a
    // variable so nothing is interpolated into the query text.
    const fragment = `
      fragment ProductAvail on Product {
        handle
        availableForSale
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
          }
        }
      }
    `;
    const variables = {};
    const aliases = handles
      .map((handle, i) => {
        variables[`h${i}`] = handle;
        return `p${i}: productByHandle(handle: $h${i}) { ...ProductAvail }`;
      })
      .join("\n");
    const variableDefs = handles.map((_, i) => `$h${i}: String!`).join(", ");
    const query = `query productAvailability(${variableDefs}) { ${aliases} } ${fragment}`;

    const result = await storefrontQuery(query, variables);
    if (!result.ok) {
      return Response.json(
        { error: result.error || "Shopify unavailable", products: {} },
        { status: 502 }
      );
    }

    const products = {};
    handles.forEach((handle, i) => {
      const product = result.json?.data?.[`p${i}`];
      if (!product) {
        products[handle] = { availableForSale: null, error: "not found" };
        return;
      }
      const variants = product.variants?.nodes || [];
      const firstAvailable = variants.find((v) => v.availableForSale);
      products[handle] = {
        availableForSale: product.availableForSale,
        firstAvailableVariantId: firstAvailable?.id || null,
        variants: variants.map((v) => ({
          id: v.id,
          title: v.title,
          availableForSale: v.availableForSale,
          price: v.price?.amount || null,
          currency: v.price?.currencyCode || null,
        })),
      };
    });

    return Response.json({ products });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}