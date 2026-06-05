import { useEffect } from 'react';

// Order confirmation is handled by Shopify after checkout.
// Redirect anyone who lands here back to the homepage.
export default function OrderConfirmation() {
  useEffect(() => {
    window.location.replace('/');
  }, []);

  return null;
}