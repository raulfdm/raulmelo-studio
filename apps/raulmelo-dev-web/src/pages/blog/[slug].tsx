import React from 'react';
import { GetStaticPaths } from 'next';

import { renderToString, hydrate } from '@config/mdx';
import { Backend } from '@services/Backend';
import { PostsApiData } from 'src/types/api/posts';
import { head } from '@utils/utilities';
import { BlogPage, BlogPageProps } from '@screens/Blog/BlogPage';
import { getRelevantPostSerieData } from '@screens/Blog/utils/series';
import { PostSerieApiData } from '@types-api';
import { getRelevantTranslationData } from '@screens/Blog/utils/translations';

const BlogPost: React.FC<BlogPageProps> = ({
  content,
  post,
  series,
  translation,
}) => {
  /**
   * For some reason, some times the first load happens
   * with "mdx" property as undefined. By having that, the hydrate fn
   * will throw an error because it expects an object.
   *
   * The way I found to mitigate that is checking if "mdx" is present
   * and only than follow the natural flow.
   */
  if (!content) {
    return null;
  }

  const parsedContent = hydrate(content);

  return (
    <BlogPage
      content={parsedContent}
      post={post}
      series={series}
      translation={translation}
    />
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const postData = (await Backend.fetch(
    'posts',
    `?slug=${params.slug}`,
  )) as PostsApiData;

  const post = head(postData);

  const props: Partial<BlogPageProps> = {
    post,
  };

  if (post.post_serie) {
    const postSerie = (await Backend.fetch(
      'post-series',
      `/${post.post_serie.id}`,
    )) as PostSerieApiData;

    props.series = getRelevantPostSerieData(postSerie);
  }

  if (post.translation) {
    props.translation = getRelevantTranslationData(post);
  }

  props.content = await renderToString(post.content);

  return {
    props,
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await Backend.fetch('posts')) as PostsApiData;

  const paths = posts.map((post) => ({
    params: {
      slug: post['slug'],
    },
    locale: post.language,
  }));

  return {
    paths,
    fallback: true,
  };
};

export default BlogPost;
