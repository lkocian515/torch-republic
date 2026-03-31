import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FOOTER_LINKS = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Products', page: 'BestSellers' },
      { label: 'Best Sellers', page: 'BestSellers' },
      { label: 'Collections', page: 'Collections' },
      { label: 'On Sale', page: 'OnSale' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Mission', page: 'Mission' },
      { label: 'Contact Us', page: 'Contact' },
      { label: 'Track Order', page: 'Contact' },
      { label: 'Returns', page: 'Contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">

          {/* Brand side */}
          <div>
            <h2
              className="font-serif font-bold text-white leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              Faith.<br />
              Freedom.<br />
              <span style={{ color: '#C9A24A' }}>Truth.</span>
            </h2>
            <p className="font-heading font-light text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Torch Republic exists to represent those who live by faith, value freedom,
              and refuse to blend in. Every design reflects these principles.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 lg:pt-4">
            {FOOTER_LINKS.map(section => (
              <div key={section.heading}>
                <h3 className="font-mono text-[10px] tracking-[0.5em] uppercase mb-8" style={{ color: 'rgba(201,162,74,0.7)' }}>
                  {section.heading}
                </h3>
                <ul className="space-y-4">
                  {section.links.map(link => (
                    <li key={link.label}>
                      <Link
                        to={createPageUrl(link.page)}
                        className="font-heading font-light text-sm transition-colors duration-300"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                        onMouseEnter={e => e.target.style.color = '#C9A24A'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Gold rule */}
        <div className="h-px mb-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.25) 20%, rgba(201,162,74,0.25) 80%, transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5dab8a01f_file_0000000013ac71f5b6204ade785a0d15.png"
            alt="Torch Republic"
            className="h-8 w-auto opacity-70"
          />
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2025 Torch Republic — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}