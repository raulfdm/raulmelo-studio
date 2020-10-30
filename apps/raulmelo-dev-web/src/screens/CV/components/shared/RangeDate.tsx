import React from 'react';
import dayjs from 'dayjs';

const formatExperienceDate = (date: string): string => {
  return date && dayjs(date).format("MMM'YY");
};

type RangeDateProps = {
  startDate: string;
  endDate?: string | null;
  isActual?: boolean;
};

export const RangeDate: React.FC<RangeDateProps> = function RangeDate({
  startDate,
  endDate = '',
  isActual,
}) {
  return (
    <React.Fragment>
      <time dateTime={formatExperienceDate(startDate)}>
        {formatExperienceDate(startDate)}
      </time>
      {' - '}
      {/* TODO: enhance this piece */}
      {isActual ? (
        <span>Present</span>
      ) : endDate ? (
        <time dateTime={formatExperienceDate(endDate)}>
          {formatExperienceDate(endDate)}
        </time>
      ) : null}
    </React.Fragment>
  );
};
