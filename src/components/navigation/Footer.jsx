import React from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

const FOOTER_LINKS = [
  {
    heading: 'Coffee Collections',
    links: [
      { label: 'Shop All Coffee', href: '/CoffeeCollection' },
      { label: 'Founders Series', href: '/CoffeeCollection' },
      { label: 'Liberty Icons', href: '/LibertyIcons' },
      { label: 'Commanders Series', href: '/CommandersSeries' },
      { label: 'Torch Box Subscription', href: '/TheTorchBox' },
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Story', href: '/Mission' },
      { label: 'Journal', href: '/Journal' },
      { label: 'Best Sellers', href: '/BestSellers' },
      { label: 'Reviews', href: '/Reviews' },
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
    <footer style={{ background: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-20 pb-16">

        {/* Top: Brand + Link columns */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">

          {/* Brand identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <Flame className="w-4 h-4" style={{ color: '#C9A24A' }} />
              <p className="font-mono text-[10px] tracking-[0.45em] uppercase font-bold" style={{ color: '#C9A24A' }}>
                Torch Republic
              </p>
            </div>
            <p className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem', lineHeight: 1.3 }}>
              Torch Republic Coffee Company
            </p>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.45)' }}>
              "Carry the Flame"
            </p>
            <p className="text-xs leading-relaxed max-w-xs mb-6" style={{ color: 'rgba(240,235,225,0.35)', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.8 }}>
              Premium small-batch coffee rooted in American history — four collectible series, one unbroken flame.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <a href="mailto:hello@torchrepublic.com" className="block font-mono text-[10px] tracking-[0.15em] transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                hello@torchrepublic.com
              </a>
              <p className="font-mono text-[9px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.22)' }}>
                U.S.-Based · Corpus Christi, TX
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
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
                          className="text-[11px] font-mono transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href}
                          className="text-[11px] font-mono transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
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
        <div className="h-px w-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.2), transparent)' }} />

        {/* Trust line */}
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-center mb-8" style={{ color: 'rgba(201,162,74,0.4)' }}>
          Small-batch roasted in the USA · Secure checkout · 30-day satisfaction guarantee
        </p>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1382de9ae_LighttheTorchWeartheTruth2000x1000px1920x1080px.png"
            alt="Torch Republic"
            className="h-8 w-auto opacity-50"
          />
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,162,74,0.35)' }}>
            Torch Republic Coffee Company — Carry the Flame
          </p>
          <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.18)' }}>© 2026 Torch Republic™</p>
        </div>
      </div>
    </footer>
  );
}