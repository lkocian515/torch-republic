import React, { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | Torch Republic Coffee Company',
    description: 'Read the Torch Republic Coffee Company privacy policy to understand how we collect, use, and protect your personal information, including order details, browsing data, and email subscriptions.',
    url: '/privacy-policy',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Legal
        </p>
        <h1 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          Privacy Policy
        </h1>
        <p className="font-mono text-[9px] tracking-[0.15em] mb-8" style={{ color: 'rgba(230,183,173,0.35)' }}>
          Last updated: June 2026
        </p>

        <div className="space-y-8" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.9, fontSize: '0.95rem', fontWeight: 300 }}>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Information We Collect</h2>
            <p>When you place an order, we collect your name, email address, shipping address, and payment information (processed securely through Shopify). We may also collect browsing data through cookies to improve your experience.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To process and fulfill your orders</li>
              <li>To send order confirmations and shipping updates</li>
              <li>To send marketing emails (only if you've opted in)</li>
              <li>To improve our website and customer experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Sharing Your Information</h2>
            <p>We do not sell your personal information. We share data only with trusted third-party service providers necessary to operate our business (e.g., Shopify for checkout, shipping carriers for delivery, email platforms for communications). These partners are contractually obligated to protect your data.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Cookies</h2>
            <p>We use cookies to maintain session state, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings, though some features may not function properly.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Data Retention</h2>
            <p>We retain your order information as long as necessary to fulfill legal, accounting, and business obligations. You may request deletion of your personal data by emailing us.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Your Rights</h2>
            <p>Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:admin@torchrepublic.com" style={{ color: RG }}>admin@torchrepublic.com</a>.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Contact</h2>
            <p>Questions about this policy? Reach out at <a href="mailto:admin@torchrepublic.com" style={{ color: RG }}>admin@torchrepublic.com</a>.</p>
          </section>

        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <div className="mt-2">
            <Link to="/" className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.45)', textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}