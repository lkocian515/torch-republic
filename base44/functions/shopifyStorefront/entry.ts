import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SHOPIFY_DOMAIN = 'libertees-for-all.myshopify.com';
const API_VERSION = '2024-01';
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
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

const GET_VARIANTS = `
  query getProductVariants($handle: String!) {
    productByHandle(handle: $handle) {
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
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    total: parseFloat(cart.cost?.totalAmount?.amount || 0),
    lines: cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      variantId: node.merchandise.id,
      variantTitle: node.merchandise.title,
      productTitle: node.merchandise.product.title,
      productHandle: node.merchandise.product.handle,
      imageUrl: node.merchandise.product.featuredImage?.url,
      price: parseFloat(node.merchandise.price.amount),
      lineTotal: parseFloat(node.cost.totalAmount.amount),
      selectedOptions: node.merchandise.selectedOptions,
    })),
  };
}

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'getVariants') {
      const data = await shopifyFetch(GET_VARIANTS, { handle: body.handle });
      const product = data.productByHandle;
      if (!product) return Response.json({ variants: [] });
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
        lines: [{ merchandiseId: body.variantId, quantity: body.quantity || 1 }],
      });
      const cart = data.cartCreate.cart;
      return Response.json({ cart: formatCart(cart) });
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