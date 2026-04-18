import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.com';

const HANDLES = [
  'abigail-adams-blend',
  'harriet-tubman-blend',
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const queries = HANDLES.map(handle => `
      ${handle.replace(/-/g, '_')}: product(handle: "${handle}") {
        title
        handle
        description
        images(first: 3) { edges { node { url } } }
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
    `).join('\n');

    const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: `{ ${queries} }` }),
    });

    const data = await res.json();
    const products = Object.values(data?.data || {}).filter(Boolean);

    return Response.json({ products, raw: data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});