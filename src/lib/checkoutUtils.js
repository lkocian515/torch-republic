export function getAbsoluteCheckoutUrl(url) {
  if (!url) return null;
  
  let finalCheckoutUrl = url;
  
  if (url.startsWith('/')) {
    finalCheckoutUrl = `https://libertees-for-all.myshopify.com${url}`;
  } else {
    const urlObj = new URL(url);
    if (
      urlObj.hostname === 'torchrepublic.com' ||
      urlObj.hostname === 'www.torchrepublic.com'
    ) {
      urlObj.hostname = 'libertees-for-all.myshopify.com';
    }
    finalCheckoutUrl = urlObj.toString();
  }
  
  return finalCheckoutUrl;
}

export function redirectToCheckout(checkoutUrl) {
  const absoluteUrl = getAbsoluteCheckoutUrl(checkoutUrl);
  console.log('FINAL CHECKOUT URL:', absoluteUrl);
  window.location.href = absoluteUrl;
}