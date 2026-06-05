/* global Deno */
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (_req) => {
  // Shopify Global IDs for products (base64 encoded)
  const productIds = [
    'gid://shopify/Product/9347154510076',
    'gid://shopify/Product/9347154379004',
    'gid://shopify/Product/9347154247932',
    'gid://shopify/Product/9347154018556',
    'gid://shopify/Product/9347153887484',
    'gid://shopify/Product/9347153428732',
  ];

  const query = `
    query GetProducts($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          id
          title
          handle
          variants(first: 5) {
            edges {
              node {
                id
                title
                sku
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables: { ids: productIds } }),
  });

  const json = await res.json();
  return Response.json(json);
});