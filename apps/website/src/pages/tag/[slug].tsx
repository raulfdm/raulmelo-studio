import { TagPage } from '@screens/Tag/TagPage';
import {
  TagPageParams,
  TagPageProps,
  TagPageQueryGraphQLResponse,
  TagPageStaticPathQuery,
} from '@screens/Tag/types';
import { Backend } from '@services/Backend';
import { SupportedLanguages } from '@types-app';
import { head } from '@utils/ramda';
import { GetStaticPaths } from 'next';
import React from 'react';

const Tag = (props: TagPageProps) => <TagPage {...props} />;

export const getStaticProps = async ({ params, locale }: TagPageParams) => {
  const query = `
  query TagPage {
    postTags(where: { slug: "${params.slug}" }) {
      id
      slug
      name
      blog_posts(sort: "date:desc", where: { locale: "${locale}" }) {
        id
        language: locale
        slug
        date
        title
        subtitle
        description
        featured_image {
          url
          height
          width
        }
        post_tags {
          slug
          id
          name
        }
      }
    }
  }
  `;

  const { postTags } = await Backend.graphql<TagPageQueryGraphQLResponse>(
    query,
  );

  const tag = head(postTags);

  return {
    props: {
      tag,
    } as TagPageProps,
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { postTags } = await Backend.graphql<TagPageStaticPathQuery>(`
  query {
    postTags {
      slug
    }
  }
  `);

  const paths: TagPageParams[] = [];

  /**
   * Without this generation, when I'm in `/tag/css` for instance
   * and want to access `/pt/tag/css`, it'll redirect to a 404 page.
   *
   * If I switch "fallback" to true, the problem will be fixed only locally
   * or running in server (not in serverless) and it'll also leads in the first
   * render of TagPage having "tag" prop as undefined.
   *
   * In this way I generate the same page for both lang and I don't have to do
   * any workaround.
   */

  ['en', 'pt'].forEach((lang) => {
    postTags.forEach((tag) => {
      paths.push({
        params: {
          slug: tag.slug,
        },
        locale: lang as SupportedLanguages,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export default Tag;
