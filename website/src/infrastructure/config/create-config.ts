import {
  ConfigBuilder,
  ObjectSource,
  type ConfigBuilderOptions,
  FileSource,
} from '@layerfig/config';

import parserYaml from '@layerfig/parser-yaml';
import { configSchema } from './schema';
import path from 'node:path';

export function createConfig(
  runtimeEnv: NonNullable<ConfigBuilderOptions['runtimeEnv']>,
) {
  const env = configSchema.shape.env.parse(runtimeEnv.APP_ENV);

  return new ConfigBuilder({
    validate(finalConfig) {
      return configSchema.parse(finalConfig);
    },
    parser: parserYaml,
    runtimeEnv,
    absoluteConfigFolderPath: process.env.VERCEL_REGION
      ? path.resolve('website/config')
      : undefined,
  })
    .addSource(new FileSource('base.yaml'))
    .addSource(new FileSource(`${env}.yaml`))
    .addSource(
      new ObjectSource({
        env,
      }),
    )
    .build();
}
