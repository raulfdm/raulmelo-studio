import React from 'react';

import {
  Section,
  SectionTitle,
  SectionBody,
} from '@screens/CV/components/shared/Section';
import { Project } from '@screens/CV/components/shared/Project';
import { CvApiData } from '@types-api';

type SideProjectsProps = Pick<CvApiData, 'side_projects'>;

export const SideProjects: React.FC<SideProjectsProps> = ({
  side_projects,
}) => {
  return (
    <Section>
      <SectionTitle>Side Projects</SectionTitle>
      <SectionBody>
        {side_projects!
          .filter((p) => p?.is_visible)
          .map((project) => {
            const {
              name,
              id,
              start_date,
              end_date,
              is_ongoing,
              description,
            } = project!;

            return (
              <Project
                key={id!}
                title={name!}
                startDate={start_date}
                endDate={end_date}
                onGoing={!!is_ongoing}
                description={description!}
              />
            );
          })}
      </SectionBody>
    </Section>
  );
};
