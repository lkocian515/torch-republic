// Central product catalog for Torch Republic — three categories: Classic Coffee, Mushroom Coffee, Matcha
// IMPORTANT: All product images are pulled live from Shopify - NO hardcoded image URLs
// Shopify product media is the CANONICAL source for all imagery sitewide

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
    // NO image/galleryImages - pulled from Shopify live
    alt: 'Torch Republic Torchbearer Classic Instant Coffee',
    price: 24.99,
    shopifyHandle: 'torchbearer',
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
    mushrooms: "Cordyceps + Reishi",
    servings: 27,
    alt: 'Torch Republic Ember Rise Classic Instant Coffee',
    price: 24.99,
    shopifyHandle: 'ember-rise',
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
    alt: 'Torch Republic Midnight Watch Classic Instant Coffee',
    price: 24.99,
    shopifyHandle: 'midnight-watch',
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
    description: 'The energy of a new day. SunCap Rise is a bright, lighter-roast instant mushroom coffee crafted for vitality, fresh starts, and a clean daily ritual. Blended with premium instant coffee, Lion\'s Mane, and Chaga.',
    flavorNotes: ['Bright Coffee', 'Light Cocoa', 'Clean Finish'],
    tasteDescription: 'Bright coffee, light cocoa, gentle earth, clean finish.',
    bestFor: 'Vitality, morning energy, fresh starts',
    mushrooms: "Lion's Mane + Chaga",
    servings: 27,
    alt: 'Torch Republic SunCap Rise instant mushroom coffee tube',
    price: 24.99,
    shopifyHandle: 'suncap-rise',
    accent: '#D6B27A',
    category: 'mushroom-coffee',
    keyBenefits: ['Vitality', "Lion's Mane + Chaga", '27 Servings', 'Morning Energy'],
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
   description: 'Focused thinking without unnecessary noise. GlowMind Clarity Blend was created for the moments when your mind needs light. With Lion\'s Mane and Chaga, this ritual is built around awareness, focus, and intention.',
   flavorNotes: ['Smooth Coffee', 'Cocoa', 'Balanced Finish'],
   tasteDescription: 'Smooth coffee, cocoa, subtle earth, balanced finish.',
   bestFor: 'Awareness, focus, mental clarity',
   mushrooms: "Lion's Mane + Chaga",
   servings: 27,
   alt: 'Torch Republic GlowMind Clarity instant mushroom coffee lifestyle image',
   price: 24.99,
   shopifyHandle: 'glowmind-clarity-blend',
   accent: '#4A9EE6',
    category: 'mushroom-coffee',
    keyBenefits: ['Awareness', "Lion's Mane + Chaga", '27 Servings', 'Focused Thinking'],
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
   description: 'Restoration for body and mind. MoonCap Restore is a dark, rich instant mushroom coffee crafted for recovery, calm evenings, and grounded daily rituals. Blended with premium instant coffee, Lion\'s Mane, and Chaga.',
   flavorNotes: ['Dark Cocoa', 'Smooth Coffee', 'Mellow Finish'],
   tasteDescription: 'Dark cocoa, smooth coffee, earthy depth, mellow finish.',
   bestFor: 'Recovery, restoration, calm evenings',
   mushrooms: "Lion's Mane + Chaga",
   servings: 27,
   alt: 'Torch Republic MoonCap Restore instant mushroom coffee lifestyle image',
   price: 24.99,
   shopifyHandle: 'mooncap-restore',
   accent: '#E8697A',
    category: 'mushroom-coffee',
    keyBenefits: ['Recovery', "Lion's Mane + Chaga", '27 Servings', 'Restoration'],
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
   description: 'Deep rest and subconscious renewal. DreamCap Blend was created for restoration, imagination, and the quiet hours when the mind processes and renews itself. Blended with Lion\'s Mane and Chaga.',
   flavorNotes: ['Smooth Coffee', 'Dark Cocoa', 'Mellow Body'],
   tasteDescription: 'Smooth coffee, dark cocoa, earthy finish, mellow body.',
   bestFor: 'Restoration, deep rest, subconscious renewal',
   mushrooms: "Lion's Mane + Chaga",
   servings: 27,
   alt: 'Torch Republic DreamCap Blend instant mushroom coffee tube',
   price: 24.99,
   shopifyHandle: 'dreamcap-blend',
   accent: '#4A6DB8',
    category: 'mushroom-coffee',
    keyBenefits: ['Restoration', "Lion's Mane + Chaga", '27 Servings', 'Deep Rest'],
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
   description: 'Trusting your inner knowing. The Oracle Blend is crafted for wisdom, intuition, and the deep knowledge that comes from within. Not predicting the future—trusting yourself. A smooth medium roast with Lion\'s Mane and Chaga.',
   flavorNotes: ['Smooth Coffee', 'Cocoa', 'Soft Finish'],
   tasteDescription: 'Smooth coffee, cocoa, subtle earth, soft finish.',
   bestFor: 'Wisdom, intuition, inner knowing',
   mushrooms: "Lion's Mane + Chaga",
   servings: 27,
   alt: 'Torch Republic The Oracle Blend instant mushroom coffee tube',
   price: 24.99,
   shopifyHandle: 'the-oracle-blend',
   accent: '#B88FA8',
    category: 'mushroom-coffee',
    keyBenefits: ['Wisdom', "Lion's Mane + Chaga", '27 Servings', 'Inner Knowing'],
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
   mushrooms: "Lion's Mane + Chaga",
   servings: 27,
   alt: 'Torch Republic Mystic Bloom Blend instant mushroom coffee tube',
    price: 24.99,
    shopifyHandle: 'mystic-bloom-blend',
    accent: '#E6B7C8',
    category: 'mushroom-coffee',
    keyBenefits: ['Transformation', "Lion's Mane + Chaga", '27 Servings', 'Growth'],
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
   alt: 'Torch Republic The Monk Matcha Blend tin',
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
    alt: 'Torch Republic The Ascendant Matcha Blend',
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
    alt: 'Torch Republic The Alchemist Matcha Blend',
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

export const HERO_IMAGE = null; // Will use Shopify collection/hero image
export const BUNDLE_IMAGE = null; // Will use Shopify bundle image
export const LOGO_URL = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-logo.png?v=1781102333'; // Use Shopify-hosted logo

// Collection images - will use Shopify collection images
export const MUSHROOM_COLLECTION_IMAGE = null;
export const CLASSIC_COLLECTION_IMAGE = null;
export const MATCHA_COLLECTION_IMAGE = null;

/**
 * Merge local product catalog with Shopify media data
 * Shopify is the CANONICAL source for all product imagery
 * Images update automatically when changed in Shopify
 */
export async function mergeWithShopifyMedia(localProducts) {
  try {
    const { base44 } = await import('@/api/base44Client');
    const response = await base44.functions.invoke('fetchShopifyProductMedia', {});
    const shopifyProducts = response.data?.products || [];
    
    // Create a map of shopify products by handle for quick lookup
    const shopifyMap = new Map();
    shopifyProducts.forEach(p => {
      shopifyMap.set(p.handle, p);
    });
    
    // Merge each local product with Shopify media data
    const merged = localProducts.map(local => {
      const shopify = shopifyMap.get(local.shopifyHandle);
      
      if (!shopify) {
        console.warn(`⚠️ No Shopify match for ${local.name} (${local.shopifyHandle})`);
        return {
          ...local,
          image: null,
          galleryImages: [],
          shopifyPrice: local.price,
          shopifyAvailable: true,
          _missingShopify: true,
        };
      }
      
      // Use Shopify images as canonical source
      const featuredImage = shopify.featuredImage?.url || shopify.images?.[0] || null;
      const galleryImages = shopify.images?.map(img => img.url || img) || [];
      
      return {
        ...local,
        // CANONICAL: Shopify images
        image: featuredImage,
        galleryImages: galleryImages,
        imageAlt: shopify.featuredImage?.alt || local.alt,
        // Use Shopify pricing
        price: shopify.price || local.price,
        compareAtPrice: shopify.compareAtPrice,
        // Use Shopify availability
        availableForSale: shopify.availableForSale !== undefined ? shopify.availableForSale : true,
        // Store full Shopify data for variant images etc
        shopifyData: shopify,
      };
    });
    
    return {
      products: merged,
      timestamp: response.data?.timestamp,
    };
  } catch (error) {
    console.error('❌ Failed to merge with Shopify media:', error);
    // Return local data as fallback (without images)
    return {
      products: localProducts.map(p => ({
        ...p,
        image: null,
        galleryImages: [],
        _shopifyError: true,
      })),
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Get a single product with Shopify media by slug
 */
export async function getProductWithMedia(slug) {
  const localProducts = [...CLASSIC_COFFEE_PRODUCTS, ...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS];
  const localProduct = localProducts.find(p => p.slug === slug);
  
  if (!localProduct) {
    return null;
  }
  
  try {
    const { base44 } = await import('@/api/base44Client');
    const response = await base44.functions.invoke('fetchShopifyProductMedia', {});
    const shopifyProducts = response.data?.products || [];
    
    const shopify = shopifyProducts.find(p => 
      p.handle === localProduct.shopifyHandle ||
      p.handle === localProduct.slug
    );
    
    if (shopify) {
      return {
        ...localProduct,
        image: shopify.featuredImage?.url || shopify.images?.[0]?.url || null,
        galleryImages: shopify.images?.map(img => img.url || img) || [],
        imageAlt: shopify.featuredImage?.alt || localProduct.alt,
        price: shopify.price || localProduct.price,
        availableForSale: shopify.availableForSale !== undefined ? shopify.availableForSale : true,
        shopifyData: shopify,
      };
    }
    
    return localProduct;
  } catch (error) {
    console.error('Failed to fetch product media:', error);
    return localProduct;
  }
}