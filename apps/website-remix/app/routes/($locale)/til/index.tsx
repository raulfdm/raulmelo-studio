import { useLocalization } from '$infrastructure/contexts/Localization';
import { getLocales } from '$infrastructure/i18n/getLocales.server';
import { getParamLocaleOrDefault } from '$infrastructure/utils/i18n';
import { getSEOTags } from '$infrastructure/utils/seo';
import { getTilUrl } from '$infrastructure/utils/url';
import { ContentTile } from '$ui/ContentTile';
import type { AllSupportedLanguages, SupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { ITilsApiResponse } from '@raulmelo/core/dist/types/domains/posts/queryTils/types';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

type LoaderData = {
  tils: ITilsApiResponse;
  messages: Record<string, string>;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { messages } = data;

  return getSEOTags({
    title: `Raul Melo - ${messages[`tilHome.title`]}`,
    description: messages[`tilHome.title`],
    type: `website`,
  });
};

export async function loader({ params }: LoaderArgs) {
  const locale = getParamLocaleOrDefault(params);

  const tils = await domains.posts.queryTils(locale);

  return json<LoaderData>({
    tils,
    messages: await getLocales(locale),
  });
}

const baseColClass = classNames(`col-span-full lg:col-span-10`);

export default function TilsHome() {
  const { locale } = useLocalization();
  const { tils } = useLoaderData() as LoaderData;

  return (
    <>
      <header className={baseColClass}>
        <h1 className="text-3xl font-extrabold md:text-4xl">
          <FormattedMessage id="tilHome.title" />
        </h1>
        <p className="text-lg italic md:text-xl text-opacity-80">
          <FormattedMessage id="tilHome.subtitle" />
        </p>
      </header>

      <p className={classNames([baseColClass, `my-4 text-md md:text-lg`])}>
        <FormattedMessage id="tilHome.description" />
      </p>

      <section className={classNames([baseColClass, `mt-5`])}>
        {tils.length > 0 ? (
          <ul className="space-y-8">
            {tils.map((til) => (
              <li key={til._id}>
                <ContentTile
                  urlBuilder={(slug) => getTilUrl(slug, locale)}
                  {...til}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">
            <FormattedMessage id="tilHome.noTil" />
          </p>
        )}
      </section>
    </>
  );
}
