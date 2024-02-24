import { z } from 'zod';

export const clientEnvSchema = z.object({
  PUBLIC_ALGOLIA_APP_ID: z.string(),
  PUBLIC_ALGOLIA_SEARCH_KEY: z.string(),
  PUBLIC_ALGOLIA_INDEX_NAME: z.string(),
  PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),
});

export const clientEnv = clientEnvSchema.parse(import.meta.env);
