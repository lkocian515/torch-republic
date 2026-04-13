/* global Deno */
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.myshopify.com';

Deno.serve(async (_req) => {
  const tokenPreview = STOREFRONT_TOKEN ? `${STOREFRONT_TOKEN.substring(0, 8)}...` : 'NOT SET';
  
  const res = await fetch(`https://${SHOP_DOMAIN}/api/2025-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `{ shop { name } }`
    }),
  });

  const status = res.status;
  const json = await res.json();

  return Response.json({ tokenPreview, status, response: json });
});