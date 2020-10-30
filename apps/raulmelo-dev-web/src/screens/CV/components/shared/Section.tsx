import { styled, css } from '@screens/CV/styled';

export const Section = styled.section`
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.pxToRem(22)};

    border-bottom: 1px solid ${theme.color.grey};

    @media screen and (min-width: ${theme.sizes.tablet}) {
      font-size: ${theme.pxToRem(30)};
    }
  `}
`;

export const SectionBody = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.pxToRem(16)};
    padding: ${theme.pxToRem(12)} 0;

    p {
      margin-bottom: 16px;
    }

    @media screen and (min-width: ${theme.sizes.tablet}) {
      font-size: ${theme.pxToRem(18)};
      padding: ${theme.pxToRem(16)} 0;
    }
  `}
`;
