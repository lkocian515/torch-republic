/**
 * SINGLE SOURCE OF TRUTH for all Torch Republic coffee products.
 *
 * Rules:
 * - shopifyHandle MUST match the exact handle on libertees-for-all.myshopify.com
 * - internalRoute is the Base44 page route (used for product cards / navigation)
 * - productsRoute is the /products/ alias (used for direct links / QR codes / SEO)
 * - All buy buttons flow through AddToCartButton → createShopifyCheckout → libertees-for-all.myshopify.com
 * - Do NOT reference torch-republic.myshopify.com anywhere
 *
 * Verified against Shopify Storefront API: 2026-04-23
 */

export const PRODUCT_CATALOG = [
  // ── FOUNDERS SERIES ──────────────────────────────────────────────────────
  {
    code: 'TR-001',
    series: 'Founders Series',
    seriesNum: 'Founders #01',
    rarity: "FOUNDER'S EDITION",
    name: 'Washington Blend',
    title: 'Washington Blend — Founders Series Coffee',
    roast: 'Medium Roast',
    notes: 'Cocoa · Toasted Nut · Full Body',
    price: 20.00,
    accent: '#C8A44D',
    color: '#160D04',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'washington-blend',            // ✅ verified live
    internalRoute: '/WashingtonBlend',
    productsRoute: '/products/washington-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988',
  },
  {
    code: 'TR-002',
    series: 'Founders Series',
    seriesNum: 'Founders #02',
    rarity: "FOUNDER'S EDITION",
    name: 'Jefferson Blend',
    title: 'Jefferson Blend — Founders Series Coffee',
    roast: 'Medium Roast',
    notes: 'Dark Chocolate · Almond · Toffee',
    price: 20.00,
    accent: '#9BB8CC',
    color: '#080F14',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'jefferson-blend',             // ✅ verified live
    internalRoute: '/JeffersonBlend',
    productsRoute: '/products/jefferson-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsadasdas_fdecaa67-f286-4373-a98a-55b775a6a2c9.png?v=1785668747',
  },
  {
    code: 'TR-003',
    series: 'Founders Series',
    seriesNum: 'Founders #03',
    rarity: "FOUNDER'S EDITION",
    name: 'Franklin Blend',
    title: 'Franklin Blend — Founders Series Coffee',
    roast: 'Medium-Dark Roast',
    notes: 'Caramel · Vanilla · Roasted Nut',
    price: 20.00,
    accent: '#D4C97A',
    color: '#0E0E06',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'franklin-blend',              // ✅ verified live
    internalRoute: '/FranklinBlend',
    productsRoute: '/products/franklin-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/jbhyvgyu.png?v=1785663564',
  },
  {
    code: 'TR-004',
    series: 'Founders Series',
    seriesNum: 'Founders #04',
    rarity: 'CORE',
    name: 'Adams Blend',
    title: 'Adams Blend — Founders Series Coffee',
    roast: 'Medium-Dark Roast',
    notes: 'Cocoa · Spice · Roasted Nut',
    price: 20.00,
    accent: '#B87AC8',
    color: '#0E070E',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'adams-blend',                 // ✅ verified live
    internalRoute: '/AdamsBlend',
    productsRoute: '/products/adams-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/fvtfyu.png?v=1785663280',
  },
  {
    code: 'TR-005',
    series: 'Founders Series',
    seriesNum: 'Founders #05',
    rarity: 'CORE',
    name: 'Lincoln Blend',
    title: 'Lincoln Blend — Founders Series Coffee',
    roast: 'Dark Roast',
    notes: 'Cocoa · Molasses · Toasted Oak',
    price: 20.00,
    accent: '#C87070',
    color: '#100707',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'lincoln-blend-founders-series-coffee', // ✅ verified live (exact Shopify handle)
    internalRoute: '/LincolnBlend',
    productsRoute: '/products/lincoln-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/ChatGPT_Image_Aug_2_2026_01_01_16_AM.png?v=1785650939',
  },
  {
    code: 'TR-006',
    series: 'Founders Series',
    seriesNum: 'Founders #06',
    rarity: 'CORE',
    name: 'Roosevelt Blend',
    title: 'Roosevelt Blend — Founders Series Coffee',
    roast: 'Dark Roast',
    notes: 'Dark Chocolate · Smoke · Spice',
    price: 20.00,
    accent: '#7AC87A',
    color: '#070E07',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'roosevelt-blend',             // ✅ verified live
    internalRoute: '/RooseveltBlend',
    productsRoute: '/products/roosevelt-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/fvtfyu.png?v=1785663280',
  },

  // ── LIBERTY ICONS SERIES ─────────────────────────────────────────────────
  {
    code: 'LI-001',
    series: 'Liberty Icons',
    seriesNum: 'Liberty Icons #01',
    rarity: 'CORE',
    name: "Eagle's Flight Blend",
    title: "Eagle's Flight Blend — Liberty Icons Series",
    roast: 'Strong Dark Roast',
    notes: 'Praline · Roasted Peanuts · Dark Chocolate',
    price: 20.00,
    accent: '#8B6D47',
    color: '#0F0A05',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'eagles-flight-blend',         // ✅ verified live
    internalRoute: '/EaglesFlightBlend',
    productsRoute: '/products/eagles-flight-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988',
  },
  {
    code: 'LI-002',
    series: 'Liberty Icons',
    seriesNum: 'Liberty Icons #02',
    rarity: 'CORE',
    name: 'Liberty Torch Blend',
    title: 'Liberty Torch Blend — Liberty Icons Series',
    roast: 'Bright Medium Roast',
    notes: 'Sundried Citrus · Golden Honey · Clean Finish',
    price: 20.00,
    accent: '#C4A35A',
    color: '#050D08',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'liberty-torch-blend',         // ✅ verified live
    internalRoute: '/LibertyTorchBlend',
    productsRoute: '/products/liberty-torch-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsadasdas_fdecaa67-f286-4373-a98a-55b775a6a2c9.png?v=1785668747',
  },
  {
    code: 'LI-003',
    series: 'Liberty Icons',
    seriesNum: 'Liberty Icons #03',
    rarity: 'CORE',
    name: 'Old Glory House Blend',
    title: 'Old Glory House Blend — Liberty Icons Series',
    roast: 'Classic Medium Roast',
    notes: 'Caramel · Sweet Cream · Subtle Spice',
    price: 18.00,
    accent: '#B38B4D',
    color: '#0A0604',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'old-glory-house-blend',       // ✅ verified live
    internalRoute: '/OldGloryHouseBlend',
    productsRoute: '/products/old-glory-house-blend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/jbhyvgyu.png?v=1785663564',
  },
  {
    code: 'LI-004',
    series: 'Liberty Icons',
    seriesNum: 'Liberty Icons #04',
    rarity: 'CORE',
    name: "Rosie's Grind",
    title: "Rosie's Grind — Liberty Icons Series",
    roast: 'Bold Medium Dark Roast',
    notes: 'Praline · Roasted Peanuts · Smooth Finish',
    price: 20.00,
    accent: '#A8893A',
    color: '#0A0805',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'rosies-grind',                // ✅ verified live
    internalRoute: '/RosiesGrind',
    productsRoute: '/products/rosies-grind',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/frewrdwqerq.png?v=1785661782',
  },
  {
    code: 'LI-005',
    series: 'Liberty Icons',
    seriesNum: 'Liberty Icons #05',
    rarity: 'CORE',
    name: "Uncle Sam's Bold Brew",
    title: "Uncle Sam's Bold Brew — Liberty Icons Series",
    roast: 'Extra Bold Dark Roast',
    notes: 'Bittersweet Chocolate · Smoke · Deep Roast',
    price: 20.00,
    accent: '#9B7B4D',
    color: '#080603',
    format: 'WHOLE BEAN BOX',
    shopifyHandle: 'uncle-sams-bold-brew',        // ✅ verified live
    internalRoute: '/UncleSamsBoldBrew',
    productsRoute: '/products/uncle-sams-bold-brew',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/trdtyfuyh_25801652-e2ec-4a02-8d62-6855c6e55396.png?v=1785661294',
  },

  // ── PODS ─────────────────────────────────────────────────────────────────
  {
    code: 'TR-POD-001',
    series: 'Founders Series',
    seriesNum: 'Pods',
    rarity: 'CORE',
    name: 'Washington Blend Pods',
    title: 'Washington Blend Pods — Founders Series',
    roast: 'Dark Roast',
    notes: 'Cocoa · Smoke · Bold Spice',
    price: 16.99,
    accent: '#C9A24A',
    color: '#0A0A0A',
    format: 'PODS BOX',
    shopifyHandle: 'washington-blend-coffee-pods', // ✅ verified live
    internalRoute: '/washington-pods',
    productsRoute: '/products/washington-pods',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/fvtfyu.png?v=1785663280',
  },
];

/** Quick lookup by shopifyHandle */
export const getProductByHandle = (handle) =>
  PRODUCT_CATALOG.find(p => p.shopifyHandle === handle);

/** Quick lookup by internal route */
export const getProductByRoute = (route) =>
  PRODUCT_CATALOG.find(p => p.internalRoute === route || p.productsRoute === route);

/** All Founders Series products */
export const FOUNDERS_PRODUCTS = PRODUCT_CATALOG.filter(p => p.series === 'Founders Series' && p.format !== 'PODS BOX');

/** All Liberty Icons products */
export const LIBERTY_ICONS_PRODUCTS = PRODUCT_CATALOG.filter(p => p.series === 'Liberty Icons');