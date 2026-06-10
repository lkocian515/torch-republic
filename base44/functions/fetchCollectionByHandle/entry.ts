import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.com';

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const { handle, fallback_tag } = body;

    if (!handle) {
      return Response.json({ error: 'handle is required' }, { status: 400 });
    }

    // Query collection by handle via Storefront API
    const query = `{
      collection(handle: "${handle}") {
        title
        handle
        products(first: 250) {
          edges {
            node {
              title
              handle
              productType
              description
              images(first: 2) {
                edges { node { url } }
              }
              variants(first: 1) {
                edges {
                  node {
                    price { amount }
                    compareAtPrice { amount }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    }`;

    const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    let edges = data?.data?.collection?.products?.edges || [];
    let source = handle;

    // Fallback: tag search if collection empty
    if (edges.length === 0 && fallback_tag) {
      console.log(`Collection "${handle}" empty, trying tag search for "${fallback_tag}"...`);
      const tagQuery = `{
        products(first: 50, query: "tag:${fallback_tag}") {
          edges {
            node {
              title handle productType description
              images(first: 2) { edges { node { url } } }
              variants(first: 1) {
                edges {
                  node {
                    price { amount }
                    compareAtPrice { amount }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }`;

      const tagRes = await fetch(`https://${SHOP_DOMAIN}/api/2024-04/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: tagQuery }),
      });

      const tagData = await tagRes.json();
      edges = tagData?.data?.products?.edges || [];
      source = `tag:${fallback_tag}`;
    }

    const products = edges.map(e => {
      const node = e.node;
      const imgs = node.images?.edges || [];
      const variant = node.variants?.edges?.[0]?.node;
      return {
        title: node.title,
        handle: node.handle,
        image_url: imgs[0]?.node?.url || null,
        image_url_2: imgs[1]?.node?.url || null,
        price: parseFloat(variant?.price?.amount || '0'),
        compare_at_price: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null,
        in_stock: variant?.availableForSale ?? true,
        description: (node.description || '').slice(0, 300),
      };
    });

    return Response.json({ products, total: products.length, source });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});