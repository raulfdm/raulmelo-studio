import React from 'react';

import { Project } from '@screens/CV/components/shared/Project';
import {
  SectionTitle,
  Section,
  SectionBody,
} from '@screens/CV/components/shared/Section';
import { styled } from '@screens/CV/styled';
import { CvApiData } from '@types-api';

const StyledSection = styled(Section)`
  page-break-before: always;
`;

type CareerExperienceProps = Pick<CvApiData, 'jobs'>;

export const CareerExperience: React.FC<CareerExperienceProps> = ({ jobs }) => {
  return (
    <StyledSection>
      <SectionTitle>Career History</SectionTitle>
      <SectionBody>
        {jobs!.map((job) => {
          const {
            role,
            id,
            company,
            end_date,
            is_actual,
            start_date,
            description,
          } = job!;

          return (
            <Project
              key={id!}
              description={description!}
              title={role!}
              subtitle={company!}
              endDate={end_date}
              onGoing={!!is_actual}
              startDate={start_date}
            />
          );
        })}
      </SectionBody>
    </StyledSection>
  );
};
