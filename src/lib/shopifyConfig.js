export const SHOPIFY_DOMAIN = "libertees-for-all.myshopify.com";

export const buildCartUrl = (variantId) => {
  return `https://${SHOPIFY_DOMAIN}/cart/${variantId}:1`;
};