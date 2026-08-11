import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function NavDropdown({ label, items, to, active, colors }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [open]);

  const handleLabelClick = () => {
    if (to) { navigate(to); setOpen(false); }
    else setOpen((o) => !o);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={handleLabelClick}
        onKeyDown={handleKeyDown}
        className="inline-flex min-h-[44px] items-center gap-1 font-heading text-sm transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ color: active ? colors.text : colors.secondary, borderRadius: '4px' }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 w-60 rounded-lg border p-2 shadow-lg"
          style={{ background: colors.card, borderColor: colors.border }}
          role="menu"
        >
          {items.map(([itemLabel, href]) => (
            <Link
              key={href}
              to={href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 font-heading text-sm transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ color: colors.text }}
              role="menuitem"
            >
              {itemLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}