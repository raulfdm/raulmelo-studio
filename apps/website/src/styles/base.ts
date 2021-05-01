import tw, { css } from 'twin.macro';

export const globals = css`
  html {
    ${tw`h-full`};

    --black: #2c2c2c;
    --primary: var(--black);
    --secondary: #be185d;
  }

  html.dark {
    --primary: #ffffff;
    --secondary: #c0ed40;
  }

  * {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  button:focus,
  *,
  *::focus-visible {
    ${tw`focus:outline-black dark:focus:outline-white`}
  }

  body {
    ${tw`antialiased`};
  }

  .page-title {
    ${tw`text-3xl md:text-4xl font-extrabold`}
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

export const pageTitle = tw`
  text-3xl md:text-4xl
  font-extrabold
  col-span-full
`;
