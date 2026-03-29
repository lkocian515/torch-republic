Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { variantId, quantity } = body;

    console.log('[addToCart] variantId:', variantId, 'quantity:', quantity);

    if (!variantId || !quantity) {
      return Response.json({ error: 'Missing variantId or quantity' }, { status: 400 });
    }

    // Use form-encoded data for Shopify cart/add.js
    const params = new URLSearchParams();
    params.append('id', variantId);
    params.append('quantity', quantity);

    const res = await fetch('https://www.torchrepublic.com/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    console.log('[addToCart] Response status:', res.status);

    if (!res.ok) {
      const errText = await res.text();
      console.log('[addToCart] Error response:', errText);
      return Response.json({ error: `Shopify error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    console.log('[addToCart] Success:', data);
    return Response.json({ success: true, data });
  } catch (error) {
    console.log('[addToCart] Exception:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});