Deno.serve(async (req) => {
  const ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
  const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

  console.log('Admin token preview:', ADMIN_TOKEN?.slice(0, 10));

  const res = await fetch(`https://${SHOP_DOMAIN}/admin/api/2023-10/products.json?limit=10&status=any`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
  });

  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Response preview:', text.slice(0, 500));

  let data;
  try { data = JSON.parse(text); } catch(e) { data = { parseError: e.message, raw: text.slice(0, 200) }; }

  return Response.json({ status: res.status, data });
});