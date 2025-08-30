import { algoliasearch } from 'algoliasearch';
import type { APIRoute } from 'astro';

import { queryAlgoliaData } from '@/infrastructure/api/modules/algolia';
import { sanityClient } from '@/infrastructure/sanity/client';
import { config } from '@/infrastructure/config/server';

const algoliaClient = algoliasearch(
  config.algolia.appId,
  config.algolia.adminKey,
);

export const POST: APIRoute = async function POST({ request }) {
  try {
    const authorization = request.headers.get(`authorization`);

    if (!authorization) {
      throw new Error(`Authorization code is required`);
    }

    if (authorization !== config.site.apiToken) {
      throw new Error(`Unauthorized`);
    }

    const algoliaData = await queryAlgoliaData({ client: sanityClient });

    algoliaClient.saveObjects({
      indexName: config.algolia.indexName,
      objects: algoliaData as never,
    });

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
