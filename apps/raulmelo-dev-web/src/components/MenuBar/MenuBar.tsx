import Link from 'next/link';
import { useState, useEffect, FC } from 'react';
import { useViewportScroll, useMotionValue, motion } from 'framer-motion';

import { Logo } from '@components/Logo';
import { SideMenuNavIcon, SideMenu } from '@components/SideMenu';
import { ThemeSwitch } from './components/ThemeSwitch';
import { LanguageSwitch } from './components/LanguageSwitch';
import classNames from 'classnames';

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
    <>
      <motion.section
        className={classNames([
          'fixed',
          'inset-x-0',
          'top-0 h-16',
          'z-20',
          'shadow',
          'bg-white dark:bg-blue-800',
          'transition-theme duration-200 ease',
        ])}
        animate={showMenu ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 0.3, type: 'tween' }}
        data-testid="menu-bar"
      >
        <div className="flex items-center max-w-7xl mx-auto h-full px-4">
          <div className="flex-1" data-testid="menu-bar__logo">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="flex space-x-3">
            <ThemeSwitch />
            <LanguageSwitch />
            <SideMenuNavIcon />
          </div>
        </div>
      </motion.section>
      <SideMenu />
      <style global jsx>{`
        #__next {
          padding-top: calc(64px + 24px);
          padding-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

export const MenuButton = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={classNames(['p-2 flex place-content-center', className])}
      {...props}
    />
  );
};
