import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

/**
 * Fetches a product's real images from Shopify via a backend function.
 * Falls back to the provided staticImages if the fetch fails or returns nothing.
 */
export function useShopifyProductImages(handle, staticImages = []) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['shopify-product-images', handle],
    queryFn: () => base44.functions.invoke('getShopifyProductImages', { handle }),
    enabled: !!handle,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });

  const shopifyImages = data?.data?.images || [];
  const resolvedImages = shopifyImages.length > 0 ? shopifyImages : staticImages;

  return {
    images: resolvedImages,
    heroImage: resolvedImages[0] || null,
    isLoading,
    error,
  };
}