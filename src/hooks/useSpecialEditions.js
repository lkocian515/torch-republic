import { useEffect, useState } from 'react';
import { loadSpecialEditions } from '@/lib/specialEditions';

/**
 * Shared special-editions catalog. One request serves every consumer on the
 * page (hero, collection, product template) via the module-level cache.
 */
export default function useSpecialEditions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    loadSpecialEditions().then((result) => {
      if (!alive) return;
      setData(result);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  return {
    editions: data?.editions || [],
    campaigns: data?.campaigns || [],
    shopifyError: data?.shopifyError || null,
    loading,
  };
}