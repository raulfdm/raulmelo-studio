#!/usr/bin/env node

import dotenv from 'dotenv-flow';
dotenv.config();
import { generateSiteData } from '@raulmelo/core/generateSiteData';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

generateSiteData({
  outdir: path.resolve(__dirname, '..'),
}).catch(console.error);
