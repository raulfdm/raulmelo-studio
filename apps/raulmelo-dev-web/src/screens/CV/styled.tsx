import defaultStyled, {
  css,
  createGlobalStyle,
  ThemedStyledInterface,
} from 'styled-components';

export const theme = {
  color: {
    grey: '#DDDDDD',
    black: '#111111',
  },
  font: {
    sans: `'Lora', sans-serif`,
    serif: `'Raleway', serif`,
  },
  sizes: {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
  },
  pxToRem(px: number): string {
    const basePixel = 16;
    return `${(px / basePixel).toFixed(2)}rem`;
  },
};

export type CvTheme = typeof theme;

export { css } from 'styled-components';

export const styled = (defaultStyled as unknown) as ThemedStyledInterface<
  CvTheme
>;

const globalCss = css`
  html,
  body,
  #___gatsby {
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.font.sans};
    font-weight: bold;
  }
  body {
    font-family: ${theme.font.serif};
    color: ${theme.color.black};
    line-height: 1.6;
  }
  a {
    color: ${theme.color.black};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    display: inline;
  }
`;

const printGlobals = css`
  @media print {
    @page {
      size: auto;
      margin: 0;
      padding: 1cm 1cm 1cm 1cm;
      margin: 0;
      size: A4;
    }

    html {
      max-width: 21cm;
      font-size: 16px;
      padding: 0;
      margin: 0 auto;
    }

    button {
      display: none !important;
    }

    a {
      text-decoration: none;
    }
  }
`;

export const GlobalCVStyles = createGlobalStyle`
  ${printGlobals};
  ${globalCss};
`;
