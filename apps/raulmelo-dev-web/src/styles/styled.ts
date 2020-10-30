import { generateMedia, defaultBreakpoints } from 'styled-media-query';

export {
  default as styled,
  css,
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';

export const media = generateMedia({ ...defaultBreakpoints, medium: '768px' });
