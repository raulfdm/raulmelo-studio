import type { SupportedLanguages } from '@raulmelo/core/config';
import {
  queryAllTags,
  queryTagBySlug,
  sortPostsByPublishedDate,
} from '@raulmelo/core/domains';
import type { GetStaticPaths } from 'next';

import { TagPage } from './TagPage';
import type { TagPageParams, TagPageProps } from './types';

const Tag = (props: TagPageProps) => <TagPage {...props} />;

export const getStaticProps = async ({ params, locale }: TagPageParams) => {
  const tag = await queryTagBySlug(params.slug, locale);

  const content = sortPostsByPublishedDate([...tag.posts, ...tag.tils]);

  return {
    props: {
      tag,
      content,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postTags = await queryAllTags();

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
  const allSupportedLanguages: SupportedLanguages[] = ['en', 'pt'];

  for (const lang of allSupportedLanguages) {
    for (const tag of postTags) {
      paths.push({
        params: {
          slug: tag.slug,
        },
        locale: lang,
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export default Tag;
