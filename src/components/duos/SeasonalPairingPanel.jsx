import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { editionPath } from '@/lib/specialEditions';
import { featuredPairing, pairAvailability, pairingLabel, monthLabelFor } from '@/lib/duos';
import { seasonalEntry, windowLabel, SEASONAL_PREP_LABEL } from '@/lib/seasonalCalendar';
import SeasonalInterestForm from '@/components/seasonal/SeasonalInterestForm';
import SeasonalArtwork from '@/components/seasonal/SeasonalArtwork';

const BADGE = {
  available: { text: 'Available now', color: 'hsl(var(--primary))', bg: 'rgba(184,101,67,0.1)' },
  coming_soon: { text: 'Coming soon', color: 'hsl(var(--foreground))', bg: 'rgba(56,43,36,0.06)' },
  upcoming: { text: 'Planned', color: 'hsl(var(--muted-foreground))', bg: 'rgba(56,43,36,0.04)' },
  past: { text: 'Past pairing', color: 'hsl(var(--muted-foreground))', bg: 'rgba(56,43,36,0.04)' },
  none: { text: 'Not scheduled', color: 'hsl(var(--muted-foreground))', bg: 'rgba(56,43,36,0.04)' },
};

/**
 * The featured seasonal pairing.
 *
 * A pairing is never presented as a single bundle SKU. Two coffees are only
 * offered when each one is individually purchasable in the same grind, and
 * until then the section collects a real notification request instead.
 */
export default function SeasonalPairingPanel() {
  const { editions, loading } = useSpecialEditions();
  const pairing = featuredPairing();
  const availability = pairAvailability(pairing, editions);
  const badge = BADGE[availability.state] || BADGE.none;

  if (!pairing) {
    return (
      <section aria-labelledby="seasonal-pairing">
        <h2 id="seasonal-pairing" className="h2">Seasonal pairing</h2>
        <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No seasonal pairing is scheduled right now.
        </p>
      </section>
    );
  }

  const label = pairingLabel(pairing);
  const contents = pairing.components.map((slug) => ({
    slug,
    name: seasonalEntry(slug)?.name || slug,
    qty: pairing.twoPack ? 2 : 1,
    edition: availability.parts?.find((part) => part.slug === slug)?.edition || null,
  }));
  // Each coffee carries its own grind options — a duo never shares one setting.
  const formats = contents.map((item) => {
    const labels = (item.edition?.options || []).map((option) => option.label).filter(Boolean);
    return {
      name: item.name,
      label: labels.length > 0 ? labels.join(' or ') : 'grind options shown on its product page',
    };
  });

  return (
    <section
      aria-labelledby="seasonal-pairing"
      style={{ background: '#FFFCF7', border: '1px solid hsl(var(--border))', borderRadius: 4, padding: 'clamp(1.25rem, 3vw, 2rem)' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Featured pairing · {monthLabelFor(pairing)}</p>
          <h2 id="seasonal-pairing" className="h2 mt-2">{label}</h2>
        </div>
        <span
          className="whitespace-nowrap font-mono uppercase"
          style={{ fontSize: '0.5625rem', letterSpacing: '0.12em', padding: '0.3rem 0.5rem', borderRadius: 999, color: badge.color, background: badge.bg }}
        >
          {badge.text}
        </span>
      </div>

      <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {pairing.twoPack
          ? 'Two identical bags, sold as a refill pair rather than a two-flavor discovery duo.'
          : 'One bag of each coffee.'}{' '}
        {SEASONAL_PREP_LABEL}
      </p>

      <ul className="mt-5 flex flex-col gap-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {contents.map((item) => (
          <li key={`${item.slug}-${item.qty}`} className="flex flex-wrap items-center justify-between gap-2" style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '0.6rem' }}>
            <span className="flex min-w-0 items-center gap-2.5">
              <SeasonalArtwork slug={item.slug} className="h-12 w-12" />
              <span className="body" style={{ fontSize: '0.9375rem' }}>
                <strong style={{ fontWeight: 600 }}>{item.qty} ×</strong> {item.name}
              </span>
            </span>
            <span className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>
              {loading ? 'Checking…' : item.edition ? 'Verified in Shopify' : 'Not yet verified'}
            </span>
          </li>
        ))}
      </ul>

      <p className="body mt-4" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', margin: 0 }}>
        Grind is set per coffee, not shared:{' '}
        {formats.map((format) => `${format.name} (${format.label})`).join(' · ')}. Availability is only confirmed when
        both bags are verified and in stock.
        {availability.window ? ` Selling window ${windowLabel({ start: availability.window.start, end: availability.window.end })}.` : ''}
      </p>

      <div className="mt-5">
        {availability.state === 'available' ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {contents.map((item) => (
                <Link
                  key={item.slug}
                  to={editionPath(item.edition)}
                  className="inline-flex min-h-[44px] items-center gap-2 px-4 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ borderRadius: 999, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                >
                  Order {item.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', margin: 0 }}>
              Each bag is ordered separately on its own product page, in that coffee&rsquo;s available grind, so nothing is sold that cannot be fulfilled.
            </p>
          </div>
        ) : availability.state === 'past' ? (
          <SeasonalInterestForm
            kind="return_list"
            productSlug={`duo-${pairing.month + 1}`}
            productName={label}
            source="duos"
            buttonLabel="Join the return list"
          />
        ) : (
          <div className="flex flex-col gap-2">
            <SeasonalInterestForm
              kind="notify"
              productSlug={`duo-${pairing.month + 1}`}
              productName={label}
              source="duos"
              buttonLabel="Tell me when it opens"
            />
            <p className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', margin: 0 }}>
              This pairing opens once both coffees are verified and in stock. No price is promised before then.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}