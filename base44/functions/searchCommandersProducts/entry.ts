const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.com';

Deno.serve(async (req) => {
  const searches = [
    "Command Roast",
    "Unconditional Surrender",
    "Old Hickory",
    "Attack Blend",
    "I Shall Return",
    "Bull's Navy",
    "ike",
    "commander"
  ];

  const results = {};

  for (const term of searches) {
    const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `{
          products(first: 5, query: "${term}") {
            edges {
              node {
                title
                handle
                productType
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
        }`
      }),
    });
    const data = await res.json();
    results[term] = data?.data?.products?.edges?.map(e => e.node) || [];
  }

  return Response.json(results);
});