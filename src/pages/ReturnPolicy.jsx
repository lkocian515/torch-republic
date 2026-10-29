import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function ReturnPolicy() {
  useSEO({
    title: 'Return & Refund Policy | Torch Republic Coffee Company',
    description: 'Learn about the Torch Republic 30-day First Cup Guarantee, return eligibility, refund processing, and how to handle damaged or incorrect orders.',
    url: '/return-policy',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Legal
        </p>
        <h1 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          Return &amp; Refund Policy
        </h1>

        <div className="space-y-8" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.9, fontSize: '0.95rem', fontWeight: 300 }}>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>First Cup Guarantee</h2>
            <p>We stand behind every blend. If you're not satisfied with your first order, contact us within 30 days of purchase and we'll make it right — refund or replacement, no hassle, no hard feelings.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Eligibility</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Requests must be made within 30 days of the delivery date</li>
              <li>Items must be in original or gently used condition</li>
              <li>Sale items and gift cards are non-refundable</li>
              <li>Subscription orders follow the same 30-day policy for your first shipment</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>How to Start a Return</h2>
            <p>Email us at <a href="mailto:info@torchrepublic.com" style={{ color: RG }}>info@torchrepublic.com</a> with your order number and reason for the return. We'll respond within 1–2 business days with instructions.</p>
            <p className="mt-3">You do not need to ship the product back for first-order refund requests under the First Cup Guarantee.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Refund Processing</h2>
            <p>Once your refund is approved, it will be processed to your original payment method within 5–10 business days, depending on your bank or card issuer.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Damaged or Incorrect Orders</h2>
            <p>If your order arrived damaged or you received the wrong item, please email us within 7 days of delivery with a photo and we'll send a replacement or issue a full refund at no cost to you.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Subscriptions</h2>
            <p>Subscription orders can be paused, skipped, or cancelled at any time through your account portal or by contacting us. Cancellations made before the next billing cycle will not be charged for that cycle.</p>
          </section>

        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Questions? Contact us
          </p>
          <a href="mailto:info@torchrepublic.com" style={{ color: RG, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            info@torchrepublic.com
          </a>
          <div className="mt-6">
            <Link to="/" className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.45)', textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}