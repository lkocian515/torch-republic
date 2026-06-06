import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const RG = '#E6B7AD';

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

export default function Register() {
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProvider = (provider) => {
    base44.auth.loginWithProvider(provider, '/');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match.');
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await base44.auth.verifyOtp({ email, otpCode: otp });
      base44.auth.setToken(res.access_token);
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Invalid code. Please try again.');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await base44.auth.resendOtp(email);
      setError('');
    } catch {
      // silently ignore
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#111111' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-heading font-black uppercase tracking-[0.2em] text-2xl" style={{ color: '#F0EBE1' }}>
            Torch Republic
          </h1>
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase mt-1" style={{ color: RG + '80' }}>
            {step === 'otp' ? 'Verify Email' : 'Create Account'}
          </p>
        </div>

        {step === 'form' && (
          <>
            {/* Social buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleProvider('google')}
                className="w-full flex items-center justify-center gap-3 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-80"
                style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,235,225,0.75)' }}
              >
                <GoogleIcon /> Continue with Google
              </button>
              <button
                onClick={() => handleProvider('microsoft')}
                className="w-full flex items-center justify-center gap-3 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-80"
                style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,235,225,0.75)' }}
              >
                <MicrosoftIcon /> Continue with Microsoft
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(240,235,225,0.25)' }}>or</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: RG + '70' }}>Email</label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 font-mono text-sm outline-none"
                  style={{ background: '#1A1A1A', border: `1px solid ${email ? RG + '40' : 'rgba(255,255,255,0.1)'}`, color: '#F0EBE1' }}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: RG + '70' }}>Password</label>
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
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>

            <p className="text-center mt-5 font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.3)' }}>
              Already have an account?{' '}
              <Link to="/login" className="transition-opacity hover:opacity-60" style={{ color: RG + '80', borderBottom: `1px solid ${RG}25` }}>
                Sign in
              </Link>
            </p>
          </>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerify} className="space-y-5">
            <p className="font-mono text-[11px] leading-relaxed text-center" style={{ color: 'rgba(240,235,225,0.5)' }}>
              We sent a verification code to <span style={{ color: RG + '90' }}>{email}</span>. Enter it below.
            </p>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.35em] uppercase mb-1.5" style={{ color: RG + '70' }}>Verification Code</label>
              <input
                type="text" required value={otp} onChange={e => setOtp(e.target.value)}
                className="w-full px-4 py-3 font-mono text-lg text-center tracking-[0.5em] outline-none"
                style={{ background: '#1A1A1A', border: `1px solid ${otp ? RG + '40' : 'rgba(255,255,255,0.1)'}`, color: '#F0EBE1' }}
                placeholder="000000"
                maxLength={6}
              />
            </div>

            {error && <p className="font-mono text-[10px]" style={{ color: '#E06C6C' }}>{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full py-3 font-mono text-[11px] tracking-[0.3em] uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: RG + '18', border: `1px solid ${RG}40`, color: RG }}
            >
              {loading ? 'Verifying…' : 'Verify Email'}
            </button>

            <button type="button" onClick={handleResend}
              className="w-full font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
              style={{ color: 'rgba(240,235,225,0.3)' }}>
              Resend code
            </button>
          </form>
        )}
      </div>
    </div>
  );
}