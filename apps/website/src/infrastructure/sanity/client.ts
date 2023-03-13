import { createClient } from '@sanity/client';

import { config } from './config';

if (!import.meta.env.SANITY_TOKEN) {
  console.warn(`Sanity token is missing`);
}

export const sanityClient = createClient({
  dataset: config.dataset,
  projectId: config.projectId,
  apiVersion: `v1`,
  useCdn: true,
  token: import.meta.env.SANITY_TOKEN,
  allowReconfigure: true,
});
