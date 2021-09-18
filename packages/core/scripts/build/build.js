#!/usr/bin/env node

import { analyzeMetafileSync } from 'esbuild'
import { runESBuild } from '../_base/esbuild.js'

console.log('Building with ESBuild');

runESBuild()
  .then(([cjs, esm]) => {
    const cjsReport = analyzeMetafileSync(cjs.metafile)
    console.log(cjsReport)
    const esmReport = analyzeMetafileSync(esm.metafile)
    console.log(esmReport)
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
