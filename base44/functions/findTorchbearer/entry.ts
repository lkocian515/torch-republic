Deno.serve(async (req) => {
  const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
  const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

  const query = `{
    products(first: 250) {
      edges {
        node {
          id
          title
          handle
          variants(first: 5) {
            edges {
              node {
                id
                title
                sku
                price { amount }
                availableForSale
              }
            }
          }
        }
      }
    }
  }`;

  const res = await fetch(`https://${SHOP_DOMAIN}/api/2023-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  const products = data?.data?.products?.edges?.map(e => e.node) || [];

  // Find torchbearer
  const torchbearer = products.filter(p =>
    p.title?.toLowerCase().includes('torchbearer') ||
    p.variants?.edges?.some(v => v.node.sku === 'COF-GND-54G-INT-TUB')
  ).map(p => ({
    title: p.title,
    handle: p.handle,
    variants: p.variants.edges.map(v => ({
      numericId: v.node.id.replace('gid://shopify/ProductVariant/', ''),
      title: v.node.title,
      sku: v.node.sku,
      price: v.node.price?.amount,
      availableForSale: v.node.availableForSale,
    }))
  }));

  return Response.json({ totalProducts: products.length, torchbearer });
});