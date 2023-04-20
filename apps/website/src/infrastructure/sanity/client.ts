import { createClient } from '@sanity/client';

import { serverEnv } from '../env/server';
import { config } from './config';

export const sanityClient = createClient({
  dataset: config.dataset,
  projectId: config.projectId,
  apiVersion: `v1`,
  useCdn: true,
  token: serverEnv.SANITY_TOKEN,
  allowReconfigure: true,
});
