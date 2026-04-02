import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import CartDrawer from '../cart/CartDrawer';

export default function BottomTabNav() {
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/BestSellers', icon: ShoppingBag, label: 'Shop' },
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
              <Icon className="w-5 h-5" />
              <span className="text-xs font-mono tracking-widest uppercase">{tab.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setCartOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors relative select-none text-muted-foreground hover:text-foreground"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-xs font-mono tracking-widest uppercase">Cart</span>
        </button>
        <CartDrawer isOpen={cartOpen} setIsOpen={setCartOpen} />
      </div>
    </div>
  );
}