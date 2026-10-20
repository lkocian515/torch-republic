import React from 'react';
import { Link } from 'react-router-dom';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import EditionCard from './EditionCard';

/**
 * Special editions inside Shop All. Renders nothing until an active edition
 * exists, so the everyday catalog is never disrupted.
 */
export default function ShopSpecialEditions({ format = null }) {
  const { editions, loading } = useSpecialEditions();

  // When a coffee format is active, only editions sold in that format appear.
  const shown = format
    ? editions.filter((e) => (e.options || []).some((o) => o.key === format))
    : editions;

  if (loading || shown.length === 0) return null;

  return (
    <section className="px-6 pb-16 md:px-10" aria-label="Special editions">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: '#A97B32' }}>
              Limited releases
            </p>
            <h2 className="mt-2 font-serif font-semibold" style={{ fontSize: 'clamp(1.6rem,3vw,2rem)', color: '#292622' }}>
              Special Editions
            </h2>
          </div>
          <Link to="/special-editions" className="btn btn-ghost">
            All special editions
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {shown.map((edition) => (
            <EditionCard key={edition.id} edition={edition} />
          ))}
        </div>
      </div>
    </section>
  );
}