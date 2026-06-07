import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const RG = '#E6B7AD';

export default function ResetPassword() {
  // Add noindex meta tag on mount
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#111111' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-heading font-black uppercase tracking-[0.2em] text-2xl" style={{ color: '#F0EBE1' }}>
            Torch Republic
          </h1>
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase mt-1" style={{ color: RG + '80' }}>
            New Password
          </p>
        </div>

        {done ? (
          <div className="text-center space-y-4">
            <p className="font-mono text-[11px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)' }}>
              Your password has been reset successfully.
            </p>
            <Link to="/login" className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60" style={{ color: RG + '70', borderBottom: `1px solid ${RG}25` }}>
              Sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: RG + '70' }}>New Password</label>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 font-mono text-sm outline-none"
                style={{ background: '#1A1A1A', border: `1px solid ${password ? RG + '40' : 'rgba(255,255,255,0.1)'}`, color: '#F0EBE1' }}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: RG + '70' }}>Confirm Password</label>
              <input
                type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-3 font-mono text-sm outline-none"
                style={{ background: '#1A1A1A', border: `1px solid ${confirm ? RG + '40' : 'rgba(255,255,255,0.1)'}`, color: '#F0EBE1' }}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="font-mono text-[10px]" style={{ color: '#E06C6C' }}>{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 font-mono text-[11px] tracking-[0.3em] uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: RG + '18', border: `1px solid ${RG}40`, color: RG }}
            >
              {loading ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}