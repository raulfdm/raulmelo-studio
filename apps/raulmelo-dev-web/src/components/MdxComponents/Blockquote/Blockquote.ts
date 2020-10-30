import { styled, media } from '@styles/styled';

export const Blockquote = styled.blockquote`
  font-weight: 300;
  margin-left: -12px;
  padding-left: 23px;
  box-shadow: inset 3px 0 0 -1px var(--font);

  > p {
    font-style: italic;
  }

  ${media.greaterThan('medium')`
    margin-left: -20px;
  `}
`;
