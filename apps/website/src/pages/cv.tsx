import { MenuBar } from '@components/MenuBar';
import { SEO } from '@components/SEO';
import { sharedClasses } from '@components/uiClasses';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { useBoolean } from 'react-use';
import { motion } from 'framer-motion';

const CurriculumPage = () => {
  const [isOpen, setIsOpen] = useBoolean(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const cvRef = React.useRef(null);

  // window.elementzz = cvRef.current;

  return (
    <>
      <SEO
        withDefaultTitle
        title="Curriculum"
        description="Raul Melo is a Software Developer focused on client-side. Have over 5 years of experience building websites and applications. Check my CV for more info."
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
        <header className={classNames(['w-full md:w-[54%]', 'leading-normal'])}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black">
            Curriculum
          </h1>
          <p className="mb-4 text-base md:text-md lg:text-lg">
            This CV is a live version from my Google Docs curriculum. In other
            words, it&apos;s live updated and contains the most updated version
            of it.
          </p>
          <p className="mb-4 text-base md:text-md lg:text-lg">
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
                className="prefix__StyledIconBase-ea9ulj-0 prefix__jZGNBW w-4 inline-block mb-2"
              >
                <title>{'LinkExternal icon'}</title>
                <path d="M13 3l3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
                <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" />
              </svg>
            </a>{' '}
            and select print option.
          </p>
        </header>

        <div
          ref={cvRef}
          className={classNames([
            'h-[390px] lg:h-[529px]',
            ' w-full max-w-[280px] lg:max-w-[380px]',
            'shadow-md',
            'bg-white',
            'relative',
            'grid place-items-center',
            'mt-6 md:ml-6 md:mt-0',
          ])}
        >
          <button
            onClick={handleToggle}
            className={classNames([
              'bg-black dark:bg-blue-900',
              'rounded-md',
              'py-4 px-6',
              'z-20',
              'relative',
              'font-extrabold',
              'text-white',
            ])}
          >
            Click here to expand
          </button>
          <CvIframe
            isOpen={isOpen}
            handleToggle={handleToggle}
            cardRef={cvRef}
          />
        </div>
      </main>
    </>
  );
};

function CvIframe({
  isOpen,
  handleToggle,
  cardRef,
}: {
  isOpen: boolean;
  handleToggle: () => void;
  cardRef: React.MutableRefObject<null>;
}) {
  const [el, setEl] = React.useState<HTMLElement | null>(null);
  const openSpring = { type: 'spring', stiffness: 200, damping: 30 };
  const closeSpring = { type: 'spring', stiffness: 300, damping: 35 };

  React.useEffect(() => {
    if (!el) {
      setEl(cardRef.current);
    }
  }, [cardRef.current]);

  if (!el) {
    return null;
  }

  const {
    height,
    width,
    left,
    top,
    bottom,
    right,
  } = el.getBoundingClientRect();

  const currentAnimation = isOpen ? 'open' : 'closed';
  return (
    <>
      <motion.div
        animate={currentAnimation}
        transition={isOpen ? openSpring : closeSpring}
        variants={{
          open: {
            width: '100vw',
            height: '100vh',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            filter: 'none',
          },
          closed: {
            width,
            height,
            left,
            top,
            bottom,
            right,
            zIndex: 0,
            filter: 'blur(1px)',
          },
        }}
        className={classNames([
          'bg-gray-100',
          'fixed',
          'bottom-0 right-0 left-0 top-0',
          isOpen && 'md:py-8',
          'z-40',
          'grid',
          'place-items-center',
        ])}
      >
        <motion.iframe
          src="https://docs.google.com/document/d/e/2PACX-1vRH5F5mV58PwToU2intAbHK7XujvdPyOhWr2gDdCC9YcisCSaJVctuGlzE_28zgEbJt4qEo-CUJl-hb/pub?embedded=true"
          className={classNames('w-full h-full max-w-3xl shadow-xl mx-auto')}
          scrolling={isOpen === false ? 'no' : undefined}
        />

        <motion.button
          animate={currentAnimation}
          variants={{
            open: {
              opacity: 1,
            },
            closed: {
              opacity: 0,
            },
          }}
          onClick={handleToggle}
          className={classNames([
            'opacity-0',
            'bg-black',
            'rounded-md',
            'py-4 px-6',
            'z-50',
            'fixed',
            'font-extrabold',
            'text-white',
            'bottom-5',
            'right-5',
          ])}
        >
          Close
        </motion.button>
      </motion.div>
    </>
  );
}

export default CurriculumPage;
