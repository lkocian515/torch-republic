// v2
const SHOPIFY_DOMAIN = 'libertees-for-all.myshopify.com';
const API_VERSION = '2023-10';
const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  const token = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
  console.log('Token prefix:', token ? token.substring(0, 8) + '...' : 'MISSING', 'Length:', token?.length);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const text = await res.text();
  console.log('Shopify response status:', res.status);
  console.log('Shopify raw response:', text.substring(0, 500));
  const json = JSON.parse(text);
  if (json.errors) {
    console.error('Shopify errors:', JSON.stringify(json.errors));
    throw new Error(json.errors[0]?.message || JSON.stringify(json.errors));
  }
  return json.data;
}

const GET_VARIANTS = `
  query getProductVariants($handle: String!) {
    product(handle: $handle) {
      id
      title
      variants(first: 50) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            availableForSale
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

const CREATE_CART = `
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { totalAmount { amount currencyCode } }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title handle featuredImage { url } }
                  selectedOptions { name value }
                }
              }
              cost { totalAmount { amount currencyCode } }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

const ADD_TO_CART = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { totalAmount { amount currencyCode } }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title handle featuredImage { url } }
                  selectedOptions { name value }
                }
              }
              cost { totalAmount { amount currencyCode } }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

const GET_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost { totalAmount { amount currencyCode } }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                product { title handle featuredImage { url } }
                selectedOptions { name value }
              }
            }
            cost { totalAmount { amount currencyCode } }
          }
        }
      }
    }
  }
`;

const REMOVE_FROM_CART = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { totalAmount { amount currencyCode } }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title handle featuredImage { url } }
                  selectedOptions { name value }
                }
              }
              cost { totalAmount { amount currencyCode } }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

const UPDATE_CART = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost { totalAmount { amount currencyCode } }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title handle featuredImage { url } }
                  selectedOptions { name value }
                }
              }
              cost { totalAmount { amount currencyCode } }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

function formatCart(cart) {
  if (!cart) return null;
  try {
    let checkoutUrl = cart.checkoutUrl || '';
    // Replace all domain variations
    if (checkoutUrl) {
      checkoutUrl = checkoutUrl.replace('https://www.torchrepublic.com', 'https://libertees-for-all.myshopify.com');
      checkoutUrl = checkoutUrl.replace('https://torchrepublic.com', 'https://libertees-for-all.myshopify.com');
      checkoutUrl = checkoutUrl.replace('https://www.libertees-for-all.com', 'https://libertees-for-all.myshopify.com');
      checkoutUrl = checkoutUrl.replace('https://libertees-for-all.com', 'https://libertees-for-all.myshopify.com');
      
      // Final safeguard: if still wrong domain, force rebuild
      if (!checkoutUrl.includes('libertees-for-all.myshopify.com') && checkoutUrl.includes('/cart')) {
        const cartPath = checkoutUrl.substring(checkoutUrl.indexOf('/cart'));
        checkoutUrl = 'https://libertees-for-all.myshopify.com' + cartPath;
      }
    }
    return { ...cart, checkoutUrl };
  } catch (e) {
    console.error('formatCart error:', e.message, 'Cart:', JSON.stringify(cart).substring(0, 300));
    throw e;
  }
}

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { action } = body;
    console.log('Action:', action, 'Body keys:', Object.keys(body));

    if (action === 'ping') {
      const token = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
      return Response.json({ token_length: token?.length, token_prefix: token?.substring(0, 8) });
    }

    if (action === 'getVariants') {
      const data = await shopifyFetch(GET_VARIANTS, { handle: body.handle });
      const product = data?.product;
      console.log('GET_VARIANTS handle:', body.handle);
      console.log('Product data:', JSON.stringify(product).substring(0, 200));
      if (!product) {
        console.error('No product found for handle:', body.handle);
        return Response.json({ variants: [], error: `No product found for handle: ${body.handle}` });
      }
      const variants = product.variants.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        price: parseFloat(node.price.amount),
        compareAtPrice: node.compareAtPrice ? parseFloat(node.compareAtPrice.amount) : null,
        availableForSale: node.availableForSale,
        selectedOptions: node.selectedOptions,
      }));
      return Response.json({ variants });
    }

    if (action === 'createCart') {
      const data = await shopifyFetch(CREATE_CART, {
        lines: body.variantId ? [{ merchandiseId: body.variantId, quantity: body.quantity || 1 }] : [],
      });
      console.log('cartCreate response:', JSON.stringify(data.cartCreate).substring(0, 200));
      const cart = data.cartCreate?.cart;
      const formatted = formatCart(cart);
      console.log('Formatted cart:', JSON.stringify(formatted).substring(0, 200));
      return Response.json({ cart: formatted });
    }

    if (action === 'addToCart') {
      const data = await shopifyFetch(ADD_TO_CART, {
        cartId: body.cartId,
        lines: [{ merchandiseId: body.variantId, quantity: body.quantity || 1 }],
      });
      const cart = data.cartLinesAdd.cart;
      return Response.json({ cart: formatCart(cart) });
    }

    if (action === 'getCart') {
      const data = await shopifyFetch(GET_CART, { cartId: body.cartId });
      return Response.json({ cart: formatCart(data.cart) });
    }

    if (action === 'removeFromCart') {
      const data = await shopifyFetch(REMOVE_FROM_CART, {
        cartId: body.cartId,
        lineIds: [body.lineId],
      });
      const cart = data.cartLinesRemove.cart;
      return Response.json({ cart: formatCart(cart) });
    }

    if (action === 'updateCart') {
      const data = await shopifyFetch(UPDATE_CART, {
        cartId: body.cartId,
        lines: [{ id: body.lineId, quantity: body.quantity }],
      });
      const cart = data.cartLinesUpdate.cart;
      return Response.json({ cart: formatCart(cart) });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});