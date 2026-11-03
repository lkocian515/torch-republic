import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { WINTER_DUO } from '@/lib/winterDuo';
import SeasonalInterestForm from '@/components/seasonal/SeasonalInterestForm';

const WHAT_IT_IS = [
  'One featured seasonal coffee, chosen each month from the season that is actually in stock.',
  'A full bag of brewed coffee — ground or whole bean, whichever the release confirms.',
  'One month at a time. Nothing is charged until enrollment opens and you agree to it.',
];

const STEPS = [
  {
    title: 'You get a preview',
    body: 'Before each month begins, you see the coffee, its grind and its price.',
  },
  {
    title: 'You decide',
    body: 'Keep it, change the grind, or skip the month. The cutoff is stated with the preview.',
  },
  {
    title: 'It ships',
    body: 'The coffee is charged once and sent. Tracking arrives when it leaves us.',
  },
];

const FAQS = [
  {
    q: 'Is the club open yet?',
    a: 'Not yet. Enrollment is on a waitlist while the monthly shipping is finished. Joining costs nothing and no payment details are taken.',
  },
  {
    q: 'Do I need a coffee maker?',
    a: 'Yes. The club features brewed seasonal coffee, not instant. If you want the just-add-water coffees, the instant Originals are a separate subscription.',
  },
  {
    q: 'What will it cost?',
    a: 'The club price is not published yet. Each month\u2019s price is shown in the preview before anything is charged, and you can skip that month.',
  },
  {
    q: 'Can I choose the grind?',
    a: 'Where the release supports it, yes — ground or whole bean, decided at enrollment and shown before every charge. A coffee that is only sold ground will only offer ground.',
  },
  {
    q: 'What happens after I join the waitlist?',
    a: 'You get one email when enrollment opens, with the plan, the price, the first shipping month and how to cancel. Nothing else is sent to you.',
  },
];

export default function TorchbearerClub() {
  useSEO({
    title: 'Torchbearer Club | Torch Republic Coffee Company',
    description:
      'A featured Torch Republic seasonal coffee each month. Enrollment is coming soon — join the waitlist and we\u2019ll email you when it opens. No payment required.',
    url: '/torchbearer-club',
    image: WINTER_DUO.image,
    imageAlt: WINTER_DUO.imageAlt,
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
          <h1 className="h1 mt-3">A new season. A new favorite cup.</h1>
          <p className="body-lg mt-4">
            Discover a featured Torch Republic seasonal coffee each month — the roast we are most excited about that
            season, chosen from the releases that are ready to ship.
          </p>
        </header>

        <figure className="mt-8" style={{ margin: '2rem 0 0' }}>
          <div style={{ overflow: 'hidden', borderRadius: 10, background: '#FFFFFF', border: '1px solid hsl(var(--border))' }}>
            <img
              src={WINTER_DUO.image}
              alt={WINTER_DUO.imageAlt}
              className="block h-auto w-full"
              loading="lazy"
              style={{ aspectRatio: WINTER_DUO.imageRatio, objectFit: 'contain' }}
            />
          </div>
        </figure>

        {/* A — status and the one action that is open today */}
        <section
          id="waitlist"
          className="mt-8"
          style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 4, padding: '1.25rem', scrollMarginTop: 96 }}
          aria-labelledby="club-status"
        >
          <p className="eyebrow">Coming soon</p>
          <h2 id="club-status" className="h3 mt-2">Join the waitlist — no payment required.</h2>
          <p className="body mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            We are finishing the monthly shipment, so enrollment is not open yet. Leave your email and we will write
            once, when it opens.
          </p>
          <div className="mt-4">
            <SeasonalInterestForm
              kind="club_waitlist"
              productName="the Torchbearer Club"
              source="club-page"
              buttonLabel="Join the waitlist"
              note="One email when enrollment opens. No payment details are collected."
            />
          </div>
        </section>

        {/* B — the monthly experience */}
        <section className="mt-14" aria-labelledby="club-experience">
          <h2 id="club-experience" className="h2">What the club is</h2>
          <ul className="mt-5 flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {WHAT_IT_IS.map((line) => (
              <li key={line} className="body flex items-start gap-2" style={{ fontSize: '1rem' }}>
                <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: 'hsl(var(--primary))' }} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* C — the plan that opens first, with the future plan kept small */}
        <section className="mt-14" aria-labelledby="club-plans">
          <h2 id="club-plans" className="h2">The plan</h2>
          <article
            className="mt-5"
            style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 4, padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}
          >
            <p className="eyebrow">Planned · waitlist</p>
            <h3 className="h3 mt-2">Torchbearer Single</h3>
            <p className="body mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              One featured seasonal bag each calendar month, in the grind the release confirms. This is the plan that
              opens first.
            </p>
            <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ['Contents', 'One seasonal coffee each month'],
                ['Format', 'Ground or whole bean, where the release confirms it'],
                ['Price', 'Shown in the preview before each charge'],
                ['Shipping', 'Calculated at checkout, the same as any other order'],
              ].map(([label, value]) => (
                <div key={label} style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '0.6rem' }}>
                  <dt className="eyebrow">{label}</dt>
                  <dd className="body mt-1" style={{ fontSize: '0.9375rem', margin: 0 }}>{value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#waitlist"
              className="btn btn-primary mt-6"
              style={{ display: 'inline-flex' }}
            >
              Join the waitlist
            </a>
          </article>

          <article
            className="mt-4"
            style={{ background: 'transparent', border: '1px dashed hsl(var(--border))', borderRadius: 4, padding: '1rem 1.25rem' }}
          >
            <p className="eyebrow">Later</p>
            <h3 className="font-heading font-semibold mt-2" style={{ fontSize: '1.0625rem' }}>
              Torchbearer Duo — a future two-bag month
            </h3>
            <p className="body mt-1" style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))' }}>
              Two bags in a month for households that go through one quickly. It opens after the Single plan is running,
              and joining the waitlist covers it too.
            </p>
          </article>
        </section>

        {/* D — how it works */}
        <section className="mt-14" aria-labelledby="club-how">
          <h2 id="club-how" className="h2">How it works</h2>
          <ol className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3" style={{ listStyle: 'none', padding: 0, margin: '1.25rem 0 0' }}>
            {STEPS.map((step, index) => (
              <li key={step.title} style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '0.75rem' }}>
                <p className="eyebrow">{`0${index + 1}`}</p>
                <h3 className="font-heading font-semibold mt-2" style={{ fontSize: '1rem' }}>{step.title}</h3>
                <p className="body mt-1" style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))' }}>{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="body mt-6" style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))' }}>
            Already subscribed to the everyday instant coffees? That refill plan is unchanged and separate —{' '}
            <Link to="/subscription" style={{ color: 'hsl(var(--primary))' }}>manage it here</Link>.
          </p>
        </section>

        {/* E — questions */}
        <section className="mt-14" aria-labelledby="club-faq">
          <h2 id="club-faq" className="h2">Questions</h2>
          <div className="mt-5 flex flex-col gap-2">
            {FAQS.map((item) => (
              <details
                key={item.q}
                style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 4, padding: '0.875rem 1.25rem' }}
              >
                <summary className="font-heading" style={{ cursor: 'pointer', fontSize: '0.9375rem', fontWeight: 600 }}>
                  {item.q}
                </summary>
                <p className="body" style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', margin: '0.75rem 0 0' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* F — one more way in */}
        <section className="mt-14" aria-labelledby="club-final">
          <div style={{ background: 'hsl(var(--secondary))', borderRadius: 4, padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
            <h2 id="club-final" className="h3">Be first when the season turns.</h2>
            <p className="body mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              The waitlist is free and takes a moment. No payment required.
            </p>
            <a href="#waitlist" className="btn btn-primary mt-4" style={{ display: 'inline-flex' }}>
              Join the waitlist
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}