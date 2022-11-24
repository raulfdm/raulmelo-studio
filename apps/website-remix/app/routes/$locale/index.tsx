import { useLocalization } from '$infrastructure/contexts/Localization';
import { AuthorPresentation } from '$ui/screens/home/AuthorPresentation';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import * as core from '@raulmelo/core';
import { useLoaderData } from '@remix-run/react';
import type { ISiteData } from '@raulmelo/core/dist/types/domains/siteData';

const availableLocales = ['en', 'pt'];

type LoaderData = {
  siteData: ISiteData;
};

export async function loader({ context, params, request }: LoaderArgs) {
  invariant(typeof params.locale === 'string', 'lang is required');

  const siteData = await core.domains.siteData.querySiteData();

  return json<LoaderData>({
    siteData,
  });
}

export default function Index() {
  const { siteData } = useLoaderData<LoaderData>();
  // const all = useLocalization();

  // console.log(all);
  return (
    <>
      <AuthorPresentation siteData={siteData} />
      {/* <PostSection
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
      /> */}
    </>
  );
}
