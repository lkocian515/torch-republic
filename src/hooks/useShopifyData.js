import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Hook to fetch products and collections from Shopify
 * Returns cached data with automatic refresh
 */
export function useShopifyData() {
  const [data, setData] = useState({
    products: [],
    collections: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchShopifyData() {
      try {
        const response = await base44.functions.invoke('fetchShopifyProducts', {});
        if (mounted) {
          setData({
            products: response.data?.products || [],
            collections: response.data?.collections || [],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch Shopify data:', error);
        if (mounted) {
          setData(prev => ({
            ...prev,
            loading: false,
            error: error.message,
          }));
        }
      }
    }

    fetchShopifyData();

    // Refresh every 5 minutes to keep data fresh
    const interval = setInterval(fetchShopifyData, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return data;
}

/**
 * Get a single product by handle from Shopify data
 */
export function useShopifyProduct(handle) {
  const { products, loading, error } = useShopifyData();
  
  const product = products.find(p => p.handle === handle);
  
  return {
    product: product || null,
    loading,
    error: error || (!product && !loading ? 'Product not found' : null),
  };
}

/**
 * Get products by collection handle
 */
export function useShopifyCollection(handle) {
  const { products, collections, loading, error } = useShopifyData();
  
  const collection = collections.find(c => c.handle === handle);
  const collectionProducts = products.filter(p => {
    // Match by product type or handle patterns
    if (handle === 'mushroom-coffee') {
      return p.productType?.toLowerCase().includes('mushroom') || 
             p.handle.includes('blend') ||
             p.handle.includes('rise') ||
             p.handle.includes('cap');
    }
    if (handle === 'classic-coffee') {
      return p.productType?.toLowerCase().includes('coffee') && 
             !p.productType?.toLowerCase().includes('mushroom');
    }
    if (handle === 'matcha') {
      return p.productType?.toLowerCase().includes('matcha');
    }
    return false;
  });
  
  return {
    collection,
    products: collectionProducts,
    loading,
    error,
  };
}