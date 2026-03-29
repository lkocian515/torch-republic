import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function BottomTabNav() {
  const location = useLocation();
  const { cart } = useCart();
  
  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/BestSellers', icon: ShoppingBag, label: 'Shop' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: cart?.totalQuantity },
    { path: '/Profile', icon: User, label: 'Account' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-40 md:hidden">
      <div className="flex items-center justify-around h-16" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors relative select-none ${
                isActive(tab.path)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-mono font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono tracking-widest uppercase">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}