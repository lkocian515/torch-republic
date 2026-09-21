import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Check, ShoppingBag, Loader2, Mail, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { trackEvent, getStoredUTM } from '@/lib/analyticsEvents';
import openModalRegistry from '@/lib/openModalRegistry';
import { PRIZES, SLICE_DEG, getSliceIndexById } from '@/lib/spinWheel/prizeConfig';
import {
  isSuppressed,
  isSessionDismissed,
  markSessionDismissed,
  markDismissed,
  markCompleted,
} from '@/lib/spinWheel/spinWheelStorage';
import SpinWheel from '@/components/spinwheel/SpinWheel';

const CLAY = '#B86543';
const INK = '#2D2824';
const BODY = '#6A5A4A';
const CARD = '#FFFFFF';
const CREAM = '#FBF8F2';
const BORDER = '#E4D8C9';
const GOLD = '#D6B27A';

const EXCLUDED_ROUTES = [
  '/cart', '/checkout', '/profile', '/loyalty', '/order-status',
  '/login', '/register', '/forgot-password', '/reset-password',
  '/admin', '/email-campaign', '/order-confirmation', '/restocking',
  '/portfolio',
];

const isExcludedRoute = () => {
  // Never show the spin wheel on the portfolio domain (lisakocian.com)
  if (typeof window !== 'undefined' && /lisakocian\.com$/.test(window.location.hostname)) return true;
  const path = window.location.pathname;
  return EXCLUDED_ROUTES.some((r) => path === r || path.startsWith(r + '/') || path.startsWith(r));
};

// ── Development-only diagnostic logging ──────────────────────────────────────
// Set SPIN_WHEEL_DEBUG = false before production publication.
// In Vite production builds, import.meta.env.DEV is false so logs are stripped.
const SPIN_WHEEL_DEBUG = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
const debug = (label, value) => {
  if (!SPIN_WHEEL_DEBUG) return;
  // Never log emails, discount codes, tokens, or customer information
  console.debug('[SpinWheel] ' + label, value === undefined ? '' : value);
};

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());

const deviceCategory = () =>
  /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

export default function SpinWheelPopup() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [triggerType, setTriggerType] = useState(null);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [step, setStep] = useState('idle');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [resendStatus, setResendStatus] = useState(null);
  const [liveMessage, setLiveMessage] = useState('');
  const [rotation, setRotation] = useState(0);

  const dialogRef = useRef(null);
  const previousFocus = useRef(null);
  const animRef = useRef(null);
  const closeModalRef = useRef(null);
  const stepRef = useRef('idle');
  stepRef.current = step;

  // ── Trigger logic: 8s timer OR 35% scroll, whichever first ──────────────
  useEffect(() => {
    debug('component mounted');
    debug('pathname', window.location.pathname);

    const routeEligible = !isExcludedRoute();
    debug('route eligible', routeEligible);
    if (!routeEligible) return;

    const suppressed = isSuppressed();
    const sessionDismissed = isSessionDismissed();
    debug('suppression record found', suppressed || sessionDismissed);
    if (suppressed || sessionDismissed) return;

    let triggered = false;

    const trigger = (type) => {
      if (triggered) return;
      if (openModalRegistry.hasOpen()) return;
      triggered = true;
      debug('open condition reached', type);
      setTriggerType(type);
      checkStatusAndShow(type);
    };

    debug('timer trigger registered');
    const timer = setTimeout(() => trigger('timer'), 8000);

    debug('scroll trigger registered');
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrollPct = (window.scrollY / scrollable) * 100;
      if (scrollPct >= 35) trigger('scroll');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkStatusAndShow = async (type) => {
    try {
      const res = await base44.functions.invoke('processSpinWheel', { action: 'status' });
      const data = res.data || res;
      debug('configuration enabled', data.enabled);
      if (data.enabled) {
        debug('modal opened');
        setVisible(true);
        trackEvent(
          'wheel_impression',
          { trigger_type: type, page_path: window.location.pathname, device_category: deviceCategory() },
          'wheel_impression'
        );
      }
    } catch (err) {
      debug('configuration error', 'status check failed');
    }
  };

  // ── Dismiss (stable, uses refs) ─────────────────────────────────────────
  const dismiss = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    trackEvent(
      'wheel_dismissed',
      { page_path: window.location.pathname, device_category: deviceCategory() },
      'wheel_dismissed'
    );
    if (stepRef.current === 'spinning' || stepRef.current === 'result') {
      markCompleted();
    } else {
      markDismissed();
    }
    setVisible(false);
  }, []);

  // ── Modal open: register, lock scroll, focus trap, Escape ────────────────
  useEffect(() => {
    if (!visible) return;

    const unregister = openModalRegistry.register('spin_wheel');
    previousFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (closeModalRef.current) closeModalRef.current.focus();
      else if (dialogRef.current) dialogRef.current.focus();
    }, 100);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      unregister();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus.current && previousFocus.current.focus) {
        try {
          previousFocus.current.focus();
        } catch (_) {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // ── Spin ──────────────────────────────────────────────────────────────────
  const handleSpin = async (e) => {
    if (e) e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      setEmailError('Please enter a valid email address.');
      trackEvent('wheel_error', {
        reason: 'invalid_email',
        page_path: window.location.pathname,
        device_category: deviceCategory(),
      });
      return;
    }

    setEmailError(null);
    setStep('loading');
    trackEvent(
      'wheel_email_submitted',
      {
        consent_status: consent ? 'opted_in' : 'opted_out',
        page_path: window.location.pathname,
        device_category: deviceCategory(),
      },
      'wheel_email_submitted'
    );

    try {
      const utm = getStoredUTM() || {};
      const res = await base44.functions.invoke('processSpinWheel', {
        action: 'spin',
        email: normalizedEmail,
        consent,
        utm: {
          utm_source: utm.utm_source || null,
          utm_medium: utm.utm_medium || null,
          utm_campaign: utm.utm_campaign || null,
          utm_content: utm.utm_content || null,
          utm_term: utm.utm_term || null,
        },
      });
      const data = res.data || res;

      if (data.status === 'already_participated') {
        setStep('already_participated');
        setLiveMessage('Looks like you have already spun. Check your inbox for your Torch Republic offer.');
        return;
      }

      if (data.status === 'error') {
        setStep('error');
        setLiveMessage('Something went wrong. Please try again.');
        trackEvent('wheel_error', {
          reason: data.reason || 'unknown',
          page_path: window.location.pathname,
          device_category: deviceCategory(),
        });
        return;
      }

      if (data.status === 'won') {
        trackEvent(
          'wheel_spin_started',
          { prize_id: data.prize_id, page_path: window.location.pathname, device_category: deviceCategory() },
          'wheel_spin_started'
        );

        const sliceIdx = getSliceIndexById(data.prize_id);
        setResult(data);
        animateSpin(sliceIdx, () => {
          setStep('result');
          setLiveMessage(`You won ${data.label}. Your discount code is ${data.code}.`);
          trackEvent(
            'wheel_spin_completed',
            { prize_id: data.prize_id, page_path: window.location.pathname, device_category: deviceCategory() },
            'wheel_spin_completed'
          );
          trackEvent(
            'wheel_prize_awarded',
            { prize_id: data.prize_id, page_path: window.location.pathname, device_category: deviceCategory() },
            'wheel_prize_awarded'
          );
          markCompleted();
        });
      }
    } catch (err) {
      setStep('error');
      setLiveMessage('Something went wrong. Please try again.');
      trackEvent('wheel_error', {
        reason: 'network',
        page_path: window.location.pathname,
        device_category: deviceCategory(),
      });
    }
  };

  const animateSpin = (targetSliceIdx, onComplete) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sliceCenter = targetSliceIdx * SLICE_DEG + SLICE_DEG / 2;
    const targetMod = (((360 - sliceCenter) % 360) + 360) % 360;

    if (prefersReducedMotion) {
      setRotation(targetMod);
      setStep('spinning');
      setLiveMessage('Revealing your prize.');
      setTimeout(onComplete, 600);
      return;
    }

    setStep('spinning');
    setLiveMessage('The wheel is spinning.');

    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = (targetMod - currentMod + 360) % 360;
    if (delta === 0) delta = 360;
    const fullTurns = 5 * 360;
    const jitter = (Math.random() - 0.5) * 30;
    const totalDelta = fullTurns + delta + jitter;
    const startRotation = rotation;
    const duration = 4500;
    let startTime = null;

    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRotation(startRotation + totalDelta * eased);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setRotation(startRotation + totalDelta);
        onComplete();
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  // ── Copy code ──────────────────────────────────────────────────────────────
  const copyCode = async () => {
    if (!result?.code) return;
    try {
      await navigator.clipboard.writeText(result.code);
    } catch (_) {
      const textArea = document.createElement('textarea');
      textArea.value = result.code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
    trackEvent(
      'wheel_code_copied',
      { prize_id: result.prize_id, page_path: window.location.pathname, device_category: deviceCategory() },
      'wheel_code_copied'
    );
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Shop coffee ────────────────────────────────────────────────────────────
  const handleShopClick = () => {
    trackEvent(
      'wheel_shop_clicked',
      { prize_id: result?.prize_id, page_path: window.location.pathname, device_category: deviceCategory() },
      'wheel_shop_clicked'
    );
    setVisible(false);
    document.body.style.overflow = '';
    navigate('/shop');
  };

  // ── Resend email ───────────────────────────────────────────────────────────
  const handleResendEmail = async () => {
    if (!result) return;
    setResendStatus('sending');
    try {
      const res = await base44.functions.invoke('processSpinWheel', {
        action: 'resend',
        email: email.trim().toLowerCase(),
      });
      const data = res.data || res;
      setResendStatus(data.emailSent ? 'sent' : 'failed');
    } catch (_) {
      setResendStatus('failed');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) dismiss();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(45,40,36,0.5)', backdropFilter: 'blur(6px)' }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="spinwheel-title"
            aria-describedby="spinwheel-desc"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full overflow-hidden flex flex-col"
            style={{
              maxWidth: '900px',
              maxHeight: '90vh',
              background: CREAM,
              border: `1px solid ${BORDER}`,
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(45,40,36,0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button — always functional */}
            <button
              ref={closeModalRef}
              onClick={dismiss}
              aria-label="Close spin to win"
              className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-all hover:opacity-70"
              style={{ background: 'rgba(45,40,36,0.06)', color: INK, border: `1px solid ${BORDER}` }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto" style={{ maxHeight: '90vh' }}>
              <div className="flex flex-col md:flex-row">
                {/* Left: Wheel */}
                <div
                  className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
                  style={{ background: `linear-gradient(180deg, ${CREAM} 0%, #F5EFE6 100%)` }}
                >
                  <div style={{ width: '100%', maxWidth: '260px' }}>
                    <SpinWheel prizes={PRIZES} rotation={rotation} />
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center min-h-[280px]">
                  {/* Screen-reader live region */}
                  <div aria-live="polite" className="sr-only">
                    {liveMessage}
                  </div>

                  {step === 'idle' && (
                    <>
                      <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: CLAY }}>
                        A Better Morning Awaits
                      </p>
                      <h2 id="spinwheel-title" className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 1.2rem + 1.2vw, 2rem)', lineHeight: 1.15, color: INK }}>
                        Spin for a little something extra
                      </h2>
                      <p id="spinwheel-desc" className="font-heading text-sm mb-6" style={{ color: BODY, lineHeight: 1.7 }}>
                        Enter your email, spin the wheel, and reveal an offer for your next Torch Republic coffee order.
                      </p>

                      <form onSubmit={handleSpin} className="flex flex-col gap-3">
                        <label htmlFor="spinwheel-email" className="sr-only">
                          Your email address
                        </label>
                        <input
                          id="spinwheel-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(null);
                          }}
                          placeholder="Your email address"
                          required
                          aria-invalid={!!emailError}
                          aria-describedby={emailError ? 'spinwheel-email-error' : undefined}
                          className="w-full px-4 py-3 text-sm outline-none"
                          style={{
                            background: CARD,
                            border: `1px solid ${emailError ? CLAY : BORDER}`,
                            color: INK,
                            borderRadius: '10px',
                          }}
                        />
                        {emailError && (
                          <p id="spinwheel-email-error" className="text-xs" style={{ color: CLAY }} role="alert">
                            {emailError}
                          </p>
                        )}

                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="mt-0.5"
                            style={{ accentColor: CLAY }}
                          />
                          <span className="font-heading text-xs" style={{ color: BODY, lineHeight: 1.5 }}>
                            Send me occasional Torch Republic offers and coffee updates.
                          </span>
                        </label>

                        <button
                          type="submit"
                          className="w-full py-3.5 font-mono font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-85"
                          style={{ fontSize: '11px', background: CLAY, color: CREAM, borderRadius: '999px' }}
                        >
                          Unlock My Spin
                        </button>
                      </form>

                      <p className="font-mono text-[9px] mt-4" style={{ color: BODY, lineHeight: 1.6, opacity: 0.8 }}>
                        We'll email your prize so you don't lose it. Joining our coffee notes is optional.
                      </p>
                    </>
                  )}

                  {step === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin mb-3" style={{ color: CLAY }} />
                      <p className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: BODY }}>
                        Preparing your spin...
                      </p>
                    </div>
                  )}

                  {step === 'spinning' && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="font-mono text-xs tracking-[0.15em] uppercase animate-pulse" style={{ color: CLAY }}>
                        Spinning...
                      </p>
                    </div>
                  )}

                  {step === 'result' && result && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: CLAY }}>
                        You won
                      </p>
                      <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.6rem, 1.3rem + 1.2vw, 2.2rem)', lineHeight: 1.1, color: INK }}>
                        {result.label}
                      </h2>
                      <p className="font-heading text-sm mb-5" style={{ color: BODY, lineHeight: 1.7 }}>
                        Your offer is ready for your next coffee order.
                      </p>

                      <div className="mb-4" style={{ background: CARD, border: `1px dashed ${CLAY}`, borderRadius: '10px', padding: '14px 16px' }}>
                        <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: CLAY }}>
                          Your code
                        </p>
                        <p className="font-mono font-bold tracking-[0.15em]" style={{ fontSize: '1.3rem', color: INK }}>
                          {result.code}
                        </p>
                      </div>

                      {result.minPurchase && (
                        <p className="font-heading text-xs mb-2" style={{ color: BODY }}>
                          Minimum order of ${result.minPurchase} required.
                        </p>
                      )}
                      <p className="font-heading text-xs mb-4" style={{ color: BODY }}>
                        {result.expiresText}. Enter this code at Shopify checkout. Cannot be combined with other offers.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-2 mb-3">
                        <button
                          onClick={copyCode}
                          className="flex-1 py-3 font-mono font-bold uppercase tracking-[0.15em] transition-opacity hover:opacity-85"
                          style={{ fontSize: '10px', background: CARD, color: INK, border: `1px solid ${BORDER}`, borderRadius: '999px' }}
                        >
                          {copied ? (
                            <>
                              <Check className="inline w-3.5 h-3.5 mr-1" /> Copied!
                            </>
                          ) : (
                            'Copy Code'
                          )}
                        </button>
                        <button
                          onClick={handleShopClick}
                          className="flex-1 py-3 font-mono font-bold uppercase tracking-[0.15em] transition-opacity hover:opacity-85"
                          style={{ fontSize: '10px', background: CLAY, color: CREAM, borderRadius: '999px' }}
                        >
                          <ShoppingBag className="inline w-3.5 h-3.5 mr-1" /> Shop Coffee
                        </button>
                      </div>

                      {result.emailSent ? (
                        <p className="font-mono text-[9px]" style={{ color: BODY }}>
                          <Check className="inline w-3 h-3 mr-1" /> We emailed your code to {email}.
                        </p>
                      ) : (
                        <div className="mt-2">
                          <p className="font-heading text-xs mb-2" style={{ color: BODY }}>
                            We couldn't email your code right now.
                          </p>
                          <button
                            onClick={handleResendEmail}
                            disabled={resendStatus === 'sending'}
                            className="font-mono text-[10px] uppercase tracking-[0.15em] underline transition-opacity hover:opacity-70 disabled:opacity-50"
                            style={{ color: CLAY }}
                          >
                            {resendStatus === 'sending'
                              ? 'Sending...'
                              : resendStatus === 'sent'
                              ? 'Email sent!'
                              : resendStatus === 'failed'
                              ? 'Try again'
                              : 'Resend email'}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {step === 'already_participated' && (
                    <div className="text-center py-6">
                      <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: GOLD }} />
                      <h2 className="font-serif font-bold mb-3" style={{ fontSize: '1.4rem', color: INK }}>
                        You've already spun!
                      </h2>
                      <p className="font-heading text-sm" style={{ color: BODY, lineHeight: 1.7 }}>
                        Looks like you've already spun. Check your inbox for your Torch Republic offer.
                      </p>
                      <button
                        onClick={dismiss}
                        className="mt-5 py-3 px-6 font-mono font-bold uppercase tracking-[0.15em]"
                        style={{ fontSize: '10px', background: CLAY, color: CREAM, borderRadius: '999px' }}
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}

                  {step === 'error' && (
                    <div className="text-center py-6">
                      <AlertCircle className="w-8 h-8 mx-auto mb-3" style={{ color: CLAY }} />
                      <h2 className="font-serif font-bold mb-3" style={{ fontSize: '1.3rem', color: INK }}>
                        Something went wrong
                      </h2>
                      <p className="font-heading text-sm mb-5" style={{ color: BODY, lineHeight: 1.7 }}>
                        We couldn't process your spin. Please try again.
                      </p>
                      <button
                        onClick={() => {
                          setStep('idle');
                          setEmailError(null);
                        }}
                        className="py-3 px-6 font-mono font-bold uppercase tracking-[0.15em]"
                        style={{ fontSize: '10px', background: CLAY, color: CREAM, borderRadius: '999px' }}
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}