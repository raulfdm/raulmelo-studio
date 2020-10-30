import React from 'react';
import ReactMarkdown from 'react-markdown';

import { CvApiData } from '@types-api';
import { Section, SectionTitle, SectionBody } from '../shared/Section';

type CareerSummaryProps = Pick<CvApiData, 'summary'>;

export const CareerSummary: React.FC<CareerSummaryProps> = ({ summary }) => {
  return (
    <Section>
      <SectionTitle>Career Summary</SectionTitle>
      <SectionBody>
        <ReactMarkdown source={summary!} />
      </SectionBody>
    </Section>
  );
};
