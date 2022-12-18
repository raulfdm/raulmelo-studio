import * as fs from 'fs';
import * as path from 'path';

import type { SupportedLanguages } from '$config/languages';
import { domains } from '$domains';
import { sortPostsByPublishedDate } from '$domains/posts';
import type { Rss, RssDataPost } from '$domains/rss';

type IRssConfig = Omit<Rss, 'posts' | 'tils'>;

interface IConfig {
  outdir: string;
}

export async function generateRssFeed(config: IConfig): Promise<void> {
  const { outdir } = config;

  for await (const language of ['en', 'pt'] as const) {
    const { tils, posts, ...restData } = await domains.rss.queryRssData(
      language,
    );

    const rssConfig: IRssConfig = {
      ...restData,
      language,
    };

    const allContent = sortPostsByPublishedDate([...tils, ...posts]);

    const rssContent = getRssXml(allContent, rssConfig);

    const filePath = writeFile({ language, outdir, rssContent });

    console.log(`RSS Feed generated: "${filePath}"`);
  }

  function writeFile({
    rssContent,
    language,
    outdir,
  }: {
    rssContent: string;
    language: SupportedLanguages;
    outdir: string;
  }) {
    const fileName = language === 'en' ? 'rss.xml' : 'rss-pt.xml';
    const filePath = path.resolve(outdir, fileName);

    fs.writeFileSync(filePath, rssContent);

    return filePath;
  }
}

function getRssXml(content: RssDataPost[], rss: IRssConfig) {
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
        <link>${rss.siteUrl}</link>
        <description>
          <![CDATA[${rss.description}]]>
        </description>
        <language>${rss.language}</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;

  function getRssItem({
    publishedAt,
    urlPrefix,
    description,
    slug,
    title,
  }: RssDataPost) {
    const postHref = `${rss.siteUrl}/${urlPrefix}/${slug}`;

    return `
          <item>
            <guid>${postHref}</guid>
            <title><![CDATA[${title}]]></title>
            <link>${postHref}</link>
            <pubDate>${humanizeDate(publishedAt)}</pubDate>
            <guid isPermaLink="false">${postHref}</guid>
            
            <description>
            <![CDATA[${description ?? title}]]>
            </description>
        </item>`;
  }
}

function humanizeDate(date: string) {
  return new Date(date).toUTCString();
}
