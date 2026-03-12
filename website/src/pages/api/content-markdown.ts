import type { APIRoute } from 'astro';
import { z } from 'zod/v4';

import {
  queryPostBySlug,
  queryTilBySlug,
} from '@/infrastructure/api/modules/posts';
import { sanityClient } from '@/infrastructure/sanity/client';
import { contentBlockToMarkdown } from '@/infrastructure/utils/contentBlockToMarkdown';
import { config } from '@/infrastructure/config/server';

const ContentSchema = z.object({
  slug: z.string(),
});

export const POST: APIRoute = async function POST({ request }) {
  const authorization = request.headers.get(`authorization`);

  if (!authorization) {
    return new Response(
      JSON.stringify({
        error: `Unauthorized`,
      }),
      { status: 401 },
    );
  }

  if (authorization !== config.site.apiToken) {
    return new Response(
      JSON.stringify({
        error: `Unauthorized`,
      }),
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => {
    return new Response(
      JSON.stringify({
        error: `Invalid body`,
      }),
      { status: 400 },
    );
  });

  if (body instanceof Response) {
    return body;
  }

  const result = ContentSchema.safeParse(body);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: z.formatError(result.error),
      }),
      { status: 400 },
    );
  }

  const { slug } = result.data;

  let textContent = ``;

  const [post, til] = await Promise.all([
    queryPostBySlug({ slug, client: sanityClient, preview: true }),
    queryTilBySlug({ slug, client: sanityClient, preview: true }),
  ]);

  if (post) {
    textContent = await contentBlockToMarkdown(post.content, { sanityClient });
  } else if (til) {
    textContent = await contentBlockToMarkdown(til.content, { sanityClient });
  } else {
    return new Response(
      JSON.stringify({
        error: `Not found`,
      }),
      { status: 404 },
    );
  }

  return new Response(textContent);
};
