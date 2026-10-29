import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import useProductAvailability from '@/hooks/useProductAvailability';
import { ORIGINALS_DUO } from '@/lib/duos';
import { formatMoney } from '@/lib/specialEditions';
import { FINAL_PRODUCT_IMAGE_URLS } from '@/lib/mushroomProducts';

/**
 * The Originals Duo is a real Shopify product, so its price, stock and the
 * saving against the two single bags are all read live. Nothing here is a
 * copied number: if Shopify cannot confirm the product, no price is shown.
 */
export default function OriginalsDuoPanel() {
  const handles = [ORIGINALS_DUO.shopifyHandle, ...ORIGINALS_DUO.contents.map((c) => c.shopifyHandle)];
  const { products, loading } = useProductAvailability(handles);

  const duo = products?.[ORIGINALS_DUO.shopifyHandle];
  const duoVariant = duo?.variants?.[0] || null;
  const duoPrice = duoVariant ? Number(duoVariant.price) : null;
  const available = !!duo && duo.availableForSale !== false && (duo.variants || []).some((v) => v.availableForSale);

  const componentPrices = ORIGINALS_DUO.contents.map((item) => {
    const product = products?.[item.shopifyHandle];
    const variant = product?.variants?.[0] || null;
    return {
      ...item,
      size: variant?.title || null,
      price: variant ? Number(variant.price) : null,
      available: !!product && (product.variants || []).some((v) => v.availableForSale),
    };
  });

  const allComponentPrices = componentPrices.every((item) => Number.isFinite(item.price));
  const componentsTotal = allComponentPrices
    ? componentPrices.reduce((sum, item) => sum + item.price, 0)
    : null;
  const saving = duoPrice !== null && componentsTotal !== null && componentsTotal > duoPrice
    ? componentsTotal - duoPrice
    : null;
  const bothComponentsAvailable = componentPrices.every((item) => item.available);
  const purchasable = available && bothComponentsAvailable;

  return (
    <section aria-labelledby="originals-duo" style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 4, padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
      <p className="eyebrow">Year-round</p>
      <h2 id="originals-duo" className="h2 mt-2">{ORIGINALS_DUO.name}</h2>
      <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
        One Instant Classic Coffee and one Instant Coffee with Mushrooms. {ORIGINALS_DUO.prep}
      </p>

      <ul className="mt-5 flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {componentPrices.map((item) => (
          <li key={item.slug} className="flex items-center justify-between gap-3" style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '0.75rem' }}>
            <div className="flex min-w-0 items-center gap-3">
              {FINAL_PRODUCT_IMAGE_URLS[item.slug] && (
                <img
                  src={FINAL_PRODUCT_IMAGE_URLS[item.slug]}
                  alt={`${item.name} bag`}
                  loading="lazy"
                  className="shrink-0"
                  style={{ width: 44, height: 44, objectFit: 'contain', background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 6 }}
                />
              )}
              <span className="body" style={{ fontSize: '0.9375rem' }}>
                <strong style={{ fontWeight: 600 }}>{item.qty} ×</strong> {item.name}
                {item.size ? <span style={{ color: 'hsl(var(--muted-foreground))' }}> · {item.size}</span> : null}
              </span>
            </div>
            <span className="body shrink-0" style={{ fontSize: '0.9375rem', fontVariantNumeric: 'tabular-nums' }}>
              {loading ? '—' : formatMoney(item.price) || '—'}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3" style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '1rem' }}>
        <div>
          <p className="font-mono uppercase" style={{ fontSize: '0.5625rem', letterSpacing: '0.14em', color: 'hsl(var(--muted-foreground))', margin: 0 }}>
            Bundle price
          </p>
          <p className="font-heading" style={{ fontSize: '1.75rem', margin: '0.25rem 0 0', fontVariantNumeric: 'tabular-nums' }}>
            {loading ? 'Checking…' : formatMoney(duoPrice) || 'Price at checkout'}
          </p>
          {saving !== null ? (
            <p className="body mt-1 inline-flex items-center gap-1" style={{ fontSize: '0.875rem', color: 'hsl(var(--primary))', margin: 0 }}>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Saves {formatMoney(saving)} against buying both bags separately
            </p>
          ) : null}
        </div>
        <p className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', margin: 0, maxWidth: '28ch' }}>
          Shipping and tax are calculated at Shopify checkout.
        </p>
      </div>

      <div className="mt-5">
        {purchasable ? (
          <Link
            to={ORIGINALS_DUO.path}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderRadius: 999, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            Shop the Originals Duo <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : loading ? (
          <p className="body" style={{ color: 'hsl(var(--muted-foreground))' }}>Checking availability…</p>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="body" style={{ color: 'hsl(var(--foreground))' }}>
              The duo is unavailable right now — it is only sold when both bags are in stock.
            </p>
            <Link to="/shop" className="body" style={{ fontSize: '0.9375rem', color: 'hsl(var(--primary))' }}>
              Shop the individual coffees
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}