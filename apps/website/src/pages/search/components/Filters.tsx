import { utils } from '@raulmelo/core';
import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import tw, { styled } from 'twin.macro';

import { useLocalization } from '~/hooks/useLocalization';

import { RefinementListProps } from '../types';

const FiltersWrapper = tw.div`col-span-full inline-flex flex-wrap m-auto mb-7`;
const RefinementWrapper = styled.div`
  &:not(:last-child) {
    ${tw`mr-6`}
  }
`;
const Title = tw.h3`text-lg font-bold`;
const List = tw.ul`flex flex-col space-y-2`;
const ListItem = tw.li``;
const Label = tw.label`space-x-2 flex items-center cursor-pointer`;
const LabelText = tw.span`text-lg`;
const Checkbox = styled.input`
  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  }

  ${tw`rounded checked:bg-secondary hover:checked:bg-secondary focus:checked:bg-secondary focus:checked:ring-secondary focus:ring-secondary`}
`;

export const Filters = () => {
  return (
    <FiltersWrapper>
      <ConfiguredLanguageRefinement attribute="language" operator="or" />
      <ConfiguredTypeRefinement attribute="_type" operator="or" />
      <ConfiguredTagsRefinement attribute="tags.name" operator="or" />
    </FiltersWrapper>
  );
};

const ConfiguredLanguageRefinement = connectRefinementList(
  LanguageRefinement as never,
);
function LanguageRefinement({ items, refine }: RefinementListProps) {
  const { formatMessage } = useLocalization();
  const langMap = {
    pt: 'Português',
    en: 'English',
  };

  return (
    <GenericRefinement
      items={items}
      refine={refine}
      renderLabelText={(t) => langMap[t as 'pt' | 'en']}
      title={formatMessage({ id: 'search.filters.type' })}
    />
  );
}

const ConfiguredTypeRefinement = connectRefinementList(TypeRefinement as never);
function TypeRefinement({ items, refine }: RefinementListProps) {
  const { formatMessage } = useLocalization();

  return (
    <GenericRefinement
      items={items}
      refine={refine}
      renderLabelText={(t) => t.toUpperCase()}
      title={formatMessage({ id: 'search.filters.type' })}
    />
  );
}

const ConfiguredTagsRefinement = connectRefinementList(TagsRefinement as never);
function TagsRefinement({ items, refine }: RefinementListProps) {
  const { formatMessage } = useLocalization();

  return (
    <GenericRefinement
      items={items}
      refine={refine}
      renderLabelText={(t) => t}
      title={formatMessage({ id: 'search.filters.tags' })}
    />
  );
}

type GenericRefinementProps = {
  title: string;
  renderLabelText: (itemLabel: string) => string;
} & RefinementListProps;

function GenericRefinement({
  title,
  refine,
  items,
  renderLabelText,
}: GenericRefinementProps) {
  return utils.isEmpty(items) ? null : (
    <RefinementWrapper>
      <Title>{title}</Title>

      <List>
        {items.sort(sortOptionByLabel).map((item) => {
          const handleClick = () => refine(item.value);
          return (
            <ListItem key={item.label}>
              <Label>
                <Checkbox
                  type="checkbox"
                  onClick={handleClick}
                  onKeyPress={createEnterHandler(handleClick)}
                />
                <LabelText>
                  {renderLabelText(item.label)} {`(${item.count})`}
                </LabelText>
              </Label>
            </ListItem>
          );
        })}
      </List>
    </RefinementWrapper>
  );
}

type Item = RefinementListProps['items'][0];

function sortOptionByLabel(prev: Item, next: Item): number {
  const prevLabel = prev.label.toLowerCase();
  const nextLabel = next.label.toLowerCase();

  if (prevLabel > nextLabel) {
    return 1;
  }

  if (prevLabel < nextLabel) {
    return -1;
  }

  return 0;
}

function createEnterHandler(callback: () => void) {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      (event.target as HTMLInputElement).checked = !(
        event.target as HTMLInputElement
      ).checked;
      callback();
    }
  };
}
