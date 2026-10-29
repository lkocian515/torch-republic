import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { duoBySlug, resolveDuoSlug } from '@/lib/duos';
import DuoDetailView from '@/components/duos/DuoDetailView';

function DuoNotFound() {
  useSEO({ title: 'Coffee Duo | Torch Republic Coffee Company', description: 'Torch Republic coffee duos.', noindex: true });

  // A duo that does not exist is a real 404, not a silent redirect home.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[760px] px-6 md:px-10">
        <p className="eyebrow">404</p>
        <h1 className="h1 mt-3">Duo not found</h1>
        <p className="body mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
          This pairing is not part of the duo calendar.
        </p>
        <Link to="/duos" className="btn btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All coffee duos
        </Link>
      </div>
    </div>
  );
}

/** Resolves old duo URLs to the canonical page, then renders it. */
export default function DuoDetail() {
  const { slug } = useParams();
  const canonical = resolveDuoSlug(slug);
  if (canonical !== slug) return <Navigate to={`/duos/${canonical}`} replace />;
  const pairing = duoBySlug(slug);
  return pairing ? <DuoDetailView pairing={pairing} /> : <DuoNotFound />;
}