import { ArrowheadUp } from '@styled-icons/evaicons-solid/ArrowheadUp';

import { useScrollToTop } from '@hooks/useScrollToTop';
import { SEO } from '@components/SEO';
import {
  Info,
  CVMain,
  HomeLink,
  ScrollToTopButton,
  CareerSummary,
  TechnicalSkills,
  CareerExperience,
  SideProjects,
  Education,
  Interests,
} from './components';
import { GlobalCVStyles } from './styled';
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
      <GlobalCVStyles />
      <HomeLink href="/">Back to home</HomeLink>
      <CVMain>
        <Info {...personalInfo} />
        <CareerSummary summary={summary} />
        <TechnicalSkills technical_skills={technical_skills} />
        <CareerExperience jobs={jobs} />
        <SideProjects side_projects={side_projects} />
        <Education education={education!} />
        <Interests interests={interests} />
        <ScrollToTopButton onClick={moveToTop}>
          <ArrowheadUp size={21} />
        </ScrollToTopButton>
      </CVMain>
    </>
  );
};
