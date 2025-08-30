import { z } from 'zod/v4';

export const configSchema = z.object({
  env: z.enum(['local', 'preview', 'production']),
  cvURL: z.string(),
  sanity: z.object({
    projectId: z.string(),
    dataset: z.string(),
    apiVersion: z.string(),
    perspective: z.enum(['published', 'drafts']),
    studioHost: z.string(),
    useCdn: z.boolean().default(true),
    allowReconfigure: z.boolean().default(true),
    token: z.string(),
  }),
  algolia: z.object({
    appId: z.string(),
    indexName: z.string(),
    searchKey: z.string(),
    adminKey: z.string(),
  }),
  site: z.object({
    url: z.string(),
    apiToken: z.string(),
    assetsDomains: z.array(z.string()).default([]),
    /**
     * Incremental Static Regeneration (ISR) configuration.
     * @see https://docs.astro.build/en/guides/integrations-guide/vercel/#isr
     */
    isr: z.object({
      expiration: z.number(),
    }),
    redirects: z
      .record(
        z.string(), // Source path
        z.string(), // Destination path
      )
      .default({}),
  }),
});
