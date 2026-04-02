export function getAbsoluteCheckoutUrl(url) {
  if (!url) return null;

  let finalCheckoutUrl = url;

  if (url.startsWith('/')) {
    finalCheckoutUrl = `https://www.torchrepublic.com${url}`;
  } else {
    try {
      const urlObj = new URL(url);
      urlObj.hostname = 'www.torchrepublic.com';
      finalCheckoutUrl = urlObj.toString();
    } catch {
      finalCheckoutUrl = url;
    }
  }

  return finalCheckoutUrl;
}

export function redirectToCheckout(checkoutUrl) {
  const absoluteUrl = getAbsoluteCheckoutUrl(checkoutUrl);
  console.log('FINAL CHECKOUT URL:', absoluteUrl);
  window.location.href = absoluteUrl;
}