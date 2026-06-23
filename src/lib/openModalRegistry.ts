/**
 * Lightweight cross-component registry for open modal/popup overlays.
 * Any popup that should suppress others registers itself while open.
 * Kept framework-agnostic and SSR-safe — no React, no deps.
 *
 * Usage:
 *   const unregister = openModalRegistry.register('email_capture');
 *   // when closed:
 *   unregister();
 *   // or check:
 *   if (openModalRegistry.hasOpen()) { ... do not show ... }
 */

const SET_KEY = '__torch_open_modals';

const openModalRegistry = {
  _ensure(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    if (!window[SET_KEY]) window[SET_KEY] = new Set();
    return window[SET_KEY];
  },
  register(name: string): () => void {
    const set = this._ensure();
    set.add(name);
    return () => {
      set.delete(name);
    };
  },
  hasOpen(exclude?: string): boolean {
    const set = this._ensure();
    for (const n of set) {
      if (n !== exclude) return true;
    }
    return false;
  },
};

export default openModalRegistry;