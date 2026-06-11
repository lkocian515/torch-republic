const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (_req) => {
  try {
    // The actual handles from the listAllShopifyProducts response
    const actualHandles = [
      'ember-rise-instant-coffee',
      'midnight-watch-instant-coffee',
      'glowmind-clarity-instant-mushroom-coffee',
      'mooncap-restore-instant-mushroom-coffee',
      'dreamcap-instant-mushroom-coffee',
      'mystic-bloom-instant-mushroom-coffee',
    ];

    const results = [];

    for (const handle of actualHandles) {
      try {
        const res = await fetch(
          `https://${SHOP_DOMAIN}/admin/api/2024-10/products/by-handle/${handle}.json`,
          {
            headers: {
              'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          results.push({
            handle,
            found: false,
            error: `API returned ${res.status}`,
          });
          continue;
        }

        const data = await res.json();
        const product = data.product;

        results.push({
          handle: product.handle,
          title: product.title,
          found: true,
          productId: product.id,
          variantId: product.variants[0]?.id?.toString() || null,
          variantTitle: product.variants[0]?.title || null,
          price: product.variants[0]?.price || null,
          compareAtPrice: product.variants[0]?.compare_at_price || null,
          sku: product.variants[0]?.sku || null,
          status: product.status,
        });
      } catch (error) {
        results.push({
          handle,
          found: false,
          error: error.message,
        });
      }
    }

    return Response.json({
      results,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});