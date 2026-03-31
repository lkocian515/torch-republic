import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SHOPIFY_DOMAIN = 'libertees-for-all.myshopify.com';
const API_VERSION = '2023-10';
const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  const token = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

// Fetch all products with availability — paginated
const GET_PRODUCTS = `
  query getProducts($cursor: String) {
    products(first: 250, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          handle
          availableForSale
          variants(first: 1) {
            edges { node { availableForSale } }
          }
        }
      }
    }
  }
`;

async function fetchAllShopifyProducts() {
  const products = [];
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await shopifyFetch(GET_PRODUCTS, cursor ? { cursor } : {});
    const page = data.products;
    page.edges.forEach(({ node }) => products.push(node));
    hasNextPage = page.pageInfo.hasNextPage;
    cursor = page.pageInfo.endCursor;
  }

  return products;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Allow both admin-triggered and scheduled (no user) calls
    const user = await base44.auth.me().catch(() => null);
    if (user && user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.log('Fetching Shopify inventory...');
    const shopifyProducts = await fetchAllShopifyProducts();
    console.log(`Fetched ${shopifyProducts.length} products from Shopify`);

    // Build a map of handle -> availableForSale
    const availabilityMap = {};
    shopifyProducts.forEach(p => {
      availabilityMap[p.handle] = p.availableForSale;
    });

    // Fetch all local products
    const localProducts = await base44.asServiceRole.entities.Product.list('', 500);
    console.log(`Found ${localProducts.length} local products`);

    // Update each product's in_stock based on Shopify live data
    let updatedCount = 0;
    const updatePromises = localProducts.map(async (product) => {
      if (!product.shopify_handle) return;
      const liveInStock = availabilityMap[product.shopify_handle];
      if (liveInStock === undefined) return; // not found in Shopify, skip
      if (product.in_stock !== liveInStock) {
        await base44.asServiceRole.entities.Product.update(product.id, { in_stock: liveInStock });
        updatedCount++;
        console.log(`Updated ${product.shopify_handle}: in_stock=${liveInStock}`);
      }
    });
    await Promise.all(updatePromises);

    // Re-fetch updated products to compute collection scores
    const updatedProducts = await base44.asServiceRole.entities.Product.list('', 500);

    // Count in-stock products per collection
    const collectionStockCount = {};
    updatedProducts.forEach(p => {
      if (!p.collection) return;
      if (!collectionStockCount[p.collection]) collectionStockCount[p.collection] = 0;
      if (p.in_stock) collectionStockCount[p.collection]++;
    });

    // Fetch all collections and update sort_order based on in-stock count (descending)
    const collections = await base44.asServiceRole.entities.Collection.list('', 100);
    const sortedSlugs = Object.entries(collectionStockCount)
      .sort((a, b) => b[1] - a[1])
      .map(([slug]) => slug);

    const collectionUpdates = collections.map(async (col) => {
      const rank = sortedSlugs.indexOf(col.slug);
      const newSortOrder = rank === -1 ? 999 : rank + 1;
      if (col.sort_order !== newSortOrder) {
        await base44.asServiceRole.entities.Collection.update(col.id, { sort_order: newSortOrder });
      }
    });
    await Promise.all(collectionUpdates);

    console.log(`Sync complete. Updated ${updatedCount} products. Reordered ${collections.length} collections.`);
    return Response.json({
      success: true,
      products_updated: updatedCount,
      collections_reordered: collections.length,
      stock_counts: collectionStockCount,
    });
  } catch (error) {
    console.error('syncInventory error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});