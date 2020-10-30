import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';

import { hydrate, renderToString } from '@config/mdx';
import { Backend } from '@services/Backend';
import { PostApi, PostsApi } from 'src/types/api/posts';

const BlogPost = (props) => {
  console.log(props);
  // const router = useRouter();
  // const { locale, locales, defaultLocale } = router;
  // console.log({ locale, locales, defaultLocale });
  return <div>post</div>;
};

export const getStaticProps = async ({ params }) => {
  const post = (await Backend.fetch(
    'posts',
    `?slug=${params.slug}`,
  )) as PostApi;

  const mdxSource = await renderToString(post.content);

  console.log(post);
  return {
    props: {
      content: mdxSource,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await Backend.fetch('posts')) as PostsApi;

  const paths = posts.map((post) => ({
    params: {
      slug: post['slug'],
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default BlogPost;
