import { motion } from 'framer-motion';

import { styled, media } from '@styles/styled';
import { Card as DefaultCard } from '@components/Ui';
import { pxToRem } from '@screens/Blog/styles/globals';

export const Card = styled(DefaultCard)`
  padding: 0;
  margin: 24px 0;
`;

export const Wrapper = styled.div`
  padding: 0;
  --common-padding: 10px 16px;
`;

const CommonInfo = styled.div<{ expanded: boolean }>`
  margin: 0;
  padding: var(--common-padding);
  font-weight: bold;
  font-size: ${pxToRem(18)};
  line-height: 1.4;

  ${media.greaterThan('medium')`
    font-size: ${pxToRem(20)};
  `}

  cursor: pointer;
  > * {
    cursor: pointer;
  }
`;

export const Info = styled(CommonInfo)`
  padding-bottom: ${({ expanded }) => (expanded ? '10px' : '0')};

  display: flex;
  justify-content: space-between;
`;

export const ExpanderButton = styled(motion.button)`
  border: none;
  background-color: transparent;
  padding: 0;
  color: ${({ theme }) => theme.color.font};
`;

export const List = styled(motion.ul)`
  margin: 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.border}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.border}`};

  /* Initial animation values */
  opacity: 0;
  height: 0;
`;

export const Item = styled(motion.li)`
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.contentSans};

  font-size: ${pxToRem(14)};
  margin: 0;
  padding: 0;

  ${media.greaterThan('medium')`
    font-size: ${pxToRem(16, false)};
  `}

  &.active {
    background-color: rgba(3, 168, 124, 1);
    color: white;
  }

  &:hover:not(.active) {
    background-color: rgba(3, 168, 124, 0.2);
  }

  a {
    text-decoration: none;
    padding: var(--common-padding);
    display: block;
  }
`;

Item.displayName = 'SeriesMenuItem';

export const MenuFooter = styled(CommonInfo)`
  padding-top: ${({ expanded }) => (expanded ? '10px' : '0')};
  font-family: ${({ theme }) => theme.font.contentSans};
  font-weight: normal;
  opacity: 0.67;

  span {
    margin: 0;
  }
`;
