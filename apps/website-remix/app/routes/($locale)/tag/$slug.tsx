import type {
  QuerySiteDataReturnType,
  QueryTagBySlugReturnType,
  QueryTagBySlugTil,
  QueryTagBySlugPost,
} from '@raulmelo/core/domains';
import {
  querySiteData,
  queryTagBySlug,
  sortPostsByPublishedDate,
} from '@raulmelo/core/domains';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useLoaderData } from '@remix-run/react';

import getPostUrl, { getTilUrl } from '$infrastructure/utils/url';
import { PostBasic } from '$ui/PostBasic';
import { serverIntl } from '$infrastructure/i18n/getServerSideLocales.server';
import { getParamLocaleOrDefault } from '$infrastructure/utils/i18n';
import { isEmpty } from '@raulmelo/core/utils';

const messages = defineMessages({
  description: {
    id: `tag.description`,
  },
  title: {
    id: `tag.title`,
  },
});

type LoaderData = {
  tag: QueryTagBySlugReturnType;
  content: (QueryTagBySlugTil | QueryTagBySlugPost)[];
  siteData: QuerySiteDataReturnType;
  meta: {
    title: string;
    description: string;
  };
};

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, `Slug is required`);

  const locale = getParamLocaleOrDefault(params);

  const [tag, siteData] = await Promise.all([
    queryTagBySlug(params.slug, locale),
    querySiteData(),
  ]);

  const content = sortPostsByPublishedDate([...tag.posts, ...tag.tils]);

  const { formatMessage } = serverIntl[locale];

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
      {isEmpty(content) ? (
        <p className="text-lg col-span-full">
          <FormattedMessage id="tag.empty" />
        </p>
      ) : (
        <ul className="pb-5 space-y-6 md:pb-10 col-span-full">
          {content.map((c: any) => {
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
