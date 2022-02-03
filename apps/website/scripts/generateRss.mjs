#!/usr/bin/env node

import { generateRssFeed } from '@raulmelo/core/generateRssFeed';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

generateRssFeed({
  apiEndpoint: process.env.API_ENDPOINT,
  outdir: path.resolve(__dirname, '../public'),
}).catch(console.error);
