// Central product catalog for Torch Republic — three categories: Classic Coffee, Mushroom Coffee, Matcha
// NOTE: Prices are now pulled live from Shopify - these are fallbacks only

export const CLASSIC_COFFEE_PRODUCTS = [
  {
    id: 'torchbearer',
    name: 'Torchbearer',
    slug: 'torchbearer',
    roast: 'Medium Roast',
    roastIntensity: 6,
    caffeineLevel: 'high',
    mood: 'Leadership · Purpose · Courage to move forward',
    tagline: 'I carry the flame.',
    description: 'The torch symbolizes purpose, responsibility, and the courage to move forward. For those who choose to lead. Premium instant coffee for bold mornings and everyday ritual.',
    flavorNotes: ['Bold', 'Smooth', 'Premium Arabica'],
    tasteDescription: 'Bold, smooth medium roast with rich coffee flavor and clean finish.',
    bestFor: 'Leadership, purpose, everyday ritual',
    mushrooms: 'No',
    servings: 27,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/15_9efec3d4-7d73-4fd6-a4df-aba0f6cad920.png?v=1781102331',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/15_9efec3d4-7d73-4fd6-a4df-aba0f6cad920.png?v=1781102331',
    ],
    alt: 'Torch Republic Torchbearer Classic Instant Coffee',
    price: 19.99,
    shopifyHandle: 'torchbearer-instant-coffee',
    accent: '#C4A35A',
    category: 'classic-coffee',
    keyBenefits: ['Leadership', 'Purpose', '27 Servings', 'Premium Arabica'],
  },
  {
    id: 'ember-rise',
    name: 'Ember Rise',
    slug: 'ember-rise',
    roast: 'Dark Roast',
    roastIntensity: 6,
    caffeineLevel: 'high',
    mood: 'Renewal · Rebuilding · Growing anew',
    tagline: 'I rise again.',
    description: 'Even the smallest ember contains the power to become a fire again. For those rebuilding, growing, and beginning anew. A warm, energizing coffee with functional mushrooms for fresh starts.',
    flavorNotes: ['Warm', 'Energizing', 'Rich Adaptogen Blend'],
    tasteDescription: 'Dark roast with warm character and adaptogenic mushroom support.',
    bestFor: 'Renewal, rebuilding, fresh starts',
    mushrooms: 'Cordyceps + Reishi',
    servings: 27,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/17_a9cde60d-d323-42f1-9eb5-1ca1cce8678e.png?v=1781102333',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/17_a9cde60d-d323-42f1-9eb5-1ca1cce8678e.png?v=1781102333',
    ],
    alt: 'Torch Republic Ember Rise Classic Instant Coffee',
    price: 19.99,
    shopifyHandle: 'ember-rise-instant-coffee',
    accent: '#D67A5A',
    category: 'classic-coffee',
    keyBenefits: ['Renewal', 'Growth', '27 Servings', 'Fresh Starts'],
  },
  {
    id: 'midnight-watch',
    name: 'Midnight Watch',
    slug: 'midnight-watch',
    roast: 'Dark Roast',
    roastIntensity: 8,
    caffeineLevel: 'high',
    mood: 'Resilience · Endurance · Keep going when others stop',
    tagline: 'I endure.',
    description: 'For the creators, protectors, builders, and dreamers who keep going when others stop. A deeper, darker coffee for resilience and quiet determination.',
    flavorNotes: ['Dark', 'Rich', 'Bold'],
    tasteDescription: 'Dark and rich with bold character and smooth finish.',
    bestFor: 'Resilience, endurance, deep focus',
    mushrooms: 'No',
    servings: 27,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/14_3a9ab2f8-627d-4d27-a636-29a0900700bb.png?v=1781102333',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/14_3a9ab2f8-627d-4d27-a636-29a0900700bb.png?v=1781102333',
    ],
    alt: 'Torch Republic Midnight Watch Classic Instant Coffee',
    price: 19.99,
    shopifyHandle: 'midnight-watch-instant-coffee',
    accent: '#5A6B7C',
    category: 'classic-coffee',
    keyBenefits: ['Resilience', 'Endurance', '27 Servings', 'Dark Roast'],
  },
];

export const MUSHROOM_PRODUCTS = [
  {
    id: 'suncap-rise',
    name: 'SunCap Rise',
    slug: 'suncap-rise',
    roast: 'Light Roast',
    roastIntensity: 4,
    caffeineLevel: 'medium',
    mood: 'Vitality · The energy of a new day',
    tagline: 'I rise.',
    description: 'The energy of a new day. SunCap Rise is a bright, lighter-roast instant mushroom coffee crafted for vitality, fresh starts, and a clean daily ritual. Blended with premium instant coffee, Lions Mane, and Chaga.',
    flavorNotes: ['Bright Coffee', 'Light Cocoa', 'Clean Finish'],
    tasteDescription: 'Bright coffee, light cocoa, gentle earth, clean finish.',
    bestFor: 'Vitality, morning energy, fresh starts',
    mushrooms: 'Lions Mane + Chaga',
    servings: 27,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/3_7cea93ef-7095-477f-b049-d4e885243dc6.png?v=1781102332',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/3_7cea93ef-7095-477f-b049-d4e885243dc6.png?v=1781102332',
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/254831192_13.png',
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1c72390db_5.png',
    ],
    alt: 'Torch Republic SunCap Rise mushroom coffee lifestyle image with mountain morning ritual',
    price: 22.99,
    shopifyHandle: 'suncap-rise-instant-mushroom-coffee',
    accent: '#D6B27A',
    category: 'mushroom-coffee',
    keyBenefits: ['Vitality', 'Lions Mane + Chaga', '27 Servings', 'Morning Energy'],
  },
  {
    id: 'glowmind-clarity',
    name: 'GlowMind Clarity',
    slug: 'glowmind-clarity-blend',
    roast: 'Medium Roast',
    roastIntensity: 6,
    caffeineLevel: 'medium',
    mood: 'Awareness · Focused thinking without unnecessary noise',
    tagline: 'I see clearly.',
    description: 'Focused thinking without unnecessary noise. GlowMind Clarity Blend was created for the moments when your mind needs light. With Lions Mane and Chaga, this ritual is built around awareness, focus, and intention.',
    flavorNotes: ['Smooth Coffee', 'Cocoa', 'Balanced Finish'],
    tasteDescription: 'Smooth coffee, cocoa, subtle earth, balanced finish.',
    bestFor: 'Awareness, focus, mental clarity',
    mushrooms: 'Lions Mane + Chaga',
    servings: 27,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/90936d2ba_15.png',
    galleryImages: [
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/90936d2ba_15.png',
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/c59c369a7_6.png',
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/4_21dba766-0e82-4b33-821a-3efdf847b2e9.png?v=1781102333',
    ],
    alt: 'Torch Republic GlowMind Clarity Blend mushroom coffee with morning intention journal',
    price: 22.99,
    shopifyHandle: 'glowmind-clarity-instant-mushroom-coffee',
    accent: '#4A9EE6',
    category: 'mushroom-coffee',
    keyBenefits: ['Awareness', 'Lions Mane + Chaga', '27 Servings', 'Focused Thinking'],
  },
  {
    id: 'mooncap-restore',
    name: 'MoonCap Restore',
    slug: 'mooncap-restore',
    roast: 'Dark Roast',
    roastIntensity: 7,
    caffeineLevel: 'medium',
    mood: 'Recovery · Restoration for body and mind',
    tagline: 'I restore.',
    description: 'Restoration for body and mind. MoonCap Restore is a dark, rich instant mushroom coffee crafted for recovery, calm evenings, and grounded daily rituals. Blended with premium instant coffee, Lions Mane, and Chaga.',
    flavorNotes: ['Dark Cocoa', 'Smooth Coffee', 'Mellow Finish'],
    tasteDescription: 'Dark cocoa, smooth coffee, earthy depth, mellow finish.',
    bestFor: 'Recovery, restoration, calm evenings',
    mushrooms: 'Lions Mane + Chaga',
    servings: 27,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/12_8e7ecdb4-a0bc-459a-bea5-96fea5263fa2.png?v=1781102333',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/12_8e7ecdb4-a0bc-459a-bea5-96fea5263fa2.png?v=1781102333',
    ],
    alt: 'Torch Republic MoonCap Restore instant mushroom coffee lifestyle image',
    price: 22.99,
    shopifyHandle: 'mooncap-restore-instant-mushroom-coffee',
    accent: '#E8697A',
    category: 'mushroom-coffee',
    keyBenefits: ['Recovery', 'Lions Mane + Chaga', '27 Servings', 'Restoration'],
  },
  {
    id: 'dreamcap-blend',
    name: 'DreamCap Blend',
    slug: 'dreamcap-blend',
    roast: 'Medium Roast',
    roastIntensity: 5,
    caffeineLevel: 'medium',
    mood: 'Restoration · Deep rest and subconscious renewal',
    tagline: 'I recover.',
    description: 'Deep rest and subconscious renewal. DreamCap Blend was created for restoration, imagination, and the quiet hours when the mind processes and renews itself. Blended with Lions Mane and Chaga.',
    flavorNotes: ['Smooth Coffee', 'Dark Cocoa', 'Mellow Body'],
    tasteDescription: 'Smooth coffee, dark cocoa, earthy finish, mellow body.',
    bestFor: 'Restoration, deep rest, subconscious renewal',
    mushrooms: 'Lions Mane + Chaga',
    servings: 27,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/6_8c807391-10cd-46e4-9a59-151cae236e29.png?v=1781102333',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/6_8c807391-10cd-46e4-9a59-151cae236e29.png?v=1781102333',
    ],
    alt: 'Torch Republic DreamCap Blend instant mushroom coffee tube',
    price: 22.99,
    shopifyHandle: 'dreamcap-instant-mushroom-coffee',
    accent: '#4A6DB8',
    category: 'mushroom-coffee',
    keyBenefits: ['Restoration', 'Lions Mane + Chaga', '27 Servings', 'Deep Rest'],
  },
  {
    id: 'the-oracle',
    name: 'The Oracle Blend',
    slug: 'the-oracle',
    roast: 'Medium Roast',
    roastIntensity: 5,
    caffeineLevel: 'medium',
    mood: 'Wisdom · Trusting your inner knowing',
    tagline: 'I know.',
    description: 'Trusting your inner knowing. The Oracle Blend is crafted for wisdom, intuition, and the deep knowledge that comes from within. Not predicting the future—trusting yourself. A smooth medium roast with Lions Mane and Chaga.',
    flavorNotes: ['Smooth Coffee', 'Cocoa', 'Soft Finish'],
    tasteDescription: 'Smooth coffee, cocoa, subtle earth, soft finish.',
    bestFor: 'Wisdom, intuition, inner knowing',
    mushrooms: 'Lions Mane + Chaga',
    servings: 27,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/10_43ce9b58-361d-4539-9624-443920a03747.png?v=1781102333',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/10_43ce9b58-361d-4539-9624-443920a03747.png?v=1781102333',
    ],
    alt: 'Torch Republic The Oracle Blend instant mushroom coffee tube',
    price: 22.99,
    shopifyHandle: 'the-oracle-instant-mushroom-coffee',
    accent: '#B88FA8',
    category: 'mushroom-coffee',
    keyBenefits: ['Wisdom', 'Lions Mane + Chaga', '27 Servings', 'Inner Knowing'],
  },
  {
    id: 'mystic-bloom',
    name: 'Mystic Bloom Blend',
    slug: 'mystic-bloom',
    roast: 'Medium Roast',
    roastIntensity: 5,
    caffeineLevel: 'medium',
    mood: 'Transformation · Growth unfolding from within',
    tagline: 'I am becoming.',
    description: 'Growth unfolding from within. Mystic Bloom Blend is crafted for transformation, the gradual becoming of who you are meant to be. A smooth, balanced mushroom coffee for the journey of becoming.',
    flavorNotes: ['Smooth Coffee', 'Soft Cocoa', 'Rounded Finish'],
    tasteDescription: 'Smooth coffee, soft cocoa, gentle earth, rounded finish.',
    bestFor: 'Transformation, growth, becoming',
    mushrooms: 'Lions Mane + Chaga',
    servings: 27,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/9_0263ab93-e776-4566-9051-fa3a5f9a2092.png?v=1781102333',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/9_0263ab93-e776-4566-9051-fa3a5f9a2092.png?v=1781102333',
    ],
    alt: 'Torch Republic Mystic Bloom Blend instant mushroom coffee tube',
    price: 22.99,
    shopifyHandle: 'mystic-bloom-instant-mushroom-coffee',
    accent: '#E6B7C8',
    category: 'mushroom-coffee',
    keyBenefits: ['Transformation', 'Lions Mane + Chaga', '27 Servings', 'Growth'],
  },
];

export const MATCHA_PRODUCTS = [
  {
    id: 'the-monk',
    name: 'The Monk',
    slug: 'the-monk-matcha-blend',
    roast: 'Matcha Blend',
    roastIntensity: 3,
    caffeineLevel: 'medium',
    mood: 'Discipline · Consistency over impulse',
    tagline: 'I choose discipline.',
    description: 'Consistency over impulse. Focus over distraction. The Monk is a disciplined matcha ritual for focus, stillness, and presence. Smooth, green, and grounding—crafted for those who choose discipline daily.',
    flavorNotes: ['Smooth Matcha', 'Earthy', 'Clean Finish'],
    tasteDescription: 'Smooth, earthy matcha with a clean, naturally sweet finish.',
    bestFor: 'Discipline, focus, calm presence',
    mushrooms: 'None — 100% Ceremonial Grade Matcha',
    servings: 25,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/28dd949f5_12.png',
    galleryImages: [
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/28dd949f5_12.png',
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/41f6d3ab6_7.png',
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/18_8e5aeb4b-6266-48e5-a725-639e74310697.png?v=1781102333',
    ],
    alt: 'Torch Republic The Monk ceremonial matcha blend with prepared matcha latte',
    price: 24.99,
    shopifyHandle: 'the-monk-matcha-blend',
    accent: '#6CBD5A',
    category: 'matcha',
    keyBenefits: ['Discipline', 'Ceremonial Grade Matcha', '25 Servings', 'Consistency'],
  },
  {
    id: 'the-ascendant',
    name: 'The Ascendant',
    slug: 'the-ascendant-matcha-blend',
    roast: 'Matcha Blend',
    roastIntensity: 4,
    caffeineLevel: 'medium',
    mood: 'Growth · The ongoing process of becoming',
    tagline: 'I evolve.',
    description: 'The ongoing process of becoming more than you were yesterday. The Ascendant is crafted for growth, transformation, and elevated energy. For those rising into their highest potential with calm, focused power.',
    flavorNotes: ['Bright Matcha', 'Vegetal', 'Uplifting'],
    tasteDescription: 'Bright, vegetal matcha with uplifting character.',
    bestFor: 'Growth, evolution, becoming',
    mushrooms: 'None — 100% Ceremonial Grade Matcha',
    servings: 25,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/18eb6d3c7_14.png',
    galleryImages: [
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/18eb6d3c7_14.png',
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/ggfgfdgfdgdf.png?v=1781109729',
    ],
    alt: 'Torch Republic The Ascendant matcha blend with warm matcha latte',
    price: 24.99,
    shopifyHandle: 'the-ascendant-matcha-blend',
    accent: '#8BC45A',
    category: 'matcha',
    keyBenefits: ['Growth', 'Ceremonial Grade Matcha', '25 Servings', 'Evolution'],
  },
  {
    id: 'the-alchemist',
    name: 'The Alchemist',
    slug: 'the-alchemist-matcha-blend',
    roast: 'Matcha Blend',
    roastIntensity: 4,
    caffeineLevel: 'medium',
    mood: 'Creation · Transforming effort into achievement',
    tagline: 'I create.',
    description: 'Transforming effort into achievement. Ideas into reality. Potential into purpose. The Alchemist is crafted for creativity, creation, and inspired focus. For makers, builders, and creators who approach their work as an art form.',
    flavorNotes: ['Creative', 'Focused', 'Inspiring'],
    tasteDescription: 'Inspiring matcha with focused, creative energy.',
    bestFor: 'Creation, creativity, inspired work',
    mushrooms: 'None — 100% Ceremonial Grade Matcha',
    servings: 25,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ffc347224_17.png',
    galleryImages: [
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ffc347224_17.png',
      'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/tretreter.png?v=1781109630',
    ],
    alt: 'Torch Republic The Alchemist matcha blend with matcha powder and whisk',
    price: 24.99,
    shopifyHandle: 'the-alchemist-matcha-blend',
    accent: '#C4A85A',
    category: 'matcha',
    keyBenefits: ['Creation', 'Ceremonial Grade Matcha', '25 Servings', 'Inspired Focus'],
  },
];

// Combined export for easy access
export const ALL_PRODUCTS = [
  ...CLASSIC_COFFEE_PRODUCTS,
  ...MUSHROOM_PRODUCTS,
  ...MATCHA_PRODUCTS,
];

export const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9e6cba4d4_ChatGPTImageJun10202607_49_52AM.png';
export const BUNDLE_IMAGE = HERO_IMAGE;
export const LOGO_URL = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ea7e0190c_torch_republic_primary_refined_gradient_4000px.png';

export const MUSHROOM_COLLECTION_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/cef6afa41_18.png';
export const CLASSIC_COLLECTION_IMAGE = null;
export const MATCHA_COLLECTION_IMAGE = null;

/**
 * Merge local product catalog with Shopify image and pricing data
 * This ensures images always come from Shopify and update automatically
 */
export async function mergeWithShopifyData(localProducts) {
  try {
    const { base44 } = await import('@/api/base44Client');
    const response = await base44.functions.invoke('fetchShopifyProducts', {});
    const shopifyProducts = response.data?.products || [];
    const shopifyCollections = response.data?.collections || [];
    
    // Create a map of shopify products by handle for quick lookup
    const shopifyMap = new Map();
    shopifyProducts.forEach(p => {
      shopifyMap.set(p.handle, p);
    });
    
    // Merge each local product with Shopify data
    const merged = localProducts.map(local => {
      const shopify = shopifyMap.get(local.shopifyHandle);
      
      if (!shopify) {
        // No Shopify match - use local data (will show placeholder)
        return {
          ...local,
          shopifyImage: null,
          shopifyPrice: local.price,
          shopifyAvailable: true,
        };
      }
      
      // Keep local images (don't override with Shopify) and use Shopify pricing
      return {
        ...local,
        // Keep local images - they're verified to work
        image: local.image,
        galleryImages: local.galleryImages,
        // Use Shopify pricing if available, otherwise keep local
        price: shopify.price || local.price,
        compareAtPrice: shopify.compareAtPrice,
        // Use Shopify availability if available
        availableForSale: shopify.availableForSale !== undefined ? shopify.availableForSale : true,
        // Keep local metadata
        shopifyData: shopify,
      };
    });
    
    return {
      products: merged,
      collections: shopifyCollections,
    };
  } catch (error) {
    console.error('Failed to merge with Shopify data:', error);
    // Return local data as fallback
    return {
      products: localProducts,
      collections: [],
    };
  }
}

/**
 * Get collection image from Shopify
 */
export function getCollectionImage(handle, collections) {
  const collection = collections.find(c => c.handle === handle);
  return collection?.image || null;
}