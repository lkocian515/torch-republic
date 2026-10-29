const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (_req) => {
  try {
    // Simple REST API call to get products count
    const res = await fetch(
      `https://${SHOP_DOMAIN}/admin/api/2024-10/products/count.json`,
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        },
      }
    );

    const status = res.status;
    let data = null;
    
    try {
      const text = await res.text();
      console.log('Response text:', text.substring(0, 500));
      if (text.trim()) {
        data = JSON.parse(text);
      }
    } catch (e) {
      console.error('Failed to parse JSON:', e);
    }

    return Response.json({
      status,
      data,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});