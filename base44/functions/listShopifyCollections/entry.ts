// Lists all collections from Shopify Admin API to find real handles
const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (req) => {
  try {
    // Fetch custom collections
    const customRes = await fetch(`https://${SHOP_DOMAIN}/admin/api/2024-01/custom_collections.json?limit=250`, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        'Content-Type': 'application/json',
      }
    });
    const customData = await customRes.json();
    const custom = (customData.custom_collections || []).map(c => ({
      id: c.id,
      title: c.title,
      handle: c.handle,
      type: 'custom',
    }));

    // Fetch smart collections
    const smartRes = await fetch(`https://${SHOP_DOMAIN}/admin/api/2024-01/smart_collections.json?limit=250`, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        'Content-Type': 'application/json',
      }
    });
    const smartData = await smartRes.json();
    const smart = (smartData.smart_collections || []).map(c => ({
      id: c.id,
      title: c.title,
      handle: c.handle,
      type: 'smart',
    }));

    const all = [...custom, ...smart].sort((a, b) => a.title.localeCompare(b.title));

    return Response.json({
      total: all.length,
      collections: all,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});