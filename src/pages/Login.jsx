import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';

const RG = '#E6AC45';
const PAGE = '#F7F2E9';
const CARD = '#FFFCF7';
const INK = '#32190F';
const SECONDARY = '#5E4639';
const BORDER = '#B89A6D';
const CLAY = '#9B4E2F';
const ERROR = '#C0392B';

function MicrosoftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
      <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Login() {
  useSEO({
    title: 'Sign In',
    description: 'Sign in to your Torch Republic Coffee Company account.',
    url: '/login',
    noindex: true,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
      setLoading(false);
    }
  };

  const handleProvider = (provider) => {
    base44.auth.loginWithProvider(provider, '/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: PAGE }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-heading font-black uppercase tracking-[0.2em] text-2xl" style={{ color: INK }}>
            Torch Republic
          </h1>
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase mt-1" style={{ color: CLAY }}>
            Sign In
          </p>
        </div>

        {/* Social buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleProvider('google')}
            className="w-full flex items-center justify-center gap-3 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-all hover:opacity-80"
            style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          >
            <GoogleIcon /> Continue with Google
          </button>
          <button
            onClick={() => handleProvider('microsoft')}
            className="w-full flex items-center justify-center gap-3 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-all hover:opacity-80"
            style={{ background: CARD, border: `1px solid ${BORDER}`, color: INK }}
          >
            <MicrosoftIcon /> Continue with Microsoft
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: BORDER }} />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: SECONDARY }}>or</span>
          <div className="flex-1 h-px" style={{ background: BORDER }} />
        </div>

        {/* Email/password form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: SECONDARY }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 font-mono text-sm outline-none transition-all"
              style={{ background: CARD, border: `1px solid ${email ? CLAY : BORDER}`, color: INK }}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: SECONDARY }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 font-mono text-sm outline-none transition-all"
              style={{ background: CARD, border: `1px solid ${password ? CLAY : BORDER}`, color: INK }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-mono text-[10px]" style={{ color: ERROR }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: CLAY, border: `1px solid ${CLAY}`, color: '#FFFCF7' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-between mt-5">
          <Link to="/forgot-password" className="font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60" style={{ color: SECONDARY, borderBottom: `1px solid ${BORDER}` }}>
            Forgot password?
          </Link>
          <Link to="/register" className="font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60" style={{ color: CLAY, borderBottom: `1px solid ${RG}55` }}>
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}