import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SHOPIFY_BASE = 'https://torchrepublic.com';

// Fetches products from a Shopify collection handle directly (no DB needed)
Deno.serve(async (req) => {
  try {
    createClientFromRequest(req); // validate request context

    const body = await req.json().catch(() => ({}));
    const handle = body.handle;

    if (!handle) {
      return Response.json({ error: 'handle is required' }, { status: 400 });
    }

    const url = `${SHOPIFY_BASE}/collections/${handle}/products.json?limit=250`;
    const res = await fetch(url);

    if (!res.ok) {
      return Response.json({ products: [], error: `Shopify returned ${res.status} for "${handle}"` });
    }

    const data = await res.json();
    const products = (data.products || []).map(p => ({
      title: p.title,
      handle: p.handle,
      price: parseFloat(p.variants?.[0]?.price || 0),
      compare_at_price: p.variants?.[0]?.compare_at_price ? parseFloat(p.variants[0].compare_at_price) : null,
      image_url: p.images?.[0]?.src || null,
      image_url_2: p.images?.[1]?.src || null,
      available: p.variants?.some(v => v.available) ?? true,
      product_type: p.product_type,
      tags: p.tags || [],
    }));

    return Response.json({ products, count: products.length, handle });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});