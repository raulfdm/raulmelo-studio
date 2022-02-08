import { domains, utils } from '@raulmelo/core';
import { ITilsTil } from '@raulmelo/core/dist/types/domains/posts/queryTils/types';
import { GetStaticPaths } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { MdxPostTemplate } from '~/components/MdxPost';
import { serializeMdx } from '~/config/mdx';

import { ITilPostParsed } from './types';

const { isEmpty, isNil } = utils;

type Props = {
  til: ITilPostParsed;
  preview: boolean;
  content: MDXRemoteSerializeResult;
};

const TilPostPage = ({ til, preview, content }: Props) => {
  return (
    <MdxPostTemplate
      content={content}
      title={til.title}
      description={til.title}
      publishedAt={til.publishedAt}
      tags={til.tags}
      preview={preview}
    />
  );
};

type Params = {
  params: {
    slug: string;
  };
  preview?: boolean;
};

export const getStaticProps = async ({ params, preview }: Params) => {
  const til = await domains.posts.queryTilBySlug(params.slug, preview);

  // https://github.com/vercel/next.js/issues/16681#issuecomment-792314687
  if (isNil(til) || isEmpty(til)) {
    return {
      notFound: true,
    };
  }

  const content = await serializeMdx(til.content);

  return {
    props: {
      til,
      content,
      // TODO: add a banner for "preview mode"
      preview: Boolean(preview),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tils = await domains.posts.queryTils('all');

  return {
    paths: tils.map(generatePath),
    fallback: 'blocking',
  };

  function generatePath(til: ITilsTil) {
    return {
      params: {
        slug: til.slug,
      },
      locale: til.language,
    };
  }
};

export default TilPostPage;
