import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { variantId, quantity } = await req.json();

    if (!variantId || !quantity) {
      return Response.json({ error: 'Missing variantId or quantity' }, { status: 400 });
    }

    // Add to cart via Shopify cart/add.js endpoint
    const addRes = await fetch('https://torchrepublic.com/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity }),
    });

    if (!addRes.ok) {
      return Response.json({ error: 'Failed to add to cart' }, { status: 500 });
    }

    // Fetch updated cart
    const cartRes = await fetch('https://torchrepublic.com/cart.js');
    const cart = await cartRes.json();

    return Response.json({ success: true, cart });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});