import { queryAlgoliaData } from '@raulmelo/core/domains';
import algolia from 'algoliasearch';
import type { APIRoute } from 'astro';

import { clientEnv } from '@/infrastructure/env/client';
import { serverEnv } from '@/infrastructure/env/server';
import { sanityClient } from '@/infrastructure/sanity/client';

const algoliaClient = algolia(
  clientEnv.PUBLIC_ALGOLIA_APP_ID,
  serverEnv.ALGOLIA_ADMIN_KEY,
);

export const post: APIRoute = async function post({ request }) {
  try {
    const authorization = request.headers.get(`authorization`);

    if (!authorization) {
      throw new Error(`Authorization code is required`);
    }

    if (authorization !== serverEnv.ALGOLIA_ADMIN_KEY) {
      throw new Error(`Unauthorized`);
    }

    const algoliaData = await queryAlgoliaData({ client: sanityClient });
    const index = algoliaClient.initIndex(clientEnv.PUBLIC_ALGOLIA_INDEX_NAME);
    await index.saveObjects(algoliaData);

    console.log(`Algolia data updated`);

    return {
      body: JSON.stringify({
        message: `success`,
        date: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error(`Something went wrong while updating the indexes:`, error);

    if (error instanceof Error) {
      if (error.message.includes(`Authorization code is required`)) {
        return {
          body: JSON.stringify({
            message: `Authorization code is required`,
          }),
          status: 400,
        };
      }

      if (error.message.includes(`Unauthorized`)) {
        return {
          body: JSON.stringify({
            message: `Unauthorized`,
          }),
          status: 401,
        };
      }
    }

    return {
      body: JSON.stringify({
        message: `Something went wrong`,
      }),
    };
  }
};
