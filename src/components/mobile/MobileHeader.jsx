import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ROOT_PAGES = ['/', '/BestSellers', '/OnSale', '/Collections', '/Contact', '/Mission', '/Profile'];

export default function MobileHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRootPage = ROOT_PAGES.includes(location.pathname);

  if (!isRootPage) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border z-40 md:hidden" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors select-none"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-mono text-xs tracking-widest uppercase">Back</span>
          </button>
          <div className="flex-1 text-center">
            <p className="font-heading text-xs tracking-wider uppercase text-muted-foreground">Torch Republic</p>
          </div>
          <div className="w-12" />
        </div>
      </div>
    );
  }

  return null;
}