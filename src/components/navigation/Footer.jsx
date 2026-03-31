import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const NAV = [
  { label: 'Shop All', page: 'BestSellers' },
  { label: 'Collections', page: 'Collections' },
  { label: 'Our Mission', page: 'Mission' },
  { label: 'Contact', page: 'Contact' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top: Logo + tagline */}
        <div className="flex flex-col items-center text-center mb-14">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5dab8a01f_file_0000000013ac71f5b6204ade785a0d15.png"
            alt="Torch Republic"
            className="h-10 w-auto mb-6 opacity-80"
          />
          <p className="font-mono text-xs tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.4)' }}>
            Faith &nbsp;·&nbsp; Freedom &nbsp;·&nbsp; Truth
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={createPageUrl(item.page)}
              className="font-mono text-xs tracking-[0.3em] uppercase transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              onMouseEnter={(e) => e.target.style.color = '#C9A24A'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.3)'}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://torchbearer-nation.sintra.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(201,162,74,0.6)' }}
            onMouseEnter={(e) => e.target.style.color = '#C9A24A'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(201,162,74,0.6)'}
          >
            The Torch Box
          </a>
        </nav>

        {/* Divider */}
        <div className="h-px mb-10" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
            © 2025 Torch Republic
          </p>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>
            All rights reserved &nbsp;·&nbsp; Made in America
          </p>
        </div>
      </div>
    </footer>
  );
}