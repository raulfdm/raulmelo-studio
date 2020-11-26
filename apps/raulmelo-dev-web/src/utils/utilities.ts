import { isEmpty, isNil, not } from './ramda';

export const isBrowserApiAvailable = {
  get window() {
    return typeof window !== 'undefined';
  },
  get navigator() {
    return typeof navigator !== 'undefined';
  },
};

export function head<T>(arr: T[]) {
  return arr[0];
}

export function isNilOrEmpty(param: any) {
  return isNil(param) || isEmpty(param);
}

export function isNotNilNorEmpty(param: any) {
  return not(isNilOrEmpty(param));
}
