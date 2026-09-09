import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO } from './portfolioTheme';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Process', href: '#process' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const linkStyle = {
  fontFamily: FONT_MONO,
  fontSize: '0.72rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: P.secondary,
  textDecoration: 'none',
  padding: '0.4rem 0',
  borderBottom: '1.5px solid transparent',
  transition: 'color .2s, border-color .2s',
};

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(247,247,245,0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${P.rule}`,
      }}
    >
      <div className="mx-auto max-w-[1140px] px-6 md:px-10">
        <div className="flex items-center justify-between" style={{ minHeight: 64 }}>
          <a
            href="#top"
            style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: '1.05rem', color: P.ink, letterSpacing: '-0.01em', textDecoration: 'none' }}
          >
            Lisa Marie Kocian
          </a>

          <nav className="hidden md:flex items-center gap-6" aria-label="Portfolio">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={linkStyle}
                onMouseEnter={(e) => { e.currentTarget.style.color = P.accent; e.currentTarget.style.borderBottomColor = P.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = P.secondary; e.currentTarget.style.borderBottomColor = 'transparent'; }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ color: P.ink, background: 'none', border: 'none', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden" style={{ background: P.surface, borderTop: `1px solid ${P.rule}` }}>
          <nav className="mx-auto max-w-[1140px] px-6 py-2" aria-label="Portfolio mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: FONT_MONO,
                  fontSize: '0.78rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: P.ink,
                  textDecoration: 'none',
                  padding: '0.85rem 0',
                  borderBottom: `1px solid ${P.rule}`,
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}