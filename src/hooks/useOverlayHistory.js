import { useEffect, useRef } from 'react';

/**
 * Registers a full-screen overlay in the browser history stack so that
 * the mobile back gesture / hardware back button closes the overlay
 * naturally instead of navigating away from the page.
 *
 * @param {boolean} isOpen  — whether the overlay is currently open
 * @param {Function} onClose — callback to close the overlay
 */
export function useOverlayHistory(isOpen, onClose) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const closedByPopStateRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    closedByPopStateRef.current = false;
    window.history.pushState({ overlay: true }, '');

    const handlePopState = () => {
      closedByPopStateRef.current = true;
      onCloseRef.current();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Only pop the history entry if the overlay was closed via UI
      // (not via the back button) AND the current state is still our
      // overlay state (user hasn't navigated to a new page).
      if (!closedByPopStateRef.current && window.history.state?.overlay) {
        window.history.back();
      }
    };
  }, [isOpen]);
}