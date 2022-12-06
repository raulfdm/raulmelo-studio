import { PortableTextPost } from '$ui/PortableTextPost';
import { domains, utils } from '@raulmelo/core';
import type { ITilsTil } from '@raulmelo/core/dist/types/domains/posts/queryTils/types';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

type LoaderData = {
  til: ITilsTil;
  estimatedReadingTime: number;
};

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, `slug is required`);
  invariant(params.locale, `locale is required`);

  const til = await domains.posts.queryTilBySlug(params.slug, false);

  if (utils.isNil(til) || utils.isEmpty(til)) {
    throw new Response(`Not Found`, {
      status: 404,
    });
  }

  return json<LoaderData>({
    til,
    estimatedReadingTime: utils.content.getEstimatedReadingTime(til.content),
  });
}

export default function TilPostRoute() {
  const { til, estimatedReadingTime } = useLoaderData() as LoaderData;

  return (
    <PortableTextPost {...til} estimatedReadingTime={estimatedReadingTime} />
  );
}
