import { cx } from '@emotion/css';
import { NextSeo } from 'next-seo';
import { defineMessage, FormattedMessage } from 'react-intl';

import { useLocalization } from '~/hooks/useLocalization';

const pageTitleMessage = defineMessage({
  id: '404.title',
  description: 'page title',
});

const baseParagraphClasses = cx(
  'col-span-full md:col-start-1 lg:col-start-3 lg:col-end-11',
);

const Error = () => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <NextSeo title={formatMessage(pageTitleMessage)} nofollow noindex />

      <h1 className="font-black text-center col-span-full font-size[3.5rem] md:font-size[4.5rem] lg:font-size[6rem]">
        Oops! <span className="text-base">404</span>
      </h1>
      <p
        className={cx([
          baseParagraphClasses,
          'mt-3 text-2xl font-extrabold md:text-3xl',
        ])}
      >
        <FormattedMessage id="404.subtitle" />
      </p>
      <p className={cx([baseParagraphClasses, 'mt-5 text-lg'])}>
        <FormattedMessage id="404.description" />
      </p>
    </>
  );
};

export default Error;
