import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import FooterNewsletter from './FooterNewsletter';

const THEME = {
  page: '#FBF8F2',
  card: '#FFFDF8',
  text: '#292622',
  secondary: '#5F574F',
  border: '#E4D8C9',
  clay: '#B7653E',
  moss: '#566047',
};

const SHOP_LINKS = [
  ['Shop All', '/shop'],
  ['Instant Classic Coffee', '/products/instant-classic-coffee'],
  ['Instant Mushroom Coffee', '/products/instant-mushroom-coffee'],
  ['Subscription Updates', '/#newsletter'],
];

const COMPANY_LINKS = [
  ['About', '/our-story'],
  ['Our Ingredients', '/ingredients'],
  ['Journal', '/journal'],
];

const SUPPORT_LINKS = [
  ['Contact', '/contact'],
  ['FAQ', '/faq'],
  ['Shipping Policy', '/shipping-policy'],
  ['Return Policy', '/return-policy'],
  ['Account', '/profile'],
  ['Orders & Subscriptions', 'https://libertees-for-all.myshopify.com/account'],
];

const LEGAL_LINKS = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Service', '/terms-of-service'],
  ['Shipping Policy', '/shipping-policy'],
  ['Return Policy', '/return-policy'],
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: 'https://www.instagram.com/torchrepublic', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/torchrepublic', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/torchrepublic', label: 'LinkedIn' },
];

function LinkColumn({ heading, links }) {
  return (
    <nav aria-label={heading} className="min-w-0">
      <h2 className="font-heading text-sm font-semibold mb-3" style={{ color: THEME.text }}>{heading}</h2>
      <ul className="space-y-1">
        {links.map(([label, href]) => (
          <li key={href}>
            {href.startsWith('http') ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[44px] font-heading text-sm transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ color: THEME.secondary, borderRadius: '4px', paddingTop: '0.375rem', paddingBottom: '0.375rem' }}
              >
                {label}
              </a>
            ) : (
              <Link
                to={href}
                className="inline-flex items-center min-h-[44px] font-heading text-sm transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ color: THEME.secondary, borderRadius: '4px', paddingTop: '0.375rem', paddingBottom: '0.375rem' }}
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer
      style={{ background: THEME.page, borderTop: `1px solid ${THEME.border}` }}
      className="footer-mobile-clearance"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif font-bold tracking-wide" style={{ color: THEME.text, fontSize: '1.1rem', lineHeight: 1.2 }}>TORCH REPUBLIC</p>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mt-1" style={{ color: THEME.clay }}>Coffee Company</p>
            <p className="mt-4 font-heading text-sm leading-7" style={{ color: THEME.secondary }}>
              Thoughtfully crafted instant coffee and mushroom coffee for smooth, convenient, and intentional daily rituals.
            </p>
            <p className="mt-3 font-heading text-xs" style={{ color: THEME.moss }}>Corpus Christi, Texas &middot; U.S.A.</p>
            <div className="flex gap-2 mt-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-md transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ border: `1px solid ${THEME.border}`, color: THEME.secondary, background: THEME.card }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Shop */}
          <LinkColumn heading="Shop" links={SHOP_LINKS} />

          {/* Column 3 — Company */}
          <LinkColumn heading="Company" links={COMPANY_LINKS} />

          {/* Column 4 — Support */}
          <LinkColumn heading="Support" links={SUPPORT_LINKS} />

          {/* Column 5 — Newsletter */}
          <div id="newsletter" className="min-w-0" style={{ scrollMarginTop: 96 }}>
            <h2 className="font-heading text-sm font-semibold mb-2" style={{ color: THEME.text }}>Stay in the Loop</h2>
            <p className="font-heading text-xs leading-6 mb-4" style={{ color: THEME.secondary }}>
              Get product updates, coffee tips, and occasional offers from Torch Republic.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" style={{ borderTop: `1px solid ${THEME.border}` }}>
          <p className="font-heading text-xs" style={{ color: THEME.secondary }}>
            &copy; {new Date().getFullYear()} Torch Republic Coffee Company. All rights reserved.
          </p>
          <nav aria-label="Legal policies">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {LEGAL_LINKS.map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="font-heading text-xs transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{ color: THEME.secondary, borderRadius: '4px' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}