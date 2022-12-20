import { useLocalization } from '$infrastructure/contexts/Localization';
import { AuthorPresentation } from '$ui/screens/home/AuthorPresentation';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import type { SupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import { Link, useLoaderData } from '@remix-run/react';
import type { ISiteData } from '@raulmelo/core/dist/types/domains/siteData';
import { defineMessages } from 'react-intl';
import type { IPostsAndTilsApi } from '@raulmelo/core/dist/types/domains/posts';
import {
  getPathnameWithLocale,
  getPostUrl,
  getTilUrl,
} from '$infrastructure/utils/url';
import type { PostBasicProps } from '$ui/PostBasic';
import { PostBasic } from '$ui/PostBasic';
import { ArrowRightIcon } from '@raulmelo/ui';
import { getParamLocaleOrDefault } from '$infrastructure/utils/i18n';

type LoaderData = {
  siteData: ISiteData;
} & IPostsAndTilsApi;

const messages = defineMessages({
  postsTitle: {
    id: `home.posts.title`,
  },
  postsCheckAll: {
    id: `home.posts.checkAll`,
  },
  tilsTitle: {
    id: `home.tils.title`,
  },
  tilsCheckAll: {
    id: `home.tils.checkAll`,
  },
});

export async function loader({ params }: LoaderArgs) {
  const locale = getParamLocaleOrDefault(params);

  const NUMBER_OF_POSTS = 2;
  const [siteData, { posts, tils }] = await Promise.all([
    domains.siteData.querySiteData(),
    domains.posts.queryPostsAndTils(locale, NUMBER_OF_POSTS),
  ]);

  return json<LoaderData>({
    siteData,
    posts,
    tils,
  });
}

export default function Index() {
  const { siteData, posts, tils } = useLoaderData<LoaderData>();
  const { formatMessage, locale } = useLocalization();

  return (
    <>
      <AuthorPresentation siteData={siteData} />
      <PostSection
        title={formatMessage(messages.postsTitle)}
        posts={posts.map((post) => ({
          ...post,
          publishedAt: post.publishedAt,
          tags: post.tags,
          url: getPostUrl(post.slug, locale),
        }))}
        checkAllLink={{
          href: getPathnameWithLocale(`/blog`, locale),
          text: formatMessage(messages.postsCheckAll),
        }}
      />

      <hr className="mb-8 col-span-full md:col-start-2 md:col-end-6 lg:col-start-3 lg:col-end-10" />
      <PostSection
        title={formatMessage(messages.tilsTitle)}
        posts={tils.map((til) => ({
          ...til,
          url: getTilUrl(til.slug, locale),
        }))}
        checkAllLink={{
          href: getPathnameWithLocale(`/til`, locale),
          text: formatMessage(messages.tilsCheckAll),
        }}
      />
    </>
  );
}

export type PostSectionProps = {
  title: string;
  posts: (PostBasicProps & { _id: string })[];
  checkAllLink: {
    href: string;
    text: string;
  };
};

function PostSection({ checkAllLink, posts, title }: PostSectionProps) {
  return (
    <section className="mb-6 col-span-full">
      <h2 className="mb-4 font-sans text-lg font-extrabold lg:text-xl lg:mb-6">
        {title}
      </h2>
      <ul className="grid grid-cols-1 gap-6 ipad-pro:grid-cols-2">
        {posts.map((post) => {
          return (
            <li key={post._id}>
              <PostBasic
                className="p-6 transition-all bg-white rounded-sm shadow dark:bg-blue-800 hover:shadow-lg dark:hover:bg-blue-700"
                titleClassName="text-xl"
                {...post}
              />
            </li>
          );
        })}
      </ul>
      <Link
        to={checkAllLink.href}
        className="inline-flex mt-6 text-lg underline cursor-pointer text-secondary"
      >
        {checkAllLink.text}
        <ArrowRightIcon className="w-6 ml-2" />
      </Link>
    </section>
  );
}
