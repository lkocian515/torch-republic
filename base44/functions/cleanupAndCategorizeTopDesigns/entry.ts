import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

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

// Generate Shopify-style handle from title
function generateHandle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, '') // keep only alphanumeric, spaces, hyphens
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/\-+/g, '-') // collapse multiple hyphens
    .replace(/^\-|\-$/g, ''); // trim hyphens from ends
}

// Build handle and case-insensitive title lookup
const handleMap = {};
const caseLookup = {};
Object.entries(TOP_DESIGNS).forEach(([category, titles]) => {
  titles.forEach(title => {
    const handle = generateHandle(title);
    handleMap[handle] = category;
    caseLookup[title.toLowerCase()] = category;
  });
});

// Match product by handle or fallback to case-insensitive partial match
function findMatchingCategory(productHandle, productTitle) {
  // Try exact handle match first
  if (productHandle && handleMap[productHandle]) {
    return handleMap[productHandle];
  }
  
  // Generate handle from product title and try
  if (productTitle) {
    const generatedHandle = generateHandle(productTitle);
    if (handleMap[generatedHandle]) {
      return handleMap[generatedHandle];
    }
  }
  
  // Fallback: case-insensitive partial match on title
  if (productTitle) {
    const lowerTitle = productTitle.toLowerCase();
    for (const [knownTitle, category] of Object.entries(caseLookup)) {
      if (lowerTitle.includes(knownTitle) || knownTitle.includes(lowerTitle)) {
        return category;
      }
    }
  }
  
  return null;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const allProducts = await base44.entities.Product.list('', 500);
    let updated = 0;
    let deleted = 0;

    for (const product of allProducts) {
      const matchingCategory = findMatchingCategory(product.shopify_handle, product.title);
      
      if (matchingCategory) {
        // Update product with is_top_design=true and matched category
        await base44.entities.Product.update(product.id, {
          is_top_design: true,
          category: matchingCategory
        });
        updated++;
      } else {
        // Delete product not in the list
        await base44.entities.Product.delete(product.id);
        deleted++;
      }
    }

    return Response.json({
      success: true,
      message: `Updated ${updated} top designs. Deleted ${deleted} products.`,
      updated_count: updated,
      deleted_count: deleted,
      keep_count: Object.keys(categoryMap).length
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});