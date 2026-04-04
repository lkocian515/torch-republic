import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const handle = body.handle || 'faith-fish-earrings';

    const url = `https://torchrepublic.com/products/${handle}.json`;
    console.log('Fetching from:', url);

    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      redirect: 'follow'
    });

    console.log('Response status:', res.status);
    console.log('Final URL:', res.url);
    const text = await res.text();
    console.log('Response body (first 300):', text.substring(0, 300));

    return Response.json({ status: res.status, url: res.url, body_preview: text.substring(0, 300) });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});