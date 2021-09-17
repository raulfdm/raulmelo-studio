export const isBrowserApiAvailable = {
  get window(): boolean {
    return typeof window !== 'undefined';
  },
  get navigator(): boolean {
    return typeof navigator !== 'undefined';
  },
};
