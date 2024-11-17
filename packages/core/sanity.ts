import { z } from 'zod';

const sanityEnv = z.object({
  SANITY_TOKEN: z.string(),
});

export function createConfig() {
  return {
    projectId: 'gc3hakk3',
    dataset: 'production',
    apiVersion: 'v2021-10-21',
    perspective: 'published',
    studioHost: 'raulmelo',
    secrets(envVars: Record<string, string | undefined>) {
      return sanityEnv.parse(envVars);
    },
  } as const;
}
