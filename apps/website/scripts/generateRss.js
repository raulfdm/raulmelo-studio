#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const API_ENDPOINT = process.env.API_ENDPOINT ?? 'http://localhost:1337';
const LOCALES_TO_GEN_RSS = ['en', 'pt'];

if (API_ENDPOINT.includes('localhost')) {
  console.log('Getting data from Localhost');
}

(async function generateRssFeedIIFE() {
  for await (const locale of LOCALES_TO_GEN_RSS) {
    const { tils, posts, site, rss } = await getContent(locale);

    const rssConfig = {
      ...rss,
      url: site.url,
      locale,
    };

    const allContent = [
      ...tils.map(setUrlPrefix('til')),
      ...posts.map(setUrlPrefix('blog')),
    ].sort(sortByPublishedDate);

    const rssString = getRssXml(allContent, rssConfig);

    const filePath = writeFile(rssString, locale);

    console.log(`RSS Feed generated: "${filePath}"`);
  }

  function setUrlPrefix(prefix) {
    return (c) => ({ ...c, urlPrefix: prefix });
  }

  function writeFile(rssString, locale) {
    const fileName = locale === 'en' ? 'rss.xml' : 'rss-pt.xml';
    const filePath = path.resolve(__dirname, '../public', fileName);

    fs.writeFileSync(filePath, rssString);

    return filePath;
  }

  function sortByPublishedDate(prevContent, nextContent) {
    return (
      Date.parse(nextContent.publishedAt) - Date.parse(prevContent.publishedAt)
    );
  }
})();

function getRssXml(content, rss) {
  const rssItemsXml = content.map(getRssItem).join('');
  const latestPostDate = humanizeDate(content[0].publishedAt);

  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[${rss.title}]]></title>
        <link>${rss.url}</link>
        <description>
          <![CDATA[${rss.description}]]>
        </description>
        <language>${rss.locale}</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;

  function getRssItem({ publishedAt, urlPrefix, description, slug, title }) {
    const postHref = `${rss.url}/${urlPrefix}/${slug}`;

    return `
          <item>
            <guid>${postHref}</guid>
            <title><![CDATA[${title}]]></title>
            <link>${postHref}</link>
            <pubDate>${humanizeDate(publishedAt)}</pubDate>
            <guid isPermaLink="false">${postHref}</guid>
            
            <description>
            <![CDATA[${description}]]>
            </description>
        </item>`;
  }
}

function getContent(locale) {
  if (!locale) {
    throw new Error('Missing locale');
  }

  const query = `
      query Content($locale: String) {
        rss(locale: $locale) {
          title
          description
        }
        defaultSeo {
          title
          description
        }
        site {
          url
        }
        tils(locale: $locale) {
          slug
          publishedAt
          title
          slug
          description: title
        }
        posts(locale: $locale) {
          slug
          publishedAt: date
          title
          slug
          description
        }
      }
`;

  return fetch(`${API_ENDPOINT}/graphql`, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: {
        locale,
      },
    }),
    headers: { 'Content-Type': 'application/json' },
  }).then(async (r) => {
    const { data } = await r.json();
    return data;
  });
}

function humanizeDate(date) {
  return new Date(date).toUTCString();
}
