import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const variants = {
  active: {
    scale: 1.1,
  },
  normal: {
    scale: 1.0,
  },
};

export const Tab = ({
  className,
  label,
  isActive,
  onClick,
  index,
  ...props
}: TabProps) => {
  return (
    <motion.li
      variants={variants}
      animate={isActive ? 'active' : 'normal'}
      className={classNames([
        'text-sm cursor-pointer font-sans mr-5',
        className,
      ])}
      whileHover={{
        scale: 1.1,
      }}
      tabIndex={index}
      onClick={onClick}
      onKeyDown={onClick}
      role="tab"
      data-activetab={isActive}
      {...props}
    >
      <span
        data-testid="tab-label"
        className={classNames([
          'block',
          'text-current pb-2 border-0 transition-all duration-100 ease-linear',
          isActive && 'border-b border-current font-bold',
        ])}
      >
        {label}
      </span>
    </motion.li>
  );
};

export type TabProps = {
  label: string;
  className?: string;
  isActive?: boolean;
  index?: number;
  onClick?: () => void;
};
