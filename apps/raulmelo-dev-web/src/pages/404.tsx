import { FormattedMessage, defineMessage } from 'react-intl';

import { MenuBar } from '@components/MenuBar';
import { useLocalization } from '@hooks/useLocalization';
import Head from 'next/head';
import classNames from 'classnames';

const pageTitleMessage = defineMessage({
  id: '404.title',
  description: 'page title',
});

const Error = () => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <Head>
        <title>{formatMessage(pageTitleMessage)}</title>
      </Head>
      <MenuBar />
      <main className="mx-auto max-w-screen-lg w-8/12 text-center">
        <h2
          className={classNames([
            'text-6xl md:text-7xl lg:text-8xl xl:text-9xl',
            'font-bold font-serif',
          ])}
        >
          Oops!
        </h2>
        <p
          className={classNames([
            'mt-3',
            'text-2xl md:text-4xl lg:text-5xl',
            'font-bold font-serif',
          ])}
        >
          <FormattedMessage id="404.subtitle" />
        </p>
        <p
          className={classNames([
            'mt-5',
            'text-gray-800 dark:text-gray-300',
            'text-lg',
          ])}
        >
          <FormattedMessage id="404.description" />
        </p>
      </main>
    </>
  );
};

export default Error;
