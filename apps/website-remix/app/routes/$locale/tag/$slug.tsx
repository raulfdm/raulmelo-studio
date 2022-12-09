import type { SupportedLanguages } from '@raulmelo/core';
import { domains, utils } from '@raulmelo/core';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useLoaderData } from '@remix-run/react';
import type {
  ITagBySlugBlogPost,
  ITagBySlugPostTag,
  ITagBySlugTilPost,
} from '@raulmelo/core/dist/types/domains/tag/queryTagBySlug/types';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { useLocalization } from '$infrastructure/contexts/Localization';
import type { ISiteData } from '@raulmelo/core/dist/types/domains/siteData';
import { AuthorPresentation } from '$ui/screens/home/AuthorPresentation';
import { getPostUrl, getTilUrl } from '$infrastructure/utils/url';
import { PostBasic } from '$ui/PostBasic';
import { serverIntl } from '$infrastructure/i18n/getServerSideLocales.server';

const messages = defineMessages({
  description: {
    id: `tag.description`,
  },
  title: {
    id: `tag.title`,
  },
});

type LoaderData = {
  tag: ITagBySlugPostTag;
  content: (ITagBySlugBlogPost | ITagBySlugTilPost)[];
  siteData: ISiteData;
  meta: {
    title: string;
    description: string;
  };
};

export async function loader({ params }: LoaderArgs) {
  invariant(params.locale, `Locale is required`);
  invariant(params.slug, `Slug is required`);

  const [tag, siteData] = await Promise.all([
    domains.tag.queryTagBySlug(params.slug, params.locale),
    domains.siteData.querySiteData(),
  ]);

  const content = domains.posts.sortPostsByPublishedDate([
    ...tag.posts,
    ...tag.tils,
  ]);

  const { formatMessage } = serverIntl[params.locale as SupportedLanguages];

  const meta = {
    title: `Raul Melo - ${formatMessage(messages.title, { tag: tag.name })}`,
    description: formatMessage(messages.description, { tag: tag.name }),
  };

  return json<LoaderData>({ tag, content, siteData, meta });
}

export const meta: MetaFunction = ({ data }) => {
  const { meta } = data as LoaderData;

  return {
    title: meta.title,
    description: meta.description,
  };
};

export default function TagSlugRoute() {
  const { content, siteData, tag } = useLoaderData() as LoaderData;
  const { locale, formatMessage } = useLocalization();

  return (
    <>
      <AuthorPresentation siteData={siteData} />

      <h2 className="mb-4 font-sans text-xl font-extrabold col-span-full lg:text-2xl lg:mb-8">
        {formatMessage(messages.title, { tag: tag.name })}
      </h2>
      {utils.isEmpty(content) ? (
        <p className="text-lg col-span-full">
          <FormattedMessage id="tag.empty" />
        </p>
      ) : (
        <ul className="pb-5 space-y-6 md:pb-10 col-span-full">
          {content.map((c) => {
            const getUrl = c._type === `post` ? getPostUrl : getTilUrl;

            return (
              <PostBasic
                key={c._id}
                titleClassName="text-xl lg:text-2xl"
                {...c}
                url={getUrl(c.slug, locale)}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
