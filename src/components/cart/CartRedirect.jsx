import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**
 * CartRedirect — Safety net for any /cart/:variant URLs
 * 
 * Catches URLs like:
 * - /cart/49148263596284:1
 * - /cart/49148263596284:1,49171204276476:2
 * 
 * And redirects to:
 * - https://libertees-for-all.myshopify.com/cart/49148263596284:1
 * - https://libertees-for-all.myshopify.com/cart/49148263596284:1,49171204276476:2
 * 
 * NOINDEX: This is a utility redirect, not a public page
 */
export default function CartRedirect() {
  const { cartPermalink } = useParams();

  // Prevent search engines from indexing this utility page
  useEffect(() => {
    document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, follow');
    return () => {
      document.querySelector('meta[name="robots"]')?.setAttribute('content', 'index, follow');
    };
  }, []);

  useEffect(() => {
    if (!cartPermalink) {
      // No permalink, redirect to cart page
      window.location.href = '/cart';
      return;
    }

    // Validate the permalink format (variant_id:qty or variant_id:qty,variant_id:qty...)
    const isValidFormat = /^[\d]+:\d+(,[\d]+:\d+)*$/.test(cartPermalink);
    
    if (!isValidFormat) {
      console.error('[CartRedirect] Invalid cart permalink format:', cartPermalink);
      window.location.href = '/cart';
      return;
    }

    // Redirect to Shopify
    const shopifyUrl = `https://libertees-for-all.myshopify.com/cart/${cartPermalink}`;
    console.log('[CartRedirect] Redirecting to Shopify:', shopifyUrl);
    window.location.href = shopifyUrl;
  }, [cartPermalink]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#E6B7AD] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#E6B7AD' }}>
          Redirecting to secure checkout...
        </p>
      </div>
    </div>
  );
}