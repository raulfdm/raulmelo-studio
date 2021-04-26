import React from 'react';
import { IconProps } from './types';

export const LinkedInIcon = ({ width, ...props }: IconProps) => {
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
        d="M26 5H6a1 1 0 00-1 1v20a1 1 0 001 1h20a1 1 0 001-1V6a1 1 0 00-1-1zM15 14v8M11 14v8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 17.5a3.5 3.5 0 117 0V22"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" />
    </svg>
  );
};
