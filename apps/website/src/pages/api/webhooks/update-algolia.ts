import { queryAlgoliaData } from '@raulmelo/core/domains';
import algolia from 'algoliasearch';
import type { APIRoute } from 'astro';

import { getClientEnv } from '@/infrastructure/env/client';
import { getServerEnv } from '@/infrastructure/env/server';
import { getSanityClient } from '@/infrastructure/sanity/client';

export const POST: APIRoute = async function POST({ request }) {
  const serverEnv = getServerEnv();
  const clientEnv = getClientEnv();

  const algoliaClient = algolia(
    clientEnv.PUBLIC_ALGOLIA_APP_ID,
    serverEnv.ALGOLIA_ADMIN_KEY,
  );

  try {
    const authorization = request.headers.get(`authorization`);

    if (!authorization) {
      throw new Error(`Authorization code is required`);
    }

    if (authorization !== serverEnv.API_TOKEN) {
      throw new Error(`Unauthorized`);
    }

    const algoliaData = await queryAlgoliaData({ client: getSanityClient() });
    const index = algoliaClient.initIndex(clientEnv.PUBLIC_ALGOLIA_INDEX_NAME);
    await index.saveObjects(algoliaData);

    console.log(`Algolia data updated`);

    return send({
      message: `success`,
      date: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Something went wrong while updating the indexes:`, error);

    if (error instanceof Error) {
      if (error.message.includes(`Authorization code is required`)) {
        return send(
          {
            message: `Authorization code is required`,
          },
          {
            status: 400,
          },
        );
      }

      if (error.message.includes(`Unauthorized`)) {
        return send(
          {
            message: `Unauthorized`,
          },
          {
            status: 401,
          },
        );
      }
    }

    return send({
      message: `Something went wrong`,
    });
  }
};

function send<T extends object>(body: T, init?: ResponseInit) {
  return new Response(JSON.stringify(body), init);
}
