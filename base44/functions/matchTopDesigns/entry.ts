import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// Normalize string: remove special chars, lowercase
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // remove special chars, quotes, dashes, punctuation
    .replace(/\s+/g, ' ')     // collapse spaces
    .trim();
}

const TOP_DESIGNS = {
  "t-shirts": [
    "We The People US Flag American Pride Constitution Patriotic T-Shirt",
    "Salute to America 250th Anniversary T-Shirt — Patriotic Fourth of July Tee",
    "T-Shirt — \"Live Free Stay Ready\" Gadsden Snake Patriotic Tee",
    "Liberty or Death Tee — Patriotic Eagle Graphic T-Shirt",
    "Veteran Eagle Emblem T-Shirt — \"I Have Earned It\" Military Tribute Tee",
    "All Gave Some, Some Gave All T-Shirt — Patriotic Veterans Tribute Tee",
    "God Bless America Patriotic Flag Tee",
    "God Family Country T-Shirt — Patriotic Christian Flag Tee",
    "God Family Country T-Shirt — Patriotic American Flag Tee",
    "Come and Take It T-Shirt — Patriotic Founding Fathers Graphic Tee",
    "Don't Tread On Me T-Shirt — Gadsden Flag Snake Patriotic Tee"
  ],
  "tanks": [
    "Patriotic Freedom Eagle V-Neck Tee — \"Sorry I Can't Hear You Over The Sound Of My Freedom\"",
    "USA Patriotic Women's V-Neck Tee — Red White Blue Stars & Ribbon"
  ],
  "hoodies": [
    "Patriot Crewneck Sweatshirt — \"Party Like a Patriot\" Vintage American Presidents Design"
  ],
  "mugs-tumblers": [
    "Party Like It's 1776 Coffee Mug",
    "Constitution 'We the People' 20oz Tumbler - Patriotic Stainless Travel Cup"
  ],
  "magnets": [
    "Car Magnet — \"250 Years of Freedom Since 1776\" Patriotic American Flag Design",
    "Veterans Memorial Car Magnet — \"We Don't Know Them All But We Owe Them All\" with American Flag",
    "250th Salute to America Military Car Magnet — Patriotic American Flag Veteran Tribute",
    "Car Magnet — \"God Family Country Freedom\" American Flag Patriotic Magnet",
    "God Bless America Car Magnet — Patriotic American Flag Vehicle Decal",
    "Come And Take It Car Magnet — Patriotic Texas Cannon Design"
  ],
  "flags": [
    "Live Free Stay Ready Garden Flag — Patriotic Coiled Snake Outdoor Banner",
    "Veteran Garden Flag - \"I Have Earned It\" Military House Banner",
    "God, Family, Country Garden Flag — Patriotic Outdoor House Banner"
  ]
};

function matchProduct(product, topDesignTitle) {
  const normalizedProduct = normalize(product.title);
  const normalizedDesign = normalize(topDesignTitle);
  
  // Try exact handle match first
  const designHandle = normalize(topDesignTitle)
    .replace(/\s+/g, '-')
    .replace(/\-+/g, '-')
    .replace(/^\-|\-$/g, '');
  
  if (product.shopify_handle === designHandle) {
    return true;
  }
  
  // Partial title match (case-insensitive, ignoring special chars)
  if (normalizedProduct.includes(normalizedDesign) || normalizedDesign.includes(normalizedProduct)) {
    return true;
  }
  
  return false;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { products } = body;

    if (!products || !Array.isArray(products)) {
      return Response.json({ error: 'Invalid request: products array required' }, { status: 400 });
    }

    console.log(`[matchTopDesigns] Starting match for ${products.length} products`);

    const matched = [];
    const notFound = [];

    // Check each top design
    Object.entries(TOP_DESIGNS).forEach(([category, titles]) => {
      titles.forEach(topDesignTitle => {
        const foundProduct = products.find(p => matchProduct(p, topDesignTitle));
        
        if (foundProduct) {
          console.log(`[matchTopDesigns] MATCHED: ${topDesignTitle}`);
          matched.push({
            title: topDesignTitle,
            category: category,
            product: foundProduct
          });
        } else {
          console.log(`[matchTopDesigns] NOT FOUND: ${topDesignTitle}`);
          notFound.push({
            title: topDesignTitle,
            category: category
          });
        }
      });
    });

    console.log(`[matchTopDesigns] Results: ${matched.length} matched, ${notFound.length} not found`);

    return Response.json({
      success: true,
      matched_count: matched.length,
      not_found_count: notFound.length,
      matched: matched,
      not_found: notFound
    });
  } catch (error) {
    console.error('[matchTopDesigns] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});