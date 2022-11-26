import { useLocalization } from '$infrastructure/contexts/Localization';
import { Posts } from '$ui/screens/home/Posts';
import type { SupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { IBlogPagePost } from '@raulmelo/core/dist/types/domains/posts';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

// import { NextSeo } from 'next-seo';
import { defineMessages, FormattedMessage } from 'react-intl';

type LoaderData = {
  posts: IBlogPagePost[];
};

const messages = defineMessages({
  latests: {
    id: 'blog.title.latests',
  },
  page: {
    id: 'blog.title.page',
  },
});

export async function loader({ params }: LoaderArgs) {
  const locale = params.locale as SupportedLanguages;
  const posts = await domains.posts.queryPosts(locale as SupportedLanguages);

  return json<LoaderData>({ posts });
}

export default function BlogHomeRoute() {
  const { formatMessage } = useLocalization();
  const { posts } = useLoaderData<LoaderData>();

  return (
    <>
      {/* <NextSeo
        title="Blog"
        description={formatMessage({ id: 'blog.description' })}
      /> */}

      <header className="col-span-full lg:col-span-10">
        <h1 className="text-3xl font-extrabold md:text-4xl">Blog</h1>

        <p className="my-4 col-span-full lg:col-span-10 text-md md:text-lg">
          <FormattedMessage id="blog.description" />
        </p>
      </header>

      <Posts posts={posts as any} title={formatMessage(messages.latests)} />
    </>
  );
}
