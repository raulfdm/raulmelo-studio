import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import { SideMenuItem, SideMenuItemProps } from '../SideMenuItem';

export type SideMenuProps = {
  className?: string;
  handleCloseMenu: () => void;
  items: SideMenuItemProps[];
  Link?: React.ElementType;
  state: 'open' | 'closed';
};

export const SideMenu = ({
  className,
  handleCloseMenu,
  items,
  Link,
  state,
}: SideMenuProps) => {
  const isClosed = state === 'closed';

  function onItemClicked() {
    handleCloseMenu();
  }

  return (
    <>
      <motion.nav
        className={classNames([
          className,
          'fixed',
          'bottom-0 right-0',
          'h-full',
          'bg-white dark:bg-blue-800',
          'z-20',
          'transform translate-x-full',
          'min-w-full sm:min-w-min sm:w-full sm:max-w-xs',
          'transition-theme duration-200 ease',
        ])}
        animate={state}
        variants={{
          open: {
            transform: `translate3d(0%, 0, 0)`,
          },
          closed: {
            transform: `translate3d(100%, 0, 0)`,
          },
        }}
        data-testid="sideMenu"
      >
        <ul className={classNames(['py-6', 'flex flex-col'])}>
          {items.map((props) => (
            <SideMenuItem
              key={props.href}
              {...props}
              onClick={onItemClicked}
              Link={Link}
            />
          ))}
        </ul>
      </motion.nav>
      <motion.div
        className={classNames([
          'absolute',
          'inset-0',
          'z-10',
          'bg-black bg-opacity-80',
          'opacity-0',
        ])}
        style={{
          pointerEvents: isClosed ? 'none' : 'all',
        }}
        onClick={handleCloseMenu}
        animate={state}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        variants={{
          open: {
            opacity: 1,
          },
          closed: {
            opacity: 0,
          },
        }}
      />
    </>
  );
};
