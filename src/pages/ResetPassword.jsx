import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import useNoIndex from '@/hooks/useNoIndex';

const RG = '#E6B7AD';
const PAGE = '#FBF8F2';
const CARD = '#FFFFFF';
const INK = '#2D2824';
const SECONDARY = '#5F574F';
const BORDER = '#E4D8C9';
const CLAY = '#B7653E';
const ERROR = '#C0392B';

export default function ResetPassword() {
  useNoIndex();
  useSEO({
    title: 'New Password',
    description: 'Set your new Torch Republic Coffee Company password.',
    url: '/reset-password',
    noindex: true,
  });

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const resetToken = new URLSearchParams(window.location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match.');
    setLoading(true);
    try {
      await base44.auth.resetPassword({ resetToken, newPassword: password });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Reset failed. The link may have expired.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: PAGE }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-heading font-black uppercase tracking-[0.2em] text-2xl" style={{ color: INK }}>
            Torch Republic
          </h1>
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase mt-1" style={{ color: CLAY }}>
            New Password
          </p>
        </div>

        {done ? (
          <div className="text-center space-y-4">
            <p className="font-mono text-[11px] leading-relaxed" style={{ color: SECONDARY }}>
              Your password has been reset successfully.
            </p>
            <Link to="/login" className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60" style={{ color: CLAY, borderBottom: `1px solid ${RG}55` }}>
              Sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: SECONDARY }}>New Password</label>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 font-mono text-sm outline-none transition-all"
                style={{ background: CARD, border: `1px solid ${password ? CLAY : BORDER}`, color: INK }}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: SECONDARY }}>Confirm Password</label>
              <input
                type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-3 font-mono text-sm outline-none transition-all"
                style={{ background: CARD, border: `1px solid ${confirm ? CLAY : BORDER}`, color: INK }}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="font-mono text-[10px]" style={{ color: ERROR }}>{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: CLAY, border: `1px solid ${CLAY}`, color: '#FFFFFF' }}
            >
              {loading ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}