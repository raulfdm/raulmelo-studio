import { utils } from '@raulfdm/core';
import { polyfill as scrollPolyfill } from 'smoothscroll-polyfill';

if (utils.isBrowserApiAvailable.window) {
  scrollPolyfill();
}

const moveToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export function useScrollToTop(): {
  moveToTop: typeof moveToTop;
} {
  return { moveToTop };
}
