Deno.serve(async (req) => {
  try {
    const { variantId, quantity, cartId } = await req.json();

    console.log('[addToShopifyCart] Request:', { variantId, quantity, cartId });

    // Validate inputs
    if (!variantId) {
      console.error('[addToShopifyCart] Missing variantId');
      return Response.json({ error: 'Product variant not found. Please refresh and try again.' }, { status: 400 });
    }
    if (!quantity || quantity < 1) {
      console.error('[addToShopifyCart] Invalid quantity:', quantity);
      return Response.json({ error: 'Invalid quantity. Must be at least 1.' }, { status: 400 });
    }

    const token = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
    if (!token) {
      console.error('[addToShopifyCart] Storefront token not configured');
      return Response.json({ error: 'Storefront connection not configured.' }, { status: 500 });
    }

    const merchandiseId = `gid://shopify/ProductVariant/${variantId}`;
    console.log('[addToShopifyCart] Using merchandiseId:', merchandiseId);

    // Create or add to cart
    let response;
    if (!cartId) {
      // Create new cart
      const mutation = `
        mutation CreateCart($input: CartInput!) {
          cartCreate(input: $input) {
            cart { id checkoutUrl lines(first: 10) { edges { node { id merchandise { ... on ProductVariant { id sku } } } } } }
            userErrors { field message }
          }
        }
      `;
      response = await fetch('https://torchrepublic.com/api/2024-01/graphql.json', {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            input: {
              lines: [{ merchandiseId, quantity }],
            },
          },
        }),
      });
    } else {
      // Add to existing cart
      const mutation = `
        mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { id checkoutUrl }
            userErrors { field message }
          }
        }
      `;
      response = await fetch('https://torchrepublic.com/api/2024-01/graphql.json', {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            cartId,
            lines: [{ merchandiseId, quantity }],
          },
        }),
      });
    }

    const data = await response.json();
    console.log('[addToShopifyCart] API response:', JSON.stringify(data));

    // Check for user errors
    const operation = cartId ? data.data?.cartLinesAdd : data.data?.cartCreate;
    if (operation?.userErrors?.length > 0) {
      const errorMsg = operation.userErrors.map(e => e.message).join(', ');
      console.error('[addToShopifyCart] User errors:', errorMsg);
      return Response.json({ error: `Cart error: ${errorMsg}` }, { status: 400 });
    }

    const cart = cartId ? operation?.cart : operation?.cart;
    if (!cart) {
      console.error('[addToShopifyCart] No cart returned from API');
      return Response.json({ error: 'Failed to create or update cart.' }, { status: 500 });
    }

    console.log('[addToShopifyCart] Success:', { cartId: cart.id });
    return Response.json({ success: true, cart });
  } catch (error) {
    console.error('[addToShopifyCart] Exception:', error.message, error.stack);
    return Response.json({ error: `Server error: ${error.message}` }, { status: 500 });
  }
});