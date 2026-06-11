const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (req) => {
  try {
    // Fetch ALL products from Admin API
    const res = await fetch(
      `https://${SHOP_DOMAIN}/admin/api/2024-10/products.json?limit=250`,
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Admin API error:', res.status, errorText);
      return Response.json({ 
        error: `Admin API returned ${res.status}`,
        details: errorText,
      }, { status: 500 });
    }

    const data = await res.json();
    const products = data.products || [];

    // Transform to simple format
    const auditResults = products.map(p => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      productType: p.product_type,
      status: p.status,
      variants: p.variants.map(v => ({
        id: v.id,
        title: v.title,
        price: parseFloat(v.price),
        compareAtPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
        sku: v.sku,
        available: v.available,
      })),
      images: p.images.map(img => img.src),
    }));

    // Categorize products
    const beverageProducts = auditResults.filter(p => 
      p.title.toLowerCase().includes('blend') ||
      p.title.toLowerCase().includes('coffee') ||
      p.title.toLowerCase().includes('matcha') ||
      p.title.toLowerCase().includes('roast') ||
      p.handle.toLowerCase().includes('blend') ||
      p.handle.toLowerCase().includes('coffee') ||
      p.handle.toLowerCase().includes('matcha') ||
      p.handle.toLowerCase().includes('rise') ||
      p.handle.toLowerCase().includes('cap') ||
      p.handle.toLowerCase().includes('mind') ||
      p.handle.toLowerCase().includes('monk') ||
      p.handle.toLowerCase().includes('oracle') ||
      p.handle.toLowerCase().includes('bloom')
    );

    const apparelProducts = auditResults.filter(p => 
      p.product_type?.toLowerCase().includes('apparel') ||
      p.product_type?.toLowerCase().includes('shirt') ||
      p.product_type?.toLowerCase().includes('hoodie') ||
      p.title.toLowerCase().includes('shirt') ||
      p.title.toLowerCase().includes('hoodie')
    );

    // Check for the specific variant IDs in shopifyCheckout.js
    const expectedVariantIds = [
      '49171204276476', // torchbearer
      '49171202375932', // ember-rise
      '49148262809852', // midnight-watch
      '49148263465212', // suncap-rise
      '49148263596284', // glowmind-clarity-blend
      '49148263760124', // mooncap-restore
      '49148261597436', // dreamcap-blend
      '49148263170300', // the-oracle-blend
      '49148263006460', // mystic-bloom-blend
      '49170574115068', // the-monk-matcha-blend
      '49170644402428', // the-ascendant-matcha-blend
      '49170572148988', // the-alchemist-matcha-blend
    ];

    const foundVariants = [];
    const missingVariants = [];

    expectedVariantIds.forEach(variantId => {
      const found = auditResults.some(p => 
        p.variants.some(v => v.id.toString() === variantId)
      );
      
      if (found) {
        foundVariants.push(variantId);
      } else {
        missingVariants.push(variantId);
      }
    });

    return Response.json({
      totalProducts: auditResults.length,
      beverageProducts: beverageProducts.length,
      apparelProducts: apparelProducts.length,
      beverageProductHandles: beverageProducts.map(p => p.handle),
      beverageProductTitles: beverageProducts.map(p => p.title),
      foundVariants,
      missingVariants,
      allProducts: auditResults,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Product list error:', error);
    return Response.json({ 
      error: error.message,
    }, { status: 500 });
  }
});