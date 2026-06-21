import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigationStack } from '@/contexts/NavigationContext';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { pendingScrollRef } = useNavigationStack();

  useEffect(() => {
    // If a tab switch requested a specific scroll position, restore it.
    // Otherwise, scroll to top (normal route change behavior).
    if (pendingScrollRef.current !== null) {
      window.scrollTo(0, pendingScrollRef.current);
      pendingScrollRef.current = null;
    } else {
      window.scrollTo(0, 0);
    }

    // Send page_view to GA4 on every SPA route change
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);
  return null;
}