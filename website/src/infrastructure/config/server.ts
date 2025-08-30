import { createConfig } from './create-config';

const runtimeEnv = {
  ...import.meta.env,
  ...process.env,
} as const;

export const config = createConfig(runtimeEnv);
