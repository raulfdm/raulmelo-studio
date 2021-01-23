import { SEO } from '@components/SEO';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

const CurriculumPage = () => {
  return (
    <>
      <SEO
        withDefaultTitle
        title="Curriculum"
        description="Raul Melo is a Software Developer focused on client-side. Have over 5 years of experience building websites and applications. Check my CV for more info."
        url="/cv"
      />

      <div className="w-full iframe-container bg-gray-50 text-black min-h-full">
        <Link href="/">
          <a className="underline absolute left-3 top-3 print:hidden z-20">
            Back to home
          </a>
        </Link>

        <article
          className={classNames([
            'container',
            'mx-auto max-w-screen-md',
            'pt-6 sm:pt-4',
          ])}
        >
          <header className="mb-8 pt-14 md:pt-5 px-4 md:px-0">
            <h1 className="text-center text-5xl font-bold mb-4">Curriculum</h1>
            <p>
              This CV is a live version from my Google Docs curriculum. In other
              words, it&apos;s live updated and contains the most updated
              version of it.
            </p>
            <p>
              If you want to get a printable version, please{' '}
              <a
                href="https://docs.google.com/document/d/1xk0ChmPckqW85xtM1Hizx2tVbo2B61xjcpz-_dAH3f8/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline doc-link"
              >
                access the real document
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="prefix__StyledIconBase-ea9ulj-0 prefix__jZGNBW"
                >
                  <title>{'LinkExternal icon'}</title>
                  <path d="M13 3l3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
                  <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" />
                </svg>
              </a>{' '}
              and select print option.
            </p>
          </header>

          <main className="pb-6">
            <iframe
              src="https://docs.google.com/document/d/e/2PACX-1vRH5F5mV58PwToU2intAbHK7XujvdPyOhWr2gDdCC9YcisCSaJVctuGlzE_28zgEbJt4qEo-CUJl-hb/pub?embedded=true"
              className="max-h-full w-full shadow-xl"
            />
          </main>
        </article>
      </div>
      <style jsx global>{`
        #__next {
          height: 100%;
        }

        article {
          max-width: 815px;
        }

        .doc-link svg {
          width: 16px;
          display: inline-block;
          margin-bottom: 10px;
        }

        .iframe-container iframe {
          height: 75vh;
        }
      `}</style>
    </>
  );
};

export default CurriculumPage;
