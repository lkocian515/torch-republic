import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { pickFeaturedCampaign, editionsInCollection, editionState, collectionPath } from '@/lib/specialEditions';

// 941 x 1672. The framed "shop at torchrepublic.com" panel runs from 86.7% of the
// height down, so the artwork is shown at 941 x 1429 to clip that panel off.
const ART = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/04f8c2f90_file_00000000c1d4822fac0f0a987a0bc722.png';
const ART_RATIO = '941 / 1429';

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
            className="block h-full w-full object-cover object-top"
            fetchPriority="high"
          />
        </div>
      </div>

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