import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { defaultOption, editionPath } from '@/lib/specialEditions';
import { D, TYPE } from './driftTheme';

/**
 * The two ways to shop, side by side.
 *
 * Instant Originals is the everyday just-add-water lineup; Seasonal Reserve is
 * the limited brewed coffee. Each card states its own preparation so the
 * customer picks a shelf instead of decoding a catalogue.
 */
const PATHS = [
  {
    eyebrow: 'Everyday',
    title: 'Instant Originals',
    body: 'Classic and Mushroom coffee. Just add water.',
    cta: 'Shop Instant Coffee',
    to: '/shop',
    images: CORE_PRODUCTS.map((product) => ({ src: product.image, alt: product.alt })),
  },
  {
    eyebrow: 'Limited release',
    title: 'Seasonal Reserve',
    body: 'Limited seasonal coffees. Ground or whole bean where available. Brewing required.',
    cta: 'Explore Seasonal Coffee',
    to: '/special-editions',
    images: [],
  },
];

export default function DriftShopPaths() {
  const { editions, upcoming } = useSpecialEditions();
  const monthlyEdition = [...editions, ...upcoming].find(
    (edition) =>
      edition.monthly_featured &&
      edition.status !== 'draft' &&
      edition.status !== 'archived',
  );
  const monthlyOption = defaultOption(monthlyEdition);
  const monthlyImage = monthlyOption?.image_url || monthlyEdition?.image_url;
  const paths = PATHS.map((path) => {
    if (path.title !== 'Seasonal Reserve') return path;
    return {
      ...path,
      eyebrow: monthlyEdition ? 'Monthly edition' : path.eyebrow,
      title: monthlyEdition?.name || path.title,
      cta: monthlyEdition ? `View ${monthlyEdition.name}` : path.cta,
      to: monthlyEdition ? editionPath(monthlyEdition) : path.to,
      images: monthlyImage
        ? [{
            src: monthlyImage,
            alt: `Torch Republic ${monthlyEdition.name} coffee pouch, featured as this month’s Seasonal Reserve.`,
          }]
        : [],
    };
  });

  return (
    <section aria-labelledby="shop-paths" style={{ background: D.paper }}>
      <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="mb-8 max-w-2xl md:mb-10">
          <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: '0 0 1rem' }}>Start here</p>
          <h2 id="shop-paths" style={{ ...TYPE.heading, color: D.ink, margin: 0 }}>
            Two ways to drink it
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {paths.map((path) => (
            <article
              key={path.title}
              className="flex flex-col"
              style={{
                background: D.cream,
                border: `1px solid ${D.rule}`,
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <div
                className="flex items-center justify-center gap-2"
                style={{ background: '#FFFFFF', padding: '1rem', minHeight: 180 }}
              >
                {path.images.map((image) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: path.images.length > 1 ? '48%' : '60%',
                      height: 168,
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: 0 }}>{path.eyebrow}</p>
                <h3 style={{ ...TYPE.title, color: D.ink, margin: '0.6rem 0 0' }}>{path.title}</h3>
                <p style={{ ...TYPE.body, color: D.secondary, margin: '0.5rem 0 0', maxWidth: '38ch' }}>
                  {path.body}
                </p>
                <Link
                  to={path.to}
                  className="mt-auto inline-flex min-h-[48px] items-center justify-center gap-2 self-start px-5 pt-3 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    borderRadius: '6px',
                    background: D.terracotta,
                    color: '#FFF7E8',
                  }}
                >
                  {path.cta}
                  <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}