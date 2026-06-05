import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Shop All Blends', href: '/shop' },
      { label: 'The Six Blends', href: '/blends' },
      { label: 'Monthly Subscription', href: '/subscription' },
      { label: 'Bundle — All Six', href: '/bundle' },
    ]
  },
  {
    heading: 'Learn',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ]
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Shipping Policy', external: 'https://torchrepublic.com/policies/shipping-policy' },
      { label: 'Return Policy', external: 'https://torchrepublic.com/policies/refund-policy' },
      { label: 'Privacy Policy', external: 'https://torchrepublic.com/policies/privacy-policy' },
      { label: 'Terms of Service', external: 'https://torchrepublic.com/policies/terms-of-service' },
    ]
  }
];

export default function Footer() {
  return (
    <footer style={{ background: '#0D0F0E', borderTop: '3px solid transparent', backgroundImage: 'linear-gradient(#0D0F0E, #0D0F0E), linear-gradient(90deg, #0B2D2A, #08101A 50%, #2A1F0A)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-14 pb-10">

        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4b6dc9e8d_ChatGPTImageMay31202606_49_02AM.png"
              alt="Torch Republic Coffee Company"
              style={{ height: '80px', width: 'auto', marginBottom: '16px', opacity: 0.9 }}
            />
            <p className="font-mono text-[9px] tracking-[0.2em] mb-5" style={{ color: 'rgba(230,183,173,0.4)' }}>
              Instant Mushroom Coffee · Lion's Mane + Chaga
            </p>
            <p className="font-mono text-[10px] leading-relaxed max-w-xs mb-6"
              style={{ color: 'rgba(240,235,225,0.3)', lineHeight: 1.8 }}>
              Torch Republic Coffee Company creates premium instant mushroom coffee blends for focus, flow, and daily ritual.
            </p>
            <div className="space-y-2">
              <a href="mailto:admin@torchrepublic.com" rel="noopener noreferrer"
                className="block font-mono text-[10px] tracking-[0.15em] transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                admin@torchrepublic.com
              </a>
              <p className="font-mono text-[9px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                U.S.-Based · Corpus Christi, TX
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_LINKS.map(section => (
              <div key={section.heading}>
                <h3 className="font-mono text-[9px] tracking-[0.4em] uppercase mb-5" style={{ color: '#E6B7AD' }}>
                  {section.heading}
                </h3>
                <ul className="space-y-3">
                  {section.links.map(link => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.external} target="_blank" rel="noopener noreferrer"
                          className="text-[11px] font-mono transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.32)' }}>
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href}
                          className="text-[11px] font-mono transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.32)' }}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider — teal → navy → champagne gradient line */}
        <div className="h-px w-full mb-8"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #1A4A3E 20%, #0B2040 50%, #C4A35A 80%, transparent 100%)', opacity: 0.45 }} />

        {/* FDA disclaimer + Copyright (mobile: combined, desktop: separate) */}
        <div className="mb-8">
          <p className="font-mono text-[8px] tracking-[0.12em] text-center mb-4 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
            Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <div className="md:hidden">
            <p className="text-[10px] font-mono text-center" style={{ color: 'rgba(255,255,255,0.15)' }}>
              © 2026 Torch Republic Coffee Company
            </p>
            <p className="text-[9px] font-mono text-center mt-1" style={{ color: 'rgba(255,255,255,0.12)' }}>
              Torch Republic Coffee Company is a DBA of LiberTees For All LLC. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4b6dc9e8d_ChatGPTImageMay31202606_49_02AM.png"
            alt="Torch Republic Coffee Company"
            className="h-10 w-auto opacity-55"
          />
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.3)' }}>
            Premium Instant Mushroom Coffee
          </p>
          <div className="hidden md:block">
            <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
              © 2026 Torch Republic Coffee Company
            </p>
            <p className="text-[9px] font-mono mt-1" style={{ color: 'rgba(255,255,255,0.12)' }}>
              Torch Republic Coffee Company is a DBA of LiberTees For All LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}