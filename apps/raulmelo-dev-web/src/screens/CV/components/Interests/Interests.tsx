import React from 'react';

import {
  Section,
  SectionTitle,
  SectionBody,
} from '@screens/CV/components/shared/Section';
import { CvApiData } from '@types-api';

type InterestsProps = Pick<CvApiData, 'interests'>;

export const Interests: React.FC<InterestsProps> = ({ interests }) => {
  return (
    <Section>
      <SectionTitle>Interests</SectionTitle>
      <SectionBody>
        <ul className="interests">
          {interests!.map((interest) => {
            const { id, name } = interest!;

            return (
              <li key={id!}>
                {'• '}
                {name}
              </li>
            );
          })}
        </ul>
      </SectionBody>
    </Section>
  );
};
