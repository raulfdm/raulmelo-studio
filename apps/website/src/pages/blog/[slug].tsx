import { hydrate, renderToString } from '@config/mdx';
import { Backend, graphqlVariables } from '@services/Backend';
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

const BlogPostPage: React.FC<BlogPostPageProps> = ({
  content,
  post,
  preview,
}) => {
  const parsedContent = hydrate(content);

  return (
    <BlogPost post={post} preview={preview}>
      {parsedContent}
    </BlogPost>
  );
};

type Params = {
  params: {
    slug: string;
  };
  preview?: boolean;
};

export const getStaticProps = async ({ params, preview }: Params) => {
  const post = await fetchPostBySlug(params.slug, preview);
  const content = await renderToString(post.content);

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

async function fetchPostBySlug(
  slug: string,
  preview = false,
): Promise<BlogPostPost> {
  /**
   * I cannot use `post` schema to fetch this data.
   * The reason is within `post`, I only can filter by post id and I need to
   * fetch by post slug
   */
  const query = `
  query BlogPost($where: JSON) {
    posts(where: $where, locale: "all") {
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
  `;

  const apiJsonResponse = await Backend.graphql<BlogPostGraphQLResponse>(
    query,
    {
      where: {
        ...(preview ? graphqlVariables.preview : {}),
        slug,
      },
    },
  );

  const postHead = head(apiJsonResponse.posts);

  return postHead;
}

export default BlogPostPage;
