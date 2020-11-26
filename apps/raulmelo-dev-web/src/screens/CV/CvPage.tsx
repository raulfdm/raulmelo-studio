import classNames from 'classnames';
import Link from 'next/link';

import { useScrollToTop } from '@hooks/useScrollToTop';
import { SEO } from '@components/SEO';
import { ChevronDoubleUp } from '@icons';
import {
  Info,
  CareerSummary,
  TechnicalSkills,
  CareerExperience,
  SideProjects,
  Education,
  Interests,
} from './components';
import { CvApiDataProps } from './types';

export const CvPage: React.FC<CvApiDataProps> = ({ cv, personalInfo }) => {
  const { moveToTop } = useScrollToTop();

  const {
    summary,
    technical_skills,
    jobs,
    side_projects,
    education,
    interests,
  } = cv;

  return (
    <>
      <SEO
        withDefaultTitle
        title="Curriculum"
        description="Raul Melo is a Software Developer focused on client-side. Have over 5 years of experience building websites and applications. Check my CV for more info."
        url="/cv"
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Raleway:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </SEO>

      <Link href="/">
        <a className="underline absolute left-3 top-3 print:hidden z-20">
          Back to home
        </a>
      </Link>

      <main
        className={classNames([
          'container',
          'px-4 md:px-0',
          'mx-auto max-w-screen-md',
          'font-cv-sans',
          'relative',
          'pt-6 sm:pt-4',
        ])}
      >
        <Info {...personalInfo} />
        <CareerSummary summary={summary} />
        <TechnicalSkills technical_skills={technical_skills} />
        <CareerExperience jobs={jobs} />
        <SideProjects side_projects={side_projects} />
        <Education education={education!} />
        <Interests interests={interests} />
        <button
          className={classNames([
            'fixed',
            'bottom-4 right-4',
            'bg-white dark:bg-blue-700',
            'rounded-full',
            'shadow-lg',
            'w-10 h-10',
            'hover:transform hover:scale-110 transition-transform duration-100 ease-in-out',
            'flex items-center justify-center',
            'z-20',
          ])}
          onClick={moveToTop}
        >
          <ChevronDoubleUp width={21} />
        </button>
      </main>

      <style global jsx>{`
        @media print {
          @page {
            size: auto;
            margin: 0;
            padding: 1cm 1cm 1cm 1cm;
            margin: 0;
            size: A4;
          }

          html {
            max-width: 21cm;
            font-size: 1rem;
            padding: 0;
            margin: 0 auto;
          }

          button {
            display: none !important;
          }

          a {
            text-decoration: none;
          }
        }
      `}</style>
    </>
  );
};
