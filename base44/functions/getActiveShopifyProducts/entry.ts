const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (_req) => {
  try {
    // Fetch only ACTIVE products
    const res = await fetch(
      `https://${SHOP_DOMAIN}/admin/api/2024-10/products.json?limit=50&status=active`,
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Shopify API returned ${res.status}`);
    }

    const data = await res.json();
    const products = data.products || [];

    const activeProducts = products.map(p => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      status: p.status,
      vendor: p.vendor,
      productType: p.product_type,
      tags: p.tags,
      variants: p.variants.map(v => ({
        id: v.id.toString(),
        title: v.title,
        price: parseFloat(v.price),
        compareAtPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
        sku: v.sku,
        available: v.inventory_management !== null,
      })),
      images: p.images.map(img => ({ src: img.src, alt: img.alt })),
    }));

    return Response.json({
      activeCount: activeProducts.length,
      products: activeProducts,
      handles: activeProducts.map(p => p.handle),
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});