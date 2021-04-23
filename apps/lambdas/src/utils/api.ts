import axios from 'axios';
import { SETTINGS } from '../config';

export const api = {
  query<T>(q: string): Promise<T> {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: SETTINGS.apiUrl,
      data: JSON.stringify({ query: q }),
    }).then((resp) => resp.data);
  },
};
