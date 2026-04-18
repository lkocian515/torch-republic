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
        collections(first: 50) {
          edges {
            node { title handle id }
          }
        }
      }`
    }),
  });
  const data = await res.json();
  const collections = data?.data?.collections?.edges?.map(e => e.node) || [];
  return Response.json({ total: collections.length, collections });
});