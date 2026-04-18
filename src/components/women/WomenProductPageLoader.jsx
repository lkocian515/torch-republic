import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import FounderProductPage from '../founders/FounderProductPage';

const NEUTRAL_PLACEHOLDER = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80';

/**
 * Loads a Women of the Republic product from the DB by exact shopify_handle,
 * then merges it with static page metadata (story, tasting notes, etc.).
 * This ensures the image always comes from the DB record — never from a hardcoded URL.
 */
export default function WomenProductPageLoader({ shopifyHandle, staticData }) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['women-product', shopifyHandle],
    queryFn: () => base44.entities.Product.filter({ shopify_handle: shopifyHandle }, '', 1),
    staleTime: 0, // always fresh
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#080808' }}>
        <div className="w-8 h-8 border border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  const dbProduct = products[0];

  // Build merged DATA: static metadata wins for copy/story/notes,
  // but images ALWAYS come from the DB record (which is sourced from Shopify).
  const mergedData = {
    ...staticData,
    // Override image fields with DB values — never use static hardcoded URLs
    heroImage: dbProduct?.image_url || NEUTRAL_PLACEHOLDER,
    images: [
      dbProduct?.image_url || NEUTRAL_PLACEHOLDER,
      ...(dbProduct?.image_url_2 ? [dbProduct.image_url_2] : []),
    ],
    // Also sync price from DB if available
    price: dbProduct?.price ?? staticData.price,
  };

  return <FounderProductPage DATA={mergedData} />;
}