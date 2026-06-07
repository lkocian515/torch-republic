import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Truck, PartyPopper } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 75;

export default function FreeShippingProgress({ subtotal }) {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  if (subtotal === null || typeof subtotal === 'undefined') {
    return null;
  }

  const isUnlocked = remaining <= 0;

  return (
    <div className="w-full bg-card rounded-lg p-4 my-4 transition-all" style={{ border: isUnlocked ? '1px solid #10B981' : '1px solid hsl(var(--border))' }}>
      <div className="flex items-center justify-between mb-2 text-sm">
        <div className="flex items-center gap-2 font-mono" style={{ color: isUnlocked ? '#10B981' : 'hsl(var(--foreground))'}}>
          {isUnlocked ? <PartyPopper className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
          <span>
            {isUnlocked
              ? "You've unlocked free shipping!"
              : <>You're <span className="font-bold">${remaining.toFixed(2)}</span> away from free shipping!</>}
          </span>
        </div>
      </div>
      <Progress value={progress} className="w-full h-1.5" indicatorClassName={isUnlocked ? "bg-emerald-500" : "bg-primary"} />
    </div>
  );
}