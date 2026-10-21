import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { queryClientInstance } from '@/lib/query-client';
import { normalizePath } from '@/lib/navigationRoots';
import PageTransition from '@/components/PageTransition';
import PullToRefresh from '@/components/mobile/PullToRefresh';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/AuthContext';

const Home = lazy(() => import('@/pages/Home'));
const MushroomShop = lazy(() => import('@/pages/MushroomShop'));
const Profile = lazy(() => import('@/pages/Profile'));

/**
 * The bottom-tab destinations, rendered here instead of through <Routes>.
 *
 * Each tab is mounted once visited and then only toggled with display:none, so
 * switching tabs keeps that tab's scroll position, form state and open panels
 * instead of rebuilding the page. A tab is visible only on its exact root path,
 * so child views (/products/…, /shop/focus-coffee, /loyalty …) still render
 * through the normal router and never stack on top of a tab.
 */
const TAB_VIEWS = [
  { path: '/', name: 'Home', View: Home, requiresAuth: false },
  { path: '/shop', name: 'MushroomShop', View: MushroomShop, requiresAuth: false },
  { path: '/profile', name: 'Profile', View: Profile, requiresAuth: true },
];

const refresh = () => queryClientInstance.invalidateQueries();

const TabLoading = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

function TabView({ View, requiresAuth, active }) {
  const content = requiresAuth ? (
    <ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />}>
      <View />
    </ProtectedRoute>
  ) : (
    <View />
  );

  return (
    <div style={{ display: active ? 'block' : 'none' }} aria-hidden={active ? undefined : true}>
      <PullToRefresh onRefresh={refresh}>
        <PageTransition>
          <Suspense fallback={<TabLoading />}>{content}</Suspense>
        </PageTransition>
      </PullToRefresh>
    </div>
  );
}

export default function MobileTabViews() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const current = normalizePath(pathname);

  // Mount a tab the first time it is opened, then keep it mounted.
  const [visited, setVisited] = useState(() => new Set());

  useEffect(() => {
    if (!TAB_VIEWS.some((view) => view.path === current)) return;
    setVisited((prev) => (prev.has(current) ? prev : new Set(prev).add(current)));
  }, [current]);

  return (
    <>
      {TAB_VIEWS.map((view) => {
        const active = view.path === current;
        if (!visited.has(view.path)) return null;
        // Never keep an auth-gated tab alive for a signed-out visitor.
        if (view.requiresAuth && !isAuthenticated && !active) return null;
        return <TabView key={view.path} View={view.View} requiresAuth={view.requiresAuth} active={active} />;
      })}
    </>
  );
}