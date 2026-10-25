import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { pickFeaturedCampaign, editionsInCollection, editionState, editionsFormatLabel, collectionPath } from '@/lib/specialEditions';

// 1254 x 1254 seasonal artwork, shown whole at its own square ratio.
const ART = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1faec6950_file_0000000067a0820d99981f5d62fc96af.png';
const ART_RATIO = '1 / 1';

/**
 * Seasonal banner at the top of the shop page.
 *
 * The artwork carries its own headline and product story, so it renders clean and
 * full-bleed. The panel baked into its bottom edge is cropped away and replaced
 * with a real button, because text inside an image is neither clickable nor
 * readable by a screen reader.
 *
 * Copy and destination come from the featured campaign, so the banner follows the
 * release schedule instead of needing a code change each season.
 */
export default function ShopDuoBanner() {
  const { editions, campaigns, loading } = useSpecialEditions();

  if (loading) return null;

  const campaign = pickFeaturedCampaign(campaigns);
  if (!campaign) return null;

  const items = editionsInCollection(editions, campaign.collection_slug);
  const bannerFormat = editionsFormatLabel(items);
  const isLive = items.some((edition) => editionState(edition).state === 'available');
  const href = campaign.collection_slug ? collectionPath(campaign.collection_slug) : '/special-editions';
  const ctaLabel = isLive
    ? campaign.cta_label_live || 'Shop the collection'
    : campaign.cta_label_prelaunch || 'Preview the collection';

  return (
    <section
      className="w-full"
      style={{ background: '#1A0F0A' }}
      aria-label={campaign.headline || campaign.name}
    >
      <div className="mx-auto" style={{ maxWidth: 640 }}>
        <div className="overflow-hidden" style={{ aspectRatio: ART_RATIO }}>
          <img
            src={ART}
            alt={`${campaign.name} special edition`}
            className="block h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      </div>

      {campaign.supporting_text && (
        <p
          className="mx-auto max-w-[640px] px-6 pt-8 text-center font-heading"
          style={{ color: 'rgba(230,216,202,0.85)', fontSize: '0.9375rem', lineHeight: 1.6 }}
        >
          {campaign.supporting_text}
        </p>
      )}

      {/* Formats come from the collection's own editions, so the banner can never
          advertise a grind the products do not actually sell. */}
      {bannerFormat && (
        <p
          className="mx-auto max-w-[640px] px-6 pt-6 text-center font-mono uppercase"
          style={{ color: 'rgba(230,216,202,0.9)', fontSize: '10px', letterSpacing: '0.2em', fontWeight: 700 }}
        >
          {bannerFormat} &middot; brewed, not instant
        </p>
      )}

      <div className="flex justify-center px-6 pb-10 pt-8">
        <Link
          to={href}
          className="inline-flex items-center justify-center gap-2 font-heading font-semibold"
          style={{ background: '#D6743A', color: '#F7EEDD', minHeight: 48, padding: '0.875rem 2rem', borderRadius: 999 }}
        >
          {ctaLabel}
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}