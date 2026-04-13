/* global Deno */
const ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (_req) => {
  // Test Admin API
  const adminRes = await fetch(`https://${SHOP_DOMAIN}/admin/api/2024-10/shop.json`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  const adminData = await adminRes.json();

  // Test Storefront API
  const sfRes = await fetch(`https://${SHOP_DOMAIN}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: `{ shop { name } }` }),
  });
  const sfData = await sfRes.json();

  return Response.json({
    adminStatus: adminRes.status,
    adminShopName: adminData?.shop?.name,
    storefrontStatus: sfRes.status,
    storefrontData: sfData,
    storefrontTokenPreview: STOREFRONT_TOKEN ? STOREFRONT_TOKEN.substring(0, 10) : 'NOT SET',
  });
});