import 'isomorphic-fetch';
import { API_URL } from '~config';
import { utils } from '~utils';

async function internalFetcher(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);

  return await res.json();
}

type Variables = {
  [key: string]: string | boolean | number | null | Variables;
};

export const fetcher = {
  // TODO: this should be elsewhere
  // graphqlVariables: {
  //   preview: {
  //     _publicationState: 'preview',
  //     published_at_null: true,
  //   },
  // },
  async graphql<T>(query: string, variables?: Variables): Promise<T> {
    const url = `${API_URL}/graphql`;

    const res = await internalFetcher(url, {
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
