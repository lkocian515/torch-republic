const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

// Core 12 products we need to verify
const CORE_PRODUCT_HANDLES = [
  // Mushroom Coffee (6)
  'glowmind-clarity-blend',
  'mooncap-restore',
  'dreamcap-blend',
  'suncap-rise',
  'the-oracle-blend',
  'mystic-bloom-blend',
  // Classic Coffee (3)
  'torchbearer',
  'ember-rise',
  'midnight-watch',
  // Matcha (3)
  'the-monk-matcha-blend',
  'the-ascendant-matcha-blend',
  'the-alchemist-matcha-blend',
];

Deno.serve(async (_req) => {
  try {
    // Fetch all products from Shopify Admin API
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
    const transformed = products.map(p => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      status: p.status, // active, archived, draft
      vendor: p.vendor,
      productType: p.product_type,
      tags: p.tags,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
      variants: p.variants.map(v => ({
        id: v.id,
        title: v.title,
        price: parseFloat(v.price),
        compareAtPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
        sku: v.sku,
        available: v.inventory_management !== null,
      })),
      images: p.images.map(img => img.src),
    }));

    // Categorize
    const activeProducts = transformed.filter(p => p.status === 'active');
    const archivedProducts = transformed.filter(p => p.status === 'archived');
    const draftProducts = transformed.filter(p => p.status === 'draft');

    // Find core products
    const coreProducts = transformed.filter(p => 
      CORE_PRODUCT_HANDLES.includes(p.handle)
    );

    // Find legacy patriotic products (based on handles)
    const legacyProducts = transformed.filter(p => 
      p.handle.includes('liberty') ||
      p.handle.includes('commander') ||
      p.handle.includes('founder') ||
      p.handle.includes('washington') ||
      p.handle.includes('patriotic') ||
      p.handle.includes('freedom') ||
      p.handle.includes('republic')
    );

    // Check for duplicates (same title, different handles)
    const titleMap = new Map();
    const duplicates = [];
    transformed.forEach(p => {
      const normalizedTitle = p.title.toLowerCase().trim();
      if (titleMap.has(normalizedTitle)) {
        duplicates.push({
          title: p.title,
          handles: [titleMap.get(normalizedTitle), p.handle],
        });
      } else {
        titleMap.set(normalizedTitle, p.handle);
      }
    });

    // Verify core product variant IDs
    const coreVariantIds = coreProducts.flatMap(p => 
      p.variants.map(v => ({
        productHandle: p.handle,
        productTitle: p.title,
        variantId: v.id.toString(),
        price: v.price,
        available: v.available,
      }))
    );

    return Response.json({
      summary: {
        totalProducts: transformed.length,
        activeProducts: activeProducts.length,
        archivedProducts: archivedProducts.length,
        draftProducts: draftProducts.length,
        coreProductsFound: coreProducts.length,
        coreProductsMissing: CORE_PRODUCT_HANDLES.length - coreProducts.length,
        legacyProducts: legacyProducts.length,
        duplicateTitles: duplicates.length,
      },
      coreProductsStatus: coreProducts.map(p => ({
        handle: p.handle,
        title: p.title,
        status: p.status,
        variantCount: p.variants.length,
        primaryVariantId: p.variants[0]?.id?.toString() || null,
        price: p.variants[0]?.price || null,
        inStock: p.variants[0]?.available || false,
      })),
      missingCoreProducts: CORE_PRODUCT_HANDLES.filter(
        handle => !coreProducts.find(p => p.handle === handle)
      ),
      legacyProducts: legacyProducts.map(p => ({
        handle: p.handle,
        title: p.title,
        status: p.status,
        recommendation: 'archive',
      })),
      duplicates: duplicates,
      allCoreVariantIds: coreVariantIds,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});