import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useProductAvailability from '@/hooks/useProductAvailability';
import { ORIGINALS_DUO, featuredPairing, pairingLabel, monthLabelFor, duoPath } from '@/lib/duos';
import { seasonalArtwork } from '@/lib/seasonalCalendar';
import SeasonalArtwork from '@/components/seasonal/SeasonalArtwork';
import { formatMoney } from '@/lib/specialEditions';
import { D, TYPE, SERIF, SANS, fadeUp } from './driftTheme';

/**
 * The two duo options at a glance. The Originals Duo shows the live Shopify
 * price and the real saving against the single bags; the seasonal pairing only
 * names the coffees and its planned month, because a pairing is never sold
 * before both bags are verified.
 */
export default function DriftDuos() {
  const handles = [ORIGINALS_DUO.shopifyHandle, ...ORIGINALS_DUO.contents.map((c) => c.shopifyHandle)];
  const { products, loading } = useProductAvailability(handles);

  const duoVariant = products?.[ORIGINALS_DUO.shopifyHandle]?.variants?.[0] || null;
  const duoPrice = duoVariant ? Number(duoVariant.price) : null;
  const componentTotal = ORIGINALS_DUO.contents.reduce((sum, item) => {
    const variant = products?.[item.shopifyHandle]?.variants?.[0];
    return sum + (variant ? Number(variant.price) : 0);
  }, 0);
  const saving = duoPrice !== null && componentTotal > 0 && componentTotal > duoPrice ? componentTotal - duoPrice : null;

  const pairing = featuredPairing();
  const pairingArtwork = pairing ? [...new Set(pairing.components)].filter((slug) => seasonalArtwork(slug)) : [];

  return (
    <section aria-labelledby="duos-heading" style={{ background: D.paper }}>
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <motion.div {...fadeUp} className="max-w-[620px]">
          <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: 0 }}>Duos</p>
          <h2 id="duos-heading" style={{ ...TYPE.heading, color: D.espresso, margin: '0.75rem 0 0' }}>
            Two coffees, one order
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <article style={{ background: '#FFFFFF', border: `1px solid ${D.rule}`, borderRadius: 4, padding: '1.5rem' }}>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', margin: 0, color: D.espresso }}>
              {ORIGINALS_DUO.name}
            </h3>
            <p style={{ fontFamily: SANS, fontSize: '0.9375rem', color: D.secondary, margin: '0.5rem 0 0' }}>
              Instant Classic Coffee + Instant Coffee with Mushrooms. Just add water.
            </p>
            <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.75rem', margin: '1rem 0 0', color: D.espresso, fontVariantNumeric: 'tabular-nums' }}>
              {loading ? 'Checking…' : formatMoney(duoPrice) || 'Price at checkout'}
            </p>
            {saving !== null ? (
              <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: D.terracotta, margin: '0.35rem 0 0' }}>
                Saves {formatMoney(saving)} against buying both bags separately
              </p>
            ) : null}
            <Link
              to={ORIGINALS_DUO.path}
              className="mt-5 inline-flex min-h-[48px] items-center gap-2 px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderRadius: 999, background: D.terracotta, color: '#FFF7E8' }}
            >
              Shop the Duo <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>

          <article style={{ background: '#F5F0E8', border: `1px solid ${D.rule}`, borderRadius: 4, padding: '1.5rem' }}>
            <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', margin: 0, color: D.espresso }}>
              Seasonal pairing
            </h3>
            {pairingArtwork.length > 0 ? (
              <div className="mt-3 flex items-center gap-2">
                {pairingArtwork.map((slug) => (
                  <SeasonalArtwork key={slug} slug={slug} className="h-14 w-14" />
                ))}
              </div>
            ) : null}
            <p style={{ fontFamily: SANS, fontSize: '0.9375rem', color: D.secondary, margin: '0.5rem 0 0' }}>
              {pairing
                ? `${pairingLabel(pairing)} · ${monthLabelFor(pairing)}`
                : 'No pairing is scheduled right now.'}
            </p>
            <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: D.secondary, margin: '0.75rem 0 0' }}>
              Brewing required. A pairing opens once both coffees are verified and in stock — never before.
            </p>
            <Link
              to={pairing ? duoPath(pairing) : '/duos'}
              className="mt-5 inline-flex min-h-[48px] items-center gap-2 px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderRadius: 999, border: `1px solid ${D.terracotta}`, color: D.terracotta }}
            >
              See the pairing <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}