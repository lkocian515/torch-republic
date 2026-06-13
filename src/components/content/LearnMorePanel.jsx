import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

const RG = '#E6B7AD';

const MUSHROOM_COFFEE_GUIDES = [
  { label: 'The Science of Lion\'s Mane', href: '/journal/science-of-lions-mane', desc: 'NGF, neurogenesis, and 100+ studies explained.' },
  { label: 'Coffee & Focus Guide', href: '/journal/coffee-and-focus', desc: 'How caffeine and adaptogens work together.' },
  { label: 'Mushroom Coffee Benefits', href: '/mushroom-coffee-benefits', desc: 'Lion\'s Mane, Chaga, Cordyceps — honestly explained.' },
  { label: 'History of Mushroom Coffee', href: '/journal/history-of-mushroom-coffee', desc: 'From ancient traditions to modern wellness.' },
  { label: 'Why Mushroom Coffee?', href: '/why-mushroom-coffee', desc: 'A plain-language breakdown of what\'s inside.' },
];

const MATCHA_GUIDES = [
  { label: 'History of Matcha', href: '/journal/history-of-matcha', desc: 'Centuries of ceremonial tradition.' },
  { label: 'Matcha Benefits Guide', href: '/journal/matcha-benefits', desc: 'L-Theanine, antioxidants, and calm energy.' },
  { label: 'Why Matcha?', href: '/why-matcha', desc: 'How it compares to coffee and green tea.' },
];

/**
 * Collapsible "Want to go deeper?" panel linking to educational guides.
 * Add to product pages below the main purchase section.
 */
export default function LearnMorePanel({ category = 'mushroom-coffee' }) {
  const [open, setOpen] = useState(false);
  const guides = category === 'matcha' ? MATCHA_GUIDES : MUSHROOM_COFFEE_GUIDES;

  return (
    <div style={{ borderTop: '1px solid rgba(230,183,173,0.08)', marginTop: '8px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 transition-colors hover:opacity-80"
        style={{ background: 'none', border: 'none', color: 'rgba(247,241,232,0.5)' }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5" style={{ color: RG }} />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Want to go deeper? Read the science</span>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4" style={{ color: RG }} />
          : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(230,183,173,0.4)' }} />
        }
      </button>
      {open && (
        <div className="pb-5 space-y-2">
          {guides.map(g => (
            <Link
              key={g.href}
              to={g.href}
              className="flex flex-col gap-0.5 p-3 transition-all hover:opacity-80 block"
              style={{ background: 'rgba(230,183,173,0.03)', border: '1px solid rgba(230,183,173,0.08)', textDecoration: 'none' }}
            >
              <span className="font-serif font-bold text-white text-sm">{g.label}</span>
              <span className="font-heading text-xs" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>{g.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}