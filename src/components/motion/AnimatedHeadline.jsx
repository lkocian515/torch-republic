import React from 'react';

/**
 * Headline that rises in word by word.
 *
 * The words stay real text nodes — selectable, searchable, and readable by
 * assistive technology — and the motion is pure CSS, so the line is never left
 * hidden if scripting fails. Reduced-motion visitors see it already in place.
 */
export default function AnimatedHeadline({
  text,
  as: Tag = 'h2',
  className = '',
  style,
  delay = 0,
  step = 0.06,
}) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;

  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="tr-word" style={{ animationDelay: `${(delay + i * step).toFixed(2)}s` }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}