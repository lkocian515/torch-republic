// Central active product catalog for Torch Republic — final seven-product lineup.

export const FINAL_PRODUCT_IMAGE_URLS = {
  'suncap-rise': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4262eaf1c_tcr_coffee_blank_final_latest3r.jpeg',
  'glowmind-clarity-blend': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4262eaf1c_tcr_coffee_blank_final_latest3r.jpeg',
  'mooncap-restore': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4262eaf1c_tcr_coffee_blank_final_latest3r.jpeg',
  'torchbearer': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8d91192b7_tcr_coffee_blank_final_latestdd3.jpeg',
  'ember-reserve': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8d91192b7_tcr_coffee_blank_final_latestdd3.jpeg',
  'the-alchemist-matcha-blend': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9268e0f1e_tcr_coffee_blank_final_latest3f.jpeg',
  'the-monk-matcha-blend': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9268e0f1e_tcr_coffee_blank_final_latest3f.jpeg',
};

const product = ({ id, name, slug, roast, roastIntensity, caffeineLevel, mood, tagline, description, flavorNotes, tasteDescription, bestFor, mushrooms, servings, price, shopifyHandle, accent, category, keyBenefits }) => {
  const image = FINAL_PRODUCT_IMAGE_URLS[slug];
  const categoryText = category === 'matcha' ? 'ceremonial matcha' : category === 'classic-coffee' ? 'classic instant coffee' : 'mushroom coffee';
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

export const MUSHROOM_PRODUCTS = [
  product({
    id: 'suncap-rise',
    name: 'SunCap Rise',
    slug: 'suncap-rise',
    roast: 'Light Roast',
    roastIntensity: 4,
    caffeineLevel: 'medium',
    mood: 'Vitality · Fresh starts · Morning energy',
    tagline: 'I rise.',
    description: 'A bright instant mushroom coffee crafted for fresh starts, morning energy, and a clean daily ritual. Blended with premium instant coffee, Lion’s Mane, and Chaga.',
    flavorNotes: ['Bright Coffee', 'Light Cocoa', 'Clean Finish'],
    tasteDescription: 'Bright coffee, light cocoa, gentle earth, clean finish.',
    bestFor: 'Morning energy and fresh starts',
    mushrooms: 'Lion’s Mane + Chaga',
    servings: 27,
    price: 22.99,
    shopifyHandle: 'suncap-rise-instant-mushroom-coffee',
    accent: '#C2A66E',
    category: 'mushroom-coffee',
    keyBenefits: ['Morning Energy', 'Lion’s Mane + Chaga', '27 Servings', 'Instant Ritual'],
  }),
  product({
    id: 'glowmind-clarity',
    name: 'GlowMind Clarity',
    slug: 'glowmind-clarity-blend',
    roast: 'Medium Roast',
    roastIntensity: 6,
    caffeineLevel: 'medium',
    mood: 'Focus · Clarity · Intentional work',
    tagline: 'I see clearly.',
    description: 'A focused instant mushroom coffee made for worktables, notebooks, and routines that deserve your attention. Blended with premium instant coffee, Lion’s Mane, and Chaga.',
    flavorNotes: ['Smooth Coffee', 'Cocoa', 'Balanced Finish'],
    tasteDescription: 'Smooth coffee, cocoa, subtle earth, balanced finish.',
    bestFor: 'Focused thinking and daily clarity',
    mushrooms: 'Lion’s Mane + Chaga',
    servings: 27,
    price: 22.99,
    shopifyHandle: 'glowmind-clarity-instant-mushroom-coffee',
    accent: '#4A6FA5',
    category: 'mushroom-coffee',
    keyBenefits: ['Focus', 'Lion’s Mane + Chaga', '27 Servings', 'Balanced Coffee'],
  }),
  product({
    id: 'mooncap-restore',
    name: 'MoonCap Restore',
    slug: 'mooncap-restore',
    roast: 'Light Roast',
    roastIntensity: 4,
    caffeineLevel: 'medium',
    mood: 'Reset · Calm ritual · Quiet mornings',
    tagline: 'I restore.',
    description: 'A quieter instant mushroom coffee for deliberate mornings and unhurried resets. Blended with premium instant coffee, Lion’s Mane, and Chaga.',
    flavorNotes: ['Smooth Coffee', 'Soft Cocoa', 'Mellow Finish'],
    tasteDescription: 'Smooth coffee, soft cocoa, gentle earth, mellow finish.',
    bestFor: 'Calm reset and intentional ritual',
    mushrooms: 'Lion’s Mane + Chaga',
    servings: 27,
    price: 22.99,
    shopifyHandle: 'mooncap-restore-instant-mushroom-coffee',
    accent: '#9EAD95',
    category: 'mushroom-coffee',
    keyBenefits: ['Reset', 'Lion’s Mane + Chaga', '27 Servings', 'Quiet Ritual'],
  }),
];

export const CLASSIC_COFFEE_PRODUCTS = [
  product({
    id: 'torchbearer',
    name: 'Torchbearer',
    slug: 'torchbearer',
    roast: 'Medium Roast',
    roastIntensity: 6,
    caffeineLevel: 'high',
    mood: 'Purpose · Everyday ritual · Original flame',
    tagline: 'I carry the flame.',
    description: 'A classic instant coffee made with single-origin coffee from Papua New Guinea. A straightforward cup with origin character and everyday convenience.',
    flavorNotes: ['Bold', 'Smooth', 'Premium Arabica'],
    tasteDescription: 'Bold, smooth medium roast with rich coffee flavor and clean finish.',
    bestFor: 'Classic coffee and everyday ritual',
    mushrooms: 'No',
    servings: 27,
    price: 19.99,
    shopifyHandle: 'torchbearer™-single-origin-instant-coffee',
    accent: '#B86543',
    category: 'classic-coffee',
    keyBenefits: ['Single-Origin Coffee', '27 Servings', 'No Machine', 'Instant Ritual'],
  }),
  product({
    id: 'ember-reserve',
    name: 'Ember Reserve',
    slug: 'ember-reserve',
    roast: 'Light Roast',
    roastIntensity: 4,
    caffeineLevel: 'high',
    mood: 'Warmth · Smooth coffee · Ready when you are',
    tagline: 'I rise again.',
    description: 'A smooth Arabica instant coffee with an approachable profile for early departures, afternoon pauses, and coffee without equipment.',
    flavorNotes: ['Smooth Arabica', 'Warm', 'Easy Drinking'],
    tasteDescription: 'Smooth light-roast Arabica with a warm, easy-drinking finish.',
    bestFor: 'Smooth classic coffee and simple mornings',
    mushrooms: 'No',
    servings: 27,
    price: 19.99,
    shopifyHandle: 'ember-rise-instant-coffee',
    accent: '#B86543',
    category: 'classic-coffee',
    keyBenefits: ['Smooth Arabica', '27 Servings', 'No Machine', 'Light Roast'],
  }),
];

export const MATCHA_PRODUCTS = [
  product({
    id: 'the-alchemist',
    name: 'The Alchemist',
    slug: 'the-alchemist-matcha-blend',
    roast: 'Matcha',
    roastIntensity: 4,
    caffeineLevel: 'medium',
    mood: 'Creation · Experimentation · Everyday ritual',
    tagline: 'I create.',
    description: 'A ceremonial matcha made for lattes, iced drinks, and everyday exploration. Whisk it with water or make the ritual your own.',
    flavorNotes: ['Ceremonial Matcha', 'Bright', 'Versatile'],
    tasteDescription: 'Bright ceremonial matcha with a versatile, latte-friendly profile.',
    bestFor: 'Matcha lattes, iced drinks, and creative rituals',
    mushrooms: 'None — ceremonial matcha',
    servings: 25,
    price: 24.99,
    shopifyHandle: 'the-alchemist-matcha',
    accent: '#9EAD95',
    category: 'matcha',
    keyBenefits: ['Ceremonial Matcha', '25 Servings', 'Hot or Iced', 'Latte Friendly'],
  }),
  product({
    id: 'the-monk',
    name: 'The Monk',
    slug: 'the-monk-matcha-blend',
    roast: 'Matcha',
    roastIntensity: 3,
    caffeineLevel: 'medium',
    mood: 'Discipline · Stillness · Presence',
    tagline: 'I choose discipline.',
    description: 'A ceremonial matcha created for a simple, intentional ritual. Prepare it traditionally or over ice when you want to slow down and be present.',
    flavorNotes: ['Ceremonial Matcha', 'Smooth', 'Grounding'],
    tasteDescription: 'Smooth, grounding ceremonial matcha with a clean finish.',
    bestFor: 'Stillness, presence, and daily matcha ritual',
    mushrooms: 'None — ceremonial matcha',
    servings: 25,
    price: 24.99,
    shopifyHandle: 'the-monk-matcha',
    accent: '#9EAD95',
    category: 'matcha',
    keyBenefits: ['Ceremonial Matcha', '25 Servings', 'Simple Ritual', 'Calm Focus'],
  }),
];

export const ALL_PRODUCTS = [
  ...MUSHROOM_PRODUCTS,
  ...CLASSIC_COFFEE_PRODUCTS,
  ...MATCHA_PRODUCTS,
];

export const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/423d68cdd_hhbiiui.png';
export const BUNDLE_IMAGE = HERO_IMAGE;
export const LOGO_URL = '/torch-republic-logo-transparent.png';

export const MUSHROOM_COLLECTION_IMAGE = FINAL_PRODUCT_IMAGE_URLS['suncap-rise'];
export const CLASSIC_COLLECTION_IMAGE = FINAL_PRODUCT_IMAGE_URLS.torchbearer;
export const MATCHA_COLLECTION_IMAGE = FINAL_PRODUCT_IMAGE_URLS['the-alchemist-matcha-blend'];

export async function mergeWithShopifyData(localProducts) {
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
    console.error('Failed to merge with Shopify data:', error);
    return { products: localProducts, collections: [] };
  }
}

export function getCollectionImage(handle, collections) {
  const collection = collections.find(c => c.handle === handle);
  return collection?.image || null;
}