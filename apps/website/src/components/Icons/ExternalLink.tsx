import React from 'react';

import { IconProps } from './types';

export const ExternalLinkIcon = ({ width, ...props }: IconProps) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27 12.5l-.001-7.499L19.5 5M17.996 14.004l9-9M23 18v8a1 1 0 01-1 1H6a1 1 0 01-1-1V10a1 1 0 011-1h8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
