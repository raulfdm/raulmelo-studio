import rss from '@astrojs/rss';
import { supportedLanguagesSchema } from '@raulmelo/core/config';
import { queryRssData, sortPostsByPublishedDate } from '@raulmelo/core/domains';
import { type APIRoute } from 'astro';

export const get: APIRoute = async ({ params }) => {
  const { lang } = params as { lang: string };
  const langParseResult = supportedLanguagesSchema.safeParse(lang);

  if (!langParseResult.success) {
    return new Response(null, {
      status: 404,
      statusText: `Not found`,
    });
  }

  const { tils, posts, ...restData } = await queryRssData(lang);

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
