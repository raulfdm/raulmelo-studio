export const API_URL =
  globalThis.__API_ENDPOINT__ ||
  process.env.API_ENDPOINT ||
  'http://localhost:1337';
