import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FOOTER_LINKS = [
  {
    heading: 'Coffee',
    links: [
      { label: 'Founders Series', href: '/CoffeeCollection' },
      { label: 'Torch Index', href: '/CoffeeCollection' },
      { label: 'Torch Box', href: '/TheTorchBox' },
      { label: 'Gift Bundles', href: '/' },
    ]
  },
  {
    heading: 'Shop',
    links: [
      { label: 'Best Sellers', page: 'BestSellers' },
      { label: 'Apparel', page: 'Shop' },
      { label: 'The Torch Box', page: 'TheTorchBox' },
      { label: 'On Sale', page: 'OnSale' },
    ]
  },
  {
    heading: 'Brand',
    links: [
      { label: 'Our Story', page: 'Mission' },
      { label: 'Journal', page: 'Journal' },
      { label: 'Contact', page: 'Contact' },
    ]
  }
];

export default function Footer() {
  return (
    <footer style={{ background: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      {/* Top manifesto */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: '#C8A44D' }}>Torch Republic</p>
            <h2 className="font-serif leading-[1.05] tracking-tight text-white mb-6" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700 }}>
              History in<br />
              <span style={{ color: '#C8A44D' }}>Every Cup.</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(232,223,175,0.4)', fontFamily: 'var(--font-mono)' }}>
              A premium coffee and heritage lifestyle brand. The Founders Series pairs bold roast profiles with collectible historical design — built for people who value craftsmanship, conviction, and character.
            </p>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-8">
            {FOOTER_LINKS.map(section => (
              <div key={section.heading}>
                <h3 className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: '#C8A44D' }}>
                  {section.heading}
                </h3>
                <ul className="space-y-3.5">
                  {section.links.map(link => (
                   <li key={link.label}>
                     {link.href ? (
                       <Link to={link.href} className="text-xs font-mono transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
                         {link.label}
                       </Link>
                     ) : (
                       <Link to={`/${link.page}`} className="text-xs font-mono transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>
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
        <div className="h-px w-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,77,0.2), transparent)' }} />

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {['Secure Checkout', '30-Day Returns', 'Proudly American', 'Free Shipping $75+'].map(badge => (
            <span key={badge} className="font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2" style={{ color: 'rgba(201,162,74,0.6)', border: '1px solid rgba(201,162,74,0.12)', background: 'rgba(201,162,74,0.04)' }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a6bbf1327_Untitleddesign9.png"
            alt="Torch Republic"
            className="h-8 w-auto opacity-60"
          />
          <p className="text-xs font-mono text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2026 Torch Republic™ · Heritage-crafted for patriots who demand the best.
          </p>
        </div>
      </div>
    </footer>
  );
}