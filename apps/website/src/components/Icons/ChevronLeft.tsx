import React from 'react';
import { ChevronDownIcon } from './ChevronDown';
import { IconProps } from './types';

export const ChevronLeftIcon = (props: IconProps) => {
  return <ChevronDownIcon style={{ transform: 'rotate(90deg)' }} {...props} />;
};
