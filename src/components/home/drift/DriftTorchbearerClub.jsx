import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import {
  defaultOption,
  optionState,
  editionFormatLabel,
  editionPath,
  editionsInCollection,
  pickFeaturedCampaign,
  formatMoney,
} from '@/lib/specialEditions';
import { trackEvent } from '@/lib/analyticsEvents';
import { D, TYPE, SERIF, MONO, fadeUp } from './driftTheme';

const CLUB_PATH = '/torchbearer-club';
const IVORY = '#F4EFE7';
const COPPER_LABEL = '#E3B695';
const MUTED_ON_DARK = 'rgba(244,239,231,0.72)';

const pad = (n) => String(n).padStart(2, '0');

function monthOrder(label) {
  const parsed = new Date(`1 ${label || ''}`);
  return Number.isNaN(parsed.getTime()) ? Number.MAX_SAFE_INTEGER : parsed.getTime();
}

function Fact({ label, children }) {
  return (
    <div style={{ borderTop: '1px solid rgba(244,239,231,0.14)', paddingTop: '0.75rem' }}>
      <dt style={{ ...TYPE.meta, color: COPPER_LABEL, margin: 0 }}>{label}</dt>
      <dd style={{ ...TYPE.body, color: IVORY, margin: '0.35rem 0 0' }}>{children}</dd>
    </div>
  );
}

/**
 * The Torchbearer Club — a monthly seasonal coffee, deliberately kept apart
 * from the four-week Originals refill plans below it.
 *
 * Enrollment is not live: no Shopify selling plan can yet carry a rotating
 * calendar-month coffee, so this section collects first-access requests through
 * the club waitlist instead of taking payment. Every fact shown here — the
 * coffee, its format, quantity and price — is read from the live store record,
 * and anything not confirmed (the club price, the first charge date) is stated
 * as unconfirmed rather than invented.
 */
export default function DriftTorchbearerClub() {
  const { editions, upcoming, campaigns, loading } = useSpecialEditions();

  const campaign = pickFeaturedCampaign(campaigns);
  const featured = campaign?.collection_slug ? editionsInCollection(editions, campaign.collection_slug) : [];
  const pool = [...featured, ...editions];
  const catalog = [...editions, ...upcoming];
  const current =
    catalog.find((edition) => edition.slug === 'fireside-smores' && edition.monthly_featured) ||
    catalog.find((edition) => edition.slug === 'fireside-smores') ||
    pool.find((edition) => optionState(defaultOption(edition)).purchasable) ||
    pool[0] ||
    null;

  const option = current ? defaultOption(current) : null;
  const price = optionState(option).price;
  const image = option?.image_url || current?.image_url || '';
  const format = current ? editionFormatLabel(current) : null;
  const monthLabel = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // The next release is only previewed when approved artwork actually exists.
  const next =
    (upcoming || []).find((edition) => edition.slug === 'peppermint-parade' && edition.image_url) ||
    (upcoming || [])
      .filter((edition) => edition.image_url && edition.slug !== current?.slug)
      .sort((a, b) => monthOrder(a.release_month) - monthOrder(b.release_month))[0] ||
    null;

  // How much of the club's reach comes from the homepage, and which promise
  // pulls people through: the coffee itself, the mechanics, or the waitlist.
  useEffect(() => {
    if (loading) return;
    trackEvent(
      'club_section_view',
      { featured_coffee: current?.slug || 'none', has_artwork: Boolean(image), has_next_release: Boolean(next) },
      'club-home'
    );
  }, [loading]);

  const trackCta = (cta) => trackEvent('club_cta_click', { cta, featured_coffee: current?.slug || 'none' }, `club-${cta}`);

  if (loading) {
    return (
      <section aria-hidden="true" style={{ background: D.paper }}>
        <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
          <div style={{ background: D.deepEspresso, borderRadius: 6, height: 320 }} />
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="club-heading" style={{ background: D.paper }}>
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <motion.div
          {...fadeUp}
          style={{
            background: `linear-gradient(152deg, ${D.deepEspresso} 0%, ${D.espresso} 100%)`,
            border: '1px solid rgba(184,115,77,0.28)',
            borderRadius: 6,
            padding: 'clamp(1.25rem, 3.5vw, 3rem)',
            boxShadow: D.shadowMedium,
          }}
        >
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p style={{ ...TYPE.eyebrow, color: COPPER_LABEL, margin: 0 }}>The next season, delivered</p>
              <h2
                id="club-heading"
                style={{ ...TYPE.heading, color: IVORY, margin: '0.75rem 0 0', fontSize: 'clamp(1.875rem, 3.4vw, 2.75rem)' }}
              >
                Meet the Torchbearer Club
              </h2>
              <p style={{ ...TYPE.lead, color: MUTED_ON_DARK, margin: '0.875rem 0 0', maxWidth: 460 }}>
                One featured seasonal coffee, chosen each month. Enrollment is coming soon — join the waitlist and
                we’ll email you when it opens. No payment required.
              </p>

              {/* Joining sits directly under the introduction, before anything
                  else in the panel: it is the one action open today. */}
              <Link
                to={`${CLUB_PATH}#waitlist`}
                onClick={() => trackCta('join_waitlist')}
                className="mt-5 inline-flex items-center justify-center gap-2 font-heading font-semibold"
                style={{ background: D.terracotta, color: '#FFF7E8', minHeight: 48, padding: '0.875rem 1.75rem', borderRadius: 999 }}
              >
                Join the waitlist
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>

              <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5">
                <Link
                  to={current ? editionPath(current) : '/special-editions'}
                  onClick={() => trackCta('see_this_month_coffee')}
                  className="inline-flex min-h-[44px] items-center gap-1.5 font-heading text-sm font-semibold"
                  style={{ color: IVORY, textDecoration: 'underline', textUnderlineOffset: 4 }}
                >
                  See this month’s coffee
                </Link>
                <Link
                  to={`${CLUB_PATH}#club-experience`}
                  onClick={() => trackCta('how_the_club_works')}
                  className="inline-flex min-h-[44px] items-center gap-1.5 font-heading text-sm font-semibold"
                  style={{ color: IVORY, textDecoration: 'underline', textUnderlineOffset: 4 }}
                >
                  How the club works
                </Link>
              </div>
            </div>

            {image && (
              <figure style={{ margin: 0 }}>
                <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', background: 'rgba(244,239,231,0.06)' }}>
                  <span
                    style={{
                      ...TYPE.meta,
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      zIndex: 1,
                      background: D.terracotta,
                      color: '#FFF7E8',
                      padding: '0.35rem 0.6rem',
                      borderRadius: 999,
                    }}
                  >
                    This month · ${monthLabel}
                  </span>
                  <img
                    src={image}
                    alt={`${current.name}, the ${monthLabel} Torchbearer Club coffee`}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="block h-auto w-full"
                    style={{ objectFit: 'contain', aspectRatio: '1 / 1', background: IVORY }}
                  />
                </div>
                <figcaption style={{ ...TYPE.body, color: IVORY, margin: '0.75rem 0 0' }}>
                  <span style={{ fontFamily: SERIF, fontWeight: 700 }}>{current.name}</span>
                  {format ? ` · ${format}` : ''}
                  {price ? ` · ${formatMoney(price)}` : ''}
                </figcaption>
              </figure>
            )}
          </div>

          <dl
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            style={{ margin: '2rem 0 0' }}
          >
            <Fact label="Coffee">{current ? current.name : 'Confirmed each month, one at a time'}</Fact>
            <Fact label="Format">
              {format || 'Confirmed at enrollment'} — chosen once, then kept for every shipment.
            </Fact>
            <Fact label="Quantity">
              {current?.size ? `One ${current.size} bag each month` : 'One bag each month'}
            </Fact>
            <Fact label="Club price">
              Not published yet. Enrollment is on the waitlist, and the first charge amount is confirmed with you
              before it is taken.
            </Fact>
            <Fact label="Shipping">Calculated at checkout, the same as any other order.</Fact>
            <Fact label="Next charge">
              Nothing is scheduled. Your first charge date is set, and shown, when enrollment opens.
            </Fact>
            <Fact label="Account controls">
              None active yet — there is no membership to manage until enrollment opens. The plans are skip, pause and
              cancel from your account.
            </Fact>
          </dl>

          <div
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderTop: '1px solid rgba(244,239,231,0.14)', paddingTop: '1.25rem' }}
          >
            <p style={{ ...TYPE.body, color: MUTED_ON_DARK, margin: 0, maxWidth: 520 }}>
              Enrollment is not open yet. Get first access and we’ll email you once the club is live — no payment
              details are collected.
            </p>
            <Link
              to={CLUB_PATH}
              onClick={() => trackCta('get_first_access')}
              className="inline-flex items-center justify-center gap-2 font-heading font-semibold"
              style={{
                background: 'transparent',
                color: IVORY,
                border: `1px solid ${D.copper}`,
                minHeight: 48,
                padding: '0.875rem 1.75rem',
                borderRadius: 999,
              }}
            >
              Get first access
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>

          {next && (
            <div
              className="mt-6 flex items-center gap-4"
              style={{ borderTop: '1px solid rgba(244,239,231,0.14)', paddingTop: '1.25rem' }}
            >
              <img
                src={next.image_url}
                alt={`${next.name}, the next seasonal release`}
                loading="lazy"
                width={96}
                height={96}
                style={{ width: 72, height: 72, objectFit: 'contain', background: IVORY, borderRadius: 4, flexShrink: 0 }}
              />
              <div>
                <p style={{ ...TYPE.meta, color: COPPER_LABEL, margin: 0 }}>Next release preview</p>
                <p style={{ ...TYPE.body, color: IVORY, margin: '0.25rem 0 0' }}>
                  <span style={{ fontFamily: SERIF, fontWeight: 700 }}>{next.name}</span>
                  
                </p>
                <p style={{ fontFamily: MONO, fontSize: '0.6875rem', color: MUTED_ON_DARK, margin: '0.3rem 0 0' }}>
                  Preview only — not for sale
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <p style={{ ...TYPE.body, color: D.secondary, margin: '1rem 0 0', maxWidth: 620, fontSize: '0.8125rem' }}>
          The Torchbearer Club is a monthly seasonal coffee. It is separate from{' '}
          <Link to="/subscription" style={{ color: D.terracottaDeep, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            four-week refill subscriptions
          </Link>{' '}
          for Classic and Mushroom Coffee, which repeat the same bag on their own schedule.
        </p>
      </div>
    </section>
  );
}