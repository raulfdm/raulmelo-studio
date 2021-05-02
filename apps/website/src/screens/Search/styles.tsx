import { Global } from '@emotion/react';
import { pageTitle } from '@styles/base';
import tw, { css } from 'twin.macro';

export const AlgoliaGlobalStyles = () => (
  <Global styles={algoliaGlobalStyles} />
);

export const searchStyles = {
  searchArea: tw`col-span-full`,
  header: tw`col-span-full mb-6`,
  paragraph: tw`text-lg`,
  searchLink: tw`underline text-secondary`,
  title: pageTitle,
  hits: tw`pb-5 md:pb-10 col-span-full`,
  poweredLink: css`
    ${tw`relative items-center font-medium font-sans text-base col-span-full`};
    a {
      ${tw`inline-flex justify-end absolute right-0`}
    }
  `,
};

const algoliaGlobalStyles = css`
  .ais-SearchBox-form {
    ${tw`flex`}
  }

  .ais-SearchBox-input {
    ${tw`
      bg-transparent
      w-full
      text-3xl font-light md:text-4xl
      border-b dark:border-gray-700
      pb-3 py-1
      focus:border-0
    `}
  }

  .ais-SearchBox-submit {
    ${tw`hidden`}
  }

  .ais-SearchBox-reset {
    ${tw`text-base p-5`}
    fill: currentColor;
  }

  .ais-Stats {
    ${tw`text-base font-bold mb-6 mt-3`}
  }

  /* Algolia already provides this mechanisms */
  input[type='search']::-ms-clear,
  input[type='search']::-ms-reveal {
    ${tw`hidden h-0 w-0`}
  }

  /* clears the ‘X’ from Chrome */
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    ${tw`hidden`}
  }

  .ais-SearchBox-form input {
    ${tw`text-xl md:text-3xl`}
    /* disable IOS native input styles */
    /* https://stackoverflow.com/a/2918716 */
    ${tw`rounded-none`}
    -webkit-appearance: none;
  }

  .ais-Hits-list {
    ${tw`space-y-8`}
  }

  .ais-PoweredBy {
    ${tw`flex justify-end items-center font-medium font-sans text-base col-span-full`};

    span {
      ${tw`mr-2`}
    }
  }
`;
