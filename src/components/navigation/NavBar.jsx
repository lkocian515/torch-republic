import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Search, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOP_MENU = [
  {
    heading: 'Apparel',
    items: [
      { label: 'T-Shirts', category: 't-shirts' },
      { label: 'Hoodies', category: 'hoodies' },
      { label: 'Tanks', category: 'tanks' },
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
      { label: 'Limited Drops', category: 'accessories' },
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

const COLLECTIONS_NAV = [
  { label: 'Patriot Pride', slug: 'patriotic-pride' },
  { label: 'Freedom Collection', slug: 'freedom-isnt-free' },
  { label: 'God Family Country', slug: 'god-family-country' },
  { label: 'We The People', slug: 'we-the-people' },
  { label: 'American Heroes', slug: 'american-heroes' },
  { label: "Founder's Collection", slug: 'founders' },
];

const DROPS_NAV = [
  { label: 'Best Sellers', slug: 'best-sellers' },
  { label: 'New Arrivals', slug: 'best-sellers' },
  { label: 'Liberty Flame', slug: 'liberty-flame' },
];

const ABOUT_NAV = [
  { label: 'Mission', page: 'Mission', internal: true },
  { label: 'Meet the Founder', page: 'Mission', internal: true },
  { label: 'Torchbearer Blog', href: 'https://www.torchrepublic.com/blogs/torchbearer-blog', internal: false },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggle = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  const close = () => { setOpenMenu(null); setIsOpen(false); };

  const Dropdown = ({ id, children }) => (
    <AnimatePresence>
      {openMenu === id && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 mt-2 bg-background border border-border shadow-2xl z-50 p-6"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav ref={navRef} className={`w-full transition-all duration-500 ${
      scrolled ? 'bg-background/98 backdrop-blur-md border-b border-border' : 'bg-background/60 backdrop-blur-sm'
    }`}>
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="relative flex items-center justify-between h-14 md:h-16">

          {/* Left: hamburger (mobile) + nav links (desktop) */}
          <div className="flex items-center gap-6">
            <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-5">

              {/* SHOP */}
              <div className="relative">
                <button
                  onClick={() => toggle('shop')}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors ${openMenu === 'shop' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  Shop ▾
                </button>
                <Dropdown id="shop">
                  <div className="grid grid-cols-5 gap-8 w-[680px]">
                    {SHOP_MENU.map((group) => (
                      <div key={group.heading}>
                        <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: '#C8A44D' }}>{group.heading}</p>
                        <div className="space-y-2">
                          {group.items.map((item) => (
                            <Link key={item.label} to={`/BestSellers?category=${item.category}`} onClick={close} className="block text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Dropdown>
              </div>

              {/* COLLECTIONS */}
              <div className="relative">
                <button
                  onClick={() => toggle('collections')}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors ${openMenu === 'collections' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  Collections ▾
                </button>
                <Dropdown id="collections">
                  <div className="w-52 space-y-2">
                    {COLLECTIONS_NAV.map((c) => (
                      <Link key={c.slug} to={`/BestSellers?collection=${c.slug}`} onClick={close} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </Dropdown>
              </div>

              {/* NEW / BESTSELLERS */}
              <div className="relative">
                <button
                  onClick={() => toggle('drops')}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors ${openMenu === 'drops' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  New / Bestsellers ▾
                </button>
                <Dropdown id="drops">
                  <div className="w-44 space-y-2">
                    {DROPS_NAV.map((c) => (
                      <Link key={c.label} to={`/BestSellers?collection=${c.slug}`} onClick={close} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </Dropdown>
              </div>

              {/* ABOUT */}
              <div className="relative">
                <button
                  onClick={() => toggle('about')}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors ${openMenu === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  About ▾
                </button>
                <Dropdown id="about">
                  <div className="w-44 space-y-2">
                    {ABOUT_NAV.map((item) => (
                      item.internal
                        ? <Link key={item.label} to={createPageUrl(item.page)} onClick={close} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link>
                        : <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={close} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</a>
                    ))}
                  </div>
                </Dropdown>
              </div>

              {/* On Sale */}
              <Link to="/OnSale" className="text-xs font-mono tracking-widest uppercase font-bold transition-colors" style={{ color: '#C8A44D' }}>
                🔥 Sale
              </Link>

              {/* The Torch Box */}
              <a
                href="https://torchbearer-nation.sintra.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono tracking-widest uppercase font-black px-3 py-1 border transition-all hover:bg-primary/10"
                style={{ borderColor: '#C8A44D', color: '#C8A44D' }}
              >
                🔥 Torch Box
              </a>

              {/* Track Order */}
              <Link to={createPageUrl('TrackOrder')} className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs font-mono tracking-widest uppercase">
                <CalendarCheck className="w-3.5 h-3.5" /> Track
              </Link>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
           <a href="https://www.torchrepublic.com/cart" className="text-muted-foreground hover:text-primary transition-colors">
             <Search className="w-5 h-5" />
           </a>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center py-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/c53d23798_IMG_20260213_173838.png"
              alt="Torch Republic"
              className="h-20 md:h-24 w-auto"
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
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Shop categories */}
              {SHOP_MENU.map((group) => (
                <div key={group.heading}>
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2" style={{ color: '#C8A44D' }}>{group.heading}</p>
                  {group.items.map((item) => (
                    <Link
                      key={item.label}
                      to={`/BestSellers?category=${item.category}`}
                      onClick={close}
                      className="block py-1.5 text-foreground hover:text-primary transition-colors text-sm font-heading tracking-wider"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}

              {/* Collections */}
              <div className="pt-2 border-t border-border">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2" style={{ color: '#C8A44D' }}>Collections</p>
                {COLLECTIONS_NAV.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/BestSellers?collection=${c.slug}`}
                    onClick={close}
                    className="block py-1.5 text-foreground hover:text-primary transition-colors text-sm font-heading tracking-wider"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-2 border-t border-border space-y-3">
                <Link to="/OnSale" onClick={close} className="block text-base font-heading font-bold tracking-wider uppercase" style={{ color: '#C8A44D' }}>
                  🔥 On Sale
                </Link>
                <a
                  href="https://torchbearer-nation.sintra.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="block text-base font-heading font-bold tracking-wider uppercase"
                  style={{ color: '#C8A44D' }}
                >
                  🔥 The Torch Box
                </a>
                <Link to={createPageUrl('Mission')} onClick={close} className="block text-foreground hover:text-primary transition-colors text-sm font-heading font-semibold tracking-wider uppercase">
                  Our Mission
                </Link>
                <Link to={createPageUrl('TrackOrder')} onClick={close} className="block text-foreground hover:text-primary transition-colors text-sm font-heading font-semibold tracking-wider uppercase">
                  Track Order
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}