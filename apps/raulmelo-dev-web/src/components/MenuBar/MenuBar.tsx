import Link from 'next/link';
import { useState, useEffect, FC } from 'react';
import { useViewportScroll, useMotionValue } from 'framer-motion';

import { Logo } from '@components/Logo';
import { ThemeSwitch } from './components/ThemeSwitch';
import { LanguageSwitch } from './components/LanguageSwitch';
import { SideMenuNavIcon } from '@components/SideMenu';
import { CustomContainer, LogoWrapper, MenuBarWrapper } from './styled';

export const MenuBar: FC = () => {
  const [showMenu, setShowMenu] = useState(true);
  const previousPosition = useMotionValue(0);
  const { scrollY } = useViewportScroll();

  useEffect(
    () =>
      scrollY.onChange((nextYPosition) => {
        const yDifference = previousPosition.get() - nextYPosition;
        /* Converts from negative to positive */
        const absoluteY = Math.abs(yDifference);

        /* I only want to the computation from 10 by 10
        Otherwise it'll toggle too fast*/
        if (absoluteY < 10) {
          return;
        }

        /* when previous position - next position is:
          - negative => it means scrolling down => I want to hide
          - positive => it means scrolling up => I want to show
         */

        const shouldShow = yDifference > 0;
        setShowMenu(shouldShow);
        /* I need to save nextPosition to the next comparison */
        previousPosition.set(nextYPosition);
      }),
    [scrollY],
  );

  const variants = {
    open: { y: 0 },
    closed: { y: '-100%' },
  };

  return (
    <MenuBarWrapper
      animate={showMenu ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.3, type: 'tween' }}
      data-testid="menu-bar"
    >
      <CustomContainer>
        <LogoWrapper data-testid="menu-bar__logo">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </LogoWrapper>
        <ThemeSwitch />
        <LanguageSwitch />
        <SideMenuNavIcon />
      </CustomContainer>
    </MenuBarWrapper>
  );
};
