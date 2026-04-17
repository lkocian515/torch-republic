import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User, Flame } from 'lucide-react';
import { useNavigationStack } from '@/contexts/NavigationContext';

export default function BottomTabNav() {
  const location = useLocation();
  const { resetTabStack } = useNavigationStack();
  const tabClickTimers = useRef({});

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/CoffeeCollection', icon: ShoppingBag, label: 'Coffee' },
    { path: '/Profile', icon: User, label: 'Account' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleTabClick = (path) => {
    if (isActive(path)) {
      // Check for double tap
      if (tabClickTimers.current[path]) {
        clearTimeout(tabClickTimers.current[path]);
        delete tabClickTimers.current[path];
        resetTabStack(path);
      } else {
        tabClickTimers.current[path] = setTimeout(() => {
          delete tabClickTimers.current[path];
        }, 300);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-40 md:hidden">
      <div className="flex items-center justify-around h-16" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors relative select-none ${
                isActive(tab.path)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-mono tracking-widest uppercase">{tab.label}</span>
            </Link>
          );
        })}
        <Link
          to="/TheTorchBox"
          className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors relative select-none"
          style={{ color: '#C9A24A' }}
        >
          <Flame className="w-5 h-5" />
          <span className="text-xs font-mono tracking-widest uppercase">Torch Box</span>
        </Link>
      </div>
    </div>
  );
}