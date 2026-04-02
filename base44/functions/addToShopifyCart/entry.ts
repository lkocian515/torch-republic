Deno.serve(async (req) => {
  try {
    const { variantId, quantity, cartId } = await req.json();

    if (!variantId || !quantity) {
      return Response.json({ error: 'Missing variantId or quantity' }, { status: 400 });
    }

    const token = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
    if (!token) {
      return Response.json({ error: 'Storefront token not configured' }, { status: 500 });
    }

    // If no cartId, create a new cart
    let cart = null;
    if (!cartId) {
      const createRes = await fetch('https://torchrepublic.com/api/2024-01/graphql.json', {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation { cartCreate(input: { lines: { merchandiseId: "gid://shopify/ProductVariant/${variantId}", quantity: ${quantity} } }) { cart { id checkoutUrl } } }`,
        }),
      });
      const data = await createRes.json();
      cart = data.data?.cartCreate?.cart;
    } else {
      // Add to existing cart
      const addRes = await fetch('https://torchrepublic.com/api/2024-01/graphql.json', {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation { cartLinesAdd(cartId: "${cartId}", lines: { merchandiseId: "gid://shopify/ProductVariant/${variantId}", quantity: ${quantity} }) { cart { id checkoutUrl } } }`,
        }),
      });
      const data = await addRes.json();
      cart = data.data?.cartLinesAdd?.cart;
    }

    if (!cart) {
      return Response.json({ error: 'Failed to add to cart' }, { status: 500 });
    }

    return Response.json({ success: true, cart });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});