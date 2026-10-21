/**
 * Root routes of the tabbed shell.
 *
 * A root path is a tab's own home — it has no parent page to return to, so the
 * global header shows no back arrow there. Every other route is a child view.
 */
export const ROOT_PATHS = ['/', '/shop', '/profile'];

/** Strips query/hash and trailing slashes so `/shop/` and `/shop` match. */
export function normalizePath(pathname) {
  const clean = (pathname || '/').split('?')[0].split('#')[0].replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function isRootPath(pathname) {
  return ROOT_PATHS.includes(normalizePath(pathname));
}

/**
 * The tab a child view belongs to. Used as the back target when a WebView opens
 * straight into a child page and there is no history to go back to.
 */
export function rootForPath(pathname) {
  const path = normalizePath(pathname);
  if (path.startsWith('/shop') || path.startsWith('/products') || path.startsWith('/blends') || path.startsWith('/special-editions')) {
    return '/shop';
  }
  if (path.startsWith('/profile') || path.startsWith('/account') || path.startsWith('/loyalty') || path.startsWith('/order-status')) {
    return '/profile';
  }
  return '/';
}