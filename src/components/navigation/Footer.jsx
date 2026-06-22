import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import {
  WELCOME_DISCOUNT_CODE, WELCOME_DISCOUNT_PERCENT,
  FREE_SHIPPING_THRESHOLD_DISPLAY, GUARANTEE_DAYS, GUARANTEE_DESCRIPTION,
  SHIP_NOTE, SUPPORT_EMAIL, SUBSCRIBE_SAVE_PERCENT,
} from '@/lib/siteConfig';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    
    setStatus('loading');
    try {
      // Save to local database
      await base44.entities.EmailSubscriber.create({ email, source: 'footer' });
      
      // Send to HubSpot
      await base44.functions.invoke('addToHubSpot', { email });
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription failed:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-4 p-3" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '3px' }}>
        <p className="font-heading text-xs" style={{ color: '#10B981' }}>
          ✓ Welcome! Check your inbox for {WELCOME_DISCOUNT_PERCENT}% off.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === 'loading'}
        className="w-full px-3 py-2.5 font-heading text-sm bg-transparent border rounded-sm focus:outline-none"
        style={{ borderColor: 'rgba(230,183,173,0.25)', color: '#F5EFE6' }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-2.5 font-mono text-[8px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 rounded-sm disabled:opacity-50"
        style={{ background: '#E6B7AD', color: '#0A0A0A' }}
      >
        {status === 'loading' ? 'Joining...' : `Join & Get ${WELCOME_DISCOUNT_PERCENT}% Off My First Order`}
      </button>
    </form>
  );
}

const FOOTER_LINKS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Instant Coffee', href: '/shop/instant-coffee' },
      { label: 'Mushroom Coffee', href: '/shop/instant-mushroom-coffee' },
      { label: 'Matcha', href: '/shop/matcha' },
      { label: 'Bundles', href: '/build-your-ritual' },
      { label: 'Gifts', href: '/gifts' },
      { label: `Subscribe & Save ${SUBSCRIBE_SAVE_PERCENT}%`, href: '/subscription' },
    ]
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Why Mushroom Coffee', href: '/why-mushroom-coffee' },
      { label: 'Why Matcha', href: '/why-matcha' },
      { label: 'Research Hub', href: '/research' },
      { label: 'Journal', href: '/journal' },
      { label: 'Ingredients', href: '/ingredients' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Compare Brands', href: '/compare' },
    ]
  },
  {
    heading: 'About',
    links: [
      { label: 'Our Mission', href: '/mission' },
      { label: 'Founder Story', href: '/founder-story' },
      { label: 'Torchbearers Rewards', href: '/torchbearers-rewards' },
      { label: 'Reviews', href: '/reviews' },
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
      { label: 'robots.txt', external: 'https://torchrepublic.com/robots.txt' },
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
              src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ea7e0190c_torch_republic_primary_refined_gradient_4000px.png"
              alt="Torch Republic Coffee Company"
              style={{ height: '88px', width: 'auto', marginBottom: '16px', opacity: 0.9 }}
            />
            <p className="font-mono text-[9px] tracking-[0.2em] mb-5" style={{ color: 'rgba(230,183,173,0.4)' }}>
              Instant Coffee · Mushroom Coffee · Matcha
            </p>
            <p className="font-mono text-[10px] leading-relaxed max-w-xs mb-4"
              style={{ color: 'rgba(240,235,225,0.3)', lineHeight: 1.8 }}>
              Join the ritual. Get product updates, launch offers, and {WELCOME_DISCOUNT_PERCENT}% off your first order.
            </p>
            <p className="font-mono text-[9px] tracking-[0.18em] mb-3"
              style={{ color: 'rgba(230,183,173,0.45)' }}>
              Use code <span style={{ color: '#E6B7AD', fontWeight: 700 }}>{WELCOME_DISCOUNT_CODE}</span> for {WELCOME_DISCOUNT_PERCENT}% off your first order
            </p>
            
            {/* Newsletter Form */}
            <NewsletterForm />
            <p className="font-mono text-[9px] tracking-[0.15em] mb-2"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              🔒 256-bit SSL · Secure Shopify Checkout
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] mb-4"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              ✦ {GUARANTEE_DAYS}-Day Satisfaction Guarantee · Free Shipping on Orders {FREE_SHIPPING_THRESHOLD_DISPLAY}
            </p>
            <div className="space-y-2">
              <a                 href={`mailto:${SUPPORT_EMAIL}`} rel="noopener noreferrer"
                className="block font-mono text-[10px] tracking-[0.15em] transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                {SUPPORT_EMAIL}
              </a>
              <p className="font-mono text-[9px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                📍 Corpus Christi, Texas · U.S.A.
              </p>
              <p className="font-mono text-[9px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                🕐 Mon-Fri: 9AM-6PM CST
              </p>
              <div className="flex gap-4 mt-4">
                <a href="https://instagram.com/torchrepublic" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.32)' }}>Instagram</a>
                <a href="https://tiktok.com/@torchrepublic" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.32)' }}>TikTok</a>
                <a href="https://facebook.com/torchrepublic" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.32)' }}>Facebook</a>
                <a href="https://pinterest.com/torchrepublic" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Pinterest" className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.32)' }}>Pinterest</a>
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
                   <li key={link.label} className="flex items-center gap-2">
                     <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/dd8a91df2_torch_republic_icon_transparent_1024px.png" alt="" aria-hidden="true" style={{ width: '10px', height: '10px', opacity: 0.35, flexShrink: 0 }} />
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

        {/* Reassurance bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 py-5" style={{ borderTop: '1px solid rgba(230,183,173,0.08)', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
          {[
            { icon: '🚀', label: 'Fast U.S. Shipping', sub: SHIP_NOTE, href: '/shipping-policy' },
            { icon: '✅', label: `${GUARANTEE_DAYS}-Day Guarantee`, sub: GUARANTEE_DESCRIPTION, href: '/return-policy' },
            { icon: '🔒', label: 'Secure Checkout', sub: '256-bit SSL via Shopify', href: null },
            { icon: '⭐', label: '4.9 / 5 Rating', sub: 'From 200+ verified customers', href: '/reviews' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 text-left">
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <div>
                {item.href ? (
                  <a href={item.href} className="font-mono text-[10px] tracking-[0.15em] uppercase transition-colors hover:opacity-70 block" style={{ color: 'rgba(230,183,173,0.7)', textDecoration: 'none' }}>{item.label}</a>
                ) : (
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(230,183,173,0.7)' }}>{item.label}</p>
                )}
                <p className="font-mono text-[8px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{item.sub}</p>
              </div>
            </div>
          ))}
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
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ea7e0190c_torch_republic_primary_refined_gradient_4000px.png"
            alt="Torch Republic Coffee Company"
            className="h-12 w-auto opacity-55"
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