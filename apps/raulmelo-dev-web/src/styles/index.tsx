import { createGlobalStyle } from '@styles/styled';

import { customGlobals } from '@styles/globals';
import { FlattenSimpleInterpolation } from 'styled-components';

export const GlobalStyles = createGlobalStyle<{
  global?: FlattenSimpleInterpolation;
}>`
  ${customGlobals};
  ${({ global }) => global};
`;
