import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/lib/CartContext';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ShoppingCart, Search, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COLLECTIONS = [
  { label: 'Patriot Pride Collection', slug: 'patriotic-pride' },
  { label: 'Freedom Collection', slug: 'freedom-isnt-free' },
  { label: 'God, Family, Country Collection', slug: 'god-family-country' },
  { label: 'We The People Collection', slug: 'we-the-people' },
  { label: 'American Heroes Collection', slug: 'american-heroes' },
  { label: 'Founders Collection', slug: 'founders' },
  { label: 'Torchbearer Collection', slug: 'best-sellers' },
];

const BY_CATEGORY = [
  { label: 'Tees', slug: 't-shirts' },
  { label: 'Hoodies & Sweatshirts', slug: 't-shirts' },
  { label: 'Hats & Caps', slug: 'hats' },
  { label: 'Accessories', slug: 'accessories' },
  { label: 'Jewelry', slug: 'jewelry' },
  { label: 'Home Decor', slug: 'home-decor' },
];

const GIFTS_DECOR = [
  { label: 'Car Magnets', slug: 'magnets' },
  { label: 'Home Decor', slug: 'home-decor' },
  { label: 'Accessories', slug: 'accessories' },
];

const JEWELRY = [
  { label: 'Earrings', slug: 'jewelry' },
  { label: 'Necklaces', slug: 'jewelry' },
];

const NAV_ITEMS = [
  { label: 'Best Sellers', page: 'BestSellers' },
  { label: 'Our Mission', page: 'Mission' },
  { label: 'Contact Us', page: 'Contact' },
];

export default function NavBar() {
  const { itemCount, setIsOpen: openCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setShopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className={`w-full transition-all duration-500 ${
      scrolled ? 'bg-background/98 backdrop-blur-md border-b border-border' : 'bg-background/60 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between h-14 md:h-16">
          {/* Left: Hamburger (mobile) + Nav (desktop) */}
          <div className="flex items-center gap-6">
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex items-center gap-8">
              {/* Shop with mega menu */}
              <div ref={shopRef} className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className={`text-sm font-mono tracking-wider uppercase transition-colors duration-300 ${shopOpen ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  Shop
                </button>

                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-[680px] bg-background border border-border shadow-2xl z-50 p-6"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {/* By Collections */}
                        <div>
                          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: '#C8A44D' }}>
                            By Collections
                          </p>
                          <div className="space-y-2">
                            {COLLECTIONS.map((c) => (
                              <Link
                                key={c.slug}
                                to={createPageUrl('BestSellers') + `?collection=${c.slug}`}
                                onClick={() => setShopOpen(false)}
                                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {c.label}
                              </Link>
                            ))}
                            <Link
                              to={createPageUrl('Collections')}
                              onClick={() => setShopOpen(false)}
                              className="block text-xs font-mono mt-3 pt-3 border-t border-border"
                              style={{ color: '#C8A44D' }}
                            >
                              View All Collections →
                            </Link>
                          </div>
                        </div>

                        {/* By Category */}
                        <div>
                          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: '#C8A44D' }}>
                            By Category
                          </p>
                          <div className="space-y-2">
                            {BY_CATEGORY.map((c) => (
                              <Link
                                key={c.label}
                                to={createPageUrl('BestSellers') + `?category=${c.slug}`}
                                onClick={() => setShopOpen(false)}
                                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Patriotic Gifts & Decor */}
                        <div>
                          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: '#C8A44D' }}>
                            Patriotic Gifts & Decor
                          </p>
                          <div className="space-y-2">
                            {GIFTS_DECOR.map((c) => (
                              <Link
                                key={c.label}
                                to={createPageUrl('BestSellers') + `?category=${c.slug}`}
                                onClick={() => setShopOpen(false)}
                                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* On Sale highlight */}
              <Link
                to="/OnSale"
                className="text-sm font-mono tracking-wider uppercase transition-colors duration-300 font-bold"
                style={{ color: '#C8A44D' }}
              >
                🔥 On Sale
              </Link>

              {/* Other nav items */}
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={createPageUrl(item.page)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-mono tracking-wider uppercase"
                >
                  {item.label}
                </Link>
              ))}

              {/* Track Order with icon */}
              <Link
                to={createPageUrl('TrackOrder')}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-mono tracking-wider uppercase"
              >
                <CalendarCheck className="w-4 h-4" />
                Track Order
              </Link>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => openCart(true)} className="text-muted-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
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
            <div className="px-6 py-6 space-y-4">
              <p className="text-xs font-mono tracking-[0.3em] uppercase mb-2" style={{ color: '#C8A44D' }}>Shop</p>
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.slug}
                  to={createPageUrl('BestSellers') + `?collection=${c.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-foreground hover:text-primary transition-colors text-sm font-heading tracking-wider"
                >
                  {c.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-4">
                <Link
                  to="/OnSale"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-heading font-bold tracking-wider uppercase"
                  style={{ color: '#C8A44D' }}
                >
                  🔥 On Sale
                </Link>
                <Link
                  to={createPageUrl('TrackOrder')}
                  onClick={() => setIsOpen(false)}
                  className="block text-foreground hover:text-primary transition-colors text-lg font-heading font-semibold tracking-wider uppercase"
                >
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