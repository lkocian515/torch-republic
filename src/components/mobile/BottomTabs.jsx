import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigationStack } from '@/contexts/NavigationContext';

const RG = '#E6B7AD';

const TABS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
  { path: '/profile', icon: User, label: 'Account' },
];

export default function BottomTabs() {
  const location = useLocation();
  const { navigateToTab, resetTabStack, activeTab } = useNavigationStack();

  const handleTabClick = (e, path) => {
    e.preventDefault();
    // Tapping the already-active tab resets that tab's history to its root path (native tab behavior)
    if (activeTab === path) {
      resetTabStack(path);
    } else {
      navigateToTab(path);
    }
  };

  const isActive = (path) => {
    if (path === '/') return activeTab === '/' || location.pathname === '/';
    return activeTab === path || location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Spacer to prevent content from being hidden behind tabs */}
      <div className="md:hidden" style={{ height: 'calc(60px + env(safe-area-inset-bottom))' }} />

      {/* Bottom Tabs Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        aria-label="Bottom navigation"
        style={{
          background: 'rgba(248,245,239,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid #DED8CF',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center justify-around" style={{ height: '60px' }}>
          {TABS.map((tab) => {
            const active = isActive(tab.path);
            return (
              <a
                key={tab.path}
                href={tab.path}
                onClick={(e) => handleTabClick(e, tab.path)}
                className="flex flex-col items-center justify-center flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
                style={{
                  minWidth: '44px',
                  minHeight: '44px',
                  textDecoration: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  borderRadius: '4px',
                }}
                aria-label={tab.label}
                aria-current={active ? 'page' : undefined}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: active ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <tab.icon
                    className="w-5 h-5"
                    strokeWidth={active ? 2.5 : 1.8}
                    style={{
                      color: active ? '#6F4A32' : '#655E56',
                      transition: 'color 0.2s ease',
                    }}
                  />
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] uppercase"
                    style={{
                      color: active ? '#6F4A32' : '#655E56',
                      fontWeight: active ? 700 : 400,
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.div>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}