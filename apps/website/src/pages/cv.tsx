import { ExternalLinkIcon } from '@components/Icons';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import tw, { css } from 'twin.macro';

const styles = {
  header: tw`leading-normal col-span-full lg:col-span-8`,
  title: tw`text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6`,
  paragraph: tw`mb-4 text-base md:text-md lg:text-lg`,
  cvDemoWrapper: css`
    ${tw`col-span-full lg:col-span-4`};
    ${tw`w-full max-width[250px] md:max-width[380px]`};
    ${tw`shadow-md`};
    ${tw`bg-white`};
    ${tw`relative`};
    ${tw`grid place-items-center`};
    ${tw`mx-auto`};
  `,
  figure: tw`relative h-full w-full`,
  cta: css`
    ${tw`bg-secondary dark:text-primary transition-theme`};
    ${tw`rounded-md`};
    ${tw`py-2 px-3 md:py-4 md:px-6`};
    ${tw`text-base md:text-lg`};
    ${tw`font-extrabold`};
    ${tw`text-white`};
    ${tw`absolute`};
  `,
  ctaIcon: tw`w-4 inline-block mb-2 md:mb-4`,
};

const CurriculumPage = () => {
  return (
    <>
      <NextSeo
        title="Curriculum"
        description="Raul Melo is a Software Developer focused on client-side. Have over 5 years of experience building websites and applications. Check his CV for more info."
      />

      <header css={styles.header}>
        <h1 css={styles.title}>
          <FormattedMessage id="sideMenu.cv" />
        </h1>
        <p css={styles.paragraph}>
          <FormattedMessage id="cv.description1" />
        </p>
        <p css={styles.paragraph}>
          <FormattedMessage id="cv.description2" />
        </p>
      </header>

      <aside css={styles.cvDemoWrapper}>
        <figure css={styles.figure}>
          <Image
            src="https://res.cloudinary.com/duzei21zt/image/upload/v1617789904/site/cv_cover_dbad9dd714.png"
            layout="responsive"
            width={693}
            height={979}
            loading="eager"
          />
        </figure>
        <a
          href="https://docs.google.com/document/d/1xk0ChmPckqW85xtM1Hizx2tVbo2B61xjcpz-_dAH3f8"
          target="_blank"
          rel="noopener noreferrer"
          css={styles.cta}
        >
          <FormattedMessage
            id="cv.cta"
            values={{
              // eslint-disable-next-line react/display-name
              icon: () => <ExternalLinkIcon css={styles.ctaIcon} />,
            }}
          />
        </a>
      </aside>
    </>
  );
};

export default CurriculumPage;
