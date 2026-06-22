/**
 * NoIndex — inject noindex, nofollow meta tags for pages that must not
 * appear in search results: admin tools, cart, checkout, account pages, etc.
 *
 * Drop <NoIndex /> at the top of any page component that should be excluded.
 */
import { useEffect } from 'react';

export default function NoIndex() {
  useEffect(() => {
    let el = document.querySelector('meta[name="robots"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (el) el.setAttribute('content', 'index, follow');
    };
  }, []);

  return null;
}