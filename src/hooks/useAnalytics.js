/**
 * useAnalytics — SPA page-view tracker for Torch Republic
 *
 * Method: MANUAL history listener via React Router useLocation().
 * Fires exactly ONE page_view per completed client-side route change.
 * The initial page_view is fired on first mount.
 * index.html sets send_page_view: false so GA4 does NOT auto-fire a duplicate.
 *
 * Usage: mount once in AuthenticatedApp (App.jsx) — not in individual pages.
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, setInternalTraffic } from '@/lib/analytics';
import { base44 } from '@/api/base44Client';

export default function useAnalytics() {
  const location = useLocation();
  const prevPath = useRef(null);
  const adminFlagSet = useRef(false);

  // On mount: check if user is admin/owner and tag traffic accordingly
  useEffect(() => {
    if (adminFlagSet.current) return;
    base44.auth.me().then(user => {
      if (user && (user.role === 'admin' || user.role === 'owner')) {
        setInternalTraffic();
        adminFlagSet.current = true;
      }
    }).catch(() => {});
  }, []);

  // Track page view on every route change (and initial load)
  useEffect(() => {
    const { pathname, search } = location;
    // Avoid firing on same path (e.g. hash changes without path change)
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    trackPageView({
      path: pathname,
      search: search,
      title: document.title,
      referrer: document.referrer,
    });
  }, [location.pathname, location.search]);
}