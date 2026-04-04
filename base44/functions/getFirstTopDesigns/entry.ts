import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SHOPIFY_STOREFRONT_API = 'https://torch-republic.myshopify.com/api/2024-01/graphql.json';
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const query = `
      query {
        products(first: 12) {
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

    console.log(`[getFirstTopDesigns] Fetched ${products.length} products from Shopify`);

    return Response.json({
      success: true,
      products: products,
      total_count: products.length
    });
  } catch (error) {
    console.error('[getFirstTopDesigns] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});