import { isEmpty, isNil, not } from './ramda';

export const isBrowserApiAvailable = {
  get window(): boolean {
    return typeof window !== 'undefined';
  },
  get navigator(): boolean {
    return typeof navigator !== 'undefined';
  },
};

export function head<T>(arr: T[]): T {
  return arr[0];
}

export function isNilOrEmpty<T>(param: T): boolean {
  return isNil(param) || isEmpty(param);
}

export function isNotNilNorEmpty<T>(param: T): boolean {
  return not(isNilOrEmpty(param));
}
