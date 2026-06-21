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

  // Navigate to a tab root; if already on that tab, reset its stack to root
  const navigateToTab = (tabKey) => {
    const tab = TABS.find(t => t.key === tabKey);
    if (!tab) return;

    // Save current scroll position for the tab we're leaving
    scrollPositions.current[activeTab] = window.scrollY;

    if (activeTab === tabKey) {
      // Already on this tab — reset to root
      setTabStacks(prev => ({ ...prev, [tabKey]: [tab.root] }));
      navigate(tab.root, { replace: true });
      pendingScrollRef.current = 0;
    } else {
      // Switch to tab — restore last position in that tab's stack
      const stack = tabStacks[tabKey];
      const destination = (stack && stack.length > 0) ? stack[stack.length - 1] : tab.root;
      pendingScrollRef.current = scrollPositions.current[tabKey] || 0;
      navigate(destination);
    }
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