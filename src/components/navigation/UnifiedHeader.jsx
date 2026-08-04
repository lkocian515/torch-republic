import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import SearchModal from '@/components/search/SearchModal';

const nav = [
  ['Shop', '/shop'],
  ['Mushroom Coffee', '/shop/instant-mushroom-coffee'],
  ['Matcha', '/shop/matcha'],
  ['Build Your Ritual', '/build-your-ritual'],
  ['Our Story', '/mission'],
  ['Learn', '/journal'],
];
const colors = { page: '#F8F5EF', card: '#FFFDFC', text: '#26231F', secondary: '#655E56', border: '#DED8CF', coffee: '#6F4A32' };

export default function UnifiedHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  return <>
    <div className="px-4 py-2 text-center" style={{ background: colors.coffee, color: colors.page }}><p className="font-heading text-sm">Thoughtfully crafted daily rituals for coffee, matcha, and botanical blends.</p></div>
    <header className="sticky top-0 z-40" style={{ background: 'rgba(248,245,239,0.96)', borderBottom: `1px solid ${colors.border}`, backdropFilter: 'blur(14px)' }}>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-8">
        <button onClick={() => setOpen(true)} className="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden" aria-label="Open navigation menu" aria-expanded={open}><Menu className="h-6 w-6" /></button>
        <Link to="/" className="flex items-center" aria-label="Torch Republic home"><img src="/torch-republic-logo-transparent.png" alt="Torch Republic Coffee Company" width="220" height="72" className="h-12 w-auto object-contain" /></Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">{nav.map(([label, href]) => <Link key={href} to={href} className="font-heading text-sm transition-opacity duration-200 hover:opacity-70" style={{ color: location.pathname === href ? colors.text : colors.secondary }} aria-current={location.pathname === href ? 'page' : undefined}>{label}</Link>)}</nav>
        <div className="flex items-center gap-2"><button type="button" onClick={() => setSearchOpen(true)} className="flex min-h-[44px] min-w-[44px] items-center justify-center" aria-label="Search site"><Search className="h-5 w-5" style={{ color: colors.text }} /></button><Link to="/profile" className="hidden min-h-[44px] min-w-[44px] items-center justify-center md:flex" aria-label="Account"><User className="h-5 w-5" style={{ color: colors.text }} /></Link><Link to="/cart" className="relative flex min-h-[44px] min-w-[44px] items-center justify-center" aria-label={`Cart with ${totalItems} items`}><ShoppingBag className="h-5 w-5" style={{ color: colors.text }} />{totalItems > 0 && <span className="absolute right-0 top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px]" style={{ background: colors.coffee, color: colors.card }}>{totalItems}</span>}</Link></div>
      </div>
    </header>
    {open && <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation" style={{ background: colors.page }}><div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: colors.border }}><span className="font-serif text-2xl" style={{ color: colors.text }}>Menu</span><button onClick={() => setOpen(false)} className="flex min-h-[44px] min-w-[44px] items-center justify-center" aria-label="Close navigation menu"><X /></button></div><nav className="flex flex-col px-5 py-6" aria-label="Mobile navigation links">{[...nav, ['Classic Coffee', '/shop/instant-coffee'], ['Ingredients', '/ingredients'], ['FAQ', '/faq'], ['Account', '/profile'], ['Cart', '/cart']].map(([label, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} className="border-b py-4 font-heading text-xl" style={{ borderColor: colors.border, color: colors.text }}>{label}</Link>)}</nav></div>}
    <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
  </>;
}