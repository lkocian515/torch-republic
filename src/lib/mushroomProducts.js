import { BRAND_LOGO } from '@/lib/brandAssets';

// Canonical active product catalog — exactly TWO current products.
//
// Matcha has been fully retired from the catalog. Any component that imports
// MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, MATCHA_PRODUCTS, or ALL_PRODUCTS
// now receives only the two current coffee products, so matcha cannot reappear
// in the shop, bundle builder, cart recommendations, search, related-product
// lists, recently viewed, or cached product data.
//
// Customer-facing fields (name, slug, id) use the clean canonical values that
// match lib/coreProducts.js. The internal `shopifyHandle` is preserved only for
// checkout wiring (commerce is currently disabled; see lib/commerceConfig.js).

import { COMMERCE_ENABLED } from './commerceConfig';

export const FINAL_PRODUCT_IMAGE_URLS = {
  'instant-classic-coffee': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/d17b24779_torch-republic-classic-coffee-1600-2.png',
  'instant-mushroom-coffee': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/35ac29b4a_torch-republic-mushroom-coffee-1600-1.png',
};

const product = ({ id, name, slug, roast, roastIntensity, caffeineLevel, mood, tagline, description, flavorNotes, tasteDescription, bestFor, mushrooms, servings, price, shopifyHandle, accent, category, keyBenefits }) => {
  const image = FINAL_PRODUCT_IMAGE_URLS[slug];
  const categoryText = category === 'classic-coffee' ? 'classic instant coffee' : 'mushroom coffee';
  return {
    id,
    name,
    slug,
    roast,
    roastIntensity,
    caffeineLevel,
    mood,
    tagline,
    description,
    flavorNotes,
    tasteDescription,
    bestFor,
    mushrooms,
    servings,
    image,
    imageUrl: image,
    image_url: image,
    thumbnail: image,
    featuredImage: image,
    heroImage: image,
    productImage: image,
    shopifyImage: image,
    gallery: [image],
    galleryImages: [image],
    images: [image],
    alt: `${name} ${categoryText} by Torch Republic`,
    price,
    shopifyHandle,
    accent,
    category,
    keyBenefits,
  };
};

const CLASSIC = product({
  id: 'instant-classic-coffee',
  name: 'Instant Classic Coffee',
  slug: 'instant-classic-coffee',
  roast: 'Medium Roast',
  roastIntensity: 6,
  caffeineLevel: 'high',
  mood: 'Purpose · Everyday ritual · Original flame',
  tagline: 'A straightforward cup.',
  description: 'A classic instant coffee made with single-origin coffee from Papua New Guinea. A straightforward cup with origin character and everyday convenience.',
  flavorNotes: ['Bold', 'Smooth', 'Premium Arabica'],
  tasteDescription: 'Bold, smooth medium roast with rich coffee flavor and clean finish.',
  bestFor: 'Classic coffee and everyday ritual',
  mushrooms: 'No',
  servings: 27,
  price: 22.99,
  shopifyHandle: 'instant-coffee-1',
  accent: '#9B4E2F',
  category: 'classic-coffee',
  keyBenefits: ['Single-Origin Coffee', '27 Servings', 'No Machine', 'Instant Ritual'],
});

const MUSHROOM = product({
  id: 'instant-mushroom-coffee',
  name: 'Instant Mushroom Coffee',
  slug: 'instant-mushroom-coffee',
  roast: 'Medium Roast',
  roastIntensity: 6,
  caffeineLevel: 'medium',
  mood: 'Focus · Clarity · Intentional work',
  tagline: 'I see clearly.',
  description: 'A focused instant mushroom coffee made for worktables, notebooks, and routines that deserve your attention. Blended with premium instant coffee, Lion’s Mane, Cordyceps, and Reishi.',
  flavorNotes: ['Smooth Coffee', 'Cocoa', 'Balanced Finish'],
  tasteDescription: 'Smooth coffee, cocoa, subtle earth, balanced finish.',
  bestFor: 'Focused thinking and daily clarity',
  mushrooms: 'Lion’s Mane + Cordyceps + Reishi',
  servings: 27,
  price: 25.99,
  shopifyHandle: 'instant-coffee-with-mushroom',
  accent: '#264A35',
  category: 'mushroom-coffee',
  keyBenefits: ['Focus', 'Lion’s Mane + Cordyceps + Reishi', '27 Servings', 'Balanced Coffee'],
});

// Matcha product has been retired — MATCHA_PRODUCTS is kept as an empty
// array for backward compatibility with components that import it.
export const MUSHROOM_PRODUCTS = [MUSHROOM];
export const CLASSIC_COFFEE_PRODUCTS = [CLASSIC];
export const MATCHA_PRODUCTS = [];
export const ALL_PRODUCTS = [CLASSIC, MUSHROOM];

export const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/423d68cdd_hhbiiui.png';
export const BUNDLE_IMAGE = HERO_IMAGE;
export const LOGO_URL = BRAND_LOGO;

export const MUSHROOM_COLLECTION_IMAGE = FINAL_PRODUCT_IMAGE_URLS['instant-mushroom-coffee'];
export const CLASSIC_COLLECTION_IMAGE = FINAL_PRODUCT_IMAGE_URLS['instant-classic-coffee'];

// Commerce is currently disabled — return local products without invoking
// the (inaccessible) Shopify function, so no failed merge/collection requests
// are made. When commerce is re-enabled, the live merge resumes unchanged.
export async function mergeWithShopifyData(localProducts) {
  if (!COMMERCE_ENABLED) return { products: localProducts, collections: [] };
  try {
    const { base44 } = await import('@/api/base44Client');
    const response = await base44.functions.invoke('fetchShopifyProducts', {});
    const shopifyProducts = response.data?.products || [];
    const shopifyCollections = response.data?.collections || [];
    const shopifyMap = new Map();
    shopifyProducts.forEach(p => shopifyMap.set(p.handle, p));

    const products = localProducts.map(local => {
      const shopify = shopifyMap.get(local.shopifyHandle);
      return {
        ...local,
        price: shopify?.price || local.price,
        compareAtPrice: shopify?.compareAtPrice,
        availableForSale: shopify?.availableForSale !== undefined ? shopify.availableForSale : true,
        inStock: shopify?.in_stock ?? true,
        shopifyData: shopify || null,
      };
    });

    return { products, collections: shopifyCollections };
  } catch (error) {
    return { products: localProducts, collections: [] };
  }
}

export function getCollectionImage(handle, collections) {
  const collection = collections.find(c => c.handle === handle);
  return collection?.image || null;
}