import useSpecialEditions from '@/hooks/useSpecialEditions';

/** The combined edition catalog, keyed by slug, for every duo surface. */
export default function useDuoCatalog() {
  const { editions, upcoming, loading } = useSpecialEditions();
  const catalog = [...(editions || []), ...(upcoming || [])];
  const bySlug = new Map(catalog.map((edition) => [edition.slug, edition]));
  return { catalog, bySlug, loading };
}