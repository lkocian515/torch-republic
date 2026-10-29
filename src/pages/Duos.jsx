import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { duoCalendar } from '@/lib/duos';
import { windowLabel } from '@/lib/seasonalCalendar';
import OriginalsDuoPanel from '@/components/duos/OriginalsDuoPanel';
import SeasonalPairingPanel from '@/components/duos/SeasonalPairingPanel';
import PreparationLegend from '@/components/seasonal/PreparationLegend';

/**
 * Duos: one permanent Originals Duo that is really sold in Shopify, plus the
 * seasonal pairing schedule. A pairing never becomes a decorative bundle SKU —
 * its two coffees are ordered as themselves, in the same grind.
 */
export default function Duos() {
  useSEO({
    title: 'Duos | Torch Republic Coffee Company',
    description:
      'The Originals Duo pairs Instant Classic Coffee with Instant Coffee with Mushrooms, plus the seasonal pairing scheduled for each month of 2027.',
    url: '/duos',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Duos', url: '/duos' },
    ],
  });

  const calendar = duoCalendar();

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="max-w-[720px]">
          <p className="eyebrow">Two coffees at a time</p>
          <h1 className="h1 mt-3">Duos</h1>
          <p className="body-lg mt-4">
            The Originals Duo is available year round. The seasonal pairing changes with the calendar — one pairing at a
            time, built from coffees that are already in the store.
          </p>
        </header>

        <div className="mt-8">
          <PreparationLegend />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <OriginalsDuoPanel />
          <SeasonalPairingPanel />
        </div>

        <section className="mt-14" aria-labelledby="pairing-schedule">
          <h2 id="pairing-schedule" className="h2">The 2027 pairing schedule</h2>
          <p className="body mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Pairings are announced in advance. Each one is confirmed against Shopify before it can be ordered, and a
            pairing runs only while both of its coffees are inside their selling windows.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: 'min(100%, 520px)' }}>
              <caption className="sr-only">Seasonal coffee pairings planned for 2027</caption>
              <thead>
                <tr>
                  {['Month', 'Pairing', 'Selling window'].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="font-mono uppercase"
                      style={{
                        textAlign: 'left',
                        fontSize: '0.5625rem',
                        letterSpacing: '0.14em',
                        color: 'hsl(var(--muted-foreground))',
                        padding: '0.5rem 0.75rem 0.5rem 0',
                        borderBottom: '1px solid hsl(var(--border))',
                        fontWeight: 600,
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendar.map((pairing) => (
                  <tr key={pairing.month}>
                    <th
                      scope="row"
                      className="body"
                      style={{ textAlign: 'left', fontWeight: 600, fontSize: '0.9375rem', padding: '0.65rem 0.75rem 0.65rem 0', borderBottom: '1px solid hsl(var(--border))' }}
                    >
                      {pairing.monthLabel}
                    </th>
                    <td className="body" style={{ fontSize: '0.9375rem', padding: '0.65rem 0.75rem 0.65rem 0', borderBottom: '1px solid hsl(var(--border))' }}>
                      {pairing.label}
                      {pairing.twoPack ? (
                        <span style={{ color: 'hsl(var(--muted-foreground))' }}> · refill pair</span>
                      ) : null}
                    </td>
                    <td className="body" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', padding: '0.65rem 0 0.65rem 0', borderBottom: '1px solid hsl(var(--border))', whiteSpace: 'nowrap' }}>
                      {pairing.window ? windowLabel({ start: pairing.window.start, end: pairing.window.end }) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="body mt-6" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
            Duos are one-time purchases and are kept separate from Torchbearer Club shipments. Gift packaging, printed
            cards and guaranteed single-parcel delivery are not offered, because fulfillment does not support them.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/special-editions"
              className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderRadius: 999, border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            >
              Seasonal releases
            </Link>
            <Link
              to="/winter-duo"
              className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderRadius: 999, border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            >
              The Winter Duo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}