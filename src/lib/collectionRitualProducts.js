import { ALL_PRODUCTS } from './mushroomProducts';

/**
 * Map a ritual-page product entry (with `name` and `path`) to its real catalog
 * product so the shared grid card can render the accurate image, price, and
 * servings. Preserves the ritual page's existing product link by setting
 * `slug` to the path's slug. Returns null for entries that are not real catalog
 * products (e.g. bundles or discontinued blends) so callers can filter them.
 */
export function toCatalogCard(entry) {
  if (!entry) return null;
  const pathSlug =
    entry.path && entry.path.startsWith('/products/')
      ? entry.path.replace('/products/', '')
      : null;
  const catalog = ALL_PRODUCTS.find(
    (p) => p.slug === pathSlug || p.shopifyHandle === pathSlug || p.name === entry.name
  );
  if (!catalog) return null;
  return { ...catalog, slug: pathSlug || catalog.slug };
}

export function ritualCards(entries) {
  return entries.map(toCatalogCard).filter(Boolean);
}