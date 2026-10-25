import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { pickFeaturedCampaign, editionsInCollection, editionState, editionsFormatLabel, collectionPath, defaultOption } from '@/lib/specialEditions';
import AnimatedHeadline from '@/components/motion/AnimatedHeadline';
import EvergreenHero from './EvergreenHero';
import EditionPlinth from './EditionPlinth';
import EditionStatusChip from './EditionStatusChip';

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
  const href = campaign.collection_slug ? collectionPath(campaign.collection_slug) : '/special-editions';
  const ctaLabel = isLive
    ? campaign.cta_label_live || 'Shop the collection'
    : campaign.cta_label_prelaunch || 'Preview the collection';

  // Campaign artwork already carries the headline, subhead and product story, so it renders
  // clean and full-width at its true ratio instead of being overlaid with duplicate text.
  // The real button sits beneath it, because text baked into an image is not clickable.
  if (campaign.desktop_hero_image) {
    return (
      <section className="w-full" style={{ background: T.bg }} aria-label={campaign.headline || campaign.name}>
        {/* Source artwork is 1254x1254 with a "torchrepublic.com" line along the bottom edge.
            Showing it at 1254x1174 clips that line off without touching the artwork itself. */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1254 / 1174' }}>
          <picture>
            {campaign.mobile_hero_image && (
              <source media="(max-width: 767px)" srcSet={campaign.mobile_hero_image} />
            )}
            <img
              src={campaign.desktop_hero_image}
              alt={`${campaign.name} special edition`}
              className="block h-full w-full object-cover object-top"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* A headline painted into artwork cannot animate, be selected, or be read
            aloud, so the hero also carries the campaign headline as real text that
            rises in word by word. */}
        <div className="mx-auto max-w-[900px] px-6 pt-10 text-center">
          <AnimatedHeadline
            as="h1"
            text={campaign.headline || campaign.name}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5.2vw, 3.25rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: T.cream,
              margin: 0,
              textWrap: 'balance',
            }}
          />
          <p className="font-mono uppercase" style={{ color: 'rgba(230,216,202,0.9)', fontSize: '10px', letterSpacing: '0.2em', fontWeight: 700, margin: '1rem 0 0' }}>
            {editionsFormatLabel(items)} &middot; brewed, not instant
          </p>
        </div>

        {/* The artwork promotes both editions, so the campaign's availability line is
            stated in real text beneath it rather than being left to the picture. */}
        {campaign.supporting_text && (
          <div className="mx-auto max-w-[1200px] px-6 pt-8">
            <p
              className="text-center font-heading"
              style={{ color: 'rgba(230,216,202,0.85)', fontSize: '1rem', lineHeight: 1.6 }}
            >
              {campaign.supporting_text}
            </p>
          </div>
        )}

        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-6 pb-10 pt-5 md:flex-row md:justify-center md:pb-14">
          <EditionStatusChip
            state={isLive ? 'available' : 'pending'}
            label={isLive ? 'Available now' : null}
          />
          <Link
            to={href}
            className="inline-flex items-center justify-center gap-2 font-heading font-semibold"
            style={{ background: T.terracotta, color: T.cream, minHeight: 48, padding: '0.875rem 2rem', borderRadius: 999 }}
          >
            {ctaLabel}
            <ArrowRight size={16} strokeWidth={2} />
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
              <p className="font-mono uppercase" style={{ color: T.terracotta, fontSize: '10px', letterSpacing: '0.35em' }}>
                {campaign.eyebrow}
              </p>
            )}

            <h1
              className="mt-3 font-serif font-bold"
              style={{ color: T.cream, fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}
            >
              {campaign.headline}
            </h1>

            {campaign.supporting_text && (
              <p
                className="mx-auto mt-4 font-heading md:mx-0"
                style={{ color: T.body, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 480 }}
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

            <p className="mt-4 font-heading" style={{ color: 'rgba(230,216,202,0.75)', fontSize: '0.8125rem' }}>
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