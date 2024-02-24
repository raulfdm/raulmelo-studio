#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';
import {
  queryRssData,
  type QueryRssDataReturnType,
} from '@/infrastructure/api/modules/rss';
import { sanityClient } from '@/infrastructure/sanity/client';
import { sortPostsByPublishedDate } from '@/infrastructure/api/modules/posts';
import type { SupportedLanguages } from '@/infrastructure/config/types/language';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type IRssConfig = Omit<QueryRssDataReturnType, 'posts' | 'tils'>;

const outdir = path.resolve(__dirname, '../public');

for await (const language of ['en', 'pt'] as const) {
  const { tils, posts, ...restData } = await queryRssData({
    language,
    client: sanityClient,
  });

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

function getRssXml(content: QueryRssDataReturnType['posts'], rss: IRssConfig) {
  if (!content) {
    throw new Error('No content to generate RSS feed.');
  }

  const rssItemsXml = content.map(getRssItem).join('');

  if (content.length === 0) {
    throw new Error('No content to generate RSS feed');
  }

  const latestPostDate = humanizeDate(content[0]!.publishedAt);

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

  /* TODO: TEST THIS */
  function getRssItem({
    publishedAt,
    urlPrefix,
    description,
    slug,
    title,
  }: QueryRssDataReturnType['posts'][number]) {
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
