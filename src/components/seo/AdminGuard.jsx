/**
 * AdminGuard — wraps admin/internal pages.
 * - Injects noindex, nofollow unconditionally (even before auth resolves)
 * - Redirects unauthenticated or non-admin users to the homepage
 * - Never briefly exposes admin content before redirect
 */
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { base44 } from '@/api/base44Client';

export default function AdminGuard({ children }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'allowed' | 'denied'

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

  // Always inject noindex regardless of auth state
  const noIndexHelmet = (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
    </Helmet>
  );

  if (status === 'loading') {
    return (
      <>
        {noIndexHelmet}
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#E6B7AD', borderTopColor: 'transparent' }} />
        </div>
      </>
    );
  }

  if (status === 'denied') {
    return (
      <>
        {noIndexHelmet}
        <Navigate to="/" replace />
      </>
    );
  }

  return (
    <>
      {noIndexHelmet}
      {children}
    </>
  );
}