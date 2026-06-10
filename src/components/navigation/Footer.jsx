import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Shop All', href: '/shop' },
      { label: 'Classic Coffee', href: '/classic-coffee' },
      { label: 'Mushroom Coffee', href: '/mushroom-coffee' },
      { label: 'Matcha', href: '/matcha' },
      { label: 'Bundles', href: '/bundle' },
    ]
  },
  {
    heading: 'Learn',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Journal', href: '/journal' },
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ]
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Shipping Policy', href: '/shipping-policy' },
      { label: 'Return Policy', href: '/return-policy' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ]
  }
];

export default function Footer() {
  return (
    <footer style={{ background: '#0D0F0E', position: 'relative', borderTop: '3px solid transparent', backgroundImage: 'linear-gradient(#0D0F0E, #0D0F0E), linear-gradient(90deg, #0B2D2A 0%, #08101A 45%, #1A1208 75%, #C4A35A 100%)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', overflow: 'hidden' }}>
      {/* Atmospheric footer glow — teal-navy behind logo area */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '220px', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11,45,42,0.18) 0%, rgba(8,16,26,0.1) 60%, transparent 100%)',
      }} />
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-14 pb-10" style={{ position: 'relative', zIndex: 1 }}>

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
              Instant Coffee · Mushroom Coffee · Matcha
            </p>
            <p className="font-mono text-[10px] leading-relaxed max-w-xs mb-4"
              style={{ color: 'rgba(240,235,225,0.3)', lineHeight: 1.8 }}>
              Join the ritual. Get product updates, launch offers, and 10% off your first order.
            </p>
            <p className="font-mono text-[9px] tracking-[0.18em] mb-3"
              style={{ color: 'rgba(230,183,173,0.45)' }}>
              Use code <span style={{ color: '#E6B7AD', fontWeight: 700 }}>WELCOME10</span> for 10% off your first order
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] mb-2"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              🔒 256-bit SSL · Secure Shopify Checkout
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] mb-4"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              ✦ 30-Day Satisfaction Guarantee
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
              <div className="flex gap-4 mt-4">
                <a href="https://instagram.com/torchrepublic" target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.32)' }}>Instagram</a>
                <a href="https://tiktok.com/@torchrepublic" target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.32)' }}>TikTok</a>
                <a href="https://facebook.com/torchrepublic" target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.32)' }}>Facebook</a>
              </div>
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
              Torch Republic Coffee Company is a DBA of LiberTees For All Apparel LLC. All rights reserved.
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
            Instant Coffee · Mushroom Coffee · Matcha
          </p>
          <div className="hidden md:block">
            <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
              © 2026 Torch Republic Coffee Company
            </p>
            <p className="text-[9px] font-mono mt-1" style={{ color: 'rgba(255,255,255,0.12)' }}>
              Torch Republic Coffee Company is a DBA of LiberTees For All Apparel LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}