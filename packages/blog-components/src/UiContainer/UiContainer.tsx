import React from 'react';
import { motion } from 'framer-motion';
import { HTMLMotionComponents } from 'framer-motion/types/render/html/types';

export type UiContainerProps = React.FC<{
  as?: keyof HTMLMotionComponents;
}>;

export const UiContainer: UiContainerProps = ({ as = 'div', ...props }) => {
  const Component = motion[as];

  return (
    <Component
      className="container mx-auto px-4 md:px-0 max-w-screen-md"
      {...props}
    />
  );
};
