import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SHOP = 'https://torchrepublic.com';

export default function ShopifyPassthrough() {
  const location = useLocation();

  useEffect(() => {
    // Full page navigation to Shopify — preserves path, search params, and hash
    window.location.replace(`${SHOP}${location.pathname}${location.search}${location.hash}`);
  }, []);

  return (
    <div className="w-full h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground font-mono text-sm">Redirecting to store...</p>
      </div>
    </div>
  );
}