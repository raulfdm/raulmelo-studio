import { appConfig } from '$infrastructure/config/index.server';
import { queryAlgoliaData } from '@raulmelo/core/domains';
import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import algolia from 'algoliasearch';
import invariant from 'tiny-invariant';

invariant(
  process.env.PRIVATE_ADMIN_PASSWORD,
  `PRIVATE_ADMIN_PASSWORD is required`,
);

export function loader() {
  return json({ message: `Not allowed` });
}

const client = algolia(appConfig.search.appId, appConfig.search.adminApiKey);

export async function action({ request }: ActionArgs) {
  try {
    const { authorization } = (await request.json()) as {
      authorization?: string;
    };

    if (!authorization) {
      throw new Error(`Authorization code is required`);
    }

    if (authorization !== process.env.PRIVATE_ADMIN_PASSWORD) {
      throw new Error(`Unauthorized`);
    }

    const algoliaData = await queryAlgoliaData();

    const index = client.initIndex(appConfig.search.indexName);

    await index.saveObjects(algoliaData);

    return json({
      message: `Success`,
      date: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return new Response(`Invalid body`, { status: 400 });
    }

    if (
      error instanceof Error &&
      error.message.includes(`Authorization code is required`)
    ) {
      return new Response(error.message, { status: 400 });
    }

    if (error instanceof Error && error.message.includes(`Unauthorized`)) {
      return new Response(error.message, { status: 401 });
    }

    console.error(error);

    return new Response(`Something went wrong`, { status: 500 });
  }
}
