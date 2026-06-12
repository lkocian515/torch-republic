import { useEffect } from 'react';

/**
 * useNoIndex - Adds noindex, nofollow meta robots tag to prevent search engine indexing
 * 
 * Use this hook on pages that should NOT appear in search results:
 * - Authentication pages (login, register, forgot password, reset password)
 * - Customer account pages (profile, portal, loyalty, subscription)
 * - Admin pages (dashboards, analytics, internal tools)
 * - Order confirmation and cart pages
 * 
 * @param {boolean} follow - Whether to allow link following (default: false)
 */
export default function useNoIndex(follow = false) {
  useEffect(() => {
    // Create or update meta robots tag
    let metaTag = document.querySelector('meta[name="robots"]');
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'robots');
      document.head.appendChild(metaTag);
    }
    
    const content = follow ? 'noindex, follow' : 'noindex, nofollow';
    metaTag.setAttribute('content', content);
    
    // Cleanup on unmount
    return () => {
      if (metaTag && metaTag.parentNode) {
        metaTag.parentNode.removeChild(metaTag);
      }
    };
  }, [follow]);
}