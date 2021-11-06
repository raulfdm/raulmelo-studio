import { serializeMdx } from '@config/mdx';
import { GetStaticPaths } from 'next';
import React from 'react';
import { BlogPost, BlogPostPageProps } from '@screens/BlogPost';
import { domains, utils } from '@raulfdm/core';

const BlogPostPage: React.FC<BlogPostPageProps> = (props) => (
  <BlogPost {...props} />
);

type Params = {
  params: {
    slug: string;
  };
  preview?: boolean;
};

export const getStaticProps = async ({ params, preview }: Params) => {
  const post = await domains.posts.queryPostBySlug(params.slug, preview);
  const { isNil, isEmpty } = utils;

  if (isNil(post) || isEmpty(post)) {
    return {
      notFound: true,
    };
  }

  const content = await serializeMdx(post.content);

  return {
    props: {
      post,
      content,
      preview: Boolean(preview),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await domains.posts.queryPosts('all');

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
    locale: post.locale,
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default BlogPostPage;
