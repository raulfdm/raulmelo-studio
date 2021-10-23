#!/usr/bin/env node
import { runESBuild } from './_base/esbuild.js';

console.log('Building with ESBuild');

runESBuild({ watch: true }).catch((err) => {
  console.error(err);
  process.exit(1);
});
