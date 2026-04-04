import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SHOPIFY_STOREFRONT_API = 'https://torch-republic.myshopify.com/api/2024-01/graphql.json';
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');

async function fetchAllShopifyProducts() {
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

    const products = data.data.products.edges.map(edge => {
      const node = edge.node;
      return {
        id: node.id,
        shopify_handle: node.handle,
        title: node.title,
        description: node.description,
        price: parseFloat(node.priceRange.minVariantPrice.amount),
        image_url: node.images.edges[0]?.node.url || null,
        image_url_2: node.images.edges[1]?.node.url || null,
      };
    });

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

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[getFirstTopDesigns] Fetching all products from Shopify...');
    const products = await fetchAllShopifyProducts();
    const totalCount = products.length;

    console.log(`[getFirstTopDesigns] Total products fetched: ${totalCount}`);

    if (totalCount === 0) {
      console.error('[getFirstTopDesigns] ERROR: No products found in Shopify');
      return Response.json({
        success: false,
        error: 'No products found in Shopify store',
        total_count: 0,
        products: []
      }, { status: 400 });
    }

    return Response.json({
      success: true,
      total_count: totalCount,
      products: products
    });
  } catch (error) {
    console.error('[getFirstTopDesigns] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});