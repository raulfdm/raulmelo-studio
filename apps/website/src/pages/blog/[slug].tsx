import { hydrate, renderToString } from '@config/mdx';
import { BlogPage } from '@screens/Blog/BlogPage';
import {
  BlogPostGraphQL,
  BlogPostGraphQLResponse,
  BlogPostPage,
} from '@screens/Blog/types';
import { Backend } from '@services/Backend';
import { head } from '@utils/utilities';
import { GetStaticPaths } from 'next';
import React from 'react';
import { PostsApiData } from 'src/types/api/posts';

const BlogPost: React.FC<BlogPostPage> = ({ content, post }) => {
  const parsedContent = hydrate(content);

  return <BlogPage post={post}>{parsedContent}</BlogPage>;
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const post = await fetchPostBySlug(params.slug);
  const content = await renderToString(post.content);

  return {
    props: {
      post,
      content,
    },
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

async function fetchPostBySlug(slug: string): Promise<BlogPostGraphQL> {
  /**
   * I cannot use `post` schema to fetch this data.
   * The reason is within `post`, I only can filter by post id and I need to
   * fetch by post slug
   */
  const apiJsonResponse = await Backend.graphql<BlogPostGraphQLResponse>(`
  query {
    posts(where: { slug: "${slug}" }) {
      id
      title
      subtitle
      description
      date
      slug
      unsplash {
        authorName
        url
      }
      content
      translation {
        id
        language
        slug
      }
      featured_image {
        url
        width
        height
      }
      featured_image_caption
      post_tags {
        id
        slug
        name
      }
      series: post_serie {
        name
        posts: blog_posts (sort:"date:asc"){
          id
          copy: serie_copy
          uri: slug
          date
        }
      }
    }
  }
  `);

  const postHead = head(apiJsonResponse.posts);

  return postHead;
}
