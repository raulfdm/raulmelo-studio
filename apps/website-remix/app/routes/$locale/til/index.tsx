import { useLocalization } from '$infrastructure/contexts/Localization';
import { getTilUrl } from '$infrastructure/utils/url';
import { ContentTile } from '$ui/ContentTile';
import type { AllSupportedLanguages } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { ITilsApiResponse } from '@raulmelo/core/dist/types/domains/posts/queryTils/types';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import invariant from 'tiny-invariant';

type LoaderData = {
  tils: ITilsApiResponse;
};

export async function loader({ params }: LoaderArgs) {
  invariant(params.locale, `locale is required`);

  const tils = await domains.posts.queryTils(
    params.locale as AllSupportedLanguages,
  );

  return json<LoaderData>({
    tils,
  });
}

const baseColClass = classNames(`col-span-full lg:col-span-10`);

export default function TilsHome() {
  const { locale } = useLocalization();
  const { tils } = useLoaderData() as LoaderData;

  return (
    <>
      {/* <NextSeo
        title={formatMessage({ id: 'tilHome.title' })}
        description={formatMessage({ id: 'tilHome.subtitle' })}
      /> */}

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
