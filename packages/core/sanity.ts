import { z } from 'zod';

const sanityEnv = z.object({
  SANITY_TOKEN: z.string(),
});

export function createConfig(envVars: Record<string, string | undefined>) {
  return {
    projectId: 'gc3hakk3',
    dataset: 'production',
    apiVersion: 'v2021-10-21',
    perspective: 'published',
    studioHost: 'raulmelo',
    get secrets() {
      return sanityEnv.parse(envVars);
    },
  } as const;
}
