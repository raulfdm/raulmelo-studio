import { polyfill as scrollPolyfill } from 'smoothscroll-polyfill';
import { isBrowserApiAvailable } from '@utils/utilities';

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
