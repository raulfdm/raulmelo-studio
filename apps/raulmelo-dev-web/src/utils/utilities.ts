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
