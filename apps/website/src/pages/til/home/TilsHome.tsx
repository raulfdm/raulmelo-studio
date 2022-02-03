import { ITilsTil } from '@raulmelo/core/dist/types/domains/posts/queryTils/types';
import { NextSeo } from 'next-seo';
import { FormattedMessage } from 'react-intl';
import tw from 'twin.macro';

import { PostBasic } from '~/components/PostBasic';
import { useLocalization } from '~/hooks/useLocalization';

import { getTilUrl } from './utils';

type TilsHomeProps = {
  tils: ITilsTil[];
};

const styles = {
  baseCol: tw`col-span-full lg:col-span-10`,
  title: tw`text-3xl font-extrabold md:text-4xl`,
  subtitle: tw`text-lg italic md:text-xl text-opacity-80`,
  description: tw`my-4 text-md md:text-lg`,
  tilsList: {
    wrapper: tw`mt-5`,
    list: tw`space-y-8`,
    itemTitle: tw`text-lg lg:text-xl`,
    notFound: tw`text-lg`,
  },
};

export const TilsHome = ({ tils }: TilsHomeProps) => {
  const { formatMessage } = useLocalization();
  return (
    <>
      <NextSeo
        title={formatMessage({ id: 'tilHome.title' })}
        description={formatMessage({ id: 'tilHome.subtitle' })}
      />

      <header css={styles.baseCol}>
        <h1 css={styles.title}>
          <FormattedMessage id="tilHome.title" />
        </h1>
        <p css={styles.subtitle}>
          <FormattedMessage id="tilHome.subtitle" />
        </p>
      </header>

      <p css={[styles.baseCol, styles.description]}>
        <FormattedMessage id="tilHome.description" />
      </p>

      <section css={[styles.baseCol, styles.tilsList.wrapper]}>
        {tils.length > 0 ? (
          <ul css={styles.tilsList.list}>
            {tils.map((til) => (
              <li key={til.id}>
                <PostBasic
                  titleClassName={styles.tilsList.itemTitle}
                  publishedAt={til.publishedAt}
                  tags={til.tags}
                  url={getTilUrl(til.slug)}
                  title={til.title}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p css={styles.tilsList.notFound}>
            <FormattedMessage id="tilHome.noTil" />
          </p>
        )}
      </section>
    </>
  );
};
