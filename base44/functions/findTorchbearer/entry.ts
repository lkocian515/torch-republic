import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
  const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

  const query = `
    {
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
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(`https://${SHOP_DOMAIN}/api/2023-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  const products = data?.data?.products?.edges?.map(e => ({
    title: e.node.title,
    handle: e.node.handle,
    id: e.node.id,
    variants: e.node.variants.edges.map(v => ({
      id: v.node.id,
      numericId: v.node.id.replace('gid://shopify/ProductVariant/', ''),
      title: v.node.title,
      sku: v.node.sku,
      availableForSale: v.node.availableForSale,
    }))
  }));

  return Response.json({ count: products?.length, products });
});