import React from 'react';

/**
 * Campaign artwork tile. Shows only the selected option's own photo, so a
 * whole-bean label can never stand in for the ground product. When no approved
 * photo exists yet the tile states that plainly instead of borrowing an image.
 */
export default function EditionPlinth({ edition, option }) {
  const image = option?.image_url;
  const formatLabel = option?.format_label || edition?.format_summary || '';

  return (
    <figure
      className="flex flex-col items-center justify-end"
      style={{
        background: 'rgba(247,238,221,0.06)',
        border: '1px solid rgba(247,238,221,0.16)',
        borderRadius: 16,
        padding: '1rem',
      }}
    >
      {image ? (
        <img
          src={image}
          alt={`${edition.name}${option?.label ? ` - ${option.label}` : ''}`}
          className="h-auto w-full object-contain"
          style={{ maxHeight: 230, filter: 'drop-shadow(0 18px 32px rgba(0,0,0,0.45))' }}
          loading="lazy"
        />
      ) : (
        <div
          className="flex w-full flex-col items-center justify-center text-center"
          style={{ minHeight: 170, border: '1px dashed rgba(247,238,221,0.3)', borderRadius: 10, padding: '1.25rem 0.75rem' }}
        >
          <span className="font-heading" style={{ color: '#F7F2E9', fontSize: '0.8125rem', fontWeight: 600 }}>
            {edition.name}
          </span>
        </div>
      )}

      <figcaption className="mt-3 text-center">
        {formatLabel && (
          <span className="block font-mono uppercase" style={{ color: '#F7F2E9', fontSize: '9px', letterSpacing: '0.18em' }}>
            {formatLabel}
          </span>
        )}
        <span className="mt-1 block font-heading" style={{ color: 'rgba(230,216,202,0.8)', fontSize: '0.75rem' }}>
          {edition.name}
        </span>
      </figcaption>
    </figure>
  );
}