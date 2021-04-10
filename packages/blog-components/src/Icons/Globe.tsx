import React from 'react';
import { IconProps } from './types';

export const GlobeIcon = ({ width, ...props }: IconProps) => {
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
        d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.198 22.924l1.46-.88a1.001 1.001 0 00.483-.851l.026-4.517a1 1 0 01.157-.532l2.48-3.887a1 1 0 011.43-.272l2.457 1.78a1 1 0 00.72.181l3.935-.533a1 1 0 00.622-.336l2.77-3.2a1 1 0 00.243-.703l-.146-3.038M23.383 25.46l-1.341-1.344a1 1 0 00-.454-.26l-2.682-.705a1 1 0 01-.736-1.112l.298-2.025a1 1 0 01.606-.778l3.806-1.582a1 1 0 011.059.186l3.112 2.846"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
