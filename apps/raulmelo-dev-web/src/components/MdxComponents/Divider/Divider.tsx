import { styled } from '@styles/styled';

/* TODO: rename to "DotDivider" */
export const Divider = styled.hr`
  position: relative;
  font-style: italic;
  font-size: 28px;
  font-weight: 300;
  margin-top: 0;
  height: 39px;
  background-color: transparent;
  text-align: center;
  transform: translateX(-71px);

  &::before {
    content: '...';
    letter-spacing: 0.6em;
    text-indent: 0.6em;
    line-height: 1.4;
    position: absolute;
    top: -13%;
  }
`;
