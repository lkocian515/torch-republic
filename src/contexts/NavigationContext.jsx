import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

// Tabs and their root paths — order matters for prefix matching (most specific first)
const TABS = [
  { key: '/profile', root: '/profile' },
  { key: '/shop',    root: '/shop' },
  { key: '/',        root: '/' },
];

function getTabKey(pathname) {
  if (pathname.startsWith('/products/') || pathname.startsWith('/blends/')) return '/shop';
  if (pathname === '/account' || pathname.startsWith('/account/') || pathname === '/loyalty') return '/profile';
  for (const tab of TABS) {
    if (pathname === tab.root || pathname.startsWith(tab.root + '/')) {
      return tab.key;
    }
  }
  return '/';
}

export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Per-tab history stacks: { '/': ['/'], '/shop': ['/shop'], '/profile': ['/profile'] }
  const [tabStacks, setTabStacks] = useState({
    '/':        ['/'],
    '/shop':    ['/shop'],
    '/profile': ['/profile'],
  });

  // Track active tab
  const [activeTab, setActiveTab] = useState(() => getTabKey(location.pathname));
  const prevPathnameRef = useRef(location.pathname);

  // Per-tab scroll positions — preserved when switching tabs
  const scrollPositions = useRef({
    '/': 0,
    '/shop': 0,
    '/profile': 0,
  });

  // Scroll position to restore after the next route change.
  // When non-null, ScrollToTop will use this instead of scrolling to top.
  const pendingScrollRef = useRef(null);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === prevPathnameRef.current) return;
    prevPathnameRef.current = pathname;

    const tab = getTabKey(pathname);
    setActiveTab(tab);

    setTabStacks(prev => {
      const stack = prev[tab] || [];
      // Avoid duplicate consecutive entries
      if (stack[stack.length - 1] === pathname) return prev;
      return { ...prev, [tab]: [...stack, pathname] };
    });
  }, [location.pathname]);

  // Navigate to a tab and restore that tab's latest route/scroll position.
  const navigateToTab = (tabKey) => {
    const tab = TABS.find(t => t.key === tabKey);
    if (!tab) return;

    scrollPositions.current[activeTab] = window.scrollY;
    const stack = tabStacks[tabKey];
    const destination = (stack && stack.length > 0) ? stack[stack.length - 1] : tab.root;
    pendingScrollRef.current = activeTab === tabKey ? 0 : (scrollPositions.current[tabKey] || 0);
    navigate(activeTab === tabKey ? tab.root : destination, { replace: activeTab === tabKey });
  };

  // Legacy support
  const resetTabStack = (tabPath) => {
    setTabStacks(prev => ({ ...prev, [tabPath]: [tabPath] }));
    navigate(tabPath);
  };

  return (
    <NavigationContext.Provider value={{ navigateToTab, resetTabStack, tabStacks, activeTab, pendingScrollRef }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationStack() {
  return useContext(NavigationContext);
}