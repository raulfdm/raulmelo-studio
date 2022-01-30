import tw, { css, styled } from 'twin.macro';

const common = css`
  ${tw`relative table`};

  --icon-visible: hidden;

  &:hover {
    --icon-visible: unset;
  }

  .copy-title-icon {
    ${tw`absolute -right-1`};
    transform: translate(100%, 50%);

    .icon-link {
      ${tw`block bg-secondary`};
      width: 0.7em;
      height: 0.7em;
      mask: url(/icons/anchor.svg) no-repeat;
      transition: visibility 0.2s ease-in-out;
      visibility: var(--icon-visible);
    }
  }
`;

export const H1 = styled.h1`
  ${common};
`;

export const H2 = styled.h2`
  ${common};
`;

export const H3 = styled.h3`
  ${common};
`;

export const H4 = styled.h4`
  ${common};
`;

export const H5 = styled.h5`
  ${common};
`;

export const H6 = styled.h6`
  ${common};
`;
