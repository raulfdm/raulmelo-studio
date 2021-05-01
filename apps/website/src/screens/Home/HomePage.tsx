import { PostBasic } from '@components/PostBasic';
import { useLocalization } from '@hooks/useLocalization';
import { getTilUrl } from '@screens/TilsHome/utils';
import { getPostUrl } from '@utils/url';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import { defineMessages } from 'react-intl';
import siteData from 'site-data';
import { AuthorPresentation } from './components/AuthorPresentation';
import { IHomeGraphQLResponse, PostSectionProps } from './types';
import tw from 'twin.macro';
import { ArrowRightIcon } from '@components/Icons';

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
  divider: tw`col-span-full md:col-start-2 md:col-end-6 lg:col-start-3 lg:col-end-10 mb-8`,
  postWrapper: tw`col-span-full mb-6`,
  postTitle: tw`font-sans font-extrabold text-lg lg:text-xl mb-4 lg:mb-6`,
  postList: tw`grid grid-cols-1 ipad-pro:grid-cols-2 gap-6`,
  postCard: tw`bg-white dark:bg-blue-800 p-6 rounded-sm shadow hover:scale-50 transition-theme`,
  postCardLink: tw`text-lg underline mt-6 cursor-pointer inline-flex text-secondary`,
  linkIcon: tw`w-6 ml-2`,
};

export const HomePage: React.FC<IHomeGraphQLResponse> = ({ posts, tils }) => {
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
