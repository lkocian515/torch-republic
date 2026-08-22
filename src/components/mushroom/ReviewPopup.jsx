import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import openModalRegistry from '@/lib/openModalRegistry';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

// ── Configuration ──────────────────────────────────────────────
const TIME_THRESHOLD_MS = 20_000;      // 20s on site
const SCROLL_THRESHOLD_PCT = 40;       // 40% of page scrolled
const DISMISS_DAYS = 7;                 // hide for 7 days after close
const SEVEN_DAYS_MS = DISMISS_DAYS * 24 * 60 * 60 * 1000;

// localStorage (persistent, 7-day dismissal) + sessionStorage (once-per-session)
const DISMISS_KEY = 'torch_review_popup_dismissed';
const SESSION_KEY = 'torch_review_popup_session';

// Dev-only reset helper — call from the browser console during testing:
//   DEV_REVIEW_POPUP_RESET()  OR
//   localStorage.removeItem('torch_review_popup_dismissed')
//   sessionStorage.removeItem('torch_review_popup_session')
// Kept exported so testers can import it; never wired into the public UI.
export const DEV_REVIEW_POPUP_RESET = () => {
  try {
    localStorage.removeItem(DISMISS_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch { /* noop */ }
};

// Pages where the popup must never appear (purchase/account flow)
const BLOCKED_PATHS = [
  '/cart',
  '/checkout',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/profile',
  '/loyalty',
  '/torchbearers-rewards',
  '/order-confirmation',
  '/subscription',
  '/account',
  '/portfolio',
];

function isBlockedPath(pathname) {
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/email-campaign') ||
    pathname.startsWith('/traffic-report') ||
    pathname.startsWith('/research') ||
    pathname.startsWith('/command')
  ) return true;
  return BLOCKED_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

function readDismiss() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (typeof obj?.expiresAt !== 'number') return null;
    // Expired? Clear it and allow re-show under normal timing rules.
    if (Date.now() >= obj.expiresAt) {
      localStorage.removeItem(DISMISS_KEY);
      return null;
    }
    return obj;
  } catch {
    return null;
  }
}

function writeDismiss() {
  const now = Date.now();
  const rec = { dismissedAt: now, expiresAt: now + SEVEN_DAYS_MS };
  try { localStorage.setItem(DISMISS_KEY, JSON.stringify(rec)); } catch { /* noop */ }
  return rec;
}

export default function ReviewPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAvoidingContent, setIsAvoidingContent] = useState(false);
  const shownThisSessionRef = useRef(false);
  const closeBtnRef = useRef(null);
  const popupRef = useRef(null);

  // Fetch only genuine reviews from the Review entity. The schema does not
  // currently include a verification flag, so the "Verified Customer" badge is
  // rendered ONLY when a record carries a truthy `verified_purchaser` field.
  // (Forward-compatible: when Loox/Judge.me sync adds that flag, badges appear.)
  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ['reviews_popup'],
    queryFn: async () => {
      const reviews = await base44.entities.Review.list('-review_date', 200);
      return reviews.filter((r) => r.rating >= 4 && r.body && r.body.trim().length > 0);
    },
  });

  // Stable shuffle so the popup doesn't reshuffle on every render
  const reviews = useMemo(() => {
    const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  }, [allReviews.length]);

  // ── Decide whether to show the popup ────────────────────────
  useEffect(() => {
    if (isLoading) return;
    if (reviews.length === 0) return;
    if (shownThisSessionRef.current) return;
    if (isBlockedPath(window.location.pathname)) return;

    // Once-per-session guard
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        shownThisSessionRef.current = true;
        return;
      }
    } catch { /* noop */ }

    // 7-day persistent dismissal (close-button behavior)
    if (readDismiss()) return;

    let canceled = false;
    let timeTimer;
    let scrollHandler;
    let pollTimer;

    const trigger = () => {
      if (canceled) return;

      // Do not show while another modal/promo/email/cookie banner is open
      if (openModalRegistry.hasOpen('review_popup')) {
        if (pollTimer === undefined) pollTimer = setTimeout(trigger, 3000);
        return;
      }

      // Extra DOM safety: if any Radix dialog, sheet, or cookie banner is open
      const otherOpen =
        document.querySelector('[role="dialog"][data-state="open"]') !== null ||
        document.querySelector('[data-cookie-banner="true"]') !== null;
      if (otherOpen) {
        if (pollTimer === undefined) pollTimer = setTimeout(trigger, 3000);
        return;
      }

      canceled = true;
      cleanup();
      shownThisSessionRef.current = true;
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* noop */ }
      setIsOpen(true);
    };

    const cleanup = () => {
      if (timeTimer) clearTimeout(timeTimer);
      if (pollTimer) clearTimeout(pollTimer);
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler, { passive: true });
    };

    // Time rule — 20s on site
    timeTimer = setTimeout(trigger, TIME_THRESHOLD_MS);

    // Scroll rule — 40% of page
    const onScroll = () => {
      const scrollPct =
        (window.scrollY /
          Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPct >= SCROLL_THRESHOLD_PCT) trigger();
    };
    scrollHandler = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    // Also evaluate once in case the page is short / already scrolled
    onScroll();

    return () => {
      canceled = true;
      cleanup();
    };
  }, [isLoading, reviews.length]);

  // ── Auto-rotate through reviews (only while open) ────────────
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isOpen, reviews.length]);

  // ── Register popup while open so other popups defer to it ────
  useEffect(() => {
    if (!isOpen) return;
    const unregister = openModalRegistry.register('review_popup');
    return () => unregister();
  }, [isOpen]);

  // ── Focus + Escape handling for accessibility ────────────────
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(() => closeBtnRef.current?.focus(), 80);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      clearTimeout(id);
      window.removeEventListener('keydown', onKey, true);
    };
  }, [isOpen]);

  // ── Avoid covering newsletter and footer content ─────────────
  useEffect(() => {
    if (!isOpen) {
      setIsAvoidingContent(false);
      return;
    }

    const updateAvoidance = () => {
      const newsletter = document.getElementById('homepage-email')?.closest('section');
      const footer = document.querySelector('footer');
      const avoidElements = [newsletter, footer].filter(Boolean);
      const shouldAvoid = avoidElements.some((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > window.innerHeight - 280;
      });
      setIsAvoidingContent(shouldAvoid);
      if (shouldAvoid && popupRef.current?.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    };

    updateAvoidance();
    window.addEventListener('scroll', updateAvoidance, { passive: true });
    window.addEventListener('resize', updateAvoidance);
    return () => {
      window.removeEventListener('scroll', updateAvoidance);
      window.removeEventListener('resize', updateAvoidance);
    };
  }, [isOpen]);

  // ── Close → store 7-day dismissal (NOT forever) ──────────────
  const close = useCallback(() => {
    setIsOpen(false);
    writeDismiss();
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  if (isLoading || reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  // Genuine reviews only — already guaranteed by the query filter.
  // The "Verified Customer" badge shows only when a verification flag exists.
  const isVerified = Boolean(currentReview.verified_purchaser);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isAvoidingContent ? 0 : 1, x: isAvoidingContent ? -20 : 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          ref={popupRef}
          className="fixed bottom-0 left-0 z-40 m-2 md:m-4 lg:m-6"
          // Sit above the mobile bottom tab bar so the popup never covers
          // nav or purchase buttons.
          style={{
            paddingBottom: 'calc(env(safe-area-inset-bottom) + 86px)',
            pointerEvents: isAvoidingContent ? 'none' : 'auto',
          }}
          role="dialog"
          aria-modal="false"
          aria-hidden={isAvoidingContent}
          aria-label="Customer review"
        >
          <div
            className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-sm"
            style={{
              background: '#F8F5EF',
              border: `1px solid ${RG}40`,
              borderRadius: '10px',
              boxShadow: '0 8px 28px rgba(63,48,39,0.14), 0 2px 6px rgba(63,48,39,0.08)',
            }}
          >
            {/* Accessible close button */}
            <button
              ref={closeBtnRef}
              onClick={close}
              aria-label="Close review popup"
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
              style={{ color: RG }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="p-3">
              {/* Header */}
              <div className="mb-2.5">
                <p
                  className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mb-1.5"
                  style={{ color: RG }}
                >
                  Review
                </p>
                <div className="flex items-center gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-current"
                      style={{ color: i < currentReview.rating ? GOLD : 'rgba(63,48,39,0.18)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Review content */}
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <blockquote
                  className="font-heading mb-2.5"
                  style={{
                    fontSize: '0.8125rem',
                    color: '#3F3027',
                    lineHeight: 1.55,
                  }}
                >
                  "{currentReview.body.length > 140 ? currentReview.body.substring(0, 140) + '...' : currentReview.body}"
                </blockquote>

                {/* Reviewer info */}
                <div className="flex items-center justify-between pt-2" style={{ borderTop: `1px solid ${RG}25` }}>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p
                      className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-bold truncate"
                      style={{ color: '#3F3027' }}
                    >
                      {currentReview.reviewer_name}
                    </p>
                    {isVerified && (
                      <span
                        className="font-mono text-[8px] sm:text-[9px] tracking-[0.12em] uppercase"
                        style={{ color: RG }}
                      >
                        Verified Customer
                      </span>
                    )}
                  </div>
                  {currentReview.review_date && (
                    <p
                      className="font-mono text-[8px] sm:text-[9px] tracking-[0.12em] uppercase ml-2 shrink-0"
                      style={{ color: '#6A5A4A' }}
                    >
                      {new Date(currentReview.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Navigation */}
              {reviews.length > 1 && (
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous review"
                    className="p-1 rounded-full transition-all hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
                    style={{ color: RG }}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {reviews.map((_, idx) => (
                      <div
                        key={idx}
                        className="transition-all"
                        style={{
                          width: idx === currentIndex ? '10px' : '4px',
                          height: '4px',
                          borderRadius: '2px',
                          background: idx === currentIndex ? RG : 'rgba(63,48,39,0.2)',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    aria-label="Next review"
                    className="p-1 rounded-full transition-all hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
                    style={{ color: RG }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}