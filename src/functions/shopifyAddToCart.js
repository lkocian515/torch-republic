Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { variantId, quantity } = body;

    console.log('[shopifyAddToCart] variantId:', variantId, 'quantity:', quantity);

    if (!variantId || !quantity) {
      return Response.json({ error: 'Missing variantId or quantity' }, { status: 400 });
    }

    // Add to cart via Shopify AJAX endpoint
    const addRes = await fetch('https://www.torchrepublic.com/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity }),
    });

    console.log('[shopifyAddToCart] Add response status:', addRes.status);

    if (!addRes.ok) {
      const errText = await addRes.text();
      console.log('[shopifyAddToCart] Error response:', errText);
      return Response.json({ error: `Failed to add item: ${addRes.status}` }, { status: addRes.status });
    }

    // Get cart to retrieve checkout URL
    const cartRes = await fetch('https://www.torchrepublic.com/cart.js');
    if (!cartRes.ok) {
      return Response.json({ error: 'Failed to retrieve cart' }, { status: 500 });
    }

    const cart = await cartRes.json();
    console.log('[shopifyAddToCart] Cart:', cart);

    // Return the checkout URL
    return Response.json({ 
      success: true,
      checkoutUrl: cart.checkout_url ? `https://www.torchrepublic.com${cart.checkout_url}` : 'https://www.torchrepublic.com/cart'
    });
  } catch (error) {
    console.log('[shopifyAddToCart] Exception:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});