import { styled, css } from '@styles/styled';
import { motion } from 'framer-motion';

export const Nav = styled(motion.nav)<{ isCollapsed: boolean }>`
  position: fixed;
  transform: translate3d(100%, 0, 0);
  top: ${({ theme }) => theme.sizes.menuBar.height};
  bottom: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: ${({ theme }) => theme.color.background};
  padding: 8px 0;
  overflow-x: hidden;
  z-index: 3;
  display: flex;
  flex-direction: column;
  border: ${({ theme }) =>
    theme.isDarkTheme ? `1px solid ${theme.color.border}` : 'none'};
  border-top: 0;
  box-shadow: ${({ theme }) =>
      theme.isDarkTheme ? 'transparent' : theme.color.shadowLight}
    0 1px 4px;
`;

export const StyledLink = styled.a<{ $isCurrentPage?: boolean }>`
  font-size: 18px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.color.font};
  font-family: ${({ theme }) => theme.font.contentSerif};
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  ${({ theme, $isCurrentPage }) =>
    $isCurrentPage &&
    css`
      &::before {
        content: '';
        border: 1px solid ${theme.color.font};
        margin-right: 10px;
      }
    `}
`;

export const Overlay = styled(motion.div)`
  position: absolute;
  opacity: 0;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;
