import * as R from 'ramda';

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
  return R.isNil(param) || R.isEmpty(param);
}

export function isNotNilNorEmpty(param: any) {
  return R.not(isNilOrEmpty(param));
}
