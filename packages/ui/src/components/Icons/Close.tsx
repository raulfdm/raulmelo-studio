import React from 'react';

import { IconProps } from './types';

export const CloseIcon = ({ width, ...props }: IconProps) => {
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
        d="M25 7L7 25M25 25L7 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
