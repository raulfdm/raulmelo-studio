import { NextSeo } from 'next-seo';
import { defineMessage, FormattedMessage } from 'react-intl';
import tw from 'twin.macro';

import { useLocalization } from '~/hooks/useLocalization';

const pageTitleMessage = defineMessage({
  id: '404.title',
  description: 'page title',
});

const styles = {
  title: tw`font-black text-center col-span-full font-size[3.5rem] md:font-size[4.5rem] lg:font-size[6rem]`,
  titleSpan: tw`text-base`,
  baseParagraph: tw`col-span-full md:col-start-1 lg:col-start-3 lg:col-end-11`,
  firstParagraph: tw`mt-3 text-2xl md:text-3xl font-extrabold`,
  secondParagraph: tw`mt-5 text-lg`,
};

const Error = () => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <NextSeo title={formatMessage(pageTitleMessage)} nofollow noindex />

      <h1 css={styles.title}>
        Oops! <span css={styles.titleSpan}>404</span>
      </h1>
      <p css={[styles.baseParagraph, styles.firstParagraph]}>
        <FormattedMessage id="404.subtitle" />
      </p>
      <p css={[styles.baseParagraph, styles.secondParagraph]}>
        <FormattedMessage id="404.description" />
      </p>
    </>
  );
};

export default Error;
