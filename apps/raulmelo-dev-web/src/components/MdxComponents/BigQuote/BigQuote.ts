import { styled, media } from '@styles/styled';

export const BigQuote = styled.blockquote`
  /* Resetting global blockquote style  */
  && {
    margin: 0;
    margin-bottom: 20px;
    box-shadow: none;
  }

  text-rendering: optimizelegibility;
  padding-left: 30px;
  font-size: 26px;
  line-height: 44px;
  color: ${({ theme }) => theme.color.font};
  opacity: 0.6;
  font-family: ${({ theme }) => theme.font.contentTitle};
  letter-spacing: -0.33px;
  font-weight: 400;

  ${media.greaterThan('medium')`
    font-size: 30px;
  `}
`;
