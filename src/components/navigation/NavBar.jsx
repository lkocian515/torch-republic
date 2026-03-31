import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ShoppingCart, ChevronDown, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOP_MENU = [
  {
    heading: 'Apparel',
    items: [
      { label: 'T-Shirts', category: 't-shirts' },
      { label: 'Hoodies', category: 'hoodies' },
      { label: 'Tanks', category: 't-shirts' },
    ],
  },
  {
    heading: 'Accessories',
    items: [
      { label: 'Hats & Caps', category: 'hats' },
      { label: 'Car Magnets', category: 'magnets' },
      { label: 'Stickers', category: 'stickers' },
    ],
  },
  {
    heading: 'Home & Lifestyle',
    items: [
      { label: 'Mugs & Tumblers', category: 'mugs-tumblers' },
      { label: 'Candles', category: 'candles' },
      { label: 'Flags', category: 'flags' },
    ],
  },
  {
    heading: 'Collectibles',
    items: [
      { label: 'Bobbleheads', category: 'bobbleheads' },
      { label: 'Limited Drops', category: 'limited-edition' },
    ],
  },
  {
    heading: 'Consumables',
    items: [
      { label: 'Coffee', category: 'coffee' },
      { label: 'Tea', category: 'tea' },
    ],
  },
];

const COLLECTIONS_MENU = [
  { label: 'Patriot Pride', slug: 'patriotic-pride' },
  { label: 'Freedom Collection', slug: 'freedom-isnt-free' },
  { label: 'God, Family, Country', slug: 'god-family-country' },
  { label: 'We The People', slug: 'we-the-people' },
  { label: 'American Heroes', slug: 'american-heroes' },
  { label: "Founder's Collection", slug: 'founders' },
];

const DROPS_MENU = [
  { label: 'New Arrivals', collection: 'best-sellers' },
  { label: 'Best Sellers', collection: 'best-sellers' },
  { label: 'Limited Edition', category: 'limited-edition' },
];

const ABOUT_MENU = [
  { label: 'Mission', page: 'Mission' },
  { label: 'Contact', page: 'Contact' },
];

function DropdownMenu({ label, children, gold = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-mono tracking-wider uppercase transition-colors ${
          gold ? 'font-bold' : ''
        } ${open ? 'text-primary' : gold ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-primary'}`}
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 bg-background border border-border shadow-2xl z-50"
            style={{ minWidth: '180px' }}
          >
            {children(setOpen)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full transition-all duration-500 ${
      scrolled ? 'bg-background/98 backdrop-blur-md border-b border-border' : 'bg-background/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top row: nav + icons */}
        <div className="flex items-center justify-between h-12">
          {/* Mobile hamburger */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* SHOP mega dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-mono tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors">
                Shop <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-[600px] bg-background border border-border shadow-2xl z-50 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="grid grid-cols-5 gap-4">
                  {SHOP_MENU.map((section) => (
                    <div key={section.heading}>
                      <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: '#C8A44D' }}>
                        {section.heading}
                      </p>
                      <div className="space-y-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={`/BestSellers?category=${item.category}`}
                            className="block text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* THE TORCH BOX */}
            <a
              href="https://torchbearer-nation.sintra.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-mono tracking-wider uppercase font-bold transition-colors"
              style={{ color: '#C8A44D' }}
            >
              <Flame className="w-3.5 h-3.5" /> The Torch Box
            </a>

            {/* COLLECTIONS dropdown */}
            <DropdownMenu label="Collections">
              {(close) => (
                <div className="p-4 space-y-2">
                  {COLLECTIONS_MENU.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/BestSellers?collection=${c.slug}`}
                      onClick={close}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      {c.label}
                    </Link>
                  ))}
                  <Link
                    to={createPageUrl('Collections')}
                    onClick={close}
                    className="block text-xs font-mono pt-2 mt-2 border-t border-border"
                    style={{ color: '#C8A44D' }}
                  >
                    View All →
                  </Link>
                </div>
              )}
            </DropdownMenu>

            {/* NEW / DROPS dropdown */}
            <DropdownMenu label="New / Drops">
              {(close) => (
                <div className="p-4 space-y-2">
                  {DROPS_MENU.map((d) => (
                    <Link
                      key={d.label}
                      to={d.category ? `/BestSellers?category=${d.category}` : `/BestSellers?collection=${d.collection}`}
                      onClick={close}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </DropdownMenu>

            {/* ABOUT dropdown */}
            <DropdownMenu label="About">
              {(close) => (
                <div className="p-4 space-y-2">
                  {ABOUT_MENU.map((a) => (
                    <Link
                      key={a.label}
                      to={createPageUrl(a.page)}
                      onClick={close}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              )}
            </DropdownMenu>

            {/* On Sale */}
            <Link to="/OnSale" className="text-sm font-mono tracking-wider uppercase font-bold transition-colors" style={{ color: '#C8A44D' }}>
              🔥 Sale
            </Link>
          </div>

          {/* Right: cart */}
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = 'https://libertees-for-all.myshopify.com/cart'} className="text-muted-foreground hover:text-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Logo centered */}
        <div className="flex justify-center py-3">
          <Link to="/">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/c53d23798_IMG_20260213_173838.png"
              alt="Torch Republic"
              className="h-16 md:h-20 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {/* Torch Box */}
              <a
                href="https://torchbearer-nation.sintra.site/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-3 text-base font-heading font-black tracking-wider uppercase border-b border-border"
                style={{ color: '#C8A44D' }}
              >
                <Flame className="w-4 h-4" /> The Torch Box
              </a>

              {/* SHOP sections */}
              {SHOP_MENU.map((section) => (
                <div key={section.heading}>
                  <button
                    onClick={() => setMobileSection(mobileSection === section.heading ? null : section.heading)}
                    className="w-full flex items-center justify-between py-3 text-sm font-mono tracking-wider uppercase text-foreground border-b border-border/50"
                  >
                    {section.heading}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === section.heading ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSection === section.heading && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4"
                      >
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={`/BestSellers?category=${item.category}`}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Collections */}
              <button
                onClick={() => setMobileSection(mobileSection === 'collections' ? null : 'collections')}
                className="w-full flex items-center justify-between py-3 text-sm font-mono tracking-wider uppercase text-foreground border-b border-border/50"
              >
                Collections
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === 'collections' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileSection === 'collections' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4"
                  >
                    {COLLECTIONS_MENU.map((c) => (
                      <Link key={c.slug} to={`/BestSellers?collection=${c.slug}`} onClick={() => setIsOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/OnSale" onClick={() => setIsOpen(false)} className="block py-3 text-base font-heading font-bold uppercase border-b border-border/50" style={{ color: '#C8A44D' }}>
                🔥 On Sale
              </Link>
              <Link to={createPageUrl('Mission')} onClick={() => setIsOpen(false)} className="block py-3 text-sm font-mono tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors">
                Mission
              </Link>
              <Link to={createPageUrl('Contact')} onClick={() => setIsOpen(false)} className="block py-3 text-sm font-mono tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}