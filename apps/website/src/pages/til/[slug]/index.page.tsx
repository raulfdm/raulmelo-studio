import { domains, utils } from '@raulmelo/core';
import type { QueryTilsReturnType } from '@raulmelo/core/dist/types/domains/posts/queryTils';
import type { GetStaticPaths } from 'next';

import { PortableTextPost } from '~/components/PortableTextPost';

const { isEmpty, isNil } = utils;

type Til = QueryTilsReturnType[number];

type Props = {
  til: Til;
  estimatedReadingTime: number;
};

const TilPostPage = ({ til, estimatedReadingTime }: Props) => {
  return (
    <PortableTextPost {...til} estimatedReadingTime={estimatedReadingTime} />
  );
};

type Params = {
  params: {
    slug: string;
  };
  preview?: boolean;
};

export const getStaticProps = async ({ params }: Params) => {
  const til = await domains.posts.queryTilBySlug(params.slug);

  // https://github.com/vercel/next.js/issues/16681#issuecomment-792314687
  if (isNil(til) || isEmpty(til)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      til,
      estimatedReadingTime: utils.content.getEstimatedReadingTime(til.content),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tils = await domains.posts.queryTils('all');

  return {
    paths: tils.map(generatePath),
    fallback: 'blocking',
  };

  function generatePath(til: Til) {
    return {
      params: {
        slug: til.slug,
      },
      locale: til.language,
    };
  }
};

export default TilPostPage;
