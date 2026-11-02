import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { pickFeaturedCampaign, editionsInCollection, editionState, editionsFormatLabel, collectionPath, defaultOption } from '@/lib/specialEditions';
import AnimatedHeadline from '@/components/motion/AnimatedHeadline';
import EvergreenHero from './EvergreenHero';
import EditionPlinth from './EditionPlinth';
import EditionStatusChip from './EditionStatusChip';
import { TYPE } from '@/components/home/drift/driftTheme';

const T = {
  bg: '#1A0F0A',
  cream: '#F7EEDD',
  body: '#E6D8CA',
  terracotta: '#D6743A',
};

/**
 * Homepage special-edition hero.
 *
 * Driven entirely by the featured campaign record: when no campaign is live
 * (none configured, or its window has passed) the evergreen hero renders
 * instead, so the homepage never depends on a code change per release.
 *
 * The headline, supporting line and button are real HTML over the artwork,
 * and the mobile layout keeps both products visible side by side.
 */
export default function EditionHero() {
  const { editions, campaigns, loading } = useSpecialEditions();

  if (loading) {
    return <section className="w-full" style={{ background: T.bg, minHeight: 380 }} aria-hidden="true" />;
  }

  const campaign = pickFeaturedCampaign(campaigns);
  if (!campaign) return <EvergreenHero />;

  const items = editionsInCollection(editions, campaign.collection_slug);
  const isLive = items.some((edition) => editionState(edition).state === 'available');
  const href = campaign.cta_href || (campaign.collection_slug ? collectionPath(campaign.collection_slug) : '/special-editions');
  const ctaLabel = isLive
    ? campaign.cta_label_live || 'Shop the collection'
    : campaign.cta_label_prelaunch || 'Preview the collection';

  // This artwork already contains its headline and product branding. Keep
  // the exact square image intact, then place only the requested copy and CTA below it.
  if (campaign.slug === 'mushroom-morning') {
    return (
      <section className="w-full overflow-hidden" style={{ background: '#F7EEDD' }} aria-label="Torch Republic Instant Mushroom Coffee">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8d172a36b_01-15013.png"
          alt="Square image reading ‘A little magic in your morning’ and ‘Mushroom Instant Coffee,’ with a Torch Republic pouch and steaming cup at sunrise."
          className="mx-auto block h-auto max-w-full"
          style={{ width: 'min(100%, 94svh, 1180px)', objectFit: 'contain' }}
          fetchPriority="high"
          decoding="async"
        />
        <div className="mx-auto flex max-w-[760px] flex-col items-center px-5 py-6 text-center sm:py-7">
          <p className="font-heading" style={{ color: '#071326', fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
            A warm, easy coffee ritual for slow starts and brighter days.
          </p>
          <Link
            to="/products/instant-mushroom-coffee"
            className="inline-flex min-h-[52px] items-center justify-center rounded-md px-7 font-heading font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ background: '#071326', color: '#F7EEDD', border: '1px solid #C9A24A', fontSize: '1rem', textDecoration: 'none' }}
          >
            Shop Mushroom Coffee
          </Link>
        </div>
      </section>
    );
  }

  // The campaign artwork is a poster with the headline and product story baked in, so the
  // hero pairs it with live HTML instead of stacking the two: at its true ratio the artwork
  // is taller than a screen on its own, which buried the shop button below the fold.
  if (campaign.desktop_hero_image) {
    return (
      <section className="w-full" style={{ background: T.bg }} aria-label={campaign.headline || campaign.name}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-5 px-5 pb-8 pt-5 md:grid-cols-2 md:gap-12 md:px-8 md:pb-14 md:pt-12">
          {/* Headline and shop button first, so the offer is on screen immediately on
              every device — text painted into an image cannot be clicked or read aloud. */}
          <div className="text-center md:text-left">
            {campaign.eyebrow && (
              <p style={{ ...TYPE.eyebrow, color: T.terracotta }}>{campaign.eyebrow}</p>
            )}

            {/* The hero headline steps down on phones so the artwork below it
                stays on the first screen; tablet and desktop keep the full size. */}
            <AnimatedHeadline
              as="h1"
              text={campaign.headline || campaign.name}
              style={{
                ...TYPE.hero,
                fontSize: 'clamp(1.75rem, 5.6vw, 4.25rem)',
                lineHeight: 1.1,
                color: T.cream,
                margin: '0.625rem 0 0',
              }}
            />

            {campaign.supporting_text && (
              <p
                className="mx-auto font-heading md:mx-0"
                style={{ ...TYPE.lead, color: 'rgba(230,216,202,0.92)', margin: '0.75rem auto 0', maxWidth: 460 }}
              >
                {campaign.supporting_text}
              </p>
            )}

            <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:items-center">
              <Link
                to={href}
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold"
                style={{ background: T.terracotta, color: T.cream, minHeight: 48, padding: '0.875rem 2rem', borderRadius: 999 }}
              >
                {ctaLabel}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <EditionStatusChip
                state={isLive ? 'available' : 'pending'}
                label={isLive ? 'Available now' : null}
              />
            </div>

            {/* Named for the campaign, so the brewed seasonal pair reads as its own
                thing rather than contradicting the instant lineup below it. */}
            {editionsFormatLabel(items) && (
              <p style={{ ...TYPE.meta, color: 'rgba(230,216,202,0.86)', margin: '1rem 0 0' }}>
                {campaign.name} &middot; {editionsFormatLabel(items)} &middot; brewed, not instant
              </p>
            )}
          </div>

          {/* The artwork, contained at its true ratio: nothing cropped and the bags,
              names and baked-in lettering all survive. It runs nearly the full width
              of its column and takes the majority of a phone screen, because the
              seasonal art is the strongest thing on the page. */}
          <Link
            to={href}
            aria-label={`Shop the ${campaign.name}`}
            className="mx-auto block w-full overflow-hidden"
            style={{ maxWidth: 660 }}
          >
            <picture className="block w-full">
              {campaign.mobile_hero_image && (
                <source media="(max-width: 767px)" srcSet={campaign.mobile_hero_image} />
              )}
              <img
                src={campaign.desktop_hero_image}
                alt={`${campaign.name} special edition`}
                className="mx-auto block h-auto w-auto max-w-full max-h-[54vh] md:max-h-[min(68vh,680px)]"
                style={{ objectFit: 'contain', width: '100%', transform: 'scale(1.07)' }}
                fetchPriority="high"
              />
            </picture>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: T.bg }}
      aria-label={campaign.headline || campaign.name}
    >
      {campaign.desktop_hero_image && (
        <>
          <img
            src={campaign.desktop_hero_image}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover md:block"
            fetchPriority="high"
          />
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(26,15,10,0.96) 0%, rgba(26,15,10,0.86) 40%, rgba(26,15,10,0.42) 72%, rgba(26,15,10,0.2) 100%)',
            }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-20">
        {campaign.mobile_hero_image && (
          <img
            src={campaign.mobile_hero_image}
            alt=""
            aria-hidden="true"
            className="mb-6 block w-full md:hidden"
            style={{ borderRadius: 12 }}
          />
        )}

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="text-center md:text-left">
            {campaign.eyebrow && (
              <p style={{ ...TYPE.eyebrow, color: T.terracotta }}>
                {campaign.eyebrow}
              </p>
            )}

            <h1
              className="mt-3 font-serif font-bold"
              style={{ ...TYPE.hero, color: T.cream }}
            >
              {campaign.headline}
            </h1>

            {campaign.supporting_text && (
              <p
                className="mx-auto mt-4 font-heading md:mx-0"
                style={{ ...TYPE.lead, color: T.body, maxWidth: 480 }}
              >
                {campaign.supporting_text}
              </p>
            )}

            <div className="mt-5 flex justify-center md:justify-start">
              <EditionStatusChip
                state={isLive ? 'available' : 'pending'}
                label={isLive ? 'Available now' : null}
              />
            </div>

            <div className="mt-7">
              <Link
                to={href}
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold"
                style={{ background: T.terracotta, color: T.cream, minHeight: 48, padding: '0.875rem 2rem', borderRadius: 999 }}
              >
                {ctaLabel}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>

            <p className="mt-4 font-heading" style={{ ...TYPE.body, color: 'rgba(230,216,202,0.75)' }}>
              Everyday instant coffee stays available below.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {items.slice(0, 2).map((edition) => (
              <EditionPlinth key={edition.id} edition={edition} option={defaultOption(edition)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}