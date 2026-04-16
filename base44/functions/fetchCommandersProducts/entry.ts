const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.com';

Deno.serve(async (req) => {
  const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `{
        collection(handle: "commanders-series-1") {
          title
          handle
          products(first: 20) {
            edges {
              node {
                title
                handle
                productType
                description
                images(first: 2) { edges { node { url } } }
                variants(first: 1) {
                  edges {
                    node {
                      price { amount }
                      compareAtPrice { amount }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      }`
    }),
  });
  const data = await res.json();
  return Response.json(data);
});