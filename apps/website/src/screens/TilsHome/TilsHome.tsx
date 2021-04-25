import { PostBasic } from '@components/PostBasic';
import { useLocalization } from '@hooks/useLocalization';
import { NextSeo } from 'next-seo';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Tils } from './types';
import { getTilUrl } from './utils';

type TilsHomeProps = {
  tils: Tils;
};

export const TilsHome = ({ tils }: TilsHomeProps) => {
  const { formatMessage } = useLocalization();
  return (
    <>
      <NextSeo
        title={formatMessage({ id: 'tilHome.title' })}
        description={formatMessage({ id: 'tilHome.subtitle' })}
      />

      <header className="col-span-full lg:col-span-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          <FormattedMessage id="tilHome.title" />
        </h1>
        <p className="text-lg md:text-xl italic text-opacity-80">
          <FormattedMessage id="tilHome.subtitle" />
        </p>
      </header>

      <p className="col-span-full lg:col-span-10 text-md md:text-lg my-4">
        <FormattedMessage id="tilHome.description" />
      </p>

      <section className="col-span-full lg:col-span-10 mt-5">
        {tils.length > 0 ? (
          <ul className="space-y-8">
            {tils.map((til) => (
              <PostBasic
                as="li"
                key={til.id}
                publishedAt={til.publishedAt}
                tags={til.tags}
                url={getTilUrl(til.slug)}
                title={til.title}
              />
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
};
