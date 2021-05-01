import { RefinementListProps } from '@types-app';
import { isEmpty } from '@utils/ramda';
import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import { FormattedMessage } from 'react-intl';
import 'twin.macro';
import { searchStyles } from '../styles';

export const Filters = () => {
  return (
    <div css={searchStyles.filters.wrapper}>
      <ConfiguredLanguageRefinement attribute="locale" operator="or" />
      <ConfiguredTypeRefinement attribute="type" operator="or" />
      <ConfiguredTagsRefinement attribute="tags.name" operator="or" />
    </div>
  );
};

function LanguageRefinement({ items, refine }: RefinementListProps) {
  const langMap = {
    pt: 'Português',
    en: 'English',
  };

  return isEmpty(items) ? null : (
    <div css={searchStyles.filters.refinementWrapper}>
      <h3 css={searchStyles.filters.title}>
        <FormattedMessage id="search.filters.lang" />
      </h3>

      <ul css={searchStyles.filters.list}>
        {items.map((item) => {
          return (
            <li key={item.label}>
              <label css={searchStyles.filters.label}>
                <input type="checkbox" onClick={() => refine(item.value)} />
                <span css={searchStyles.filters.text}>
                  {langMap[item.label as 'pt' | 'en']}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TypeRefinement({ items, refine }: RefinementListProps) {
  return isEmpty(items) ? null : (
    <div css={searchStyles.filters.refinementWrapper}>
      <h3 css={searchStyles.filters.title}>
        <FormattedMessage id="search.filters.type" />
      </h3>

      <ul css={searchStyles.filters.list}>
        {items.map((item) => {
          return (
            <li key={item.label}>
              <label css={searchStyles.filters.label}>
                <input type="checkbox" onClick={() => refine(item.value)} />
                <span css={searchStyles.filters.text}>{item.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TagsRefinement({ items, refine }: RefinementListProps) {
  return isEmpty(items) ? null : (
    <div css={searchStyles.filters.refinementWrapper}>
      <h3 css={searchStyles.filters.title}>
        <FormattedMessage id="search.filters.tags" />
      </h3>

      <ul css={searchStyles.filters.list}>
        {items.map((item) => {
          return (
            <li key={item.label}>
              <label key={item.label} css={searchStyles.filters.label}>
                <input type="checkbox" onClick={() => refine(item.value)} />
                <span css={searchStyles.filters.text}>{item.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const ConfiguredLanguageRefinement = connectRefinementList(
  LanguageRefinement as never,
);
const ConfiguredTagsRefinement = connectRefinementList(TagsRefinement as never);
const ConfiguredTypeRefinement = connectRefinementList(TypeRefinement as never);
