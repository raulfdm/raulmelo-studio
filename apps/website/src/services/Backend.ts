import { API_URL } from '@config/app';
import { utils } from '@raulfdm/core';

async function fetcher(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);

  return await res.json();
}

type Variables = {
  [key: string]: string | boolean | number | null | Variables;
};

export const Backend = {
  async graphql<T>(query: string, variables?: Variables): Promise<T> {
    const url = `${API_URL}/graphql`;

    const res = await fetcher(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!utils.isNil(res.errors)) {
      console.log('ERRORS ->', res.errors);
      throw new Error('Backend.graphql: Something went wrong. Check console');
    }

    return res.data;
  },
};

export const graphqlVariables = {
  preview: {
    _publicationState: 'preview',
    published_at_null: true,
  },
};
