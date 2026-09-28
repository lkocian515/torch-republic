import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO, FONT_SANS, portfolioBase } from './portfolioTheme';

const SECTIONS = [
  { label: 'Expertise', id: 'expertise' },
  { label: 'Work', id: 'work' },
  { label: 'Background', id: 'background' },
  { label: 'Contact', id: 'contact' },
];

const ALL_IDS = ['top', 'expertise', 'work', 'evidence', 'background', 'contact'];

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
        background: 'rgba(247,247,245,0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${P.rule}`,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="flex items-center justify-between" style={{ minHeight: 60 }}>
          <a
            href={root}
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 700,
              fontSize: '1.05rem',
              color: P.ink,
              letterSpacing: '-0.01em',
              textDecoration: 'none',
            }}
          >
            Lisa Marie Kocian
          </a>

          <nav className="hidden md:flex items-center gap-7" aria-label="Portfolio">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={hrefFor(s.id)}
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: activeId === s.id ? P.accent : P.secondary,
                  textDecoration: 'none',
                  padding: '0.4rem 0',
                  transition: 'color .2s',
                }}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <a
            href={hrefFor('contact')}
            className="hidden md:inline-flex"
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.82rem',
              fontWeight: 600,
              color: P.surface,
              background: P.accent,
              padding: '0.5rem 1.1rem',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'background .2s',
            }}
          >
            Contact me
          </a>

          <button
            className="md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              color: P.ink,
              background: 'none',
              border: 'none',
              minHeight: 44,
              minWidth: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden" style={{ background: P.surface, borderTop: `1px solid ${P.rule}` }}>
          <nav className="mx-auto max-w-[1100px] px-6 py-2" aria-label="Portfolio mobile">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={hrefFor(s.id)}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: FONT_MONO,
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: P.ink,
                  textDecoration: 'none',
                  padding: '0.85rem 0',
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
                display: 'block',
                fontFamily: FONT_SANS,
                fontSize: '0.82rem',
                fontWeight: 600,
                color: P.surface,
                background: P.accent,
                padding: '0.75rem',
                borderRadius: '4px',
                textDecoration: 'none',
                textAlign: 'center',
                margin: '0.75rem 0',
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