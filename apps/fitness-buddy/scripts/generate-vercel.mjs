#!/usr/bin/env node

import path from 'path';

import { createVercelJsonConfig, getDirname } from '@raulmelo/vercel-utils';

createVercelJsonConfig({
  projectName: 'fitness-buddy',
  framework: 'sveltekit',
  cwd: path.resolve(getDirname(import.meta.url), '../'),
}).write();
