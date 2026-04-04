import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SHOPIFY_STOREFRONT_API = 'https://torch-republic.myshopify.com/api/2024-01/graphql.json';
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');

async function fetchAllProducts() {
  const allProducts = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const query = `
      query {
        products(first: 250${cursor ? `, after: "${cursor}"` : ''}) {
          edges {
            node {
              id
              handle
              title
              description
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 2) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const response = await fetch(SHOPIFY_STOREFRONT_API, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`Shopify API error: ${JSON.stringify(data.errors)}`);
    }

    const products = data.data.products.edges.map(edge => edge.node);
    allProducts.push(...products);

    hasNextPage = data.data.products.pageInfo.hasNextPage;
    cursor = data.data.products.pageInfo.endCursor;
  }

  return allProducts;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    console.log('[fetchShopifyProducts] Starting fetch from Shopify Storefront API...');
    
    const products = await fetchAllProducts();
    const totalCount = products.length;

    console.log(`[fetchShopifyProducts] Fetched ${totalCount} products from Shopify`);

    if (totalCount === 0) {
      console.error('[fetchShopifyProducts] ERROR: No products found in Shopify store');
      return Response.json({ 
        error: 'No products found in Shopify store. Cannot proceed with cleanup.',
        total_count: 0 
      }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: `Successfully fetched ${totalCount} products from Shopify`,
      total_count: totalCount,
      products: products
    });
  } catch (error) {
    console.error('[fetchShopifyProducts] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});