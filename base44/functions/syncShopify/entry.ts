import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Maps Shopify collection handle → app collection enum value
const COLLECTION_MAP = {
  'best-sellers': 'best-sellers',
  'on-sale': 'on-sale',
  // Coffee series collections (try these handles; fall back gracefully if they don't exist in Shopify)
  'founders-series': 'founders-series',
  'liberty-icons-coffee': 'liberty-icons',
  'commanders-series': 'commanders-series',
  'women-of-the-republic': 'women-of-the-republic',
  // Legacy apparel collection handles
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

// Keyword-based series detection for coffee products (when no Shopify collection exists)
function detectCoffeeSeries(title) {
  const t = title.toLowerCase();
  if (t.includes('founders series')) return 'founders-series';
  if (t.includes('liberty icons series') || t.includes('liberty icons')) return 'liberty-icons';
  if (t.includes("commander's series") || t.includes('commanders series')) return 'commanders-series';
  if (t.includes('women of the republic')) return 'women-of-the-republic';
  return null;
}

const COFFEE_COLLECTIONS = new Set([
  'founders-series',
  'liberty-icons',
  'commanders-series',
  'women-of-the-republic',
]);

const CATEGORY_MAP = {
  'T-Shirt': 't-shirts',
  'Hoodie': 'hoodies-sweatshirts',
  'Sweatshirt': 'hoodies-sweatshirts',
  'Long-sleeve': 't-shirts',
  'Tank Top': 'tanks',
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
  'Coffee': 'coffee',
  'Candle': 'candles',
  'Sticker': 'stickers',
  'Bobblehead': 'bobbleheads',
};

const SHOPIFY_BASE = 'https://torchrepublic.com';

async function fetchCollectionProducts(handle) {
  const url = `${SHOPIFY_BASE}/collections/${handle}/products.json?limit=250`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`  Collection "${handle}" returned ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data.products || [];
  } catch (e) {
    console.log(`  Error fetching "${handle}": ${e.message}`);
    return [];
  }
}

function mapProduct(product, collectionSlug, isBestSeller, bestSellerRank, isOnSale) {
  const firstImage = product.images?.[0]?.src || product.variants?.[0]?.featured_image?.src || null;
  const secondImage = product.images?.[1]?.src || null;
  const firstVariant = product.variants?.[0];
  const price = firstVariant ? parseFloat(firstVariant.price) : 0;
  const comparePrice = firstVariant?.compare_at_price ? parseFloat(firstVariant.compare_at_price) : null;

  const sizes = [...new Set(
    (product.variants || [])
      .filter(v => v.option1 && ['XS','S','M','L','XL','2XL','3XL','4XL','5XL'].includes(v.option1))
      .map(v => v.option1)
  )];

  const productType = product.product_type || '';
  let category = CATEGORY_MAP[productType] || null;

  // Auto-detect coffee category
  if (!category) {
    const titleLower = product.title.toLowerCase();
    const tags = (product.tags || []).map(t => t.toLowerCase());
    if (COFFEE_COLLECTIONS.has(collectionSlug) || tags.includes('coffee') || tags.includes('founders-series') || tags.includes('liberty-icons') || tags.includes('commanders-series') || tags.includes('women-of-the-republic') || titleLower.includes('blend') || titleLower.includes('brew') || titleLower.includes('grind') || titleLower.includes('roast')) {
      category = 'coffee';
    } else if (tags.includes('hats') || tags.includes('cap')) {
      category = 'hats';
    } else if (tags.includes('jewelry') || tags.includes('earring') || tags.includes('necklace')) {
      category = 'jewelry';
    } else if (tags.includes('magnet') || tags.includes('car magnets')) {
      category = 'magnets';
    } else if (tags.includes('flag')) {
      category = 'flags';
    } else if (tags.includes('mug') || tags.includes('tumbler')) {
      category = 'mugs-tumblers';
    } else if (tags.includes('hoodie') || tags.includes('sweatshirt')) {
      category = 'hoodies-sweatshirts';
    } else if (tags.includes('tees') || tags.includes('t-shirt') || tags.includes('tank')) {
      category = 't-shirts';
    } else if (tags.includes('home') || tags.includes('decor') || tags.includes('candle')) {
      category = 'home-decor';
    } else {
      category = 'accessories';
    }
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
    on_sale: isOnSale || false,
    best_seller_rank: bestSellerRank || null,
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
    const collectionOnly = body.collection || null; // optionally sync just one collection

    console.log('Starting Shopify sync...');

    // Fetch best sellers and on-sale first for ranking/flags
    console.log('Fetching best sellers...');
    const bestSellerProducts = await fetchCollectionProducts('best-sellers');
    const bestSellerRankMap = new Map(bestSellerProducts.map((p, i) => [p.handle, i + 1]));
    const bestSellerHandles = new Set(bestSellerProducts.map(p => p.handle));
    console.log(`Found ${bestSellerProducts.length} best sellers`);

    console.log('Fetching on-sale products...');
    const onSaleProducts = await fetchCollectionProducts('on-sale');
    const onSaleHandles = new Set(onSaleProducts.map(p => p.handle));
    console.log(`Found ${onSaleProducts.length} on-sale products`);

    // Fetch all themed collections
    const collectionsToSync = Object.keys(COLLECTION_MAP).filter(h => h !== 'best-sellers' && h !== 'on-sale');
    const filteredCollections = collectionOnly
      ? collectionsToSync.filter(h => h === collectionOnly || COLLECTION_MAP[h] === collectionOnly)
      : collectionsToSync;

    let allProducts = [];
    const seenHandles = new Set();

    for (const shopifyHandle of filteredCollections) {
      const appSlug = COLLECTION_MAP[shopifyHandle];
      console.log(`Fetching collection: ${shopifyHandle} → ${appSlug}...`);
      const products = await fetchCollectionProducts(shopifyHandle);
      console.log(`  Found ${products.length} products`);

      for (const product of products) {
        if (!seenHandles.has(product.handle)) {
          seenHandles.add(product.handle);
          allProducts.push(mapProduct(
            product,
            appSlug,
            bestSellerHandles.has(product.handle),
            bestSellerRankMap.get(product.handle) || null,
            onSaleHandles.has(product.handle)
          ));
        }
      }
    }

    // Also fetch all Coffee-type products from Admin API to catch any not in a collection
    if (!collectionOnly) {
      console.log('Fetching all Coffee product_type products via Admin API...');
      const adminToken = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
      const shopDomain = 'libertees-for-all.myshopify.com';
      try {
        const coffeeRes = await fetch(`https://${shopDomain}/admin/api/2024-01/products.json?product_type=Coffee&limit=250`, {
          headers: { 'X-Shopify-Access-Token': adminToken, 'Content-Type': 'application/json' }
        });
        if (coffeeRes.ok) {
          const coffeeData = await coffeeRes.json();
          const coffeeProducts = coffeeData.products || [];
          console.log(`Found ${coffeeProducts.length} Coffee-type products via Admin API`);
          for (const product of coffeeProducts) {
            if (!seenHandles.has(product.handle)) {
              seenHandles.add(product.handle);
              const seriesSlug = detectCoffeeSeries(product.title) || 'founders-series';
              const mapped = mapProduct(product, seriesSlug, bestSellerHandles.has(product.handle), bestSellerRankMap.get(product.handle) || null, onSaleHandles.has(product.handle));
              mapped.category = 'coffee'; // enforce coffee category
              allProducts.push(mapped);
              console.log(`  Added coffee product: "${product.title}" → ${seriesSlug}`);
            }
          }
        }
      } catch (e) {
        console.log(`Admin API coffee fetch failed: ${e.message}`);
      }
    }

    // Add best sellers not already seen
    if (!collectionOnly) {
      for (const product of bestSellerProducts) {
        if (!seenHandles.has(product.handle)) {
          seenHandles.add(product.handle);
          allProducts.push(mapProduct(product, 'best-sellers', true, bestSellerRankMap.get(product.handle), onSaleHandles.has(product.handle)));
        }
      }

      // Add on-sale products not already seen
      for (const product of onSaleProducts) {
        if (!seenHandles.has(product.handle)) {
          seenHandles.add(product.handle);
          allProducts.push(mapProduct(product, 'on-sale', false, null, true));
        }
      }
    }

    const collectionCounts = allProducts.reduce((acc, p) => {
      acc[p.collection] = (acc[p.collection] || 0) + 1;
      return acc;
    }, {});

    console.log(`Total unique products to sync: ${allProducts.length}`);
    console.log('Collection counts:', JSON.stringify(collectionCounts));

    if (dryRun) {
      return Response.json({
        dry_run: true,
        total: allProducts.length,
        sample: allProducts.slice(0, 3),
        collection_counts: collectionCounts,
        coffee_products: allProducts.filter(p => p.category === 'coffee').map(p => ({ title: p.title, handle: p.shopify_handle, collection: p.collection, image: p.image_url })),
      });
    }

    // Delete existing and re-insert
    const existing = await base44.asServiceRole.entities.Product.list('', 500);
    console.log(`Deleting ${existing.length} existing products...`);
    for (const p of existing) {
      await base44.asServiceRole.entities.Product.delete(p.id);
      await new Promise(r => setTimeout(r, 100));
    }

    // Bulk create in batches
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
      collection_counts: collectionCounts,
    });

  } catch (error) {
    console.error('Sync error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});