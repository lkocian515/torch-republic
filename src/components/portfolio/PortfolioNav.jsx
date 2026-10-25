import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO, FONT_SANS, portfolioBase } from './portfolioTheme';

const SECTIONS = [
  { label: 'Work', id: 'work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const ALL_IDS = ['top', 'work', 'skills', 'experience', 'contact'];

// The nav's own responsive rules, kept here so every portfolio page gets them
// without depending on Tailwind utility ordering. Below 768px only the toggle
// shows; at 768px and up only the full navigation and the CTA show.
const NAV_CSS = `
  .pf-nav-links { display: none; }
  .pf-nav-cta { display: none; }
  .pf-nav-toggle { display: inline-flex; align-items: center; justify-content: center; }
  @media (min-width: 768px) {
    .pf-nav-links { display: flex; }
    .pf-nav-cta { display: inline-flex; }
    .pf-nav-toggle { display: none; }
    .pf-nav-panel { display: none !important; }
  }
`;

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('top');

  const base = portfolioBase();
  const root = base || '/';
  const isHome = typeof window !== 'undefined' &&
    (window.location.pathname === root || window.location.pathname === root + '/');
  const hrefFor = (id) => isHome ? `#${id}` : `${root}#${id}`;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,10,12,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${P.rule}`,
      }}
    >
      <style>{NAV_CSS}</style>
      <div className="mx-auto max-w-[1100px] px-5 sm:px-6 md:px-10">
        <div className="flex items-center justify-between gap-3" style={{ minHeight: 62 }}>
          <a
            href={root}
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 700,
              fontSize: 'clamp(0.98rem, 3.4vw, 1.1rem)',
              color: P.ink,
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Lisa Marie Kocian
          </a>

          <nav className="pf-nav-links items-center gap-6 lg:gap-8" aria-label="Portfolio sections">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={hrefFor(s.id)}
                aria-current={activeId === s.id ? 'true' : undefined}
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: activeId === s.id ? P.ink : P.muted,
                  textDecoration: 'none',
                  padding: '0.55rem 0',
                  transition: 'color .2s',
                }}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <a
            href={hrefFor('contact')}
            className="pf-nav-cta"
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.82rem',
              fontWeight: 600,
              color: P.onAccent,
              background: P.accent,
              padding: '0.55rem 1.15rem',
              borderRadius: '4px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background .2s',
            }}
          >
            Contact me
          </a>

          <button
            type="button"
            className="pf-nav-toggle"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="portfolio-mobile-nav"
            onClick={() => setOpen((v) => !v)}
            style={{
              color: P.ink,
              background: 'none',
              border: `1px solid ${P.rule}`,
              borderRadius: '4px',
              minHeight: 44,
              minWidth: 44,
              flexShrink: 0,
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="portfolio-mobile-nav" className="pf-nav-panel" style={{ background: P.surfaceAlt, borderTop: `1px solid ${P.rule}` }}>
          <nav className="mx-auto max-w-[1100px] px-5 sm:px-6 py-2" aria-label="Portfolio sections, mobile">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={hrefFor(s.id)}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 48,
                  fontFamily: FONT_MONO,
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: P.ink,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${P.rule}`,
                }}
              >
                {s.label}
              </a>
            ))}
            <a
              href={hrefFor('contact')}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 48,
                fontFamily: FONT_SANS,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: P.onAccent,
                background: P.accent,
                borderRadius: '4px',
                textDecoration: 'none',
                margin: '0.9rem 0',
              }}
            >
              Contact me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}