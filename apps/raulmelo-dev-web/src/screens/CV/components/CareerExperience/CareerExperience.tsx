import React from 'react';

import { Project } from '@screens/CV/components/shared/Project';
import {
  SectionTitle,
  Section,
  SectionBody,
} from '@screens/CV/components/shared/Section';
import { CvApiData } from '@types-api';

type CareerExperienceProps = Pick<CvApiData, 'jobs'>;

export const CareerExperience: React.FC<CareerExperienceProps> = ({ jobs }) => {
  return (
    <Section style={{ pageBreakBefore: 'always' }}>
      <SectionTitle>Career History</SectionTitle>
      <SectionBody className="space-y-4 md:space-y-6">
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
    </Section>
  );
};
