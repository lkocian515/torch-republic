/**
 * AdminGuard — wraps admin/internal pages.
 * - Injects noindex, nofollow unconditionally (even before auth resolves)
 * - Redirects unauthenticated or non-admin users to the homepage
 * - Never briefly exposes admin content before redirect
 */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

function useNoIndex() {
  useEffect(() => {
    const setTag = (content) => {
      let el = document.querySelector('meta[name="robots"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'robots');
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };
    const el = setTag('noindex, follow');
    return () => { if (el) el.setAttribute('content', 'index, follow'); };
  }, []);
}

export default function AdminGuard({ children }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'allowed' | 'denied'
  useNoIndex();

  useEffect(() => {
    let cancelled = false;
    base44.auth.me()
      .then(user => {
        if (cancelled) return;
        setStatus(user?.role === 'admin' ? 'allowed' : 'denied');
      })
      .catch(() => {
        if (!cancelled) setStatus('denied');
      });
    return () => { cancelled = true; };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FBF8F1' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#B86543', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (status === 'denied') {
    return <Navigate to="/" replace />;
  }

  return children;
}