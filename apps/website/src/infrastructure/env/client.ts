import { z } from 'zod';

export const clientEnvSchema = z.object({
  PUBLIC_ALGOLIA_APP_ID: z.string(),
  PUBLIC_ALGOLIA_SEARCH_KEY: z.string(),
  PUBLIC_ALGOLIA_INDEX_NAME: z.string(),
});

export const clientEnv = clientEnvSchema.parse(import.meta.env);
