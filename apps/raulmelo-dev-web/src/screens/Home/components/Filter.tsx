import React from 'react';
import { defineMessage } from 'react-intl';
import { motion } from 'framer-motion';

import { styled } from '@styles/styled';
import { useLocalization } from '@hooks/useLocalization';

const FilterList = styled.ul`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, max-content);

  && {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    margin-bottom: 30px;
  }
`;

const FilterItem = styled(motion.li)`
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.contentSans};
  color: ${({ theme }) => theme.color.fontLight};
  cursor: pointer;

  p {
    border: none;
    padding-bottom: 8px;
    transition: border-width 0.6s linear;
  }

  p.active {
    color: ${({ theme }) => theme.color?.font};
    border-bottom: 1px solid ${({ theme }) => theme.color?.font};
  }

  &:hover {
    color: ${({ theme }) => theme.color.font};
  }
`;

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
};

export const Filter: React.FC<FilterProps> = ({
  activeFilter,
  changeFilter,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <FilterList data-testid="postFilter">
      {filters.map(({ name, message }) => {
        return (
          <FilterItem
            key={name}
            onClick={() => changeFilter(name)}
            variants={variants}
            whileHover={activeFilter !== name ? 'active' : ''}
            data-testid={`postFilter__${name}`}
          >
            <p className={activeFilter === name ? 'active' : ''}>
              {formatMessage(message)}
            </p>
          </FilterItem>
        );
      })}
    </FilterList>
  );
};
