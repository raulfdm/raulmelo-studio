#!/usr/bin/env node

/**
 * This is, for some reason which is not clear for me yet,
 * a ESM context. That means I don't have access to `require`,
 * `__dirname`, etc.
 */
import { generateSiteData } from '@raulfdm/core/generateSiteData';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

generateSiteData({
  apiEndpoint: process.env.VITE_API_ENDPOINT,
  outdir: path.resolve(__dirname, '..'),
}).catch(console.error);
