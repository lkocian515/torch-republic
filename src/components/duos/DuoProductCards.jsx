import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { editionPath } from '@/lib/specialEditions';

/** The coffees of a duo with their exact names, descriptions and product links. */
export default function DuoProductCards({ bags = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {bags.map((bag) => {
        const edition = bag.edition;
        const description = edition?.short_description || edition?.description || null;
        const format = [edition?.format_summary, edition?.size].filter(Boolean).join(' \u00b7 ');
        const brewed = edition ? edition.requires_brewing !== false && !edition.is_instant : true;
        return (
          <article key={bag.slug} className="card-torch flex flex-col gap-2" style={{ padding: '1.25rem' }}>
            <div className="flex items-start gap-3">
              {bag.art ? (
                <img src={bag.art.src} alt={bag.art.alt} width="96" height="96" loading="lazy" className="h-24 w-24 shrink-0 object-contain" style={{ background: '#F7F2E9', borderRadius: 6 }} />
              ) : null}
              <div className="min-w-0">
                <h3 className="font-heading" style={{ fontSize: '1.125rem', margin: 0 }}>{bag.name}</h3>
                {bag.flavor ? <p className="body" style={{ margin: '0.25rem 0 0', fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))' }}>{bag.flavor}</p> : null}
                {bag.qty > 1 ? <p className="body" style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>{bag.qty} bags in this pair</p> : null}
              </div>
            </div>
            {description ? <p className="body" style={{ margin: 0, fontSize: '0.9375rem', whiteSpace: 'pre-line' }}>{description}</p> : null}
            {format ? <p className="body" style={{ margin: 0, fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{format}</p> : null}
            {brewed ? <p className="body" style={{ margin: 0, fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Brewed coffee, not instant.</p> : null}
            {edition ? (
              <Link to={editionPath(edition)} className="btn btn-ghost mt-auto" style={{ marginTop: '0.75rem' }}>
                View {bag.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}