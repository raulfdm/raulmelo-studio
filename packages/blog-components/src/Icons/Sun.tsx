import React from 'react';
import { IconProps } from './types';

export const SunIcon = ({ width, ...props }: IconProps) => {
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
        d="M16 23.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM16 4.5v-1M7.868 7.868l-.707-.707M4.5 16h-1M7.868 24.132l-.707.707M16 27.5v1M24.132 24.132l.707.707M27.5 16h1M24.132 7.868l.707-.707"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
