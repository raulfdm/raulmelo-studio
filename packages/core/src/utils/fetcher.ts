import 'isomorphic-fetch';
import { API_URL } from '~config';
import { utils } from '~utils';

type Variables = {
  [key: string]: string | boolean | number | null | Variables;
};

export const fetcher = {
  async graphql<T>(query: string, variables?: Variables): Promise<T> {
    const url = `${API_URL}/graphql`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const { data, errors } = await res.json();

      if (!utils.isNil(errors)) {
        throw new Error(errors);
      }

      return data;
    } catch (error) {
      console.error(
        'Backend.graphql: Something went wrong. Check console',
        error,
      );
    }
  },
};
