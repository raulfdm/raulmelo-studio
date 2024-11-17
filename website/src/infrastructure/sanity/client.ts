import { createClient } from '@sanity/client';
import { createConfig } from '@raulmelo/core/sanity';

const sanityConfig = createConfig();

export const sanityClient = createClient({
  dataset: sanityConfig.dataset,
  projectId: sanityConfig.projectId,
  apiVersion: sanityConfig.apiVersion,
  perspective: sanityConfig.perspective,
  useCdn: true,
  token: sanityConfig.secrets({
    ...process.env,
    ...import.meta.env,
  }).SANITY_TOKEN,
  allowReconfigure: true,
});
