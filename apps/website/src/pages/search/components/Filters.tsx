import { isEmpty } from '@raulmelo/core/utils';
import classNames from 'classnames';
import { connectRefinementList } from 'react-instantsearch-dom';

import { useLocalization } from '~/hooks/useLocalization';

import type { RefinementListProps } from '../types';
import styles from './Filter.module.css';

export const Filters = () => {
  return (
    <div className="col-span-full inline-flex flex-wrap m-auto mb-7`">
      <ConfiguredLanguageRefinement attribute="language" operator="or" />
      <ConfiguredTypeRefinement attribute="_type" operator="or" />
      <ConfiguredTagsRefinement attribute="tags.name" operator="or" />
    </div>
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
  return isEmpty(items) ? null : (
    <div className={styles.RefinementWrapper}>
      <h3 className="text-lg font-bold">{title}</h3>

      <ul className="flex flex-col space-y-2">
        {items.sort(sortOptionByLabel).map((item) => {
          const handleClick = () => refine(item.value);
          return (
            <li key={item.label}>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  className={classNames(
                    'rounded checked:bg-secondary hover:checked:bg-secondary focus:checked:bg-secondary focus:checked:ring-secondary focus:ring-secondary',
                    styles.Checkbox,
                  )}
                  type="checkbox"
                  onClick={handleClick}
                  onKeyPress={createEnterHandler(handleClick)}
                />
                <span className="text-lg">
                  {renderLabelText(item.label)} {`(${item.count})`}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
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
