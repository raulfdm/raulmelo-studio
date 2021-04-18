import { useLocalization } from '@hooks/useLocalization';
import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import { defineMessage, FormattedMessage } from 'react-intl';

const pageTitleMessage = defineMessage({
  id: '404.title',
  description: 'page title',
});

const Error = () => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <NextSeo title={formatMessage(pageTitleMessage)} nofollow noindex />

      <h1
        className={classNames([
          'text-[3.5rem] md:text-[4.5rem] lg:text-[6rem]',
          'font-black',
          'text-center',
          'col-span-full',
        ])}
      >
        Oops! <span className="text-base">404</span>
      </h1>

      <p
        className={classNames([
          'mt-3',
          'text-2xl md:text-3xl',
          'font-extra',
          'col-span-full md:col-start-1 lg:col-start-3 lg:col-end-11',
        ])}
      >
        <FormattedMessage id="404.subtitle" />
      </p>
      <p
        className={classNames([
          'mt-5',
          'text-lg',
          'col-span-full md:col-start-1 lg:col-start-3 lg:col-end-11',
        ])}
      >
        <FormattedMessage id="404.description" />
      </p>
    </>
  );
};

export default Error;
