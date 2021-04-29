import tw, { css } from 'twin.macro';

export const globals = css`
  html {
    ${tw`h-full`};
  }

  * {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  body {
    ${tw`antialiased`};
  }

  .prose .copy-title-icon {
    position: absolute;
    right: -0.1em;
    transform: translate(100%, 50%);
  }

  .prose .copy-title-icon .icon.icon-link {
    display: inline-block;
    display: block;
    width: 0.7em;
    height: 0.7em;
    mask: url(/icons/anchor.svg) no-repeat;
    transition: visibility 0.2s ease-in-out;
    visibility: var(--icon-visible);
    background-color: black;
  }

  .dark .prose .icon.icon-link {
    background-color: white;
  }
`;

export const gridContainer = tw`
  w-full
  grid-cols-4
  px-4
  gap-4
  grid
  mx-auto

  md:max-w-5xl
  md:grid-cols-6

  lg:max-w-7xl
  lg:grid-cols-12
`;
