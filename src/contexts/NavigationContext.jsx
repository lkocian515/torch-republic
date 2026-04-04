import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastTabs, setLastTabs] = useState({
    '/': [],
    '/BestSellers': [],
    '/Profile': [],
  });

  useEffect(() => {
    const currentTab = Object.keys(lastTabs).find(
      (tab) => location.pathname === tab || location.pathname.startsWith(tab)
    ) || '/';

    setLastTabs((prev) => ({
      ...prev,
      [currentTab]: [location.pathname],
    }));
  }, [location.pathname]);

  const resetTabStack = (tabPath) => {
    setLastTabs((prev) => ({
      ...prev,
      [tabPath]: [],
    }));
    navigate(tabPath);
  };

  return (
    <NavigationContext.Provider value={{ resetTabStack, lastTabs }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationStack() {
  return useContext(NavigationContext);
}