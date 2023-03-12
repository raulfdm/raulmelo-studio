import { type SupportedLanguages } from '@raulmelo/core/config';
import { isEmpty } from '@raulmelo/core/utils';
import classNames from 'classnames';
import { useRefinementList } from 'react-instantsearch-hooks-web';

import { type RefinementListProps } from './types';

export function Filters({
  languageTitle,
  typeTitle,
  tagsTitle,
}: {
  languageTitle: string;
  typeTitle: string;
  tagsTitle: string;
}) {
  return (
    <div className="col-span-full inline-flex flex-wrap m-auto mb-7`">
      <LanguageRefinement title={languageTitle} />
      <TypeRefinement title={typeTitle} />
      <TagsRefinement title={tagsTitle} />
    </div>
  );
}

function LanguageRefinement({ title }: { title: string }) {
  const langMap: Record<SupportedLanguages, string> = {
    pt: `Português`,
    en: `English`,
  };

  const { items, refine } = useRefinementList({
    attribute: `language`,
    operator: `or`,
  });

  return (
    <GenericRefinement
      items={items}
      refine={refine}
      renderLabelText={(t: SupportedLanguages) => langMap[t]}
      title={title}
    />
  );
}

function TypeRefinement({ title }: { title: string }) {
  const { items, refine } = useRefinementList({
    attribute: `_type`,
    operator: `or`,
  });

  return (
    <GenericRefinement
      items={items}
      refine={refine}
      renderLabelText={(t: string) => t.toUpperCase()}
      title={title}
    />
  );
}

function TagsRefinement({ title }: { title: string }) {
  const { items, refine } = useRefinementList({
    attribute: `tags.name`,
    operator: `or`,
  });

  return (
    <GenericRefinement
      items={items}
      refine={refine}
      renderLabelText={(t: string) => t}
      title={title}
    />
  );
}

function GenericRefinement({ title, refine, items, renderLabelText }: any) {
  return isEmpty(items) ? null : (
    <div className="search__refinementWrapper">
      <h3 className="text-lg font-bold">{title}</h3>

      <ul className="flex flex-col space-y-2">
        {items
          .sort(sortOptionByLabel)
          .map((item: { value: string; label: string; count: number }) => {
            function handleClick() {
              refine(item.value);
            }

            return (
              <li key={item.label}>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    className={classNames(
                      `rounded checked:bg-secondary hover:checked:bg-secondary focus:checked:bg-secondary focus:checked:ring-secondary focus:ring-secondary`,
                      `search__checkbox`,
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

type Item = RefinementListProps[`items`][0];

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
    if (event.code === `Enter`) {
      (event.target as HTMLInputElement).checked = !(
        event.target as HTMLInputElement
      ).checked;
      callback();
    }
  };
}
