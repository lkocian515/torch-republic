const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.com';

Deno.serve(async (req) => {
  try {
    // Query all products with full image data from Storefront API
    const query = `{
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            productType
            description
            status
            featuredImage {
              url
              altText
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
      collections(first: 50) {
        edges {
          node {
            id
            title
            handle
            image {
              url
              altText
            }
          }
        }
      }
    }`;

    const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Shopify API error:', res.status, errorText);
      throw new Error(`Shopify API returned ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log('✅ Shopify API response received');
    
    // Transform products into a simpler format
    const products = data?.data?.products?.edges?.map(e => {
      const node = e.node;
      const images = node.images?.edges?.map(img => img.node.url) || [];
      const variant = node.variants?.edges?.[0]?.node;
      
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        productType: node.productType,
        description: node.description,
        status: node.status,
        featuredImage: node.featuredImage?.url,
        images: images,
        price: parseFloat(variant?.price?.amount || '0'),
        compareAtPrice: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null,
        availableForSale: variant?.availableForSale ?? true,
      };
    }) || [];

    // Transform collections
    const collections = data?.data?.collections?.edges?.map(e => {
      const node = e.node;
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        image: node.image?.url,
      };
    }) || [];

    console.log(`✅ Returning ${products.length} products and ${collections.length} collections`);
    return Response.json({
      products,
      collections,
      totalProducts: products.length,
      totalCollections: collections.length,
    });

  } catch (error) {
    console.error('❌ fetchShopifyProducts error:', error);
    return Response.json({ 
      error: error.message,
      products: [],
      collections: [],
    }, { status: 500 });
  }
});