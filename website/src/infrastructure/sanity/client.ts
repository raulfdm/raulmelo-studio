import { createClient } from '@sanity/client';

import { serverEnv } from '../env/server';
import { config } from './config';

export const sanityClient = createClient({
  dataset: config.dataset,
  projectId: config.projectId,
  apiVersion: `v2021-10-21`,
  perspective: 'published',
  useCdn: true,
  token: serverEnv.SANITY_TOKEN,
  allowReconfigure: true,
});
