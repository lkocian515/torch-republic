import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const CLOSE_DELAY = 200; // ms — forgiving gap between trigger and menu

export default function NavDropdown({ label, items, to, active, colors }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const wrapperRef = useRef(null);
  const firstItemRef = useRef(null);
  const keyboardOpen = useRef(false);
  const navigate = useNavigate();

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, [cancelClose]);

  // Open on hover, cancel any pending close
  const handleMouseEnter = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  // Start a delayed close — cancelled if pointer re-enters
  const handleMouseLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  useEffect(() => {
    return () => cancelClose();
  }, [cancelClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  // When opened via keyboard, move focus into the menu
  useEffect(() => {
    if (open && keyboardOpen.current && firstItemRef.current) {
      firstItemRef.current.focus();
    }
    if (!open) keyboardOpen.current = false;
  }, [open]);

  const handleLabelClick = () => {
    if (to) { navigate(to); setOpen(false); }
    else setOpen((o) => !o);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      keyboardOpen.current = true;
      setOpen(true);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleLabelClick}
        onKeyDown={handleKeyDown}
        className="inline-flex min-h-[44px] items-center gap-1 font-heading text-sm transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ color: active ? colors.text : colors.secondary, borderRadius: '4px' }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-50 w-60 pt-2"
          role="menu"
          aria-label={label}
        >
          <div
            className="rounded-lg border p-2 shadow-lg"
            style={{ background: colors.card, borderColor: colors.border }}
          >
            {items.map(([itemLabel, href], idx) => (
              <Link
                key={href}
                ref={idx === 0 ? firstItemRef : undefined}
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
        </div>
      )}
    </div>
  );
}