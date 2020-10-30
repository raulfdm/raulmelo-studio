import { styled, media } from '@styles/styled';

export const SearchWrapper = styled.main`
  font-family: ${({ theme }) => theme.font.contentSans};

  .ais-SearchBox {
    padding-bottom: 1rem;
  }

  .ais-SearchBox-form {
    display: flex;
  }

  .ais-SearchBox-input {
    border: 0;
    border-bottom: 1px solid var(--border);
    font-size: 24px;
    color: var(--font);
    height: 50px;
    width: 100%;
    letter-spacing: 0;
    font-family: inherit;
    font-weight: 300;
    background-color: transparent !important;

    ${media.greaterThan('medium')`
      font-size: 34px;
    `}
  }

  .ais-SearchBox-reset {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 1rem 2rem;

    svg {
      fill: var(--font);
    }

    &:not([hidden]) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .ais-SearchBox-submit {
    display: none;
  }

  .ais-Hits-item {
    list-style: none;
  }
`;

export const SearchBoxWrapper = styled.div`
  padding-bottom: 20px;

  ${media.greaterThan('medium')`
    padding-bottom: 40px;
  `};
`;

export const PoweredBy = styled.a`
  color: inherit;
  display: flex;
  justify-content: end;
`;
