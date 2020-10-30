import { styled, css } from '@screens/CV/styled';
// import { Section } from '@screens/CV/components/shared/Section';

// export const InformationWrapper = styled(Section)`
export const InformationWrapper = styled.div`
  text-align: center;

  @media print {
    padding: 0;
  }
`;

export const Name = styled.h1`
  ${({ theme }) => {
    return css`
      font-size: ${theme.pxToRem(35)};

      @media screen and (min-width: ${theme.sizes.laptop}) {
        font-size: ${theme.pxToRem(40)};
      }
    `;
  }}
`;

export const InfoList = styled.ul`
  display: inline-flex;
  flex-direction: column;
`;

export const InfoItem = styled.li`
  :not(:last-child) {
    margin-bottom: 3px;

    @media print {
      margin-bottom: 0;
    }
  }
`;

export const InfoLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  ${({ theme }) => {
    return css`
      font-size: ${theme.pxToRem(16)};
      text-decoration: none;
      padding-bottom: 1px;
      border-bottom: 1px solid;

      @media screen and (min-width: ${theme.sizes.laptop}) {
        font-size: ${theme.pxToRem(18)};
      }

      @media print {
        border: none;
      }
    `;
  }}
`;
