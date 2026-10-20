import { base44 } from '@/api/base44Client';

/**
 * SEO & Conversion Tracking Utilities
 * 
 * Usage:
 *   import { trackConversion, trackPageView } from '@/lib/seoTracking';
 * 
 *   // Track a purchase
 *   trackConversion('purchase', {
 *     transaction_id: 'order_123',
 *     value: 99.99,
 *     currency: 'USD',
 *     items: [...]
 *   });
 */

// Track conversion events (purchase, signup, etc.)
export const trackConversion = (eventName, properties = {}) => {
  try {
    // Base44 Analytics
    base44.analytics.track({
      eventName,
      properties
    });

    // GA4 Event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, { ...properties });
    }

    // Facebook Pixel (if installed)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, properties);
    }

    console.log(`[Conversion Tracked] ${eventName}`, properties);
  } catch (error) {
    console.error('[Tracking Error]', error);
  }
};

// Track page views with better attribution
export const trackPageView = (url, title, referrer = null) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: url,
        page_path: new URL(url, window.location.origin).pathname,
        ...(referrer && { referrer })
      });
    }
  } catch (error) {
    console.error('[Page View Tracking Error]', error);
  }
};

// Track product impressions (for collection pages)
export const trackProductImpression = (products, listName = 'Collection') => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
        item_list_name: listName,
        items: products.map((product, index) => ({
          item_id: product.slug || product.shopifyHandle,
          item_name: product.name,
          category: product.category || 'mushroom-coffee',
          list: listName,
          list_position: index + 1,
          price: product.price
        }))
      });
    }
  } catch (error) {
    console.error('[Product Impression Tracking Error]', error);
  }
};

// Track select_item (when user clicks on a product)
export const trackSelectItem = (product) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_item', {
        items: [{
          item_id: product.slug || product.shopifyHandle,
          item_name: product.name,
          category: product.category || 'mushroom-coffee',
          price: product.price
        }]
      });
    }
  } catch (error) {
    console.error('[Select Item Tracking Error]', error);
  }
};

// Track begin_checkout
export const trackBeginCheckout = (cartItems, total) => {
  try {
    trackConversion('begin_checkout', {
      currency: 'USD',
      value: total,
      items: cartItems.map(item => ({
        item_id: item.slug || item.shopifyHandle,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });
  } catch (error) {
    console.error('[Begin Checkout Tracking Error]', error);
  }
};

// Track add_payment_info
export const trackAddPaymentInfo = (total) => {
  trackConversion('add_payment_info', {
    currency: 'USD',
    value: total
  });
};

// Track purchase (call this on order confirmation page)
export const trackPurchase = (orderData) => {
  trackConversion('purchase', {
    transaction_id: orderData.orderId,
    value: orderData.total,
    tax: orderData.tax || 0,
    shipping: orderData.shipping || 0,
    currency: 'USD',
    items: orderData.items?.map(item => ({
      item_id: item.slug || item.shopifyHandle,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    })) || []
  });
};

// Track subscription signup
export const trackSubscription = (product, billingInterval = 'monthly') => {
  trackConversion('subscription_signup', {
    product_id: product.slug,
    product_name: product.name,
    price: product.price * 0.8, // 20% subscription discount
    billing_interval: billingInterval,
    currency: 'USD'
  });
};

// Track search
export const trackSearch = (searchTerm, resultsCount) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        search_results: resultsCount
      });
    }
  } catch (error) {
    console.error('[Search Tracking Error]', error);
  }
};

// Track newsletter signup
export const trackNewsletterSignup = (source = 'popup') => {
  trackConversion('newsletter_signup', { source });
};

// Track cart abandonment (use with timer or on page exit)
export const trackCartAbandonment = (cartItems, total) => {
  trackConversion('cart_abandonment', {
    currency: 'USD',
    value: total,
    items: cartItems.map(item => ({
      item_id: item.slug || item.shopifyHandle,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    cart_size: cartItems.length
  });
};

// Performance tracking (Core Web Vitals)
export const trackWebVitals = (metric) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true
      });
    }
    
    // Send to Base44 Analytics
    base44.analytics.track({
      eventName: `web_vital_${metric.name.toLowerCase()}`,
      properties: {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta
      }
    });
  } catch (error) {
    console.error('[Web Vitals Tracking Error]', error);
  }
};

// Error tracking
export const trackError = (error, context = {}) => {
  try {
    base44.analytics.track({
      eventName: 'error',
      properties: {
        error_message: error.message,
        error_stack: error.stack,
        page_url: window.location.href,
        ...context
      }
    });
  } catch (e) {
    console.error('[Error Tracking Failed]', e);
  }
};

export default {
  trackConversion,
  trackPageView,
  trackProductImpression,
  trackSelectItem,
  trackBeginCheckout,
  trackAddPaymentInfo,
  trackPurchase,
  trackSubscription,
  trackSearch,
  trackNewsletterSignup,
  trackCartAbandonment,
  trackWebVitals,
  trackError
};