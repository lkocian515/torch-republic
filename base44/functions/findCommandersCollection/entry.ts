const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.com';

Deno.serve(async (req) => {
  // Query collections via Storefront API
  const collectionsRes = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `{
        collections(first: 50) {
          edges {
            node {
              title
              handle
              productsCount { count }
            }
          }
        }
      }`
    }),
  });
  const collectionsData = await collectionsRes.json();
  const collections = collectionsData?.data?.collections?.edges?.map(e => e.node) || [];

  // Find commanders-related
  const commanders = collections.filter(c =>
    c.handle.toLowerCase().includes('commander') ||
    c.title.toLowerCase().includes('commander')
  );

  return Response.json({ allCollections: collections, commandersMatches: commanders });
});