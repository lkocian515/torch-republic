import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ShoppingCart, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOP_MENU = [
  { label: 'T-Shirts', category: 't-shirts' },
  { label: 'Hoodies', category: 'hoodies' },
  { label: 'Hats', category: 'hats' },
];

const COFFEE_MENU = [
  { label: 'Founders Series', page: 'Coffee' },
  { label: 'Subscription', disabled: true },
];

const COLLECTIONS_NAV = [
  { label: 'Founders Series', slug: 'founders' },
  { label: 'American Heroes', slug: 'american-heroes' },
  { label: 'We The People', slug: 'we-the-people' },
  { label: 'God, Family, Country', slug: 'god-family-country' },
];

const DROPS_NAV = [
  { label: 'The Torch Box', page: 'TheTorchBox' },
];

const ABOUT_NAV = [
  { label: 'Mission', page: 'Mission', internal: true },
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
                  <div className="w-40 space-y-2">
                    {SHOP_MENU.map((item) => (
                      <Link key={item.label} to={`/BestSellers?category=${item.category}`} onClick={close} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </Dropdown>
              </div>

              {/* COFFEE */}
              <div className="relative">
                <button
                  onClick={() => toggle('coffee')}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors ${openMenu === 'coffee' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  Coffee <span className="text-[10px]" style={{ color: '#C8A44D' }}>●</span> Soon ▾
                </button>
                <Dropdown id="coffee">
                  <div className="w-44 space-y-2">
                    {COFFEE_MENU.map((item) => (
                      item.disabled ? (
                        <div key={item.label} className="block text-sm text-muted-foreground py-1">{item.label} <span style={{ color: '#C8A44D' }}>●</span></div>
                      ) : (
                        <Link key={item.label} to={createPageUrl(item.page)} onClick={close} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {item.label}
                        </Link>
                      )
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

              {/* THE TORCH BOX */}
              <Link to={createPageUrl('TheTorchBox')} className="text-xs font-mono tracking-widest uppercase font-bold transition-colors hover:text-primary text-muted-foreground">
                THE TORCH BOX
              </Link>

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
                      <Link key={item.label} to={createPageUrl(item.page)} onClick={close} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
           <a href="https://torch-republic.com/cart" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Cart">
             <ShoppingCart className="w-5 h-5" />
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
              {SHOP_MENU.map((item) => (
                <Link
                  key={item.label}
                  to={`/BestSellers?category=${item.category}`}
                  onClick={close}
                  className="block py-1.5 text-foreground hover:text-primary transition-colors text-sm font-heading tracking-wider"
                >
                  {item.label}
                </Link>
              ))}

              {/* Coffee */}
              <div className="pt-2 border-t border-border">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2" style={{ color: '#C8A44D' }}>Coffee <span style={{ color: '#C8A44D' }}>●</span> Coming Soon</p>
                {COFFEE_MENU.map((item) => (
                  item.disabled ? (
                    <div key={item.label} className="py-1.5 text-foreground text-sm font-heading tracking-wider opacity-50">
                      {item.label}
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      to={createPageUrl(item.page)}
                      onClick={close}
                      className="block py-1.5 text-foreground hover:text-primary transition-colors text-sm font-heading tracking-wider"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>

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
                <Link to={createPageUrl('TheTorchBox')} onClick={close} className="block text-base font-heading font-bold tracking-wider uppercase" style={{ color: '#C8A44D' }}>
                  The Torch Box
                </Link>
                <Link to={createPageUrl('Mission')} onClick={close} className="block text-foreground hover:text-primary transition-colors text-sm font-heading font-semibold tracking-wider uppercase">
                  Mission
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}