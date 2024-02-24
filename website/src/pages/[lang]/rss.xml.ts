import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { sortPostsByPublishedDate } from '@/infrastructure/api/modules/posts';
import { queryRssData } from '@/infrastructure/api/modules/rss';
import { SupportedLanguages } from '@/infrastructure/config/types/language';
import { sanityClient } from '@/infrastructure/sanity/client';

export const get: APIRoute = async ({ params }) => {
  const { lang } = params as { lang: string };
  const langParseResult = SupportedLanguages.safeParse(lang);

  if (!langParseResult.success) {
    return new Response(null, {
      status: 404,
      statusText: `Not found`,
    });
  }

  const { tils, posts, ...restData } = await queryRssData({
    language: langParseResult.data,
    client: sanityClient,
  });

  const allPosts = sortPostsByPublishedDate([...tils, ...posts]);

  return rss({
    title: restData.title,
    description: restData.description,
    site: restData.siteUrl,
    items: allPosts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.description || post.title,
      link: `/${lang}/${post.urlPrefix}/${post.slug}/`,
    })),
    customData: `<language>${lang}</language>`,
  });
};
