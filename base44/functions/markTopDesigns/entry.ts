import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const TOP_DESIGN_TITLES = [
  "We the People US Flag American Pride Constitution Patriotic T-Shirt",
  "We The People Skull Raglan Shirt",
  "Car Magnet — \"250 Years of Freedom Since 1776\" Patriotic American Flag Design",
  "Salute to America 250th Anniversary T-Shirt — Patriotic Fourth of July Tee",
  "Live Free Stay Ready Garden Flag — Patriotic Coiled Snake Outdoor Banner",
  "America Land of the Free Tee — Patriotic Eagle T-Shirt for Women",
  "Veteran Eagle Emblem T-Shirt — \"I Have Earned It\" Military Tribute Tee",
  "Veteran Garden Flag - \"I Have Earned It\" Military House Banner",
  "Veterans Memorial Car Magnet — \"We Don't Know Them All But We Owe Them All\"",
  "God Bless America Patriotic Flag Tee",
  "God, Family, Country Garden Flag — Patriotic Outdoor House Banner",
  "Car Magnet — \"God Family Country Freedom\" American Flag Patriotic Magnet",
  "Party Like a Patriot Raglan Shirt — Vintage Pop Art Founding Fathers Tee",
  "Party Like It's 1776 Coffee Mug",
  "USA Patriotic Women's V-Neck Tee — Red White Blue Stars & Ribbon",
  "Usa Shirt Women Patriotic American Flag Distressed T-Shirt",
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const allProducts = await base44.entities.Product.list('', 500);
    let updated = 0;

    for (const product of allProducts) {
      const isTopDesign = TOP_DESIGN_TITLES.includes(product.title);
      
      if (product.is_top_design !== isTopDesign) {
        await base44.entities.Product.update(product.id, { is_top_design: isTopDesign });
        if (isTopDesign) updated++;
      }
    }

    return Response.json({ 
      success: true, 
      message: `Marked ${updated} products as top designs`,
      total_products: allProducts.length 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});