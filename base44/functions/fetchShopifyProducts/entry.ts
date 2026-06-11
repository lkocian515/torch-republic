const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (_req) => {
  try {
    // Fetch all products using Admin REST API
    const res = await fetch(
      `https://${SHOP_DOMAIN}/admin/api/2024-10/products.json?limit=250`,
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

    // Transform products
    const transformedProducts = products.map(p => ({
      id: p.id.toString(),
      title: p.title,
      handle: p.handle,
      productType: p.product_type,
      description: p.body_html,
      status: p.status,
      featuredImage: p.images?.[0]?.src || null,
      images: p.images?.map(img => img.src) || [],
      price: parseFloat(p.variants?.[0]?.price || '0'),
      compareAtPrice: p.variants?.[0]?.compare_at_price ? parseFloat(p.variants[0].compare_at_price) : null,
      availableForSale: p.variants?.[0]?.available ?? true,
    }));

    // Fetch collections
    const collectionsRes = await fetch(
      `https://${SHOP_DOMAIN}/admin/api/2024-10/collections.json?limit=50`,
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        },
      }
    );

    let collections = [];
    if (collectionsRes.ok) {
      const collectionsData = await collectionsRes.json();
      collections = collectionsData.collections?.map(c => ({
        id: c.id.toString(),
        title: c.title,
        handle: c.handle,
        image: c.image?.src || null,
      })) || [];
    }

    console.log(`✅ Returning ${transformedProducts.length} products and ${collections.length} collections`);
    return Response.json({
      products: transformedProducts,
      collections,
      totalProducts: transformedProducts.length,
      totalCollections: collections.length,
    });

  } catch (error) {
    console.error('❌ fetchShopifyProducts error:', error);
    return Response.json({ 
      error: error.message,
      products: [],
      collections: [],
    }, { status: 500 });
  }
});