import { IPostsAndTilsApi } from '@raulfdm/core/dist/types/domains/posts';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import React from 'react';
import { defineMessages } from 'react-intl';
import tw from 'twin.macro';

import { ArrowRightIcon } from '~/components/Icons';
import { PostBasic } from '~/components/PostBasic';
import { useLocalization } from '~/hooks/useLocalization';
import { getTilUrl } from '~/pages/til/home/utils';
import siteData from '~/site-data';
import { getPostUrl } from '~/utils/url';

import { AuthorPresentation } from './components/AuthorPresentation';
import { PostSectionProps } from './types';

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

const styles = {
  divider: tw`mb-8 col-span-full md:col-start-2 md:col-end-6 lg:col-start-3 lg:col-end-10`,
  postWrapper: tw`mb-6 col-span-full`,
  postTitle: tw`mb-4 font-sans text-lg font-extrabold lg:text-xl lg:mb-6`,
  postList: tw`grid grid-cols-1 gap-6 ipad-pro:grid-cols-2`,
  postCard: tw`p-6 transition-all bg-white rounded-sm shadow dark:bg-blue-800 hover:shadow-lg dark:hover:bg-blue-700`,
  postCardLink: tw`inline-flex mt-6 text-lg underline cursor-pointer text-secondary`,
  linkIcon: tw`w-6 ml-2`,
};

export const HomePage: React.FC<IPostsAndTilsApi> = ({ posts, tils }) => {
  const { formatMessage, locale } = useLocalization();
  const defaultSeo = siteData.defaultSeo[locale];

  return (
    <>
      <NextSeo
        titleTemplate="%s"
        title={`${siteData.personalInformation.full_name} · ${defaultSeo.title}`}
      />

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

      <hr css={styles.divider} />
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
    <section css={styles.postWrapper}>
      <h2 css={styles.postTitle}>{title}</h2>
      <ul css={styles.postList}>
        {posts.map((post) => (
          <li key={post.id}>
            <PostBasic
              className={styles.postCard}
              titleClassName={tw`text-xl`}
              {...post}
            />
          </li>
        ))}
      </ul>
      <Link href={checkAllLink.href} passHref>
        <a css={styles.postCardLink}>
          {checkAllLink.text}
          <ArrowRightIcon css={styles.linkIcon} />
        </a>
      </Link>
    </section>
  );
};
