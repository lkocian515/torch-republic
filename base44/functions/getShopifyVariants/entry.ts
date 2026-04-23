import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SHOP_DOMAIN = 'torch-republic.myshopify.com'; // Storefront API uses this

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const handle = body.handle;
    if (!handle) return Response.json({ error: 'Missing handle' }, { status: 400 });

    const adminToken = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
    const url = `https://${SHOP_DOMAIN}/admin/api/2024-01/products.json?handle=${handle}&fields=id,title,variants`;

    const res = await fetch(url, {
      headers: { 'X-Shopify-Access-Token': adminToken, 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    if (!res.ok) return Response.json({ error: data }, { status: res.status });

    const product = data.products?.[0];
    if (!product) return Response.json({ error: 'Product not found', handle });

    const variants = product.variants.map(v => ({
      id: v.id,
      title: v.title,
      price: v.price,
    }));

    return Response.json({ handle, title: product.title, variants });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});