import * as fs from 'fs';
import { gql } from 'graphql-request';
import * as path from 'path';
import { SupportedLanguages } from 'src';
import { sortPostsByPublishedDate } from 'src/domains/posts';

import { client } from '~config';

const LOCALES_TO_GEN_RSS: SupportedLanguages[] = ['en', 'pt'];

const query = gql`
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

export async function generateRssFeed(config: IConfig): Promise<void> {
  const { apiEndpoint, outdir } = config;

  if (apiEndpoint) {
    client.setEndpoint(`${apiEndpoint}/graphql`);
  }

  if (apiEndpoint.includes('localhost')) {
    console.log('Atention: Getting data from Localhost');
  }

  for await (const locale of LOCALES_TO_GEN_RSS) {
    const { tils, posts, site, rss } = await client.request<IQueryResponse>(
      query,
      {
        locale,
      },
    );

    const rssConfig = {
      ...rss,
      url: site.url,
      locale,
    };

    const allContent = sortPostsByPublishedDate([
      ...tils.map(setUrlPrefix('til')),
      ...posts.map(setUrlPrefix('blog')),
    ]);

    const rssContent = getRssXml(allContent, rssConfig);

    const filePath = writeFile({ locale, outdir, rssContent });

    console.log(`RSS Feed generated: "${filePath}"`);
  }

  function setUrlPrefix(prefix: 'til' | 'blog') {
    return (content: Content) => ({ ...content, urlPrefix: prefix });
  }

  function writeFile({
    rssContent,
    locale,
    outdir,
  }: {
    rssContent: string;
    locale: SupportedLanguages;
    outdir: string;
  }) {
    const fileName = locale === 'en' ? 'rss.xml' : 'rss-pt.xml';
    const filePath = path.resolve(outdir, fileName);

    fs.writeFileSync(filePath, rssContent);

    return filePath;
  }
}

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

function humanizeDate(date) {
  return new Date(date).toUTCString();
}

interface IConfig {
  outdir: string;
  apiEndpoint?: string;
}

interface IQueryResponse {
  rss: DefaultSEO;
  defaultSeo: DefaultSEO;
  site: Site;
  tils: Content[];
  posts: Content[];
}

interface DefaultSEO {
  title: string;
  description: string;
}

interface Content {
  slug: string;
  publishedAt: string;
  title: string;
  description: string;
}

interface Site {
  url: string;
}
