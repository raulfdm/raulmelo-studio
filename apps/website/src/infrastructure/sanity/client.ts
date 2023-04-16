import { createClient } from '@sanity/client';

import { config } from './config';
import { serverEnv } from '../env/server';

export const sanityClient = createClient({
  dataset: config.dataset,
  projectId: config.projectId,
  apiVersion: `v1`,
  useCdn: true,
  token: serverEnv.SANITY_TOKEN,
  allowReconfigure: true,
});
