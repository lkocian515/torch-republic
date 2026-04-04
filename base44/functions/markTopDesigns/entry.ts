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
  "250th Salute to America Military Car Magnet — Patriotic American Flag Veteran Tribute",
  "God Bless America Patriotic Flag Tee",
  "God, Family, Country Garden Flag — Patriotic Outdoor House Banner",
  "Car Magnet — \"God Family Country Freedom\" American Flag Patriotic Magnet",
  "God Family Country American Flag Car Magnet",
  "One Nation Under God American Flag Car Magnet — Patriotic Christian Vehicle Decal",
  "Party Like a Patriot Matte Poster — Retro Patriotic Wall Art",
  "Party Like a Patriot Raglan Shirt — Vintage Pop Art Founding Fathers Tee",
  "Party Like It's 1776 Coffee Mug",
  "Patriot Crewneck Sweatshirt — \"Party Like a Patriot\" Vintage American Presidents Design",
  "USA Patriotic Women's V-Neck Tee — Red White Blue Stars & Ribbon",
  "USA Patriotic Tee — Red White Blue Graphic Women's T-Shirt (Stars & Ribbon)",
  "Usa Shirt Women Patriotic American Flag Distressed T-Shirt",
  "Stay Strapped or Get Clapped T-Shirt — Revolutionary Founders Gun Humor Tee",
  "Garden Flag — \"Stay Strapped or Get Clapped\" Patriotic Founding Fathers Banner",
  "God Bless America Car Magnet — Patriotic American Flag Vehicle Decal",
  "Come And Take It Car Magnet — Patriotic Texas Cannon Design",
  "Car Magnet - \"This Is My Pride Flag\" Distressed American Flag Patriotic Sticker",
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