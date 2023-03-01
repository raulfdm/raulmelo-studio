import { isBrowserApiAvailable } from '@raulmelo/core/utils';
import { polyfill as scrollPolyfill } from 'smoothscroll-polyfill';

if (isBrowserApiAvailable.window) {
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
