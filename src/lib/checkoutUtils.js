export function getAbsoluteCheckoutUrl(url) {
  if (!url) return null;
  
  // If it's already an absolute URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a relative path, prepend the Shopify domain
  if (url.startsWith('/')) {
    return `https://libertees-for-all.myshopify.com${url}`;
  }
  
  // Fallback: treat as a path and prepend domain
  return `https://libertees-for-all.myshopify.com/${url}`;
}

export function redirectToCheckout(checkoutUrl) {
  const absoluteUrl = getAbsoluteCheckoutUrl(checkoutUrl);
  console.log('FINAL CHECKOUT URL:', absoluteUrl);
  window.location.href = absoluteUrl;
}