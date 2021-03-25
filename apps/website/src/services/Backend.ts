import { API_URL } from '@config/app';

async function fetcher(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);

  return await res.json();
}

export const Backend = {
  async graphql<T>(query: string): Promise<T> {
    const url = `${API_URL}/graphql`;

    const res = await fetcher(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    return res.data;
  },
};
