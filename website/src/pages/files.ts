import type { APIRoute } from 'astro';
import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const ALL: APIRoute = () => {
  console.log({
    cwd: {
      resolved: process.cwd(),
      files: fs.readdirSync(process.cwd()),
    },
    dirname: {
      resolved: __dirname,
      files: fs.readdirSync(__dirname),
    },
    layerfig: {
      APP_ROOT_PATH: process.cwd(),
      join: path.join(process.cwd(), './config'),
      files: fs.readdirSync(path.join(process.cwd(), './config')),
    },
  });

  return new Response(
    JSON.stringify({
      name: 'Astro',
      url: 'https://astro.build/',
    }),
  );
};
