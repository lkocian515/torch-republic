import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const TABS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomTabs() {
  const location = useLocation();
  
  // Only show on mobile and on specific routes
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Spacer to prevent content from being hidden behind tabs */}
      <div className="md:hidden" style={{ height: 'calc(60px + env(safe-area-inset-bottom))' }} />
      
      {/* Bottom Tabs Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `1px solid ${RG}20`,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center justify-around" style={{ height: '60px' }}>
          {TABS.map((tab) => {
            const active = isActive(tab.path);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="flex flex-col items-center justify-center flex-1"
                style={{
                  minWidth: '44px',
                  minHeight: '44px',
                  textDecoration: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
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
                      color: active ? RG : 'rgba(240,235,225,0.5)',
                      transition: 'color 0.2s ease',
                    }}
                  />
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] uppercase"
                    style={{
                      color: active ? RG : 'rgba(240,235,225,0.4)',
                      fontWeight: active ? 700 : 400,
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}