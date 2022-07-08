import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import { defineMessage, FormattedMessage } from 'react-intl';

import { useLocalization } from '~/hooks/useLocalization';

const pageTitleMessage = defineMessage({
  id: '404.title',
  description: 'page title',
});

const baseParagraphClasses = classNames(
  'col-span-full md:col-start-1 lg:col-start-3 lg:col-end-11',
);

const Error = () => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <NextSeo title={formatMessage(pageTitleMessage)} nofollow noindex />

      <h1 className="text-5xl font-black text-center col-span-full md:text-7xl lg:text-8xl">
        Oops! <span className="text-base">404</span>
      </h1>
      <p
        className={classNames([
          baseParagraphClasses,
          'mt-3 text-2xl font-extrabold md:text-3xl',
        ])}
      >
        <FormattedMessage id="404.subtitle" />
      </p>
      <p className={classNames([baseParagraphClasses, 'mt-5 text-lg'])}>
        <FormattedMessage id="404.description" />
      </p>
    </>
  );
};

export default Error;
