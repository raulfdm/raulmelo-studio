import { MenuBar } from '@components/MenuBar';
import { SEO } from '@components/SEO';
import { ExternalLink } from '@raulfdm/blog-components';
import { sharedClasses } from '@components/uiClasses';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const CurriculumPage = () => {
  return (
    <>
      <SEO
        withDefaultTitle
        title="Curriculum"
        description="Raul Melo is a Software Developer focused on client-side. Have over 5 years of experience building websites and applications. Check his CV for more info."
        url="/cv"
      />
      <MenuBar />
      <main
        className={classNames([
          sharedClasses.sectionContainer,
          'pb-0',
          'flex',
          'justify-center md:justify-between',
          'items-center md:items-start',
          'flex-wrap',
        ])}
      >
        <header className={classNames(['leading-normal'])}>
          <h1
            className={classNames([
              'text-2xl md:text-3xl lg:text-4xl',
              'font-black',
              'mb-4 md:mb-6',
            ])}
          >
            Curriculum
          </h1>
          <p className="mb-4 text-base md:text-md lg:text-lg">
            <FormattedMessage id="cv.description1" />
          </p>
          <p className="mb-4 text-base md:text-md lg:text-lg">
            <FormattedMessage id="cv.description2" />
          </p>
        </header>

        <div
          className={classNames([
            'w-full max-w-[250px] md:max-w-[380px]',
            'shadow-md',
            'bg-white',
            'relative',
            'grid place-items-center',
            'mt-6 mx-auto',
          ])}
        >
          <figure className={classNames('relative', 'h-full w-full')}>
            <Image
              src="https://res.cloudinary.com/duzei21zt/image/upload/v1617789904/site/cv_cover_dbad9dd714.png"
              layout="responsive"
              width={693}
              height={979}
            />
          </figure>
          <a
            href="https://docs.google.com/document/d/1xk0ChmPckqW85xtM1Hizx2tVbo2B61xjcpz-_dAH3f8"
            target="_blank"
            rel="noopener noreferrer"
            className={classNames([
              'bg-black dark:bg-blue-900',
              'rounded-md',
              'py-2 px-3 md:py-4 md:px-6',
              'text-base md:text-lg',
              'z-20',
              'font-extrabold',
              'text-white',
              'absolute',
            ])}
          >
            <FormattedMessage
              id="cv.cta"
              values={{
                // eslint-disable-next-line react/display-name
                icon: () => (
                  <ExternalLink className="w-4 inline-block mb-2 md:mb-4" />
                ),
              }}
            />
          </a>
        </div>
      </main>
    </>
  );
};

export default CurriculumPage;
