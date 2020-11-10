import { createGlobalStyle } from '@styles/styled';

import { customGlobals } from '@styles/globals';
import { FlattenInterpolation, ThemeProps } from 'styled-components';

export const GlobalStyles = createGlobalStyle<{
  global?: FlattenInterpolation<ThemeProps<any>>;
}>`
  ${customGlobals};
  ${({ global }) => global};
`;
