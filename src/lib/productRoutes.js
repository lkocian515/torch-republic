/**
 * Product Routes Mapping
 * Maps Shopify handles to internal app routes
 * Fallback: if route not found, link goes to Shopify product page
 */

export const productRoutes = {
  // Founders Series — internal routes
  'washington-blend': '/WashingtonBlend',
  'jefferson-blend': '/JeffersonBlend',
  'franklin-blend': '/FranklinBlend',
  'lincoln-blend': '/LincolnBlend',
  'adams-blend': '/AdamsBlend',
  'roosevelt-blend': '/RooseveltBlend',

  // Liberty Icons Series — internal routes
  'lady-liberty-blend': '/LadyLibertyBlend',
  'eagles-flight-blend': '/EaglesFlightBlend',
  'uncle-sams-bold-brew': '/UncleSamsBoldBrew',
  'liberty-torch-blend': '/LibertyTorchBlend',
  'rosies-grind': '/RosiesGrind',
  'old-glory-house-blend': '/OldGloryHouseBlend',

  // Women of the Republic — internal routes
  'abigail-adams-blend': '/AbigailAdamsBlend',
  'harriet-tubman-blend': '/HarrietTubmanBlend',

  // Pods product
  'washington-blend-coffee-pods': '/WashingtonPodsProduct',
};

/**
 * Get internal route or Shopify fallback URL
 * @param {string} handle - Shopify product handle
 * @returns {object} - { isInternal: boolean, route: string }
 */
export function getProductRoute(handle) {
  const internalRoute = productRoutes[handle];
  if (internalRoute) {
    return { isInternal: true, route: internalRoute };
  }
  // Fallback to Shopify product page
  return { isInternal: false, route: `https://libertees-for-all.myshopify.com/products/${handle}` };
}