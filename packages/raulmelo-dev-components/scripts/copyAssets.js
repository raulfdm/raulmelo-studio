'use strict';

const fs = require('fs-extra');
const path = require('path');

const source = path.resolve(__dirname, '../static');
const dest = path.resolve(__dirname, '../dist/static/');

fs.copySync(source, dest);
