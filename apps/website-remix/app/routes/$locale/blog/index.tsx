import { useLocalization } from '$infrastructure/contexts/Localization';
import type { FlatMessages } from '$infrastructure/i18n/getLocales.server';
import { getLocales } from '$infrastructure/i18n/getLocales.server';
import { getSEOTags } from '$infrastructure/utils/seo';
import { Posts } from '$ui/screens/home/Posts';
import type { SupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { IBlogPagePost } from '@raulmelo/core/dist/types/domains/posts';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { defineMessages, FormattedMessage } from 'react-intl';
import invariant from 'tiny-invariant';

type LoaderData = {
  posts: IBlogPagePost[];
  messages: FlatMessages;
};

const messages = defineMessages({
  latests: {
    id: `blog.title.latests`,
  },
  page: {
    id: `blog.title.page`,
  },
});

export const meta: MetaFunction = ({ data }) => {
  const { messages } = data as LoaderData;

  return getSEOTags({
    title: `Raul Melo - Blog`,
    description: messages[`blog.description`],
    type: `website`,
  });
};

export async function loader({ params }: LoaderArgs) {
  invariant(params.locale, `Locale is required`);

  const [posts, messages] = await Promise.all([
    domains.posts.queryPosts(params.locale as SupportedLanguages),
    getLocales(params.locale),
  ]);

  return json<LoaderData>({ posts, messages });
}

export default function BlogHomeRoute() {
  const { formatMessage } = useLocalization();
  const { posts } = useLoaderData<LoaderData>();

  return (
    <>
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
