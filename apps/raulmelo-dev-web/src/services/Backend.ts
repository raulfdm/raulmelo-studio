import { Endpoints } from '@types-api';

async function fetcher(url: string) {
  const res = await fetch(url);

  return await res.json();
}

export class Backend {
  private static apiUrl = process.env.API_ENDPOINT || 'http://localhost:1337';

  static fetch(endpoint: Endpoints, path?: string) {
    let url = `${Backend.apiUrl}/${endpoint}`;

    if (path) {
      url += path;
    }

    return fetcher(url);
  }
}
