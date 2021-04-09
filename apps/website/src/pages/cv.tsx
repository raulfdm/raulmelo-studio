import { MenuBar } from '@components/MenuBar';
import { SEO } from '@components/SEO';
import { ExternalLink } from '@raulfdm/blog-components';
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
      <main className={classNames(['grid-container'])}>
        <header
          className={classNames(['leading-normal col-span-full lg:col-span-8'])}
        >
          <h1
            className={classNames([
              'text-2xl md:text-3xl lg:text-4xl',
              'font-black',
              'mb-4 md:mb-6',
            ])}
          >
            <FormattedMessage id="sideMenu.cv" />
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
            'col-span-full lg:col-span-4',
            'w-full max-w-[250px] md:max-w-[380px]',
            'shadow-md',
            'bg-white',
            'relative',
            'grid place-items-center',
            'mx-auto',
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
