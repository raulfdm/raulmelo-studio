import type { QueryPostsAndTilsReturnType } from '@raulmelo/core/domains';
import { ArrowRightIcon } from '@raulmelo/ui';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { defineMessages } from 'react-intl';

import { PostBasic } from '~/components/PostBasic';
import { useLocalization } from '~/hooks/useLocalization';
import { getTilUrl } from '~/pages/til/home/utils';
import siteData from '~/site-data';
import { getPostUrl } from '~/utils/url';

import { AuthorPresentation } from './components/AuthorPresentation';
import type { PostSectionProps } from './types';

const messages = defineMessages({
  postsTitle: {
    id: 'home.posts.title',
  },
  postsCheckAll: {
    id: 'home.posts.checkAll',
  },
  tilsTitle: {
    id: 'home.tils.title',
  },
  tilsCheckAll: {
    id: 'home.tils.checkAll',
  },
});

export const HomePage = ({ posts, tils }: QueryPostsAndTilsReturnType) => {
  const { formatMessage, locale } = useLocalization();
  const defaultSeo = siteData.defaultSeo[locale];

  return (
    <>
      <NextSeo
        titleTemplate="%s"
        title={`${siteData.personalInformation.fullName} · ${defaultSeo.title}`}
      />

      <AuthorPresentation />
      <PostSection
        title={formatMessage(messages.postsTitle)}
        posts={posts.map((post) => ({
          ...post,
          publishedAt: post.publishedAt,
          tags: post.tags,
          url: getPostUrl(post.slug),
        }))}
        checkAllLink={{
          href: '/blog',
          text: formatMessage(messages.postsCheckAll),
        }}
      />

      <hr className="mb-8 col-span-full md:col-start-2 md:col-end-6 lg:col-start-3 lg:col-end-10" />
      <PostSection
        title={formatMessage(messages.tilsTitle)}
        posts={tils.map((til) => ({
          ...til,
          url: getTilUrl(til.slug),
        }))}
        checkAllLink={{
          href: '/til',
          text: formatMessage(messages.tilsCheckAll),
        }}
      />
    </>
  );
};

const PostSection = ({ checkAllLink, posts, title }: PostSectionProps) => {
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
        href={checkAllLink.href}
        className="inline-flex mt-6 text-lg underline cursor-pointer text-secondary"
      >
        {checkAllLink.text}
        <ArrowRightIcon className="w-6 ml-2" />
      </Link>
    </section>
  );
};
