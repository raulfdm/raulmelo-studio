import { z } from 'zod';

const serverEnvSchema = z.object({
  APP_ENV: z.enum([`local`, `preview`, `production`]),
  ALGOLIA_ADMIN_KEY: z.string(),
  API_TOKEN: z.string(),
});

export const serverEnv = serverEnvSchema.parse({
  ...import.meta.env,
  ...process.env,
});
