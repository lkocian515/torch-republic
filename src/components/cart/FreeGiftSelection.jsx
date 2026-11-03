import React from 'react';
import { Check, Gift } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { FREE_GIFTS, FREE_GIFT_THRESHOLD, FREE_GIFT_ENABLED } from '@/lib/freeGiftConfig';

const CARD = '#FFFCF7';
const INK = '#32190F';
const MUTED = '#9A8A7A';
const BORDER = '#B89A6D';
const ACCENT = '#9B4E2F';
const ACCENT_SOFT = 'rgba(184,101,67,0.08)';

export default function FreeGiftSelection() {
  const { selectedGift, setSelectedGift, subtotal } = useCart();

  const qualifies = FREE_GIFT_ENABLED && subtotal >= FREE_GIFT_THRESHOLD;

  if (!qualifies) return null;

  return (
    <div className="mb-4 p-4" style={{ background: ACCENT_SOFT, border: `1px solid ${BORDER}`, borderRadius: '8px' }}>
      <div className="mb-3 flex items-center gap-2">
        <Gift size={16} style={{ color: ACCENT }} />
        <p className="font-serif font-bold text-sm" style={{ color: INK }}>Choose Your Free Gift</p>
      </div>
      <p className="mb-3 font-heading text-xs" style={{ color: MUTED, lineHeight: 1.5 }}>
        Select one gift to include with your order. We will pack it with your coffee.
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
        {FREE_GIFTS.map((gift) => {
          const isSelected = selectedGift?.id === gift.id;
          return (
            <button
              key={gift.id}
              type="button"
              onClick={() => setSelectedGift(isSelected ? null : gift)}
              className="flex-shrink-0 text-left p-3 transition-all"
              style={{
                minWidth: '120px',
                background: isSelected ? ACCENT : CARD,
                border: `2px solid ${isSelected ? ACCENT : BORDER}`,
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              aria-pressed={isSelected}
              aria-label={`Select ${gift.name} as free gift`}
            >
              <div className="mb-1 flex items-center justify-between">
                <Gift size={14} style={{ color: isSelected ? '#F7F2E9' : ACCENT }} />
                {isSelected && <Check size={14} style={{ color: '#F7F2E9' }} />}
              </div>
              <p className="font-heading text-xs font-bold" style={{ color: isSelected ? '#F7F2E9' : INK }}>
                {gift.name}
              </p>
              <p className="font-mono text-[10px] tracking-[0.1em] uppercase mt-1" style={{ color: isSelected ? 'rgba(251,248,241,0.8)' : MUTED }}>
                Free
              </p>
            </button>
          );
        })}
      </div>
      {selectedGift && (
        <p className="mt-2 font-heading text-xs" style={{ color: ACCENT }}>
          {selectedGift.name} selected &mdash; included with your order!
        </p>
      )}
    </div>
  );
}