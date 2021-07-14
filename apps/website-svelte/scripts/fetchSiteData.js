#!/usr/bin/env node

/**
 * This is, for some reason which is not clear for me yet,
 * a ESM context. That means I don't have access to `require`,
 * `__dirname`, etc.
 */
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const URL = process.env.API_ENDPOINT ?? 'http://localhost:1337';

if (URL.includes('localhost')) {
  console.log('Getting data from Localhost');
}

const query = `
query SiteData {
  defaultSeoPt: defaultSeo(locale: "pt") {
    title
    locale
    description
  }
  defaultSeoEn: defaultSeo(locale: "en") {
    title
    locale
    description
  }
  personalInformation {
    full_name
    profile_pic {
      width
      height
      url
    }
  }
  site {
    url
    seo_image {
      url
      width
      height
    }
  }
  socials {
    url
    username
    name
  }
}
`;

const config = {
  apiUrl: `${URL}/graphql`,
  get distPath() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.resolve(__dirname, '..', 'site-data.json');
  },
};

fetch(config.apiUrl, {
  method: 'POST',
  body: JSON.stringify({ query }),
  headers: { 'Content-Type': 'application/json' },
})
  .then((res) => res.json())
  .then(async ({ data }) => {
    const { defaultSeoPt, defaultSeoEn, ...rest } = data;

    /**
     * Ensure of having both default seo locales
     */
    const sanitizedData = {
      ...rest,
      defaultSeo: {
        pt: defaultSeoPt,
        en: defaultSeoEn,
      },
    };

    fs.writeFileSync(config.distPath, JSON.stringify(sanitizedData, null, 2));
  })
  .then(() => console.log('Site data generated at ', config.distPath))
  .catch((err) => {
    console.error('Something went wrong while generating site-data');
    console.error(err);
    process.exit(1);
  });
