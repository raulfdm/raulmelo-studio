import Link from 'next/link';

import { styled } from '@screens/CV/styled';

export const CVMain = styled.main`
  max-width: 798px;
  width: 100%;
  padding: 0 14px;
  margin: 0 auto;
  position: relative;
  padding-top: 46px;

  @media screen and (min-width: 515px) {
    padding: 0 16px;
    padding-top: 26px;
  }
`;

export const HomeLink = styled(Link)`
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 9;

  @media print {
    display: none;
  }
`;

export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  box-shadow: 2px 2px 7px -3px rgba(0, 0, 0, 0.6);
  border: none;
  background-color: #fff;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  padding: 5px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
