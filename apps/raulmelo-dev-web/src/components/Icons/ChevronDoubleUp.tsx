import React from 'react';
import { IconProps } from './types';

export const ChevronDoubleUp = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 11l7-7 7 7M5 19l7-7 7 7"
      />
    </svg>
  );
};
