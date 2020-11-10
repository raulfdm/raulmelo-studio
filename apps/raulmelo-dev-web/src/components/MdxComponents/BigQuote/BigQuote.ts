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
  opacity: 0.6;

  letter-spacing: -0.33px;
  font-weight: 400;
  /* Because it happens some processing in next-mdx-remote
  there we don't have the theme.
  It means that without this optional chaining it'll break
  because theme is undefined.
   */
  color: ${({ theme }) => theme.color?.font};
  font-family: ${({ theme }) => theme.font?.contentTitle};

  ${media.greaterThan('medium')`
    font-size: 30px;
  `}
`;
