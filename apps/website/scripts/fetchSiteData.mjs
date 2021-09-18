#!/usr/bin/env node

import { generateSiteData } from '@raulfdm/core/generateSiteData';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

generateSiteData({
  apiEndpoint: process.env.API_ENDPOINT,
  outdir: path.resolve(__dirname, '..'),
}).catch(console.error);
