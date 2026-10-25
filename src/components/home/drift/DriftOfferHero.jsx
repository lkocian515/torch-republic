import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { INSTANT_LINEUP } from '@/lib/coffeeFormats';
import { formatPrice } from '@/lib/pricingConfig';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';

/**
 * The homepage opening statement.
 *
 * Torch Republic sells two instant coffees. This section states the offer — both
 * products, both product images, both prices and both calls to action — directly
 * beneath the seasonal campaign banner.
 *
 * Prices come from the canonical pricing config (verified against Shopify), so
 * the hero can never quote a number the product page disagrees with.
 */
export default function DriftOfferHero() {
  const [classic, mushroom] = CORE_PRODUCTS;

  return (
    <section style={{ background: D.paper }} aria-labelledby="offer-heading">
      <div className="mx-auto max-w-[1100px] px-6 pb-10 pt-8 md:pb-16 md:pt-14">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <p
            style={{
              fontFamily: MONO,
              fontSize: '0.7rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: D.terracotta,
              margin: '0 0 0.9rem',
            }}
          >
            Torch Republic Coffee Company
          </p>

          <h2
            id="offer-heading"
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5.4vw, 3.5rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              color: D.ink,
              margin: 0,
              textWrap: 'balance',
            }}
          >
            Two instant coffees. Just add water.
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              color: D.secondary,
              margin: '1rem auto 0',
              maxWidth: '52ch',
            }}
          >
            A bold Classic and a smooth Mushroom, both instant powder — no grinder, no brewer, no
            pods.
          </p>
        </motion.div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 md:mt-10 md:gap-6">
          {[classic, mushroom].map((product) => (
            <motion.div
              key={product.id}
              {...fadeUp}
              className="flex flex-col"
              style={{
                background: D.cream,
                border: D.borderHairline,
                borderRadius: 10,
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                boxShadow: D.shadowSoft,
              }}
            >
              <Link
                to={product.path}
                aria-label={`View ${product.name}`}
                className="mb-5 block"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    padding: 'clamp(0.75rem, 2vw, 1.25rem)',
                    borderRadius: 8,
                    background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${product.ritual.soft}40 0%, ${D.cream} 70%)`,
                    border: D.borderHairline,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    style={{
                      width: 'clamp(110px, 44%, 170px)',
                      aspectRatio: '3 / 4',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'drop-shadow(0 8px 20px rgba(36,26,22,0.12))',
                    }}
                  />
                </div>
              </Link>

              <p
                style={{
                  fontFamily: MONO,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: D.terracotta,
                  margin: 0,
                }}
              >
                {product.categoryLabel}
              </p>

              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 700,
                  fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
                  lineHeight: 1.15,
                  color: D.ink,
                  margin: '0.6rem 0 0',
                }}
              >
                {product.name}
              </h3>

              <p
                style={{
                  fontFamily: SANS,
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: D.secondary,
                  margin: '0.6rem 0 0',
                }}
              >
                {product.flavorLabel}
              </p>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.75rem', color: D.ink }}>
                  {formatPrice(product.price)}
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: D.terracottaDeep,
                  }}
                >
                  {INSTANT_LINEUP.label}
                </span>
              </div>

              <p
                style={{
                  fontFamily: SANS,
                  fontSize: '0.8125rem',
                  lineHeight: 1.55,
                  color: D.secondary,
                  margin: '0.5rem 0 1.25rem',
                }}
              >
                {INSTANT_LINEUP.note}
              </p>

              <Link
                to={product.path}
                className="group tr-btn-lift mt-auto inline-flex items-center justify-center gap-2"
                style={{
                  minHeight: 48,
                  padding: '0 1.5rem',
                  borderRadius: 6,
                  background: D.espresso,
                  color: D.cream,
                  fontFamily: SANS,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  boxShadow: '0 3px 10px rgba(36,26,22,0.12)',
                }}
              >
                Shop {product.categoryLabel}
                <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}