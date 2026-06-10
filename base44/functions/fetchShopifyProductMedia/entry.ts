const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torchrepublic.com';

Deno.serve(async (req) => {
  try {
    // Query all products with FULL media data from Storefront API
    const query = `query {
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
            images(first: 20) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                  }
                  availableForSale
                  image {
                    url
                    altText
                  }
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
            description
            image {
              url
              altText
            }
            productsCount
          }
        }
      }
    }`;

    const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-10/graphql`, {
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
    
    // Transform products into a simpler format
    const products = data.data?.products?.edges?.map(edge => {
      const node = edge.node;
      const variants = node.variants?.edges?.map(v => v.node) || [];
      const images = node.images?.edges?.map(img => ({
        url: img.node.url,
        alt: img.node.altText,
        width: img.node.width,
        height: img.node.height,
      })) || [];
      
      return {
        id: node.id,
        handle: node.handle,
        title: node.title,
        productType: node.productType,
        description: node.description,
        status: node.status,
        featuredImage: {
          url: node.featuredImage?.url,
          alt: node.featuredImage?.altText,
        },
        images: images,
        variants: variants,
        price: variants[0]?.price?.amount ? parseFloat(variants[0].price.amount) : null,
        compareAtPrice: variants[0]?.compareAtPrice?.amount ? parseFloat(variants[0].compareAtPrice.amount) : null,
        availableForSale: variants[0]?.availableForSale !== undefined ? variants[0].availableForSale : true,
      };
    }) || [];
    
    const collections = data.data?.collections?.edges?.map(edge => ({
      id: edge.node.id,
      handle: edge.node.handle,
      title: edge.node.title,
      description: edge.node.description,
      image: {
        url: edge.node.image?.url,
        alt: edge.node.image?.altText,
      },
      productsCount: edge.node.productsCount,
    })) || [];

    return Response.json({
      products,
      collections,
      timestamp: new Date().toISOString(),
      count: products.length,
    });
  } catch (error) {
    console.error('❌ fetchShopifyProductMedia error:', error);
    return Response.json({
      error: error.message,
      products: [],
      collections: [],
    }, { status: 500 });
  }
});