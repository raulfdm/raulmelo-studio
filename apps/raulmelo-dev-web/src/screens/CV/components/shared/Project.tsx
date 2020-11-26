import React from 'react';
import ReactMarkdown from 'react-markdown';

import { RangeDate } from './RangeDate';

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
    <article className="project">
      <h3 className="text-base md:text-xl font-bold font-cv-serif">{title}</h3>
      <div className="flex flex-col md:flex-row mb-2 mt-2 md:mt-0">
        {subtitle && <h4 className="flex-1">{subtitle}</h4>}
        <p className="text-sm text-opacity-60">
          <RangeDate
            startDate={startDate}
            endDate={endDate}
            isActual={onGoing}
          />
        </p>
      </div>
      <ReactMarkdown source={description!} />
      <style global jsx>{`
        .project li {
          display: block;
          padding-left: 1rem;
          margin-bottom: 0.25rem;
        }

        .project li::before {
          content: '• ';
        }
      `}</style>
    </article>
  );
};
