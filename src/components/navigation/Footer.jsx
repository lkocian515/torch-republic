import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Shop All Blends', href: '/shop' },
      { label: 'The Six Blends', href: '/blends' },
      { label: 'Bundle — All Six', href: '/bundle' },
    ]
  },
  {
    heading: 'Learn',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Reviews', href: '/Reviews' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/Contact' },
    ]
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Shipping Policy', external: 'https://torch-republic.com/policies/shipping-policy' },
      { label: 'Return Policy', external: 'https://torch-republic.com/policies/refund-policy' },
      { label: 'Privacy Policy', external: 'https://torch-republic.com/policies/privacy-policy' },
      { label: 'Terms of Service', external: 'https://torch-republic.com/policies/terms-of-service' },
    ]
  }
];

export default function Footer() {
  return (
    <footer style={{ background: '#0A0909', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-20 pb-12">

        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase font-bold mb-4" style={{ color: '#C9A24A' }}>
              Torch Republic
            </p>
            <p className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.2rem', lineHeight: 1.3 }}>
              Torch Republic Coffee Company
            </p>
            <p className="font-mono text-[9px] tracking-[0.2em] mb-5" style={{ color: 'rgba(201,162,74,0.4)' }}>
              Instant Mushroom Coffee · Lion's Mane + Chaga
            </p>
            <p className="font-mono text-[10px] leading-relaxed max-w-xs mb-6"
              style={{ color: 'rgba(240,235,225,0.3)', lineHeight: 1.8 }}>
              Torch Republic Coffee Company creates premium instant mushroom coffee blends for focus, flow, and daily ritual.
            </p>
            <div className="space-y-2">
              <a href="mailto:admin@torchrepublic.com"
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
                <h3 className="font-mono text-[9px] tracking-[0.4em] uppercase mb-5" style={{ color: '#C9A24A' }}>
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

        {/* Divider */}
        <div className="h-px w-full mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.2), transparent)' }} />

        {/* FDA disclaimer */}
        <p className="font-mono text-[8px] tracking-[0.12em] text-center mb-6 max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1382de9ae_LighttheTorchWeartheTruth2000x1000px1920x1080px.png"
            alt="Torch Republic Coffee Company"
            className="h-7 w-auto opacity-40"
          />
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,162,74,0.3)' }}>
            Premium Instant Mushroom Coffee
          </p>
          <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
            © 2026 Torch Republic™
          </p>
        </div>
      </div>
    </footer>
  );
}