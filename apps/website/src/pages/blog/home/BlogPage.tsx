import { IBlogPagePost } from '@raulmelo/core/dist/types/domains/posts';
import { NextSeo } from 'next-seo';
import { defineMessages, FormattedMessage } from 'react-intl';

import { useLocalization } from '~/hooks/useLocalization';
import { Posts } from '~/pages/home/components/Posts';

const messages = defineMessages({
  latests: {
    id: 'blog.title.latests',
  },
  page: {
    id: 'blog.title.page',
  },
});

type BlogProps = {
  posts: IBlogPagePost[];
};

export const Blog = ({ posts }: BlogProps) => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <NextSeo
        title="Blog"
        description={formatMessage({ id: 'blog.description' })}
      />

      <header className="col-span-full lg:col-span-10">
        <h1 className="text-3xl font-extrabold md:text-4xl">Blog</h1>

        <p className="my-4 col-span-full lg:col-span-10 text-md md:text-lg">
          <FormattedMessage id="blog.description" />
        </p>
      </header>

      <Posts posts={posts} title={formatMessage(messages.latests)} />
    </>
  );
};
