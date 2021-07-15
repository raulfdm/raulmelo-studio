import { API_URL } from '../config/app';
import { isNil } from 'ramda';

async function fetcher(url: string, opts?: RequestInit) {
  /**
   * The following code removes double slash after `://` in a URL:
   * http://localhost:1337//api -> http://localhost:1337/api
   */
  const REGEX_DOUBLE_SLASH = /(?<!:)\/\//gm;
  const sanitizedUrl = url.replace(REGEX_DOUBLE_SLASH, '/');

  const res = await fetch(sanitizedUrl, opts);

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

    if (!isNil(res.errors)) {
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
