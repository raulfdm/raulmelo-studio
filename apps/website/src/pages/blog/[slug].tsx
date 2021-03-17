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
import { MdxRemoteSource } from '@types-app';

type BlogPostPage = BlogPageProps & {
  content: MdxRemoteSource;
};

const BlogPost: React.FC<BlogPostPage> = ({
  content,
  post,
  series,
  translation,
}) => {
  const parsedContent = hydrate(content);

  return (
    <BlogPage post={post} series={series} translation={translation}>
      {parsedContent}
    </BlogPage>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const postData = (await Backend.fetch('posts', {
    params: {
      slug: params.slug,
    },
  })) as PostsApiData;

  const post = head(postData);

  const props: Partial<BlogPostPage> = {
    post,
  };

  if (post.post_serie) {
    const postSerie = (await Backend.fetch('post-series', {
      path: `/${post.post_serie.id}`,
    })) as PostSerieApiData;

    props.series = getRelevantPostSerieData(postSerie);
  }

  if (post.translation) {
    props.translation = getRelevantTranslationData(post);
  }

  props.content = await renderToString(post.content);

  return {
    props,
    revalidate: 1,
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
    fallback: false,
  };
};

export default BlogPost;
