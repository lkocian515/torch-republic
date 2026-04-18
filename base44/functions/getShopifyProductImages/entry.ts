import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Returns the images array for a Shopify product by handle.
// Uses the Admin API (private app token). Falls back to an empty array.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const { handle } = body;

    if (!handle) {
      return Response.json({ error: 'handle required' }, { status: 400 });
    }

    const adminToken = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
    const shopDomain = 'torch-republic.myshopify.com';

    const res = await fetch(
      `https://${shopDomain}/admin/api/2024-01/products.json?handle=${encodeURIComponent(handle)}&fields=id,title,handle,images,status`,
      { headers: { 'X-Shopify-Access-Token': adminToken } }
    );

    if (!res.ok) {
      console.log(`Admin API returned ${res.status} for handle: ${handle}`);
      return Response.json({ images: [], error: `HTTP ${res.status}` });
    }

    const data = await res.json();
    const product = data.products?.[0];

    if (!product) {
      return Response.json({ images: [], error: 'Product not found' });
    }

    const images = (product.images || [])
      .sort((a, b) => a.position - b.position)
      .map(img => img.src);

    return Response.json({
      handle: product.handle,
      title: product.title,
      images,
    });

  } catch (error) {
    console.error('getShopifyProductImages error:', error);
    return Response.json({ images: [], error: error.message });
  }
});