import type { QueryTilsReturnType } from '@raulmelo/core/dist/types/domains/posts/queryTils';
import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import { FormattedMessage } from 'react-intl';

import { ContentTile } from '~/components/ContentTile';
import { useLocalization } from '~/hooks/useLocalization';

import { getTilUrl } from './utils';

type Til = QueryTilsReturnType[number];

type TilsHomeProps = {
  tils: Til[];
};

const baseColClass = classNames('col-span-full lg:col-span-10');

export const TilsHome = ({ tils }: TilsHomeProps) => {
  const { formatMessage } = useLocalization();
  return (
    <>
      <NextSeo
        title={formatMessage({ id: 'tilHome.title' })}
        description={formatMessage({ id: 'tilHome.subtitle' })}
      />

      <header className={baseColClass}>
        <h1 className="text-3xl font-extrabold md:text-4xl">
          <FormattedMessage id="tilHome.title" />
        </h1>
        <p className="text-lg italic md:text-xl text-opacity-80">
          <FormattedMessage id="tilHome.subtitle" />
        </p>
      </header>

      <p className={classNames([baseColClass, 'my-4 text-md md:text-lg'])}>
        <FormattedMessage id="tilHome.description" />
      </p>

      <section className={classNames([baseColClass, 'mt-5'])}>
        {tils.length > 0 ? (
          <ul className="space-y-8">
            {tils.map((til) => (
              <li key={til._id}>
                <ContentTile urlBuilder={getTilUrl} {...til} />
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
};
