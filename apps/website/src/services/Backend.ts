import { Endpoints } from '@types-api';
import { stringify as qsStringify } from 'qs';

import { API_URL, IS_DEVELOPMENT } from '@config/app';

async function fetcher(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);

  return await res.json();
}

type HashObject = {
  [param: string]: string;
};

type BackendOptions = {
  path?: string;
  params?: HashObject;
};

export const Backend = {
  fetch(
    endpoint: Endpoints,
    options?: BackendOptions,
  ): ReturnType<typeof fetcher> {
    let url = `${API_URL}/${endpoint}`;

    if (options?.path) {
      url += options.path;
    }

    if (options?.params) {
      const queryString = qsStringify(options.params, {
        addQueryPrefix: true,
        encode: false,
      });

      url += queryString;
    }

    if (IS_DEVELOPMENT) {
      console.log('Fetching data from:', url);
    }

    return fetcher(url);
  },

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
