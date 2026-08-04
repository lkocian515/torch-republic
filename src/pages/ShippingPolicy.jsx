import React, { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function ShippingPolicy() {
  useSEO({
    title: 'Shipping Policy | Torch Republic Coffee Company',
    description: 'Find information on Torch Republic order processing times, domestic (U.S.) and international shipping rates, free shipping eligibility, order tracking, and address accuracy.',
    url: '/shipping-policy',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Legal
        </p>
        <h1 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          Shipping Policy
        </h1>

        <div className="space-y-8" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.9, fontSize: '0.95rem', fontWeight: 300 }}>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Processing Time</h2>
            <p>Orders are processed within 1–3 business days (Monday–Friday, excluding holidays). You will receive a shipping confirmation email with tracking information once your order has shipped.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Domestic Shipping (United States)</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Standard Shipping (5–8 business days): calculated at checkout</li>
              <li>Free Standard Shipping on orders $50+</li>
              <li>Expedited options may be available at checkout depending on your location</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>International Shipping</h2>
            <p>At this time, we primarily ship within the United States. If you are interested in international shipping, please contact us at <a href="mailto:admin@torchrepublic.com" style={{ color: RG }}>admin@torchrepublic.com</a> and we will do our best to accommodate your order.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Order Tracking</h2>
            <p>Once your order ships, you will receive an email with a tracking number. You can use this to monitor your delivery status. Please allow up to 24 hours for tracking information to update after you receive your shipping confirmation.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Lost or Delayed Shipments</h2>
            <p>If your order appears lost or significantly delayed, please reach out to us at <a href="mailto:admin@torchrepublic.com" style={{ color: RG }}>admin@torchrepublic.com</a>. We will work with the carrier to resolve the issue and make it right for you.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Address Accuracy</h2>
            <p>Please ensure your shipping address is correct at checkout. Torch Republic Coffee Company is not responsible for orders shipped to incorrect addresses provided by the customer.</p>
          </section>

        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Questions? Contact us
          </p>
          <a href="mailto:admin@torchrepublic.com" style={{ color: RG, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            admin@torchrepublic.com
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