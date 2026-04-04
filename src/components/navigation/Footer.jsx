import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FOOTER_LINKS = [
  {
    heading: 'SHOP',
    links: [
      { label: 'All Products', page: 'BestSellers' },
      { label: 'The Torch Box', page: 'TheTorchBox' },
      { label: 'Collections', page: 'Collections' },
      { label: 'Our Mission', page: 'Mission' },
    ]
  },
  {
    heading: 'SUPPORT',
    links: [
      { label: 'Contact Us', page: 'Contact' },
      { label: 'Returns & Exchanges', page: 'Contact' },
      { label: 'Track Your Order', page: 'Contact' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* Manifesto */}
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase leading-[0.9] tracking-tight text-foreground">
              Faith.<br />
              Freedom.<br />
              <span className="text-primary">Truth.</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-md text-sm leading-relaxed font-mono">
              Torch Republic exists to represent those who live by faith, value freedom, 
              and refuse to blend in. Every design, every product, every collection is 
              built to reflect these principles.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {FOOTER_LINKS.map(section => (
              <div key={section.heading}>
                <h3 className="text-primary font-mono text-xs tracking-[0.3em] mb-6">
                  {section.heading}
                </h3>
                <ul className="space-y-3">
                  {section.links.map(link => (
                    <li key={link.label}>
                      <Link
                        to={createPageUrl(link.page)}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono"
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

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5dab8a01f_file_0000000013ac71f5b6204ade785a0d15.png"
              alt="Torch Republic"
              className="h-10 w-auto"
            />
          </div>
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-xs font-mono tracking-wider">© 2026 Torch Republic™ &nbsp;·&nbsp; A brand of LiberTees for All Apparel LLC</p>
          </div>
        </div>
      </div>
    </footer>
  );
}