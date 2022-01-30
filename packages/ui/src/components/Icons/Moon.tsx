import React from 'react';

import { IconProps } from './types';

export const MoonIcon = ({ width, ...props }: IconProps) => {
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
        d="M27.083 19.081A11.504 11.504 0 0112.919 4.917h0a11.502 11.502 0 1014.164 14.164h0z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
