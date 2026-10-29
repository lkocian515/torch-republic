import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { optionState, findOption, toCartProduct, formatMoney, editionPath } from '@/lib/specialEditions';
import { duoName, duoPath, nextDuoAfter } from '@/lib/duos';
import GrindSelector from '@/components/specialeditions/GrindSelector';
import SeasonalInterestForm from '@/components/seasonal/SeasonalInterestForm';

/**
 * "Shop the duo": adds one bag of each listed coffee (two bags for a refill
 * pair) in a single action, in one grind both coffees share. Closed or
 * not-yet-open duos never render a purchase button.
 */
export default function DuoShopPanel({ pairing, bags, status }) {
  const { addItems } = useCart();
  const [key, setKey] = useState(null);

  const purchasable = bags.map((bag) => (bag.edition?.options || []).filter((o) => optionState(o).purchasable));
  const commonKeys = (purchasable[0] || [])
    .map((o) => o.key)
    .filter((k) => purchasable.every((list) => list.some((o) => o.key === k)));
  const chosen = commonKeys.includes(key) ? key : commonKeys[0];
  const grindOptions = (purchasable[0] || []).filter((o) => commonKeys.includes(o.key));

  const picks = bags.map((bag) => {
    const option = bag.edition ? findOption(bag.edition, chosen) : null;
    return { bag, option };
  });
  const everythingReady = status === 'available' && chosen && picks.every(({ bag, option }) => bag.edition && option && optionState(option).purchasable && bag.art);

  const total = everythingReady
    ? picks.reduce((sum, { bag, option }) => sum + Number(optionState(option).price || 0) * bag.qty, 0)
    : null;
  const currency = picks[0]?.option ? optionState(picks[0].option).currency : 'USD';

  const add = () => {
    addItems(picks.map(({ bag, option }) => ({ product: toCartProduct(bag.edition, option), qty: bag.qty })));
  };

  const next = nextDuoAfter(pairing);
  const panel = { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.25rem, 3vw, 1.75rem)' };

  if (status === 'closed') {
    return (
      <div style={panel}>
        <p className="eyebrow">Archived</p>
        <h2 className="h3 mt-2">This duo is closed</h2>
        <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Orders for {duoName(pairing)} are no longer accepted. This page stays here as a reference.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/shop" className="btn btn-primary">Shop current products</Link>
          {next ? <Link to={duoPath(next)} className="btn btn-ghost">Next: {duoName(next)}</Link> : null}
        </div>
      </div>
    );
  }

  if (status !== 'available') {
    return (
      <div style={panel}>
        <p className="eyebrow">Coming soon</p>
        <h2 className="h3 mt-2">Not open for orders yet</h2>
        <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          This is a preview. Ordering opens on the start date once both coffees are in stock.
        </p>
        <div className="mt-4">
          <SeasonalInterestForm kind="notify" productSlug={`duo-${pairing.slug}`} productName={duoName(pairing)} source="duo-page" buttonLabel="Tell me when it opens" />
        </div>
      </div>
    );
  }

  return (
    <div style={panel}>
      <p className="eyebrow">Shop the duo</p>
      <h2 className="h3 mt-2">{bags.map((b) => (b.qty > 1 ? `${b.qty} \u00d7 ${b.name}` : `1 \u00d7 ${b.name}`)).join(' + ')}</h2>

      {commonKeys.length === 0 ? (
        <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          These two coffees are not available in the same grind right now, so the duo cannot be ordered together. Each coffee can still be ordered from its own page.
        </p>
      ) : (
        <>
          <div className="mt-4">
            <GrindSelector options={grindOptions} value={chosen} onChange={setKey} legend="Choose one grind for both bags" />
          </div>
          {total !== null && total > 0 ? (
            <p className="mt-4 font-heading font-semibold" style={{ fontSize: '1.5rem' }}>
              {formatMoney(total, currency || 'USD')}
              <span className="body block" style={{ fontSize: '0.8125rem', fontWeight: 400, color: 'hsl(var(--muted-foreground))' }}>
                Sum of the current prices. Shipping and tax are calculated at checkout.
              </span>
            </p>
          ) : null}
          <button type="button" className="btn btn-primary mt-5 w-full" onClick={add} disabled={!everythingReady}>
            <ShoppingBag size={16} strokeWidth={2} /> Shop the duo
          </button>
        </>
      )}

      <p className="body mt-4" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>Or order separately:</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {bags.filter((b) => b.edition).map((b) => (
          <Link key={b.slug} to={editionPath(b.edition)} className="btn btn-secondary">{b.name}</Link>
        ))}
      </div>
    </div>
  );
}