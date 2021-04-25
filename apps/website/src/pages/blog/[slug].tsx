import { hydrate, renderToString } from '@config/mdx';
import { Backend } from '@services/Backend';
import { SupportedLanguages } from '@types-app';
import { head } from '@utils/utilities';
import { GetStaticPaths } from 'next';
import React from 'react';
import {
  BlogPost,
  BlogPostGraphQLResponse,
  BlogPostPageProps,
  BlogPostPost,
} from '@screens/BlogPost';

const BlogPostPage: React.FC<BlogPostPageProps> = ({ content, post }) => {
  const parsedContent = hydrate(content);

  return <BlogPost post={post}>{parsedContent}</BlogPost>;
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
  type ResponseType = {
    posts: { slug: string; locale: SupportedLanguages }[];
  };

  const { posts } = await Backend.graphql<ResponseType>(`
  query {
    posts(locale: "all") {
      slug
      locale
    }
  }
  `);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
    locale: post.locale,
  }));

  return {
    paths,
    fallback: false,
  };
};

async function fetchPostBySlug(slug: string): Promise<BlogPostPost> {
  /**
   * I cannot use `post` schema to fetch this data.
   * The reason is within `post`, I only can filter by post id and I need to
   * fetch by post slug
   */
  const apiJsonResponse = await Backend.graphql<BlogPostGraphQLResponse>(`
  query BlogPost {
    posts(where: { slug: "${slug}" }, locale: "all") {
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
        posts: blog_posts(sort: "date:asc") {
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

export default BlogPostPage;
