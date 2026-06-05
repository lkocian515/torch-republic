import { useEffect } from 'react';

/**
 * Sets page <title> and meta description while the component is mounted.
 * Restores the original values on unmount.
 */
export function useSEO({ title, description }) {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    if (title) document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);

    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}