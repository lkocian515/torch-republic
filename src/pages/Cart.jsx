import { useEffect } from 'react';
import { SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';

// /cart is no longer a local page — all cart actions go directly to Shopify.
// If anyone navigates here manually, redirect them immediately.
export default function Cart() {
  useEffect(() => {
    window.location.replace(SHOPIFY_CART_URL);
  }, []);

  return null;
}