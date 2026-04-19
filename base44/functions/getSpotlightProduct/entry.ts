/* global Deno */
// Returns the first image, title, and price for a Shopify product by handle
// Always fetches live from Shopify Storefront API — no caching
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (req) => {
  try {
    const { handle } = await req.json();
    if (!handle) return Response.json({ error: 'Missing handle' }, { status: 400 });

    const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `
          query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
              title
              handle
              availableForSale
              priceRange {
                minVariantPrice { amount currencyCode }
              }
              images(first: 1) {
                edges { node { url altText } }
              }
            }
          }
        `,
        variables: { handle },
      }),
    });

    const json = await res.json();
    const p = json?.data?.productByHandle;

    if (!p) {
      return Response.json({ error: 'Product not found', handle }, { status: 404 });
    }

    return Response.json({
      title: p.title,
      handle: p.handle,
      availableForSale: p.availableForSale,
      price: p.priceRange?.minVariantPrice?.amount,
      firstImage: p.images?.edges?.[0]?.node?.url || null,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});