import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import useNoIndex from '@/hooks/useNoIndex';


const RG = '#E6B7AD';

export default function ForgotPassword() {
  useNoIndex();
  useSEO({
    title: 'Reset Password',
    description: 'Reset your Torch Republic Coffee Company account password.',
    url: '/forgot-password',
    noindex: true,
  });

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.auth.resetPasswordRequest(email);
    } catch {
      // Always show success regardless
    } finally {
      setSent(true);
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
            Reset Password
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <p className="font-mono text-[11px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)' }}>
              If an account exists for <span style={{ color: RG + '90' }}>{email}</span>, you'll receive a reset link shortly.
            </p>
            <Link to="/login" className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60" style={{ color: RG + '70', borderBottom: `1px solid ${RG}25` }}>
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="font-mono text-[11px] leading-relaxed mb-4" style={{ color: 'rgba(240,235,225,0.45)' }}>
              Enter your email and we'll send you a link to reset your password.
            </p>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: RG + '70' }}>Email</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 font-mono text-sm outline-none"
                style={{ background: '#1A1A1A', border: `1px solid ${email ? RG + '40' : 'rgba(255,255,255,0.1)'}`, color: '#F0EBE1' }}
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full py-3 font-mono text-[11px] tracking-[0.3em] uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: RG + '18', border: `1px solid ${RG}40`, color: RG }}
            >
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
            <div className="text-center">
              <Link to="/login" className="font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60" style={{ color: 'rgba(240,235,225,0.3)', borderBottom: '1px solid rgba(240,235,225,0.1)' }}>
                Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}