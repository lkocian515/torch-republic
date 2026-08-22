import React, { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function TermsOfService() {
  useSEO({
    title: 'Terms of Service | Torch Republic Coffee Company',
    description: 'Review the terms and conditions for using the Torch Republic Coffee Company website and purchasing our products. Includes policies on product use, pricing, payments, and health disclaimers.',
    url: '/terms-of-service',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Legal
        </p>
        <h1 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          Terms of Service
        </h1>
        <p className="font-mono text-[9px] tracking-[0.15em] mb-8" style={{ color: 'rgba(230,183,173,0.35)' }}>
          Last updated: June 2026
        </p>

        <div className="space-y-8" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.9, fontSize: '0.95rem', fontWeight: 300 }}>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Overview</h2>
            <p>This website is operated by Torch Republic Coffee Company, a DBA of LiberTees For All LLC. By visiting our site and purchasing our products, you engage with our service and agree to be bound by the following terms and conditions.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Use of the Site</h2>
            <p>You may not use our products or site for any illegal or unauthorized purpose. You must not transmit any harmful, abusive, or disruptive content. We reserve the right to refuse service to anyone at any time.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Products</h2>
            <p>We reserve the right to limit the sales of our products to any person, geographic region, or jurisdiction. Product descriptions, pricing, and availability are subject to change at any time without notice. We make every effort to display accurate colors and images, but we cannot guarantee your monitor's display will be accurate.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Pricing & Payment</h2>
            <p>All prices are listed in USD. We reserve the right to modify prices at any time. Payment is processed securely through Shopify. We are not responsible for errors in pricing due to typographical mistakes and reserve the right to cancel any order placed at an incorrect price.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Health Disclaimer</h2>
            <p>Statements on this site have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use if you have any medical conditions or are pregnant or nursing.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Limitation of Liability</h2>
            <p>Torch Republic Coffee Company shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or services. Our liability is limited to the amount paid for the product in question.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Continued use of the site following any changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Contact</h2>
            <p>Questions? Email us at <a href="mailto:admin@torchrepublic.com" style={{ color: RG }}>admin@torchrepublic.com</a>.</p>
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