import {
  queryTilBySlug,
  queryTils,
  type QueryTilsReturnType,
} from '@raulmelo/core/domains';
import { getEstimatedReadingTime, isEmpty, isNil } from '@raulmelo/core/utils';
import type { GetStaticPaths } from 'next';

import { PortableTextPost } from '~/components/PortableTextPost';

type Til = QueryTilsReturnType[0];
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
  const til = await queryTilBySlug(params.slug);

  // https://github.com/vercel/next.js/issues/16681#issuecomment-792314687
  if (isNil(til) || isEmpty(til)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      til,
      estimatedReadingTime: getEstimatedReadingTime(til.content),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tils = await queryTils('all');

  return {
    paths: tils.map(function generatePath(til) {
      return {
        params: {
          slug: til.slug,
        },
        locale: til.language,
      };
    }),
    fallback: 'blocking',
  };
};

export default TilPostPage;
