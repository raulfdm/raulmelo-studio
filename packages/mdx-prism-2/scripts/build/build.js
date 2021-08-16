#!/usr/bin/env node

const { runESBuild } = require('../_base/esbuild');

console.log('Bulding with ESBuild');

runESBuild().catch((err) => {
  console.error(err);
  process.exit(1);
});
