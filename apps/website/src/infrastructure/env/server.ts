import { z } from 'zod';

const serverEnvSchema = z.object({
  APP_ENV: z.enum([`local`, `preview`, `production`]),
  SANITY_TOKEN: z.string(),
  ALGOLIA_ADMIN_KEY: z.string(),
  API_TOKEN: z.string(),
});

export function getServerEnv() {
  return serverEnvSchema.parse(import.meta.env);
}
