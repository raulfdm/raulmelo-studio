import React from 'react';

import {
  Section,
  SectionTitle,
  SectionBody,
} from '@screens/CV/components/shared/Section';
import { CourseList } from '@screens/CV/components/shared/Ui';
import { RangeDate } from '@screens/CV/components/shared/RangeDate';

import { Company, Period, StyledCourseList } from './styled';
import { CvApiData } from '@types-api';

type Education = CvApiData['education'];

type EducationProps = {
  education: Education;
};

export const Education: React.FC<EducationProps> = ({ education }) => {
  const { formal, languages } = education!;

  return (
    <Section>
      <SectionTitle>Education and Languages</SectionTitle>
      <SectionBody>
        <Formal formal={formal} />
        <Languages languages={languages!} />
      </SectionBody>
    </Section>
  );
};

function Languages({ languages }: Pick<Education, 'languages'>) {
  return (
    <StyledCourseList>
      {languages!.map((lang) => {
        const { id, name, proficiency } = lang!;
        return (
          <li key={id!}>
            {name} - {proficiency}
          </li>
        );
      })}
    </StyledCourseList>
  );
}

function Formal({ formal }: Pick<Education, 'formal'>) {
  return (
    <CourseList>
      {formal!.map((edu) => {
        const { start_date, end_date, foundation, id, is_actual, title } = edu!;

        return (
          <li key={id!}>
            <Period>
              <RangeDate
                endDate={end_date}
                startDate={start_date}
                isActual={is_actual!}
              />
            </Period>
            <Company>{`${title} - ${foundation}`}</Company>
          </li>
        );
      })}
    </CourseList>
  );
}
