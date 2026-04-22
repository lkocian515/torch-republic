const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (req) => {
  const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `{
        products(first: 250) {
          edges {
            node { title handle productType }
          }
        }
      }`
    }),
  });
  const data = await res.json();
  const all = data?.data?.products?.edges?.map(e => e.node) || [];
  // Filter anything that might be coffee
  const coffee = all.filter(p => 
    p.title.toLowerCase().includes('blend') ||
    p.title.toLowerCase().includes('coffee') ||
    p.title.toLowerCase().includes('roast') ||
    p.title.toLowerCase().includes('washington') ||
    p.title.toLowerCase().includes('jefferson') ||
    p.title.toLowerCase().includes('franklin') ||
    p.title.toLowerCase().includes('adams') ||
    p.title.toLowerCase().includes('lincoln') ||
    p.title.toLowerCase().includes('roosevelt') ||
    p.handle.toLowerCase().includes('blend') ||
    p.handle.toLowerCase().includes('coffee') ||
    p.productType.toLowerCase().includes('coffee')
  );
  return Response.json({ total: all.length, coffeeCount: coffee.length, coffee, allHandles: all.map(p => p.handle) });
});