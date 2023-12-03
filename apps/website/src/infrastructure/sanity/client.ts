import { createClient } from '@sanity/client';

import { getServerEnv } from '../env/server';
import { config } from './config';

export function getSanityClient() {
  const serverEnv = getServerEnv();

  return createClient({
    dataset: config.dataset,
    projectId: config.projectId,
    apiVersion: `v2021-10-21`,
    perspective: 'published',
    useCdn: true,
    token: serverEnv.SANITY_TOKEN,
    allowReconfigure: true,
  });
}
