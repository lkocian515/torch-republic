import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { optionState, editionState, defaultOption, findOption, editionPath, editionFormatLabel, formatMoney } from '@/lib/specialEditions';
import { seasonalArtwork } from '@/lib/seasonalCalendar';
import EditionStatusChip from './EditionStatusChip';
import GrindSelector from './GrindSelector';

/**
 * Special-edition product card. Availability, format and price all follow the
 * selected option; unconfirmed prices are never shown.
 */
export default function EditionCard({ edition, selectedOptionKey, onSelectOption, note }) {
  const option = findOption(edition, selectedOptionKey) || defaultOption(edition);
  const state = optionState(option);
  const overall = editionState(edition);
  // The edition's own photo first, then the approved label shot the seasonal
  // calendar holds for this coffee, so a card never shows an empty frame.
  const image = option?.image_url || edition.image_url || seasonalArtwork(edition.slug)?.src || null;
  const imageAlt = option?.label
    ? `${edition.name} - ${option.label}`
    : `Torch Republic ${edition.name} seasonal coffee pouch`;
  const price = state.purchasable ? formatMoney(state.price, state.currency) : null;
  const showSelector = (edition.options || []).length > 1 && typeof onSelectOption === 'function';
  const formatLabel = editionFormatLabel(edition);

  return (
    <article className="card-torch flex h-full flex-col overflow-hidden">
      <div className="product-image-wrap" style={{ borderRadius: 0, background: '#F8F5EF' }}>
        {image ? (
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="product-art-image"
            style={{ '--product-art-scale': edition.slug === 'midnight-hex' ? 1.06 : 1 }}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{ padding: '1.5rem', border: '1px dashed hsl(var(--border))', borderRadius: 10, margin: '1.5rem' }}
          >
            <span className="font-heading" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              {edition.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {edition.badge && <span className="badge-torch">{edition.badge}</span>}
          <EditionStatusChip state={overall.state} label={overall.label} />
        </div>

        <h3 className="mt-3 text-center font-serif font-bold" style={{ fontSize: '1.25rem', lineHeight: 1.2 }}>
          {edition.name}
        </h3>

        {/* The format is read from the edition's own options, so it always matches
            the grind selector below. An unreleased coffee has none yet. */}
        {formatLabel && (
          <p className="mt-2 text-center font-mono uppercase" style={{ fontSize: '11px', letterSpacing: '0.14em', fontWeight: 700, color: 'hsl(var(--primary))' }}>
            {formatLabel} &middot; brewed, not instant
          </p>
        )}

        {edition.short_description && (
          <p className="mt-2 body" style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9375rem' }}>
            {edition.short_description}
          </p>
        )}

        {/* An optional tasting line. Nothing else about the card changes when it is absent. */}
        {note && (
          <p className="mt-2 body" style={{ color: 'hsl(var(--foreground))', fontSize: '0.9375rem', fontStyle: 'italic' }}>
            {note}
          </p>
        )}

        <dl className="mt-4 space-y-1 font-mono uppercase" style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'hsl(var(--muted-foreground))' }}>
          {option?.format_label && (
            <div className="flex gap-2">
              <dt>Format</dt>
              <dd style={{ color: 'hsl(var(--foreground))' }}>{option.format_label}</dd>
            </div>
          )}
          {edition.size && (
            <div className="flex gap-2">
              <dt>Size</dt>
              <dd style={{ color: 'hsl(var(--foreground))' }}>{edition.size}</dd>
            </div>
          )}
          {/* No "planned" release month is published: the month on the release
              record is an internal planning value, not a confirmed date. */}
        </dl>

        {showSelector && (
          <div className="mt-5">
            <GrindSelector options={edition.options} value={option?.key} onChange={onSelectOption} legend="Grind" />
          </div>
        )}

        <div className="mt-auto pt-5">
          <p className="font-heading font-semibold" style={{ fontSize: '1.125rem' }}>
            {price || <span className="text-readable-secondary" style={{ fontSize: '0.9375rem', fontWeight: 500 }}>Price confirmed at launch</span>}
          </p>

          <Link
            to={editionPath(edition)}
            className="btn btn-ghost mt-3 w-full"
            aria-label={`View ${edition.name}`}
          >
            {state.purchasable ? 'View product' : 'Preview product'}
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </article>
  );
}