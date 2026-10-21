import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { isRootPath, rootForPath } from '@/lib/navigationRoots';

/**
 * Back arrow for the global header.
 *
 * Renders only on child views — never on a tab root ('/', '/shop', '/profile').
 *
 * Inside a WebView the app can be opened straight into a child page with no
 * history behind it, where a plain go-back would drop the user out of the app.
 * When there is nothing to go back to, we return to the tab the view belongs to.
 */
export default function BackButton({ className = '', label, style }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (isRootPath(pathname)) return null;

  const handleBack = () => {
    const entryIndex = window.history.state?.idx;
    if (typeof entryIndex === 'number' && entryIndex > 0) {
      navigate(-1);
      return;
    }
    navigate(rootForPath(pathname), { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
        minHeight: '44px',
        minWidth: '44px',
        padding: '0 4px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
        ...style,
      }}
    >
      <ChevronLeft className="h-6 w-6" strokeWidth={2} />
      {label && <span className="font-heading" style={{ fontSize: '15px', fontWeight: 500 }}>{label}</span>}
    </button>
  );
}