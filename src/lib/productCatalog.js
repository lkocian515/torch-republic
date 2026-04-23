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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_4f650292-3215-4b0f-aed8-7ed4c1a02fb6.jpg?v=1775891986',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_6f98a910-06fe-466c-b034-23133f53a324.jpg?v=1775892090',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/lifestyle_lincoln_1.png?v=1775827869',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-6_9c4a00ed-4e07-40bf-b93c-42f039931d2e.jpg?v=1775891504',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/j9ihuio.png?v=1776038315',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585',
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
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/6bef9712-230c-45c1-911d-f0780d1fafc8.png?v=1776641348',
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