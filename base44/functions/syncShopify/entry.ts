import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// Maps Shopify collection handle → app collection enum value
const COLLECTION_MAP = {
  'best-sellers': 'best-sellers',
  'liberty-flame-collection': 'liberty-flame',
  'patriot-pride': 'patriotic-pride',
  'freedom-collection': 'freedom-isnt-free',
  'we-the-people-collection': 'we-the-people',
  'faith-over-fear-collection': 'faith-over-fear',
  'christ-is-king-collection': 'christ-is-king',
  'god-family-country-collection': 'god-family-country',
  'american-heroes-collection': 'american-heroes',
  'founders-collection': 'founders',
};

// Maps Shopify product_type → app category enum
const CATEGORY_MAP = {
  'T-Shirt': 't-shirts',
  'Hoodie': 't-shirts',
  'Long-sleeve': 't-shirts',
  'Tank Top': 't-shirts',
  'Hat': 'hats',
  'Hats': 'hats',
  'Home Decor': 'home-decor',
  'Jewelry': 'jewelry',
  'Earring': 'jewelry',
  'Necklace': 'jewelry',
  'Mug': 'mugs-tumblers',
  'Tumbler': 'mugs-tumblers',
  'Flag': 'flags',
  'Accessories': 'accessories',
  'Magnet': 'magnets',
};

const SHOPIFY_BASE = 'https://libertees-for-all.myshopify.com';
const BEST_SELLERS_HANDLE = 'best-sellers';

async function fetchCollectionProducts(handle) {
  const url = `${SHOPIFY_BASE}/collections/${handle}/products.json?limit=250`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.products || [];
}

function mapProduct(product, collectionSlug, isBestSeller) {
  const firstImage = product.images?.[0]?.src || product.variants?.[0]?.featured_image?.src || null;
  const secondImage = product.images?.[1]?.src || null;
  const firstVariant = product.variants?.[0];
  const price = firstVariant ? parseFloat(firstVariant.price) : 0;
  const comparePrice = firstVariant?.compare_at_price ? parseFloat(firstVariant.compare_at_price) : null;

  // Extract sizes from variants
  const sizes = [...new Set(
    product.variants
      .filter(v => v.option1 && ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'].includes(v.option1))
      .map(v => v.option1)
  )];

  const productType = product.product_type || '';
  let category = CATEGORY_MAP[productType] || 'accessories';

  // Fallback category detection from tags
  if (category === 'accessories') {
    const tags = product.tags || [];
    if (tags.includes('hats') || tags.includes('cap')) category = 'hats';
    else if (tags.includes('jewelry') || tags.includes('earring') || tags.includes('necklace')) category = 'jewelry';
    else if (tags.includes('magnet') || tags.includes('car magnets')) category = 'magnets';
    else if (tags.includes('flag')) category = 'flags';
    else if (tags.includes('mug') || tags.includes('tumbler')) category = 'mugs-tumblers';
    else if (tags.includes('hoodie') || tags.includes('sweatshirt')) category = 't-shirts';
    else if (tags.includes('tees') || tags.includes('t-shirt') || tags.includes('tank')) category = 't-shirts';
    else if (tags.includes('home') || tags.includes('decor') || tags.includes('candle')) category = 'home-decor';
  }

  return {
    title: product.title,
    shopify_handle: product.handle,
    description: product.body_html?.replace(/<[^>]+>/g, '').slice(0, 500) || '',
    price,
    compare_at_price: comparePrice,
    image_url: firstImage,
    image_url_2: secondImage,
    collection: collectionSlug,
    category,
    sizes: sizes.length > 0 ? sizes : [],
    featured: isBestSeller,
    in_stock: product.variants?.some(v => v.available) ?? true,
    rating: 0,
    review_count: 0,
  };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;

    // Fetch best sellers first to mark featured products
    console.log('Fetching best sellers...');
    const bestSellerProducts = await fetchCollectionProducts(BEST_SELLERS_HANDLE);
    const bestSellerHandles = new Set(bestSellerProducts.map(p => p.handle));
    console.log(`Found ${bestSellerProducts.length} best sellers`);

    // Fetch all themed collections
    const collectionsToSync = Object.keys(COLLECTION_MAP).filter(h => h !== 'best-sellers');
    let allProducts = [];
    const seenHandles = new Set();

    for (const shopifyHandle of collectionsToSync) {
      const appSlug = COLLECTION_MAP[shopifyHandle];
      console.log(`Fetching ${shopifyHandle} → ${appSlug}...`);
      const products = await fetchCollectionProducts(shopifyHandle);
      console.log(`  ${products.length} products`);

      for (const product of products) {
        if (!seenHandles.has(product.handle)) {
          seenHandles.add(product.handle);
          allProducts.push(mapProduct(product, appSlug, bestSellerHandles.has(product.handle)));
        }
      }
    }

    // Also add best sellers that aren't in any themed collection
    for (const product of bestSellerProducts) {
      if (!seenHandles.has(product.handle)) {
        seenHandles.add(product.handle);
        allProducts.push(mapProduct(product, 'best-sellers', true));
      }
    }

    console.log(`Total unique products to sync: ${allProducts.length}`);

    if (dryRun) {
      return Response.json({
        dry_run: true,
        total: allProducts.length,
        sample: allProducts.slice(0, 3),
        collection_counts: allProducts.reduce((acc, p) => {
          acc[p.collection] = (acc[p.collection] || 0) + 1;
          return acc;
        }, {}),
      });
    }

    // Clear existing products and bulk insert
    // Delete in parallel batches to avoid rate limits
    const existing = await base44.asServiceRole.entities.Product.list('', 500);
    console.log(`Deleting ${existing.length} existing products...`);
    // Delete sequentially to avoid rate limits
    for (const p of existing) {
      await base44.asServiceRole.entities.Product.delete(p.id);
      await new Promise(r => setTimeout(r, 150));
    }

    // Bulk create in batches of 50
    const batchSize = 50;
    let created = 0;
    for (let i = 0; i < allProducts.length; i += batchSize) {
      const batch = allProducts.slice(i, i + batchSize);
      await base44.asServiceRole.entities.Product.bulkCreate(batch);
      created += batch.length;
      console.log(`Created ${created}/${allProducts.length}`);
    }

    return Response.json({
      success: true,
      synced: allProducts.length,
      collection_counts: allProducts.reduce((acc, p) => {
        acc[p.collection] = (acc[p.collection] || 0) + 1;
        return acc;
      }, {}),
    });

  } catch (error) {
    console.error('Sync error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});