import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO } from './portfolioTheme';

const LINKS = [
  { label: 'Work', href: '#case-study', id: 'case-study' },
  { label: 'Method', href: '#methodology', id: 'methodology' },
  { label: 'Evidence', href: '#evidence', id: 'evidence' },
  { label: 'Expertise', href: '#expertise', id: 'expertise' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const SECTION_IDS = ['top', 'methodology', 'case-study', 'evidence', 'expertise', 'contact'];

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('top');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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

          <nav className="hidden md:flex items-center gap-7" aria-label="Portfolio">
            {LINKS.map((l) => {
              const isActive = activeId === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: isActive ? P.accent : P.secondary,
                    textDecoration: 'none',
                    padding: '0.4rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'color .2s',
                  }}
                >
                  {isActive && (
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: P.accent, display: 'inline-block' }} aria-hidden="true" />
                  )}
                  {l.label}
                </a>
              );
            })}
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