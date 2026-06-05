import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
  const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

  // Search all products for the one with SKU COF-GND-54G-INT-TUB
  const res = await fetch(`https://${SHOP_DOMAIN}/admin/api/2023-10/products.json?limit=250&status=any`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  
  // Find the torchbearer product by SKU or title
  const torchbearer = data.products?.filter(p => 
    p.title?.toLowerCase().includes('torchbearer') ||
    p.variants?.some(v => v.sku === 'COF-GND-54G-INT-TUB')
  );

  return Response.json({ 
    totalProducts: data.products?.length,
    torchbearerMatches: torchbearer?.map(p => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      status: p.status,
      variants: p.variants.map(v => ({
        id: v.id,
        title: v.title,
        sku: v.sku,
        price: v.price,
      }))
    }))
  });
});