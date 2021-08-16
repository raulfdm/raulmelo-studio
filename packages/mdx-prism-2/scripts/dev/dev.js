#!/usr/bin/env node

const { runESBuild } = require('../_base/esbuild');

console.log('Running ESBuild in watch mode');

runESBuild({ watch: true }).catch((err) => {
  console.error(err);
  process.exit(1);
});
