import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { COMMERCE_DISABLED_REASON } from '@/lib/commerceConfig';

/**
 * Global, single-instance availability notice. Listens for the
 * 'tr:commerce-unavailable' window event (dispatched by requireCommerce() in
 * lib/commerceGuard.js) and shows one accessible, light-themed dialog with a
 * clear close control. Mounted once in App.jsx. Does not navigate away from the
 * visitor's current page and never routes to a broken checkout.
 */
export default function CommerceNotice() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('tr:commerce-unavailable', handler);
    return () => window.removeEventListener('tr:commerce-unavailable', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="commerce-notice-title"
      style={{ background: 'rgba(45,40,36,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        className="w-full max-w-md"
        style={{ background: '#FFFFFF', border: '1px solid #E4D8C9', borderRadius: '12px', boxShadow: '0 20px 60px rgba(45,40,36,0.18)' }}
      >
        <div className="flex items-start justify-between p-5" style={{ borderBottom: '1px solid #E4D8C9' }}>
          <p id="commerce-notice-title" className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#B86543' }}>
            Checkout Unavailable
          </p>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            aria-label="Close availability notice"
            className="rounded p-1 transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B86543]"
            style={{ color: '#5C544C' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <p className="font-heading text-sm leading-relaxed" style={{ color: '#2D2824' }}>
            {COMMERCE_DISABLED_REASON}
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="btn btn-secondary"
              style={{ borderColor: '#E4D8C9', color: '#B86543' }}
            >
              Close
            </button>
            <Link to="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}