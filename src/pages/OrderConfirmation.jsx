import { useEffect } from 'react';

// Order confirmation is handled by Shopify after checkout.
// Redirect anyone who lands here back to the homepage.
import { useSEO } from '@/hooks/useSEO';

export default function OrderConfirmation() {
  useSEO({ title: 'Order Confirmed', noindex: true });
  useEffect(() => {
    window.location.replace('/');
  }, []);

  return null;
}