import { useEffect } from 'react';

/**
 * Injects a noindex, nofollow meta tag while the component is mounted.
 * Use on legacy pages that should not be crawled or indexed.
 */
export function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      if (document.head.contains(meta)) {
        document.head.removeChild(meta);
      }
    };
  }, []);
}