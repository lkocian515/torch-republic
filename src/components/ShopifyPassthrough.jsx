import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SHOP = 'https://torchrepublic.com';

export default function ShopifyPassthrough() {
  const location = useLocation();

  useEffect(() => {
    // Full page navigation to Shopify — preserves path, search params, and hash
    window.location.replace(`${SHOP}${location.pathname}${location.search}${location.hash}`);
  }, []);

  return null;
}