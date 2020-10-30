import { css } from '@styles/styled';

export const themeBackgroundColor = {
  dark: 'rgb(21, 32, 43)',
  light: 'rgb(255, 255, 255)',
};

export const customGlobals = css`
  *:focus {
    outline-color: var(--font);
  }

  /* CUSTOM */
  html {
    font-size: 10px;
  }

  body,
  body.light {
    --background: ${themeBackgroundColor.light};
    --font: rgb(0, 0, 0, 0.84);
    --font-medium: rgba(0, 0, 0, 0.76);
    --font-light: rgba(0, 0, 0, 0.54);
    --border: rgba(0, 0, 0, 0.1);
    --shadow: rgba(0, 0, 0, 0.35);
    --shadowLight: rgba(0, 0, 0, 0.25);
    --shadowBright: rgba(0, 0, 0, 0.05);
    --shadowMenu: rgba(0, 0, 0, 0.05);
    --infoBox: #fbf9e0;
  }

  body.dark {
    --background: ${themeBackgroundColor.dark};
    --font: rgba(255, 255, 255, 1);
    --font-medium: rgba(255, 255, 255, 0.7);
    --font-light: rgba(255, 255, 255, 0.54);
    --border: rgba(255, 255, 255, 0.1);
    --shadow: rgba(255, 255, 255, 0.35);
    --shadowLight: rgba(255, 255, 255, 0.25);
    --shadowBright: rgba(255, 255, 255, 0.05);
    --shadowMenu: '';
    --infoBox: #233648;
  }

  body {
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    position: relative;
  }

  body,
  #__next {
    background-color: var(--background);
    color: var(--font);

    transition: background-color 0.2s ease, color 0.2s ease, fill 0.2s ease,
      opacity 0.2s ease, color 0.2s ease, border 0.2s ease;
  }

  img,
  svg {
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
