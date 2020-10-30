import { motion } from 'framer-motion';

import { styled, media } from '@styles/styled';
import { Container } from '@components/Ui';

export const MenuBarWrapper = styled(motion.section)`
  box-shadow: 0 4px 12px 0 ${({ theme }) => theme.color.shadowMenu};

  border-bottom: ${({ theme }) =>
    theme.isDarkTheme ? `1px solid ${theme.color.border}` : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 65px;
  z-index: 500;

  background-color: ${({ theme }) => theme.color.background};
  transition: background-color 0.2s ease;

  a {
    color: inherit;
  }
`;

export const CustomContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.greaterThan('medium')`
    max-width: 90%;
    padding: 0;
  `}

  ${media.greaterThan('large')`
    max-width: 80%;
  `}
`;

export const LogoWrapper = styled.div`
  flex: 1;
`;

export const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  outline: ${({ theme }) => theme.color.background};
  cursor: pointer;
  width: 45px;

  svg {
    color: ${({ theme }) => theme.color.font};
  }
`;
