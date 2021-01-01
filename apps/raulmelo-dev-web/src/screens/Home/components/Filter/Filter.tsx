import React from 'react';
import { defineMessage } from 'react-intl';
import { Tabs, Tab, TabsProps } from '@raulfdm/blog-components';
import { useLocalization } from '@hooks/useLocalization';
import {
  PossibleFilters,
  PossibleFiltersIndex,
} from '@screens/Home/hooks/useBlogPostFilters';

const filters: { name: PossibleFilters; message: { id: string } }[] = [
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

export const Filter: React.FC<FilterProps> = ({
  activeTabIndex,
  onTabChange,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <Tabs
      onTabChange={onTabChange as TabsProps['onTabChange']}
      value={activeTabIndex}
    >
      {filters.map(({ name, message }) => (
        <Tab key={name} label={formatMessage(message)} />
      ))}
    </Tabs>
  );
};

type FilterProps = {
  activeTabIndex: PossibleFiltersIndex;
  onTabChange: (nextFilter: PossibleFiltersIndex) => void;
};
