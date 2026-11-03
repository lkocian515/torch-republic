import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { ALL_PRODUCTS, MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '@/lib/mushroomProducts';

/**
 * Hook to fetch Shopify product data dynamically
 * Returns products with live Shopify images that update automatically
 */
export function useShopifyProducts(collectionHandle) {
  const [products, setProducts] = useState([]);
  const [collectionImage, setCollectionImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        // Call backend function to fetch collection from Shopify
        const response = await base44.functions.invoke('fetchCollectionByHandle', {
          handle: collectionHandle,
        });

        if (response.data?.products) {
          const shopifyProducts = response.data.products;
          
          // Map Shopify data to our product format
          const mappedProducts = shopifyProducts.map(p => ({
            id: p.handle,
            name: p.title,
            handle: p.handle,
            image: p.image_url,
            galleryImages: p.image_url ? [p.image_url] : [],
            price: p.price,
            compareAtPrice: p.compare_at_price,
            inStock: p.in_stock,
            description: p.description,
            // Keep existing product metadata from local data
            ...getProductMetadata(p.handle),
          }));

          if (mounted) {
            setProducts(mappedProducts);
            
            // Extract collection image from first product if available
            if (shopifyProducts.length > 0 && shopifyProducts[0].image_url) {
              setCollectionImage(shopifyProducts[0].image_url);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch Shopify products:', err);
        if (mounted) {
          setError(err);
          // Fall back to local data on error
          setProducts(getLocalProducts(collectionHandle));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [collectionHandle]);

  return { products, collectionImage, loading, error };
}

/**
 * Get metadata for a product by handle (roast, mood, accent color, etc.)
 * This preserves our local product configuration while using Shopify images
 */
function getProductMetadata(handle) {
  const localProduct = ALL_PRODUCTS.find(p => p.shopifyHandle === handle || p.handle === handle);
  
  if (localProduct) {
    return {
      slug: localProduct.slug || handle,
      roast: localProduct.roast,
      roastIntensity: localProduct.roastIntensity,
      caffeineLevel: localProduct.caffeineLevel,
      mood: localProduct.mood,
      tagline: localProduct.tagline,
      description: localProduct.description,
      flavorNotes: localProduct.flavorNotes,
      tasteDescription: localProduct.tasteDescription,
      bestFor: localProduct.bestFor,
      mushrooms: localProduct.mushrooms,
      servings: localProduct.servings,
      accent: localProduct.accent,
      category: localProduct.category,
      keyBenefits: localProduct.keyBenefits,
      shopifyHandle: localProduct.shopifyHandle || handle,
    };
  }
  
  // Default metadata if product not found locally
  return {
    slug: handle,
    category: 'unknown',
    accent: '#E6AC45',
  };
}

/**
 * Fallback to local product data when Shopify is unavailable
 */
function getLocalProducts(collectionHandle) {
  switch (collectionHandle) {
    case 'mushroom-coffee':
      return MUSHROOM_PRODUCTS;
    case 'matcha':
      return MATCHA_PRODUCTS;
    case 'classic-coffee':
      return CLASSIC_COFFEE_PRODUCTS;
    default:
      return [];
  }
}

/**
 * Helper to get collection image URL from Shopify response
 */
export function getCollectionImage(handle, collections = []) {
  const collection = collections.find(c => c.handle === handle);
  return collection?.image || null;
}