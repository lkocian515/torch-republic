import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Truck, PartyPopper } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, FREE_SHIPPING_THRESHOLD_DISPLAY } from '@/lib/siteConfig';

/**
 * Shipping progress on the cart.
 *
 * The threshold comes from the same configured policy checkout uses. When the
 * order is a few cents short the bar stays quiet rather than turning the gap
 * into a nudge — the shortfall is never advertised as a penny chase.
 */
export default function FreeShippingProgress({ subtotal }) {
  if (subtotal === null || typeof subtotal === 'undefined') {
    return null;
  }

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const isUnlocked = remaining <= 0;
  // Under a dollar short: state the policy, don't count pennies.
  const isNearlyThere = !isUnlocked && remaining < 1;

  return (
    <div className="w-full bg-card rounded-lg p-4 my-4 transition-all" style={{ border: isUnlocked ? '1px solid #10B981' : '1px solid hsl(var(--border))' }}>
      <div className="flex items-center justify-between mb-2 text-sm">
        <div className="flex items-center gap-2 font-mono" style={{ color: isUnlocked ? '#10B981' : 'hsl(var(--foreground))'}}>
          {isUnlocked ? <PartyPopper className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
          <span>
            {isUnlocked
              ? "You've unlocked free shipping!"
              : isNearlyThere
              ? `Free standard shipping on orders of ${FREE_SHIPPING_THRESHOLD_DISPLAY}.`
              : <>You're <span className="font-bold">${Math.ceil(remaining)}</span> away from free shipping!</>}
          </span>
        </div>
      </div>
      <Progress value={progress} className="w-full h-1.5" indicatorClassName={isUnlocked ? "bg-emerald-500" : "bg-primary"} />
    </div>
  );
}