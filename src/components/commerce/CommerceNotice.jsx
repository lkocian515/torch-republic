import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import {
  COMMERCE_DISABLED_TITLE,
  COMMERCE_DISABLED_REASON,
  PRODUCT_SOLD_OUT_TITLE,
} from '@/lib/commerceConfig';

const ITEMS_UNAVAILABLE_TITLE = 'Not Available for Online Checkout';
const ITEMS_UNAVAILABLE_PREFIX = 'is not yet available for online checkout. We are adding it to our online store — please check back soon, or remove it from your cart to proceed with other items.';

/**
 * Global, single-instance commerce notice. Listens for two events:
 *
 * 1. 'tr:commerce-unavailable' — dispatched by requireCommerce() when
 *    COMMERCE_ENABLED is false. Shows "Checkout Temporarily Unavailable"
 *    — does NOT claim products are sold out.
 *
 * 2. 'tr:product-sold-out' — dispatched when Shopify explicitly reports
 *    that a selected variant is unavailable for sale. Shows "Product Sold
 *    Out" with the product name.
 *
 * Mounted once in App.jsx. Does not navigate away from the visitor's
 * current page and never routes to a broken or external checkout.
 */
export default function CommerceNotice() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('checkout-unavailable');
  const [productTitle, setProductTitle] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const handleCommerceUnavailable = () => {
      setMode('checkout-unavailable');
      setProductTitle(null);
      setOpen(true);
    };
    const handleProductSoldOut = (e) => {
      setMode('sold-out');
      setProductTitle(e?.detail?.productTitle || null);
      setOpen(true);
    };
    const handleItemsUnavailable = (e) => {
      setMode('items-unavailable');
      setProductTitle(e?.detail?.productNames?.join(', ') || null);
      setOpen(true);
    };
    window.addEventListener('tr:commerce-unavailable', handleCommerceUnavailable);
    window.addEventListener('tr:product-sold-out', handleProductSoldOut);
    window.addEventListener('tr:checkout-items-unavailable', handleItemsUnavailable);
    return () => {
      window.removeEventListener('tr:commerce-unavailable', handleCommerceUnavailable);
      window.removeEventListener('tr:product-sold-out', handleProductSoldOut);
      window.removeEventListener('tr:checkout-items-unavailable', handleItemsUnavailable);
    };
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

  const isSoldOut = mode === 'sold-out';
  const isItemsUnavailable = mode === 'items-unavailable';
  const title = isItemsUnavailable
    ? ITEMS_UNAVAILABLE_TITLE
    : isSoldOut
      ? PRODUCT_SOLD_OUT_TITLE
      : COMMERCE_DISABLED_TITLE;
  const message = isItemsUnavailable
    ? (productTitle
      ? `${productTitle} ${ITEMS_UNAVAILABLE_PREFIX}`
      : `Some items in your cart ${ITEMS_UNAVAILABLE_PREFIX}`)
    : isSoldOut
      ? (productTitle
        ? `${productTitle} is currently unavailable for purchase. Please check back soon.`
        : 'This product is currently unavailable for purchase. Please check back soon.')
      : COMMERCE_DISABLED_REASON;
  const titleId = isItemsUnavailable ? 'items-unavailable-title' : isSoldOut ? 'sold-out-title' : 'checkout-unavailable-title';

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{ background: 'rgba(45,40,36,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        className="w-full max-w-md"
        style={{ background: '#FFFCF7', border: '1px solid #B89A6D', borderRadius: '12px', boxShadow: '0 20px 60px rgba(45,40,36,0.18)' }}
      >
        <div className="flex items-start justify-between p-5" style={{ borderBottom: '1px solid #B89A6D' }}>
          <p id={titleId} className="font-serif font-bold" style={{ fontSize: '1.15rem', color: '#32190F' }}>
            {title}
          </p>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="rounded p-1 transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B4E2F]"
            style={{ color: '#5C544C' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <p className="font-heading text-sm leading-relaxed mb-5" style={{ color: '#32190F' }}>
            {message}
          </p>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="btn btn-secondary"
              style={{ borderColor: '#B89A6D', color: '#5C544C' }}
            >
              Close
            </button>
            <Link to="/shop" className="btn btn-primary" onClick={() => setOpen(false)}>
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}