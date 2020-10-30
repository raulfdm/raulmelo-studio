import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Wrapper, Title, Info, Subtitle, Period } from './styles';
import { RangeDate } from '../RangeDate';

type ProjectProps = {
  title: string;
  subtitle?: string;
  startDate: string;
  endDate?: string | null;
  onGoing?: boolean;
  description: string;
};

export const Project: React.FC<ProjectProps> = ({
  title,
  subtitle,
  startDate,
  endDate,
  onGoing,
  description,
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Info>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <Period>
          <RangeDate
            startDate={startDate}
            endDate={endDate}
            isActual={onGoing}
          />
        </Period>
      </Info>
      <ReactMarkdown source={description!} />
    </Wrapper>
  );
};
