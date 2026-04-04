import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const handle = body.handle || 'faith-fish-earrings';
    const shopDomain = body.shop_domain || 'torch-republic.myshopify.com';

    const adminToken = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
    console.log('Token present:', !!adminToken);
    console.log('Token length:', adminToken?.length);
    console.log('Token starts with:', adminToken?.substring(0, 12));
    console.log('Shop domain:', shopDomain);

    const url = `https://${shopDomain}/admin/api/2024-01/products.json?handle=${handle}&fields=id,title,variants`;
    console.log('Fetching:', url);

    const res = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': adminToken,
        'Content-Type': 'application/json',
      }
    });

    console.log('Status:', res.status);
    const data = await res.json();

    if (!res.ok) {
      return Response.json({ error: data, token_prefix: adminToken?.substring(0, 12), shop: shopDomain });
    }

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