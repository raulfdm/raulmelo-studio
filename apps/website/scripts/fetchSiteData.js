#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

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

fetch(`${URL}/graphql`, {
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

    fs.writeFileSync(
      path.resolve(__dirname, '..', 'site-data.json'),
      JSON.stringify(sanitizedData, null, 2),
    );
  })
  .then(() => console.log('Site data generated!'))
  .catch((err) => {
    console.error('Something went wrong while generating site-data');
    console.error(err);
    process.exit(1);
  });
