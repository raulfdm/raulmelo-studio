#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const URL = process.env.API_ENDPOINT ?? 'http://localhost:1337';

if (URL.includes('localhost')) {
  console.log('Getting data from Localhost');
}

const query = `
query Content {
  personalInformation {
    full_name
  }
  defaultSeo {
    title
    description
  }
  site {
    url
  }
  tils(locale: "en") {
    slug
    publishedAt
    title
    slug
    description: title
  }
  posts(locale: "en") {
    slug
    publishedAt: createdAt
    title
    slug
    description
  }
}
`;

fetch(`${URL}/graphql`, {
  method: 'POST',
  body: JSON.stringify({ query }),
  headers: { 'Content-Type': 'application/json' },
})
  .then((r) => r.json())
  .then(({ data: { tils, posts, personalInformation, site } }) => {
    console.log(personalInformation);
    const content = [
      ...tils.map((t) => ({
        ...t,
        category: 'Today I learned',
        urlPrefix: 'til',
      })),
      ...posts.map((b) => ({ ...b, category: 'Post', urlPrefix: 'blog' })),
    ].sort(sortByPublishedDate);

    return getRssXml(content, site.url);
  })
  .then(async (rssString) => {
    fs.writeFileSync(path.resolve(__dirname, '../public/rss.xml'), rssString);
    console.log('all good :)');
  });

function sortByPublishedDate(prevContent, nextContent) {
  return (
    Date.parse(nextContent.publishedAt) - Date.parse(prevContent.publishedAt)
  );
}

function getRssXml(content, url) {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(content);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[Raul Melo RSS Feed]]></title>
        <link>${url}</link>
        <description>
          <![CDATA[A description about your own website that really shows off what it's all about]]>
        </description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
}

function blogPostsRssXml(content) {
  let latestPostDate = '';
  let rssItemsXml = '';

  content.forEach(
    ({ publishedAt, urlPrefix, category, description, slug, title }) => {
      const postDate = Date.parse(publishedAt);

      //   // Remember to change this URL to your own!
      const postHref = `${URL}/${urlPrefix}/${slug}`;

      if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
        latestPostDate = publishedAt;
      }

      rssItemsXml += `
        <item>
          <guid>${postHref}</guid>
          <title><![CDATA[${title}]]></title>
          <link>${postHref}</link>
          <pubDate>${new Date(publishedAt).toUTCString()}</pubDate>
          <guid isPermaLink="false">${postHref}</guid>
          <category>${category}</category>
          <description>
          <![CDATA[${description}]]>
          </description>
          <content:encode>
          <div style="width: 100%; margin: 0 auto; max-width: 800px; padding: 40px 40px;">
            <p>
              I've posted a new article <em>"Don't Solve Problems, Eliminate Them"</em> and you can <a href="https://kentcdodds.com/blog/don-t-solve-problems-eliminate-them">read it online</a>.
              <br>
              How eliminating problems can drastically simplify your codebases and life

              <br>
              You can also <a href="https://kentcdodds.com/subscribe">subscribe</a> for weekly emails on what I'm learning, working on, and writing about.
            </p>
          </div>
          </content:encode>
      </item>`;
    },
  );

  return {
    rssItemsXml,
    latestPostDate: new Date(latestPostDate).toUTCString(),
  };
}
