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
    const productsByHandle = {};
    const productsByTitle = {};

    // Index products for lookup
    allProducts.forEach(p => {
      if (p.shopify_handle) productsByHandle[p.shopify_handle] = p;
      productsByTitle[p.title.toLowerCase()] = p;
    });

    // Track results
    const matched = [];
    const notFound = [];
    let updated = 0;

    // Check each top design
    Object.entries(TOP_DESIGNS).forEach(([category, titles]) => {
      titles.forEach(topDesignTitle => {
        const generatedHandle = generateHandle(topDesignTitle);
        let foundProduct = null;

        // Try exact handle match
        if (productsByHandle[generatedHandle]) {
          foundProduct = productsByHandle[generatedHandle];
        } else {
          // Try case-insensitive title match
          const lowerTitle = topDesignTitle.toLowerCase();
          for (const [productTitle, product] of Object.entries(productsByTitle)) {
            if (productTitle.includes(lowerTitle) || lowerTitle.includes(productTitle)) {
              foundProduct = product;
              break;
            }
          }
        }

        if (foundProduct) {
          console.log(`[cleanupAndCategorizeTopDesigns] MATCHED: ${topDesignTitle}`);
          matched.push(topDesignTitle);
        } else {
          console.log(`[cleanupAndCategorizeTopDesigns] NOT FOUND: ${topDesignTitle}`);
          notFound.push(topDesignTitle);
        }
      });
    });

    // Update matched products
    for (const product of allProducts) {
      const matchingCategory = findMatchingCategory(product.shopify_handle, product.title);
      if (matchingCategory) {
        await base44.entities.Product.update(product.id, {
          is_top_design: true,
          category: matchingCategory
        });
        updated++;
      } else {
        // Delete products not in top design list
        await base44.entities.Product.delete(product.id);
      }
    }

    return Response.json({
      success: true,
      message: `Matching complete: ${matched.length} found, ${notFound.length} not found`,
      matched_count: matched.length,
      not_found_count: notFound.length,
      updated_count: updated,
      matched_products: matched,
      not_found_products: notFound
    });
  } catch (error) {
    console.error('[cleanupAndCategorizeTopDesigns] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});