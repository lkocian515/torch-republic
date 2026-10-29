import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Live price and stock for a small set of Shopify handles, read through the
 * server-side Storefront client. Nothing is cached across pages, so a stale
 * price can never be shown as the current one.
 */
export default function useProductAvailability(handles) {
  const key = (handles || []).join(',');
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!key) {
      setProducts({});
      setLoading(false);
      return undefined;
    }
    let alive = true;
    setLoading(true);
    base44.functions
      .invoke('getShopifyProductAvailability', { handles: key.split(',') })
      .then((res) => {
        if (alive) setProducts(res?.data?.products || {});
      })
      .catch(() => {
        if (alive) setProducts({});
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [key]);

  return { products, loading };
}