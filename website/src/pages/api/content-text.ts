import { queryPostBySlug, queryTilBySlug } from '@raulmelo/core/domains';
import { contentBlockToRawText } from '@raulmelo/core/utils';
import type { APIRoute } from 'astro';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { serverEnv } from '@/infrastructure/env/server';
import { sanityClient } from '@/infrastructure/sanity/client';

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

  if (authorization !== serverEnv.API_TOKEN) {
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
        error: fromZodError(result.error).message,
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
    textContent = await contentBlockToRawText(post.content);
  } else if (til) {
    textContent = await contentBlockToRawText(til.content);
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
