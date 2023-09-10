import { watch } from 'fs';
import path from 'path';

import { build } from './base-build.ts';

watch(
  path.resolve(import.meta.dir, '../src/'),
  { recursive: true },
  async (event, filename) => {
    await build();

    console.log(`Detected ${event} in ${filename}`);
  },
);
