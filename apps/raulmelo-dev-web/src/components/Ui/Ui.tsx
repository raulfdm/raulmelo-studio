import { styled, media, css } from '@styles/styled';

// export const Container = styled(motion.div)`
export const Container = styled.div`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  height: 100%;

  ${media.greaterThan('medium')`
    padding: 0;
  `}
`;

export const headingLinkStyle = css`
  cursor: text;
  display: inline-block;
  position: relative;

  &:hover {
    .copy-title-icon:after {
      visibility: visible;
    }
  }

  .copy-title-icon {
    display: inline-block;
    position: absolute;
    right: -20px;
    top: -2px;
  }

  .copy-title-icon:after {
    content: url('/icons/anchor.svg');
    width: 20px;
    display: block;
    visibility: hidden;
    transition: visibility 0.2s ease-in-out;
  }
`;
