import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import SearchModal from '@/components/search/SearchModal';

const nav = [
  ['Shop', '/shop'],
  ['Mushroom Coffee', '/shop/instant-mushroom-coffee'],
  ['Matcha', '/shop/matcha'],
  ['Build Your Ritual', '/build-your-ritual'],
  ['Our Story', '/our-story'],
  ['Reviews', '/reviews'],
];
const colors = {
  page: 'hsl(var(--background))',
  card: 'hsl(var(--card))',
  text: 'hsl(var(--foreground))',
  secondary: 'hsl(var(--muted-foreground))',
  border: 'hsl(var(--border))',
  coffee: 'hsl(var(--primary))',
  coffeeText: 'hsl(var(--primary-foreground))',
};

export default function UnifiedHeader() {
  const [open, setOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const communityActive = location.pathname === '/customer-spotlight';
  const handleMobileNav = () => setOpen(true);
  return <>
    <div className="px-4 py-2 text-center" style={{ background: colors.coffee, color: colors.coffeeText }}><p className="font-heading text-sm">Thoughtfully crafted daily rituals for coffee, matcha, and botanical blends · Free shipping $50+</p></div>
    <header className="sticky top-0 z-40" style={{ background: 'hsl(var(--background) / 0.96)', borderBottom: `1px solid ${colors.border}`, backdropFilter: 'blur(14px)' }}>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-8">
        <button onClick={handleMobileNav} className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1 md:hidden" aria-label="Open navigation menu" aria-expanded={open}><Menu className="h-6 w-6" /></button>
        <Link to="/" className="flex items-center" aria-label="Torch Republic home"><img src="/torch-republic-logo-transparent.png" alt="Torch Republic Coffee Company" width="220" height="72" className="h-10 w-auto object-contain lg:h-12" /></Link>
        <nav className="hidden items-center gap-4 md:ml-6 lg:ml-14 lg:gap-7 md:flex" aria-label="Primary navigation">{nav.map(([label, href]) => <Link key={href} to={href} className="font-heading text-sm transition-opacity duration-200 hover:opacity-70" style={{ color: location.pathname === href ? colors.text : colors.secondary }} aria-current={location.pathname === href ? 'page' : undefined}>{label}</Link>)}<div className="relative" onMouseEnter={() => setCommunityOpen(true)} onMouseLeave={() => setCommunityOpen(false)}><button type="button" onClick={() => setCommunityOpen((current) => !current)} className="flex items-center gap-1 font-heading text-sm transition-opacity duration-200 hover:opacity-70" style={{ color: communityActive ? colors.text : colors.secondary }} aria-expanded={communityOpen} aria-haspopup="true">Community <ChevronDown className="h-3.5 w-3.5" /></button>{communityOpen && <div className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl border p-2 shadow-lg" style={{ background: colors.card, borderColor: colors.border }}><Link to="/customer-spotlight" className="block rounded-xl px-4 py-3 font-heading text-sm transition-opacity duration-200 hover:opacity-70" style={{ color: colors.text }} aria-current={communityActive ? 'page' : undefined}>Customer Spotlight</Link></div>}</div></nav>
        <div className="flex items-center gap-2"><button type="button" onClick={() => setSearchOpen(true)} className="flex min-h-[44px] min-w-[44px] items-center justify-center" aria-label="Search site"><Search className="h-5 w-5" style={{ color: colors.text }} /></button><Link to="/profile" className="hidden min-h-[44px] min-w-[44px] items-center justify-center md:flex" aria-label="Account"><User className="h-5 w-5" style={{ color: colors.text }} /></Link><Link to="/cart" className="relative flex min-h-[44px] min-w-[44px] items-center justify-center" aria-label={`Cart with ${totalItems} items`}><ShoppingBag className="h-5 w-5" style={{ color: colors.text }} />{totalItems > 0 && <span className="absolute right-0 top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px]" style={{ background: colors.coffee, color: colors.card }}>{totalItems}</span>}</Link></div>
      </div>
    </header>
    {open && <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation" style={{ background: colors.page }}><div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: colors.border }}><span className="font-serif text-2xl" style={{ color: colors.text }}>Menu</span><button onClick={() => setOpen(false)} className="flex min-h-[44px] min-w-[44px] items-center justify-center" aria-label="Close navigation menu"><X /></button></div><nav className="flex flex-col px-5 py-6" aria-label="Mobile navigation links">{[...nav, ['Community: Customer Spotlight', '/customer-spotlight'], ['Journal', '/journal'], ['Classic Coffee', '/shop/instant-coffee'], ['Ingredients', '/ingredients'], ['FAQ', '/faq'], ['Contact', '/contact'], ['Account', '/profile'], ['Cart', '/cart']].map(([label, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} className="border-b py-4 font-heading text-xl" style={{ borderColor: colors.border, color: colors.text }}>{label}</Link>)}</nav></div>}
    <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
  </>;
}