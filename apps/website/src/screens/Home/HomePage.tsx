import { PostBasic, PostBasicProps } from '@components/PostBasic';
import { useLocalization } from '@hooks/useLocalization';
import { getTilUrl } from '@screens/TilsHome/utils';
import { getPostUrl } from '@utils/url';
import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import { defineMessages } from 'react-intl';
import siteData from 'site-data';
import { AuthorPresentation } from './components/AuthorPresentation';
import { IHomeGraphQLResponse } from './types';

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

export const HomePage: React.FC<IHomeGraphQLResponse> = ({ posts, tils }) => {
  const { formatMessage } = useLocalization();
  return (
    <>
      {/* This enforces the canonical being "/" instead "/blog" (redirect) */}
      <NextSeo canonical={siteData.site.url} />

      <AuthorPresentation />
      <PostSection
        title={formatMessage(messages.postsTitle)}
        posts={posts.map((post) => ({
          ...post,
          publishedAt: post.date,
          tags: post.post_tags,
          url: getPostUrl(post.slug),
        }))}
        checkAllLink={{
          href: '/blog',
          text: formatMessage(messages.postsCheckAll),
        }}
      />

      <hr
        className={classNames([
          'col-span-full md:col-start-2 md:col-end-6 lg:col-start-3 lg:col-end-10',
          'mb-8',
        ])}
      />
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

type PostSectionProps = {
  title: string;
  posts: (PostBasicProps & { id: string })[];
  checkAllLink: {
    href: string;
    text: string;
  };
};

const PostSection = ({ checkAllLink, posts, title }: PostSectionProps) => {
  return (
    <section className={classNames(['col-span-full', 'mb-6'])}>
      <h2
        className={classNames([
          'font-sans font-extrabold',
          'text-lg lg:text-xl',
          'mb-4 lg:mb-6',
        ])}
      >
        {title}
      </h2>
      <ul
        className={classNames([
          'grid',
          'grid-cols-1 ipad-pro:grid-cols-2',
          'gap-6',
        ])}
      >
        {posts.map((post) => (
          <PostBasic
            className={classNames([
              'dark:bg-blue-800',
              'p-6',
              'rounded-sm',
              'shadow',
              'hover:scale-50',
            ])}
            titleClassName="lg:!text-xl"
            key={post.id}
            {...post}
            as="li"
          />
        ))}
      </ul>
      <Link href={checkAllLink.href}>
        <a className="text-lg underline mt-6 inline-block">
          {checkAllLink.text}
        </a>
      </Link>
    </section>
  );
};
