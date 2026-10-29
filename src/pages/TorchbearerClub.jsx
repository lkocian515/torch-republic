import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import SeasonalInterestForm from '@/components/seasonal/SeasonalInterestForm';
import PreparationLegend from '@/components/seasonal/PreparationLegend';

const OFFERS = [
  {
    name: 'Torchbearer Single',
    status: 'Waitlist',
    detail:
      'One featured seasonal bag each calendar month, ground or whole bean wherever the release confirms it. Twelve monthly shipment slots, not thirteen automatic shipments — and this is the tier that opens first.',
    note: 'March is planned as Lucky Clover, with Bunny Trail as a same-price swap.',
  },
  {
    name: 'Torchbearer Duo',
    status: 'Phase two — not open',
    detail:
      'Two bags each month from the same pairing, for houses that go through a bag faster. January and April would be two bags of the same coffee, both in the selected grind.',
    note: 'Next in line: opens once recurring fulfillment and combined shipping have been tested.',
  },
  {
    name: 'Originals Replenishment',
    status: 'Open',
    detail:
      'A separate subscription for the same instant coffee, repeated on its own schedule. Originals subscribers are never moved onto seasonal brewed coffee.',
    note: 'Available now through the subscription page.',
  },
];

const RHYTHM = [
  'The 25th of the prior month: preview of the next shipment — contents, quantity, grind, price, shipping, applicable tax information and charge date.',
  'The 28th at 11:59 p.m. Central: the cutoff for flavor, grind and address changes on that batch.',
  'At least three days before the renewal: the billing reminder, with a working management link.',
  'The 1st of the month: the authorized amount is charged once.',
  'After payment clears: the correct paid order goes to fulfillment.',
  'When the coffee actually ships: tracking is sent.',
];

/**
 * The club landing page. Enrollment is honestly closed: our Shopify selling
 * plans bill a fixed product on a four-week interval, which cannot carry a
 * rotating monthly coffee, calendar-month anchors or a deferred first charge.
 * Until those exist the page collects a real waitlist request and no payment
 * details whatsoever.
 */
export default function TorchbearerClub() {
  useSEO({
    title: 'Torchbearer Club | Torch Republic Coffee Company',
    description:
      'The Torchbearer Club is a monthly seasonal coffee. Enrollment is on a waitlist while the recurring fulfillment and billing setup required for a rotating monthly shipment is completed.',
    url: '/torchbearer-club',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Torchbearer Club', url: '/torchbearer-club' },
    ],
  });

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="max-w-[760px]">
          <p className="eyebrow">Torchbearer Club</p>
          <h1 className="h1 mt-3">A seasonal coffee to look forward to, delivered once each calendar month.</h1>
          <p className="body-lg mt-4">
            One featured seasonal coffee a month, chosen from the releases that are actually verified and in stock.
            Enrollment is on a waitlist, and joining it costs nothing.
          </p>
        </header>

        <div
          className="mt-8 flex flex-col gap-3"
          style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 4, padding: '1rem 1.25rem' }}
          role="status"
        >
          <p className="font-mono uppercase" style={{ fontSize: '0.625rem', letterSpacing: '0.14em', color: 'hsl(var(--primary))', margin: 0 }}>
            Enrollment status: waitlist
          </p>
          <p className="body" style={{ margin: 0 }}>
            The club opens as soon as monthly billing and rotating fulfillment are ready. No membership fee is charged,
            and joining the waitlist never collects payment details.
          </p>
          <div>
            <SeasonalInterestForm
              kind="club_waitlist"
              productName="the Torchbearer Club"
              source="club-page"
              buttonLabel="Join the club waitlist"
              note="We'll email you when enrollment opens. No payment details are collected."
            />
          </div>
        </div>

        <details
          className="mt-4"
          style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 4, padding: '0.875rem 1.25rem' }}
        >
          <summary className="font-heading" style={{ cursor: 'pointer', fontSize: '0.9375rem', fontWeight: 600 }}>
            Why is enrollment still on waitlist?
          </summary>
          <p className="body" style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', margin: '0.75rem 0 0' }}>
            Our Shopify subscription plans currently bill one fixed product on a four-week interval. A rotating monthly
            coffee needs calendar-month anchors, a deferred first charge and one-per-month shipment slots, so the club
            stays closed until those are supported end to end.
          </p>
        </details>

        <section className="mt-12" aria-labelledby="club-offers">
          <h2 id="club-offers" className="h2">The three offers</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {OFFERS.map((offer) => (
              <article
                key={offer.name}
                style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 4, padding: '1.25rem' }}
              >
                <p className="font-mono uppercase" style={{ fontSize: '0.5625rem', letterSpacing: '0.12em', color: 'hsl(var(--primary))', margin: 0 }}>
                  {offer.status}
                </p>
                <h3 className="font-heading mt-2" style={{ fontSize: '1.25rem', margin: 0 }}>{offer.name}</h3>
                <p className="body mt-2" style={{ fontSize: '0.9375rem' }}>{offer.detail}</p>
                <p className="body mt-3" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', margin: 0 }}>
                  {offer.note}
                </p>
              </article>
            ))}
          </div>
          <p className="body mt-5">
            <Link to="/subscription" style={{ color: 'hsl(var(--primary))' }}>
              Manage or start an Originals Replenishment subscription
            </Link>
            . Existing subscribers keep their current prices, discounts and terms — a new club offer never overwrites an
            existing contract.
          </p>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2" aria-labelledby="club-rhythm">
          <div>
            <h2 id="club-rhythm" className="h2">How a month would run</h2>
            <ol className="mt-4 flex flex-col gap-3" style={{ paddingLeft: '1.1rem', margin: 0 }}>
              {RHYTHM.map((step) => (
                <li key={step} className="body" style={{ fontSize: '0.9375rem' }}>{step}</li>
              ))}
            </ol>
            <p className="body mt-4" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>
              Skips and cancellations stay open until the charge actually happens. Enrolling by the 28th would join the
              next first-of-the-month cycle, with the exact first charge date shown before consent. The details above are
              the intended rhythm, not a live billing schedule.
            </p>
          </div>

          <div>
            <h2 className="h2">What members will get</h2>
            <ul className="mt-4 flex flex-col gap-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'The upcoming coffee previewed before each charge.',
                'A scheduled delivery each calendar month.',
                'A digital tasting and preparation guide.',
                'Working account controls: skip, pause, resume, cancel, update address and payment method.',
                'Republic Rewards points on paid renewals, once the ledger is live.',
              ].map((benefit) => (
                <li key={benefit} className="body flex items-start gap-2" style={{ fontSize: '0.9375rem' }}>
                  <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: 'hsl(var(--primary))' }} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="body mt-4" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>
              These are being built alongside the billing work. Nothing in this list is advertised as working until it is.
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="club-prep">
          <h2 id="club-prep" className="h2">Club coffees are brewed</h2>
          <p className="body mt-2 mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Every club shipment is a Seasonal Reserve coffee. The instant Originals are a separate subscription.
          </p>
          <PreparationLegend />
        </section>
      </div>
    </div>
  );
}