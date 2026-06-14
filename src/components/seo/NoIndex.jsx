/**
 * NoIndex — inject noindex, nofollow meta tags for pages that must not
 * appear in search results: admin tools, cart, checkout, account pages, etc.
 *
 * Drop <NoIndex /> at the top of any page component that should be excluded.
 */
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function NoIndex() {
  useEffect(() => {
    // Set via DOM as well (belt-and-suspenders)
    let el = document.querySelector('meta[name="robots"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex, nofollow');

    return () => {
      // Restore default on unmount
      if (el) el.setAttribute('content', 'index, follow');
    };
  }, []);

  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
    </Helmet>
  );
}