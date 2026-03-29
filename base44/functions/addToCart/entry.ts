Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { variantId, quantity } = body;

    if (!variantId || !quantity) {
      return Response.json({ error: 'Missing variantId or quantity' }, { status: 400 });
    }

    const res = await fetch('https://www.torchrepublic.com/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity }),
    });

    if (!res.ok) {
      return Response.json({ error: `Shopify error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});