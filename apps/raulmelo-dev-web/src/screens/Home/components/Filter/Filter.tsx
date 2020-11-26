import React from 'react';
import { defineMessage } from 'react-intl';
import { motion } from 'framer-motion';

import { useLocalization } from '@hooks/useLocalization';

type Filters = 'all' | 'single' | 'series';

type FilterProps = {
  activeFilter: Filters;
  changeFilter: (nextFilter: Filters) => void;
};

const filters: { name: Filters; message: { id: string } }[] = [
  {
    name: 'all',
    message: defineMessage({
      id: 'home.filter.all',
    }),
  },
  {
    name: 'single',
    message: defineMessage({
      id: 'home.filter.single',
    }),
  },
  {
    name: 'series',
    message: defineMessage({
      id: 'home.filter.series',
    }),
  },
];

const variants = {
  active: {
    scale: 1.1,
  },
  normal: {
    scale: 1.0,
  },
};

export const Filter: React.FC<FilterProps> = ({
  activeFilter,
  changeFilter,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <ul
      className="flex mb-5 border-b border-gray-400 dark:border-gray-600 border-opacity-20"
      data-testid="postFilter"
    >
      {filters.map(({ name, message }) => {
        const isActiveFilter = activeFilter === name;
        return (
          <motion.li
            key={name}
            onClick={() => changeFilter(name)}
            variants={variants}
            animate={isActiveFilter ? 'active' : 'normal'}
            whileHover={{
              scale: 1.1,
            }}
            data-testid={`postFilter__${name}`}
            className="text-sm cursor-pointer font-sans mr-5"
          >
            <p
              className={`text-current pb-2 border-0 transition-all duration-100 ease-linear ${
                activeFilter === name ? `border-b border-current font-bold` : ''
              }`}
            >
              {formatMessage(message)}
            </p>
          </motion.li>
        );
      })}
    </ul>
  );
};
